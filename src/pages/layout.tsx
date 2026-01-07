import { Outlet } from 'react-router'
import { AppFooter, AppHeader } from '../components/common'
import { useAuthListener } from '@/features/auth'

export default function RootLayout() {
  useAuthListener()

  return (
    <div className="page">
      <AppHeader />
      <div className="container">
        <Outlet />
      </div>
      <AppFooter />
    </div>
  )
}
