import { create } from 'zustand'
import { GameState } from '../types/game'

type GameStore = {
  state: GameState
  updateHealth: (value: number) => void
  updateMoney: (value: number) => void
  nextDay: () => void
}

export const useGameStore = create<GameStore>(set => ({
  state: {
    day: 1,
    health: 100,
    money: 5000,
    choices: [],
  },
  updateHealth: value =>
    set(store => ({
      state: { ...store.state, health: store.state.health + value },
    })),
  updateMoney: value =>
    set(store => ({
      state: { ...store.state, money: store.state.money + value },
    })),
  nextDay: () =>
    set(store => ({
      state: { ...store.state, day: store.state.day + 1 },
    })),
}))
