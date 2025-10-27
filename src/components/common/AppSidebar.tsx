import { ChevronDown } from 'lucide-react'
import { Button } from '../ui'
import { CLASS_CATEGORY } from '@/constants/category.constant'

interface Props {
  category: string
  setCategory: (value: string) => void
}

export function AppSidebar({ category, setCategory }: Props) {
  return (
    <aside className="min-w-60 w-60 flex flex-col gap-6">
      <div className="flex items-center gap-2">
        {/* Shadcn UI의 Typography h4 컴포넌트를 그대로 사용 */}
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          카테고리
        </h4>
        <ChevronDown className="mt-1" />
      </div>
      <div className="w-full flex flex-col gap-2">
        {CLASS_CATEGORY.map((menu) => (
          <Button
            key={menu.id}
            variant={'ghost'}
            className={`justify-start text-muted-foreground hover:text-white hover:pl-6 transition-all duration-500 ${
              category === menu.category && 'text-foreground !pl-6 bg-accent/50'
            }`}
            onClick={() => setCategory(menu.category)}
          >
            {menu.icon}
            {menu.label}
          </Button>
        ))}
      </div>
    </aside>
  )
}
