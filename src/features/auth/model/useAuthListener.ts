import { useEffect } from 'react'

import supabase from '@/lib/supabase'
import { useAuthStore } from '@/entities/user/model/auth-store'

export function useAuthListener() {
  const setUser = useAuthStore((state) => state.setUser)

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session }
      } = await supabase.auth.getSession()

      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email as string,
          role: session.user.role as string
        })
      }
    }

    checkSession()

    // 실시간 상태 변화 감지
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email as string,
          role: session.user.role as string
        })
      } else {
        setUser(null)
      }
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [setUser])
}
