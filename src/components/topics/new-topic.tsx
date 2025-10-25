import type { Topic } from '@/types/topic.type'
import { Card, Separator } from '../ui'
import { CaseSensitive } from 'lucide-react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/ko'

dayjs.extend(relativeTime)
dayjs.locale('ko') // 한국어로 설정

interface Props {
  props: Topic
}

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

export function NewTopicCard({ props }: Props) {
  return (
    <Card className="w-full h-fit p-4 gap-4">
      <div className="flex items-start gap-4">
        <div className=" flex-1 flex flex-col gap-4">
          {/* 쌈네일과 제목 */}
          <h3 className="h-16 text-base font-semibold tracking-tight line-clamp-2">
            <CaseSensitive size={16} className="text-muted-foreground" />
            <p>{props.title}</p>
          </h3>
          {/* 본문 */}
          <p className="line-clamp-3 text-muted-foreground">
            {extractTextFromContent(props.content)}
          </p>
        </div>
        <img
          src={props.thumbnail}
          alt="@THUMBNAIL"
          className="w-[140px] h-[140px] aspect-square rounded-lg object-cover"
        />
      </div>
      <Separator />
      <div className="w-full flex items-center justify-between">
        <p>yangheat</p>
        <p>{dayjs(props.created_at).format('YYYY, MM. DD')}</p>
        {/* <p>{dayjs(props.created_at).fromNow()})</p> */}
      </div>
    </Card>
  )
}
