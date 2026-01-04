import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router'
import { toast } from 'sonner'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { ArrowLeft, Asterisk, ChevronRight } from 'lucide-react'

import {
  Button,
  Checkbox,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Label
} from '@/components/ui'

import { routes } from '@/shared/config/routes.config'
import { registrationData } from '../../model/registration-schema'
import { register } from '../../api/register'

export function SignUpForm() {
  const navigate = useNavigate()
  const form = useForm<z.infer<typeof registrationData>>({
    resolver: zodResolver(registrationData),
    defaultValues: { email: '', password: '', confirmPassword: '' }
  })

  const [serviceAgreed, setServiceAgreed] = useState<boolean>(false) // 서비스 이용약관 동의 여부
  const [privacyAgreed, setPrivacyAgreed] = useState<boolean>(false) // 개인정보 수집 및 이용약관 동의 여부
  const [marketingAgreed, setMarketingAgreed] = useState<boolean>(false) // 마케팅 및 광고 수신약관 동의 여부

  async function onSubmit(values: z.infer<typeof registrationData>) {
    if (!serviceAgreed || !privacyAgreed) {
      // 경고 메시지 - Toast UI 발생
      toast.warning('필수 동의항목을 선택해주세요.')
      return
    }

    const result = await register(values)

    if (result) {
      toast.success('회원가입을 완료하였습니다.')
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
              <FormLabel>
                <Asterisk size={14} className="text-[#F96859]" />
                이메일
              </FormLabel>
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
              <FormLabel>
                <Asterisk size={14} className="text-[#F96859]" />
                비밀번호
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="비밀번호를 입력하세요."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Asterisk size={14} className="text-[#F96859]" />
                비밀번호 확인
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="비밀번호 확인을 입력하세요."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid gap-2">
          <div className="grid gap-2">
            <div className="flex items-center gap-1">
              <Asterisk size={14} className="text-[#F96859]" />
              <Label>필수 동의항목</Label>
            </div>
            <div>
              <div className="w-full flex justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={serviceAgreed}
                    onCheckedChange={() => setServiceAgreed((cur) => !cur)}
                  />
                  서비스 이용약관 동의
                </div>
                <Button variant={'link'} className="p-0! gap-1">
                  <p className="text-sm">자세히</p>
                  <ChevronRight />
                </Button>
              </div>
              <div className="w-full flex justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={privacyAgreed}
                    onCheckedChange={() => setPrivacyAgreed((cur) => !cur)}
                  />
                  개인정보 수집 및 이용약관 동의
                </div>
                <Button variant={'link'} className="p-0! gap-1">
                  <p className="text-sm">자세히</p>
                  <ChevronRight />
                </Button>
              </div>
            </div>
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label>선택 동의항목</Label>
            </div>
            <div>
              <div className="w-full flex justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={marketingAgreed}
                    onCheckedChange={() => setMarketingAgreed((cur) => !cur)}
                  />
                  마케팅 및 광고 수신 동의
                </div>
                <Button variant={'link'} className="p-0! gap-1">
                  <p className="text-sm">자세히</p>
                  <ChevronRight />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col gap-3">
          <div className="flex gap-2">
            <Button type="button" variant={'outline'} size={'icon'}>
              <ArrowLeft />
            </Button>
            <Button
              type="submit"
              variant={'outline'}
              className="flex-1 bg-sky-800/50!"
            >
              회원가입
            </Button>
          </div>
          <div className="text-center">
            이미 계정이 있으신가요?
            <NavLink to={routes.signIn} className="underline">
              로그인
            </NavLink>
          </div>
        </div>
      </form>
    </Form>
  )
}
