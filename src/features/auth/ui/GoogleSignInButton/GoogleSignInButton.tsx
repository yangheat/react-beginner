import { Button } from '@/components/ui'
import { googleSignIn } from '../../api/googleSignIn'

export function GoogleSignInButton() {
  return (
    <Button type="button" variant={'secondary'} onClick={googleSignIn}>
      <img
        src="/assets/icons/social/google.svg"
        alt="@GOOGLE_LOGO"
        className="w-[18px] h-[18px] ml-1"
      />
      구글 로그인
    </Button>
  )
}
