import { useNavigate } from "react-router"

import { useAuthStore } from "@/entities/user/model/auth-store"
import { routes } from "@/shared/config/routes.config"
import supabase from "@/lib/supabase"
import { useEffect, useState } from "react"

export function useCheckSession() {
  const [isChecking, setIsChecking] = useState(true)
  const setUser = useAuthStore((state) => state.setUser)
  const navigate = useNavigate()

  useEffect(() => {
    let isMounted = true

    const checkSession = async () => {
      try {
        const {
          data: { session }
        } = await supabase.auth.getSession()

        if (!isMounted) return

        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email as string,
            role: session.user.role as string
          })

          navigate(routes.home)
        }
      } finally {
        if (isMounted) setIsChecking(false)
      }
    }

    checkSession()

    return () => {
      isMounted = false
    }
  }, [navigate, setUser])

  return { isChecking }
}