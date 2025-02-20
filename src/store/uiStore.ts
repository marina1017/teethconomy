import { create } from 'zustand'

interface UIState {
  isModalOpen: boolean
  actionTaken: boolean
  openModal: () => void
  closeModal: () => void
  setActionTaken: (value: boolean) => void
}

export const useUIStore = create<UIState>(set => ({
  isModalOpen: false,
  actionTaken: false,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
  setActionTaken: value => set({ actionTaken: value }),
}))
