import { create } from 'zustand'
import { GameState } from '../types/game'
import { BRUSH_EFFECTS, BRUSH_PROBABILITIES } from '../constants/gameConstants'

type GameStore = {
  state: GameState
  updateHealth: (value: number) => void
  updateMoney: (value: number) => void
  nextDay: () => void
  brushTeeth: (time: 'morning' | 'afternoon' | 'night') => void
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
  brushTeeth: time =>
    set(store => {
      // 歯磨きの出来具合をランダムで決定させる
      const roll = Math.random()
      //   歯磨きの効果
      let effect = 0

      if (roll < BRUSH_PROBABILITIES.LOW) {
        // 適当に磨いた場合
        effect = BRUSH_EFFECTS.LOW
      } else if (roll < BRUSH_PROBABILITIES.MEDIUM) {
        // そこそこ磨けた
        effect = BRUSH_EFFECTS.MEDIUM
      } else {
        // 完璧に磨けた
        effect = BRUSH_EFFECTS.HIGH
      }

      // 選択肢を記録する
      const newChoices = [
        ...store.state.choices,
        `Brushed teeth in the ${time}`,
      ]
      return {
        state: {
          ...store.state,
          health: Math.min(100, store.state.health + effect),
          choices: newChoices,
        },
      }
    }),
}))
