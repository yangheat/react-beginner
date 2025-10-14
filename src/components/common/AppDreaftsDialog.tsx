import {
  Badge,
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Separator
} from '@/components/ui'
import { DialogClose } from '@radix-ui/react-dialog'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
}
export function AppDreaftsDialog({ children }: Props) {
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
            <p className="text-green-600 -mr-[6px]">10</p>
            <p>건</p>
          </div>
          <Separator />
          <div className="min-h-60 flex items-center justify-center">
            <p className="text-muted-foreground/50">
              조회 가능한 정보가 없습니다.
            </p>
          </div>
          <div className="min-h-60 flex flex-col items-center justify-center gap-3">
            <div className="w-full flex items-center justify-between py-2 px-4 rounded-md cursor-pointer bg-card/50">
              <div className="flex items-start gap-2">
                <Badge className="w-5 h-5 mt-[3px] rounded-sm aspect-square text-foreground bg-[#E26F24] hover:bg-[#E26F24]">
                  1
                </Badge>
                <div className="flex flex-col">
                  <p>등록된 제목이 없습니다.</p>
                  <p className="text-xs text-muted-foreground">
                    작성일: 2025. 10. 14
                  </p>
                </div>
              </div>
              <Badge variant={'outline'}>작성 중</Badge>
            </div>
          </div>
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
