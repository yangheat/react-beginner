import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

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
import {
  ArrowLeft,
  Asterisk,
  ChevronRight,
  EyeOff,
  MoveLeft
} from 'lucide-react'
import { NavLink } from 'react-router'
import { useState } from 'react'

const formSchema = z
  .object({
    email: z.email({
      error: '올바른 형식의 이메일을 주소를 입력해주세요.'
    }),
    password: z.string().min(8, {
      error: '비밀번호는 최소 8자 이상이어야 합니다.'
    }),
    confirmPassword: z.string().min(8, {
      error: '비밀번호 확인을 입력해주세요.'
    })
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        message: '비밀번호가 일치하지 않습니다.',
        path: ['confirmPassword']
      })
    }
  })

export default function Signup() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '', password: '', confirmPassword: '' }
  })

  const [serviceAgreed, setServiceAgreed] = useState<boolean>(false) // 서비스 이용약관 동의 여부
  const [privacyAgreed, setPrivacyAgreed] = useState<boolean>(false) // 개인정보 수집 및 이용약관 동의 여부
  const [marketingAgreed, setMarketingAgreed] = useState<boolean>(false) // 마케팅 및 광고 수신약관 동의 여부

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <main className="w-full h-full min-h-[720px] flex items-start justify-center p-6 gap-6">
      <div className="w-100 max-w-100 flex flex-col px-6 gap-6">
        <div className="flex flex-col">
          <h4 className="scroll-m-20 text-xl font-semibold traking-tight">
            회원가입
          </h4>
          <p className="text-muted-foreground">
            회원가입을 위한 정보를 입력해주세요.
          </p>
        </div>
        <div className="grid gap-3">
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
                      <Input placeholder="비밀번호를 입력하세요." {...field} />
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
                          onCheckedChange={() =>
                            setServiceAgreed((cur) => !cur)
                          }
                        />
                        서비스 이용약관 동의
                      </div>
                      <Button variant={'link'} className="!p-0 gap-1">
                        <p className="text-sm">자세히</p>
                        <ChevronRight />
                      </Button>
                    </div>
                    <div className="w-full flex justify-between">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          checked={privacyAgreed}
                          onCheckedChange={() =>
                            setPrivacyAgreed((cur) => !cur)
                          }
                        />
                        개인정보 수집 및 이용약관 동의
                      </div>
                      <Button variant={'link'} className="!p-0 gap-1">
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
                          onCheckedChange={() =>
                            setMarketingAgreed((cur) => !cur)
                          }
                        />
                        마케팅 및 광고 수신 동의
                      </div>
                      <Button variant={'link'} className="!p-0 gap-1">
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
                    className="flex-1 !bg-sky-800/50"
                  >
                    회원가입
                  </Button>
                </div>
                <div className="text-center">
                  이미 계정이 있으신가요?
                  <NavLink to={'/sign-in'} className="underline">
                    로그인
                  </NavLink>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </main>
  )
}
