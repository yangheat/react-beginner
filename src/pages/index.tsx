import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router'

import { toast } from 'sonner'
import { CircleSmall, NotebookPen, PencilLine } from 'lucide-react'

import supabase from '@/lib/supabase'
import { useAuthStore } from '@/stores'

import { AppDreaftsDialog, AppSidebar } from '../components/common'
import { SkeletonHotTopic } from '../components/skeleton'
import { Button } from '../components/ui'
import { NewTopicCard } from '@/components/topics'

import { TOPIC_STATUS, type Topic } from '@/types/topic.type'

export default function App() {
  const user = useAuthStore((state) => state.user)
  const navigate = useNavigate()
  const [searchParmas, setSearchParmas] = useSearchParams()
  const category = searchParmas.get('category') || ''

  const [topics, setTopics] = useState<Topic[]>([])
  // 발행된 토픽 조회
  const fetchTopics = async () => {
    try {
      const query = supabase
        .from('topic')
        .select('*')
        .eq('status', TOPIC_STATUS.PUBLISH)

      if (category && category.trim() !== '') {
        query.eq('category', category)
      }
      const { data: topics, error } = await query

      if (error) {
        toast.error(error.message)
        return
      }

      if (topics) {
        setTopics(topics)
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  // 나만의 토픽 생성 버튼 클릭
  const moveTopicCreatePage = async () => {
    if (!user) {
      toast.warning('토픽 작성은 로그인 후 가능합니다.')
      return
    }

    const { data, error } = await supabase
      .from('topic')
      .insert([
        {
          status: null,
          title: null,
          content: null,
          category: null,
          thumbnail: null,
          author: user.id
        }
      ])
      .select()

    if (error) {
      toast.error(error.message)
      return
    }

    if (data) {
      toast.success('토픽을 생성하였습니다.')
      navigate(`/topics/${data[0].id}/create`)
    }
  }

  const handleCategoryChange = (value: string) => {
    if (value === category) return // 선택된 항목 재선택시 무시

    if (value === '') {
      setSearchParmas({})
    } else {
      setSearchParmas({ category: value })
    }
  }

  useEffect(() => {
    fetchTopics()
  }, [category])

  return (
    <main className="w-full h-full min-h-[720px] flex p-6 gap-6">
      <div className="fixed right-1/2 bottom-10 translate-x-1/2 z-20 flex items-center gap-2">
        <Button
          variant={'destructive'}
          className="!py-5 !px-6 rounded-full"
          onClick={moveTopicCreatePage}
        >
          <PencilLine />
          나만의 토픽 작성
        </Button>
        <AppDreaftsDialog>
          <div className="relative">
            <Button variant={'outline'} className="w-10 h-10 rounded-full">
              <NotebookPen />
            </Button>
            <CircleSmall
              size={14}
              className="absolute top-0 right-0 text-red-500"
              fill="#EF4444"
            />
          </div>
        </AppDreaftsDialog>
      </div>
      {/* 카테고리 사이드바 */}
      <div className="hidden lg:block lg:min-w-60 lg:w-60 lg:h-full">
        <AppSidebar category={category} setCategory={handleCategoryChange} />
      </div>
      {/* 토픽 컨텐츠 */}
      <section className="w-full lg:w-[calc(100%-264px)] flex flex-col gap-12">
        {/* Hot 토픽 */}
        <div className="w-full flex flex-col gap-6">
          <div className="flex flex-col gap1">
            <div className="flex item-center gap-2">
              <img
                src="/assets/gifs/gif-001.gif"
                alt="@IMG"
                className="w-7 h-7"
              />
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                HOT 토픽
              </h4>
            </div>
            <p className="md:text-base text-muted-foreground">
              지금 가장 주목받는 주제들을 살펴보고, 다양한 관점의인사이트를
              얻어보세요.
            </p>
          </div>
          <div className="w-full flex items-center gap-6 overflow-auto">
            <SkeletonHotTopic />
            <SkeletonHotTopic />
            <SkeletonHotTopic />
            <SkeletonHotTopic />
          </div>
        </div>
        {/* New 토픽 */}
        <div className="w-full flex flex-col gap-6">
          <div className="flex flex-col gap1">
            <div className="flex item-center gap-2">
              <img
                src="/assets/gifs/gif-002.gif"
                alt="@IMG"
                className="w-7 h-7"
              />
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                New 토픽
              </h4>
            </div>
            <p className="md:text-base text-muted-foreground">
              새로운 시선으로, 새로운 이야기를 시작하세요. 지금 바로 당신만의
              토픽을 작성해보세요.
            </p>
          </div>

          {topics.length > 0 ? (
            <div className="flex flex-col min-h-120 md:grid md:grid-cols-2 gap-6">
              {topics
                .sort(
                  (a, b) =>
                    new Date(b.created_at).getTime() -
                    new Date(a.created_at).getTime()
                )
                .map((topic: Topic) => (
                  <NewTopicCard props={topic} key={topic.id} />
                ))}
            </div>
          ) : (
            <div className="w-full min-h-120 flex items-center justify-center">
              <p className="text-muted-foreground/50">
                조회 가능한 토픽이 없습니다.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
