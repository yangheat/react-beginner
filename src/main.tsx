import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import { ThemeProvider } from './components/theme-provider.tsx'

import RootLayout from './pages/layout.tsx' // 전역 레이아웃 컴포넌트
import App from './pages' // 메인 페이지
import Signup from './pages/sign-up' // 회원 가입 페이지
import Signin from './pages/sign-in' // 로그인 페이지
import CreateTopic from './pages/topics/[id]/create.tsx' // 토픽 생성 페이지
import './index.css'
import { Toaster } from './components/ui'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route element={<RootLayout />}>
            <Route index element={<App />} />
            <Route path="sign-up" element={<Signup />} />
            <Route path="sign-in" element={<Signin />} />
            <Route path="topics/:id/create" element={<CreateTopic />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster richColors position="top-center" />
    </ThemeProvider>
  </StrictMode>
)
