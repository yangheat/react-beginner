import { toast } from "sonner"
import supabase from "@/lib/supabase"

export async function googleSignIn() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      // 약관동의 확인을 보이게 할지 확인
      queryParams: { access_type: 'offline', prompt: 'consent' },
      // 로그인 후 돌아올 URL https://your-service-domain.com
      redirectTo: `${import.meta.env.VITE_SUPABASE_BASE_URL}/auth/callbacak`
    }
  })

  if (error) {
    toast.error(error.message)
    return
  }
}