import { useRef, type ChangeEvent } from 'react'
import { Button, Input } from '../ui'
import { Image } from 'lucide-react'

interface Props {
  file: File | string | null
  setChange: (file: File | string | null) => void
}

export function AppFileUpload({ file, setChange }: Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  // 1. 파일 변경 감지 및 상위 컴포넌트 전달
  const handleChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    setChange(event.target.files?.[0] ?? null)

    // 동일  파일 선택이 불가능할 수 있으므로 event.target.value를 초기화
    event.target.value = ''
  }
  // 2.이미지 미리보기
  const handleRenderPreview = () => {
    if (typeof file === 'string') {
      return (
        <img
          src={file}
          alt="@TUMBNAIL"
          className="w-full aspect-video rounded-lg object-cover border"
        />
      )
    } else if (file instanceof File) {
      return (
        <img
          src={URL.createObjectURL(file)}
          alt="TUUMBNAIL"
          className="w-full aspect-video rounded-lg object-cover border"
        />
      )
    }

    // 썸네일이 설정되지 않은 경우에는 기본 이미지 아이콘을 보여줍니다.
    return (
      <div className="w-full flex items-center justify-center aspect-video bg-card/50 rounded-lg">
        <Button
          size={'icon'}
          variant={'ghost'}
          onClick={() => fileInputRef.current?.click()}
        >
          <Image />
        </Button>
      </div>
    )
  }

  return (
    <>
      {handleRenderPreview()}
      <Input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleChangeFile}
      />
    </>
  )
}
