import { useEffect, useState, type ReactNode } from 'react'
import dayjs from 'dayjs'
import { toast } from 'sonner'

import supabase from '@/lib/supabase'
import { useAuthStore } from '@/stores'
import {
  Badge,
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Separator
} from '@/components/ui'
import { TOPIC_STATUS, type Topic } from '@/types/topic.type'
import { useNavigate } from 'react-router'

interface Props {
  children: ReactNode
}

export function AppDreaftsDialog({ children }: Props) {
  const user = useAuthStore((state) => state.user)
  const navigator = useNavigate()
  const [drafts, setDrafts] = useState<Topic[]>([])

  const fetchDrafts = async () => {
    if (!user) return
    try {
      // .is() 쿼리문은 null만 체크할 경우 사용
      // .eq() 쿼리문을 연속으로 사용하여 임시 저장된 토픽을 조회
      const { data: topics, error } = await supabase
        .from('topic')
        .select('*')
        .eq('author', user?.id)
        .eq('status', TOPIC_STATUS.TEMP)

      if (error) {
        toast.error(error.message)
        return
      }

      if (topics) {
        setDrafts(topics)
      }
    } catch (error) {}
  }
  useEffect(() => {
    if (user) {
      fetchDrafts()
    }
  }, [])

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>임시 저장된 토픽</DialogTitle>
          <DialogDescription>
            임시 저장된 토핑 목록입니다. 이어서 작성하거나 삭제할 수 있습니다.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-3 py-3">
          <div className="flex items-center gap-2">
            <p>임시 저장</p>
            <p className="text-green-600 -mr-[6px]">{drafts.length}</p>
            <p>건</p>
          </div>
          <Separator />
          {drafts.length > 0 ? (
            <div className="min-h-60 h-60 flex flex-col items-center justify-start gap-3 overflow-y-scroll">
              {drafts.map((draft, index) => (
                <div
                  className="w-full flex items-center justify-between py-2 px-4 gap-3 rounded-md cursor-pointer bg-card/50"
                  onClick={() => navigator(`/topics/${draft.id}/create`)}
                >
                  <div className="flex items-start gap-2">
                    <Badge className="w-5 h-5 mt-[3px] rounded-sm aspect-square text-foreground bg-[#E26F24] hover:bg-[#E26F24]">
                      {index + 1}
                    </Badge>
                    <div className="flex flex-col">
                      <p className="line-clamp-1">
                        {draft.title || '등록된 제목이 없습니다.'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        작성일: {dayjs(draft.created_at).format('YYYY. MM. DD')}
                      </p>
                    </div>
                  </div>
                  <Badge variant={'outline'}>작성 중</Badge>
                </div>
              ))}
            </div>
          ) : (
            <div className="min-h-60 flex items-center justify-center">
              <p className="text-muted-foreground/50">
                조회 가능한 정보가 없습니다.
              </p>
            </div>
          )}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant={'outline'} className="border-0">
              닫기
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
