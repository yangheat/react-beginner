import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// const useStore = create((set) => ({
//   bears: 0,
//   increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
//   removeAllBears: () => set({ bears: 0 }),
//   updateBears: (newBears) => set({ bears: newBears }),
// }))

/**
 * Zustand에서 persist 기능은 상태(state)를 브라우저 스토리지(LocalStorage, SessionStorage 등)에 저장해서
 * 페이지를 새로고침 하거나 브라우저를 닫았다가 다시 열어도 상태를 유지(persist)할 수 있게 하는 기능
 * 
 * Zustand는 리액트에서 사용하는 전역 상태 관리 라이브러리
 * persist 미들웨어 사용 시 Zustand store의 데이터를 브라우저 스토리지에 저장할 수 있음.
 * 이를 통해 상태를 유지할 수 있어 로그인 상태, 장바구니, 테마 설정 등 페이지를 새로고침해도 상태를 유지할 수 있음.
 */

interface User {
  id: string,
  email: string,
  role: string,
}

interface AuthStore {
  user: User,
  setUser: (newUser: User) => void,
  reset: () => void
}

export const useAuthStore = create<AuthStore>()(
  persist((set) => ({
    user: {
      id: '',
      email: '',
      role: '',
    },
    setUser: (newUser: User) => set({ user: newUser }),
    reset: () => {
      set({ user: { id: '', email: '', role: '' } })
      localStorage.removeItem('auth-storage')
    }
  }), { name: 'auth-storage' })
)