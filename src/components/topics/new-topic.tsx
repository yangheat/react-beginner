import type { Topic } from '@/types/topic.type'
import { Card, Separator } from '../ui'
import { CaseSensitive } from 'lucide-react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/ko'
import { useNavigate } from 'react-router'
import supabase from '@/lib/supabase'
import { toast } from 'sonner'
import { useEffect, useState } from 'react'

dayjs.extend(relativeTime)
dayjs.locale('ko') // 한국어로 설정

function extractTextFromContent(content: string | any[], maxChars = 200) {
  try {
    const parsed = typeof content === 'string' ? JSON.parse(content) : content

    if (!Array.isArray(parsed)) {
      console.warn('content 데이터 티입이 배열이 아닙니다.')
      return ''
    }

    let result = ''
    for (const block of parsed) {
      if (Array.isArray(block.content)) {
        for (const child of block.content) {
          if (child?.text) {
            result += child.text

            if (child.length > maxChars) {
              return result.slice(0, maxChars) + '...'
            }
          }
        }
      }
    }

    return result.trim()
  } catch (error) {
    console.log('컨텐츠 파싱 실패: ', error)
    return ''
  }
}

async function findUserById(id: string) {
  try {
    let { data: user, error } = await supabase
      .from('user')
      .select('*')
      .eq('id', id)

    if (error) {
      toast.error(error.message)
      return ''
    }

    if (user && user.length > 0) {
      return user[0].email.split('@')[0] + '님'
    } else {
      return '알 수 없는 사용자'
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}

export function NewTopicCard({ topic }: { topic: Topic }) {
  const navigate = useNavigate()
  const [nickName, setNickName] = useState<string>('')

  useEffect(() => {
    async function fetchAuthEmail() {
      const nickName = await findUserById(topic.author)
      setNickName(nickName || '알 수 없는 사용자')
    }
    fetchAuthEmail()
  }, [])

  return (
    <Card
      className="w-full h-fit p-4 gap-4 cursor-pointer"
      onClick={() => navigate(`topics/${topic.id}/detail`)}
    >
      <div className="flex items-start gap-4">
        <div className=" flex-1 flex flex-col gap-4">
          {/* 쌈네일과 제목 */}
          <h3 className="h-16 text-base font-semibold tracking-tight line-clamp-2">
            <CaseSensitive size={16} className="text-muted-foreground" />
            <p>{topic.title}</p>
          </h3>
          {/* 본문 */}
          <p className="line-clamp-3 text-muted-foreground">
            {extractTextFromContent(topic.content)}
          </p>
        </div>
        <img
          src={topic.thumbnail}
          alt="@THUMBNAIL"
          className="w-[140px] h-[140px] aspect-square rounded-lg object-cover"
        />
      </div>
      <Separator />
      <div className="w-full flex items-center justify-between">
        <p>{nickName}</p>
        <p>{dayjs(topic.created_at).format('YYYY. MM. DD')}</p>
      </div>
    </Card>
  )
}
