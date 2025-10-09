import { create } from 'zustand'

// const useStore = create((set) => ({
//   bears: 0,
//   increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
//   removeAllBears: () => set({ bears: 0 }),
//   updateBears: (newBears) => set({ bears: newBears }),
// }))

interface AuthStore {
  id: string,
  email: string,
  role: string,
  setId: (newId: string) => void,
  setEmail: (newEmail: string) => void,
  setRole: (newRole: string) => void,
  reset: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  id: '',
  email: '',
  role: '',

  setId: (newId) => set({ id: newId }),
  setEmail: (newEmail) => set({ email: newEmail }),
  setRole: (newRole) => set({ role: newRole }),

  reset: () => set({ id: '', email: '', role: '' })
}))