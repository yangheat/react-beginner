import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useAuthStore } from '@/stores'
import supabase from '@/lib/supabase'

export default function AuthCallback() {
  const navigator = useNavigate()
  const setUser = useAuthStore((state) => state.setUser)

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (!session?.user) {
          console.error('세션에 사용자 정보가 없습니다.')
          return
        }

        const user = session.user

        if (!user.id) {
          console.log('유저 ID가 없습니다.')
          return
        }

        try {
          let { data: existing, error: selectError } = await supabase
            .from('user')
            .select('id')
            .eq('id', user.id)
            .single()

          if (!existing) {
            const { error: insertError } = await supabase
              .from('서비스 사용자(유저)')
              .insert([
                {
                  id: user.id,
                  email: user.email,
                  service_agreed: true,
                  privacy_agreed: true,
                  marketing_agreed: false
                }
              ])

            if (insertError) {
              console.error('User 테이블 삽입 중 에러가 발생하였습니다.')
              return
            }
          }
          setUser({
            id: user.id,
            email: user.email || '알 수 없는 사용자',
            role: user.role || ''
          })
          navigator('/')
        } catch (error) {
          console.error(error)
        }
      }
    )

    // 언마운트 시, 구독 해지
    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])
  return (
    <main className="w-full h-full min-h-[720px] flex items-center justify-center">
      로그인을 진행 중입니다.
    </main>
  )
}
