import { create } from 'zustand'
import { GameState } from '../types/game'
import {
  DEFAULT,
  GAME_PROGRESS_YEARS,
  CHECKUP_COST,
  CHECKUP_HEALTH_BOOST,
  FLOSS_COST,
  FLOSS_HEALTH_BOOST,
  NO_ACTION_HEALTH_LOSS,
  DISEASE_RISK_FACTOR,
  TREATMENT_COST_LOW,
  TREATMENT_COST_HIGH,
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
        cost = CHECKUP_COST
        healthChange = CHECKUP_HEALTH_BOOST
      } else if (choice === 'flossing') {
        // フロスを使ってしっかり歯磨き
        cost = FLOSS_COST
        healthChange = FLOSS_HEALTH_BOOST
      } else {
        // 何もしない場合
        healthChange = -NO_ACTION_HEALTH_LOSS
      }

      // 病気のリスク
      let diseaseRisk =
        Math.max(0, (100 - store.state.health) / 100) * DISEASE_RISK_FACTOR
      if (choice === 'checkup') diseaseRisk *= 0.5
      if (choice === 'flossing') diseaseRisk *= 0.8

      // 病気のリスクによってコストがかかる
      if (Math.random() < diseaseRisk) {
        const treatmentConst =
          Math.random() < 0.5 ? TREATMENT_COST_LOW : TREATMENT_COST_HIGH
        cost += treatmentConst
      }

      return {
        state: {
          ...store.state,
          age: newAge,
          money: store.state.money - cost,
          health: Math.max(0, store.state.health + healthChange),
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
