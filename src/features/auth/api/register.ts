import { toast } from 'sonner'
import { z } from 'zod'

import { registrationSchema } from '../model/registration-schema'
import supabase from '@/lib/supabase'

type RegistrationInput = z.infer<typeof registrationSchema>

export async function register(values: RegistrationInput) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password
    })

    if (error) {
      toast.error(error.message)
      return
    }

    if (data.user && data.session) {
      return data
    }
  } catch (error) {
    console.error(error)
    throw new Error(String(error))
  }
}
