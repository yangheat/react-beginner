import z from "zod";

export const email = z.email({
  error: '올바른 형식의 이메일을 주소를 입력해주세요.'
})

export const password = z.string().min(8, {
  error: '비밀번호는 최소 8자 이상이어야 합니다.'
})