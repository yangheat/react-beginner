import { NavLink } from 'react-router'
import { Separator } from '../ui'

function AppHeader() {
  return (
    <header className="fixed top-0 z-10  w-full flex items-center justify-center bg-[#121212]">
      <div className="w-full max-w-[1328px] flex items-center justify-between px-6 py-3">
        {/* 로고 & 네비게이션 메뉴 UI */}
        <div className="flex items-center gap-5">
          <img
            src="https://github.com/yangheat.png"
            alt="@LOGO"
            className="w-6 h-6 cursor-pointer"
          />
          <div className="flex items-center gap-5">
            <div className="font-semibold">토픽 인사이트</div>
            <Separator orientation="vertical" className="!h-4" />
            <div className="font-semibold">프로필</div>
          </div>
        </div>
        {/* 로그인 UI */}
        <NavLink to={'sign-in'}>로그인</NavLink>
      </div>
    </header>
  )
}

export { AppHeader }
