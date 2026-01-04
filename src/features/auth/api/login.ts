import type z from "zod";
import { toast } from "sonner";

import supabase from "@/lib/supabase";
import type { SignInData } from "../model/signIn-schema";


export async function login({ email, password }: z.infer<typeof SignInData>) {
  try {
    const { data: { user, session }, error } = await supabase.auth.signInWithPassword({
      email, password

    })
    if (error) {
      toast.error(error.message)
      return
    }

    if (user && session) {
      return user
    }
  } catch (error) {
    console.log(error)
    throw new Error(`${error}`)
  }
}