import { z } from 'zod'
import { toast } from 'sonner'

import { signInSchema } from '../model/signIn-schema'
import supabase from '@/lib/supabase'

type SignInInput = z.infer<typeof signInSchema>

export async function login({ email, password }: SignInInput) {
  try {
    const {
      data: { user, session },
      error
    } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      toast.error(error.message)
      return
    }

    if (user && session) {
      return user
    }
  } catch (error) {
    console.error(error)
    throw new Error(String(error))
  }
}
