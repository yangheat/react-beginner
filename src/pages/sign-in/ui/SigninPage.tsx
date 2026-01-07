import { GoogleSignInButton, SignInForm, useCheckSession } from '@/features/auth'

export function SignInPage() {
  const { isChecking } = useCheckSession()

  if (isChecking) {
    return null
  }

  return (
    <main className="w-full h-full min-h-[720px] flex items-center justify-center p-6 gap-6">
      <div className="w-100 max-w-100 flex flex-col px-6 gap-6">
        <div className="flex flex-col">
          <h4 className="scroll-m-20 text-xl font-semibold traking-tight">
            로그인
          </h4>
          <p className="text-muted-foreground">
            로그인을 위한 정보를 입력해주세요
          </p>
        </div>
        <div className="grid gap-3">
          <GoogleSignInButton />
          {/* 경계선 */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t"></span>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 text-muted-foreground bg-black uppercase">
                OR CONTINUE WITH
              </span>
            </div>
          </div>
          <SignInForm />
        </div>
      </div>
    </main>
  )
}
