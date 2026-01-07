import { z } from 'zod'
import { email, password } from '@/shared/config/zod.config'

export const signInSchema = z.object({ email, password })
