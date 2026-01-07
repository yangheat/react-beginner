import { SignUpForm, useCheckSession } from '@/features/auth'

export function SignUpPage() {
  const { isChecking } = useCheckSession()

  if (isChecking) {
    return null
  }

  return (
    <main className="w-full h-full min-h-[720px] flex items-center justify-center p-6 gap-6">
      <div className="w-100 max-w-100 flex flex-col px-6 gap-6">
        <div className="flex flex-col">
          <h4 className="scroll-m-20 text-xl font-semibold traking-tight">
            회원가입
          </h4>
          <p className="text-muted-foreground">
            회원가입을 위한 정보를 입력해주세요.
          </p>
        </div>
        <div className="grid gap-3">
          <SignUpForm />
        </div>
      </div>
    </main>
  )
}
