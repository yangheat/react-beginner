import { NavLink, useNavigate } from 'react-router'
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input
} from '@/components/ui'

import { routes } from '@/shared/config/routes.config'
import { useForm } from 'react-hook-form'
import type z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuthStore } from '@/stores'
import { login } from '../../api/login'
import { toast } from 'sonner'
import { SignInData } from '../../model/signIn-schema'

export function SignInForm() {
  const navigate = useNavigate()
  const form = useForm<z.infer<typeof SignInData>>({
    resolver: zodResolver(SignInData),
    defaultValues: {
      email: '',
      password: ''
    }
  })
  const setUser = useAuthStore((state) => state.setUser)

  const onSubmit = async (values: z.infer<typeof SignInData>) => {
    // const { user, session } = await login(values)
    const result = await login(values)

    if (result) {
      setUser({
        id: result.id,
        email: result.email as string,
        role: result.role as string
      })

      toast.success('로그인에 성공하였습니다.')
      navigate(routes.home)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>이메일</FormLabel>
              <FormControl>
                <Input placeholder="이메일을 입력하세요." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>비밀번호</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="비밀번호을 입력하세요."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full flex flex-col gap-3">
          <Button
            type="submit"
            variant={'outline'}
            className="flex-1 bg-sky-800!"
          >
            로그인
          </Button>
          <div className="text-center">
            계정이 없으신가요?
            <NavLink to={routes.signUp} className="underline ml-1">
              회원가입
            </NavLink>
          </div>
        </div>
      </form>
    </Form>
  )
}
