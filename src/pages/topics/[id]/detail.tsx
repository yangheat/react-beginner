import { AppEditor } from '@/components/common'
import { Button, Separator } from '@/components/ui'
import supabase from '@/lib/supabase'
import { ArrowLeft, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { toast } from 'sonner'

export function TopicDetail() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [category, setCategory] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [thumbnail, setThumbnail] = useState<string>('')
  const [content, setContent] = useState<string>('')

  const fetchTopic = async () => {
    try {
      const { data: topic, error } = await supabase
        .from('topic')
        .select('*')
        .eq('id', id)

      if (error) {
        toast.error(error.message)
        return
      }

      if (topic) {
        setCategory(topic[0].category)
        setTitle(topic[0].title)
        setThumbnail(topic[0].thumbnail)
        setContent(topic[0].content)
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  useEffect(() => {
    fetchTopic()
  }, [id])

  return (
    <main className="w-full h-full min-h-[720px] flex flex-col">
      <div
        className="relative w-full h-100 bg-cover bg-[50%_35%] bg-accent"
        style={{ backgroundImage: `url(${thumbnail})` }}
      >
        {/* 뒤로가기 */}
        <div className="absolute top-6 left-6 z-10 flex items-center gap-2">
          <Button variant={'outline'} size="icon" onClick={() => navigate('/')}>
            <ArrowLeft />
          </Button>
          {/* 토픽을 작성한 사람의 user_id와 로그인한 사람의 user_id가 같은 경우에만 보이도록 한다. */}
          <Button variant={'outline'} size="icon" className="!bg-red-800/50">
            <Trash2 />
          </Button>
        </div>
        {/* 좌, 우, 하단 그라데이션 */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-l from-[#0a0a0a] via-transparent to-transparent"></div>
      </div>
      <section className="relative w-full flex flex-col items-center -mt-40">
        <span className="mb-4">{category}</span>
        <h1 className="scroll-m-20 text-center font-extrabold tracking-tight text-4xl">
          {title}
        </h1>
        <Separator className="!w-6 my-6 bg-foreground" />
        <span>205. 10. 26.</span>
      </section>
      {/* 에디터 내용을 불러와 렌더링 */}
      <div className="w-full py-6">
        {content && <AppEditor props={JSON.parse(content)} readonly />}
      </div>
    </main>
  )
}
