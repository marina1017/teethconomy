import { create } from 'zustand'
import { GameState } from '../types/game'
import {
  DEFAULT,
  GAME_PROGRESS_YEARS,
  CHECKUP,
  CHECKUP_TOTAL_COST,
  FLOSS,
  NO_ACTION_HEALTH_LOSS,
} from '../constants/gameConstants'

type GameStore = {
  // ゲームの状態のstate
  state: GameState
  // UIの状態管理
  isResultPage: boolean
  setIsResultPage: (value: boolean) => void
  updateHealth: (value: number) => void
  updateMoney: (value: number) => void
  nextDecade: (choice: 'checkup' | 'flossing' | 'nothing') => void
}

export const useGameStore = create<GameStore>(set => ({
  state: {
    age: DEFAULT.AGE, // 一旦二十歳スタートで、10歳スタートにして歯科検診みたいなのでもいいかも
    health: DEFAULT.HEALTH, // 健康度はmaxからスタート
    money: DEFAULT.MONEY, // 貯金
    lifestyle: DEFAULT.LIFE_STYLE, // 選択肢によっては変化するかも？
    yearlyExpenses: [],
  },
  isResultPage: false,
  setIsResultPage: value => set({ isResultPage: value }),
  nextDecade: (choice: 'checkup' | 'flossing' | 'nothing') =>
    set(store => {
      const newAge = store.state.age + GAME_PROGRESS_YEARS
      let cost = 0
      let healthChange = 0

      if (choice === 'checkup') {
        // 検診費用
        cost = CHECKUP_TOTAL_COST
        healthChange = CHECKUP.HEALTH_BOOST
      } else if (choice === 'flossing') {
        // フロスを使ってしっかり歯磨き
        cost = FLOSS.COST
        healthChange = FLOSS.HEALTH_BOOST
      } else {
        // 何もしない場合
        healthChange = -NO_ACTION_HEALTH_LOSS
      }

      return {
        state: {
          ...store.state,
          age: newAge,
          money: store.state.money - cost,
          health: Math.max(0, Math.min(100, store.state.health + healthChange)),
          yearlyExpenses: [
            ...store.state.yearlyExpenses,
            { year: newAge, cost },
          ],
        },
      }
    }),
  updateHealth: value =>
    set(store => ({
      state: { ...store.state, health: store.state.health + value },
    })),
  updateMoney: value =>
    set(store => ({
      state: { ...store.state, money: store.state.money + value },
    })),
}))
