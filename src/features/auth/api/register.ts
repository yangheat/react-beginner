import type z from "zod"
import { toast } from "sonner"

import supabase from "@/lib/supabase"
import type { registrationData } from "../model/registration-schema"

export async function register(values: z.infer<typeof registrationData>) {
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
    console.log(error)
    throw new Error(`${error}`)
  }
}