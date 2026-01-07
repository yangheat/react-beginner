import { z } from 'zod'
import { email, password } from '@/shared/config/zod.config'

export const registrationSchema = z
  .object({
    email,
    password,
    confirmPassword: password
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword']
  })
