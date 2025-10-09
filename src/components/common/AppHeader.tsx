import { NavLink, useNavigate } from 'react-router'
import { Separator } from '../ui'
import { useAuthStore } from '@/stores'

function AppHeader() {
  const navigator = useNavigate()
  const email = useAuthStore((state) => state.email)

  const handleLogout = useAuthStore((state) => state.reset)

  return (
    <header className="fixed top-0 z-10  w-full flex items-center justify-center bg-[#121212]">
      <div className="w-full max-w-[1328px] flex items-center justify-between px-6 py-3">
        {/* 로고 & 네비게이션 메뉴 UI */}
        <div className="flex items-center gap-5">
          <img
            src="https://github.com/yangheat.png"
            alt="@LOGO"
            className="w-6 h-6 cursor-pointer"
            onClick={() => navigator('/')}
          />
          <div className="flex items-center gap-5">
            <div className="font-semibold">토픽 인사이트</div>
            <Separator orientation="vertical" className="!h-4" />
            <div className="font-semibold">프로필</div>
          </div>
        </div>
        {/* 로그인 UI */}
        {email ? (
          <div className="flex gap-5">
            <span>${email}</span>
            <Separator orientation="vertical" className="!h-4" />
            <span className="cursor-pointer" onClick={handleLogout}>
              로그아웃
            </span>
          </div>
        ) : (
          <NavLink to={'sign-in'}>로그인</NavLink>
        )}
      </div>
    </header>
  )
}

export { AppHeader }
