import { AppFooter, AppHeader } from './components/common'
import { ThemeProvider } from './components/theme-provider'

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="page">
        <AppHeader />
        <div className="contanier"></div>
        <AppFooter />
      </div>
    </ThemeProvider>
  )
}
