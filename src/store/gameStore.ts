import { create } from 'zustand'
import { GameState } from '../types/game'
import {
  BRUSH_EFFECTS,
  BRUSH_PROBABILITIES,
  PENALTIES,
  CAVITY_EFFECTS,
  CAVITY_PROBABILITY,
  CAVITY_RISK_THRESHOLD,
} from '../constants/gameConstants'

type GameStore = {
  // ゲームの状態のstate
  state: GameState
  // UIの状態管理
  isResultPage: boolean
  setIsResultPage: (value: boolean) => void
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
    brushedToday: { morning: false, afternoon: false, night: false },
    yearlyExpenses: [],
  },
  isResultPage: false,
  setIsResultPage: value => set({ isResultPage: value }),
  updateHealth: value =>
    set(store => ({
      state: { ...store.state, health: store.state.health + value },
    })),
  updateMoney: value =>
    set(store => ({
      state: { ...store.state, money: store.state.money + value },
    })),
  nextDay: () => {
    set(store => {
      const newDay = store.state.day + 1
      const newExpenses =
        newDay % 365 === 0
          ? [
              ...store.state.yearlyExpenses,
              { year: newDay / 365, cost: Math.random() * 10000 },
            ]
          : store.state.yearlyExpenses
      const { morning, afternoon, night } = store.state.brushedToday
      let healthPenalty = 0
      let cavityEvent = ''

      // 次の日を押したら一回も磨かなかった場合のペナルティを計算
      if (!morning && !afternoon && !night) {
        healthPenalty = PENALTIES.NO_BRUSHING // 1回も磨かなかったらペナルティ
      }

      // 次の日を押したら虫歯チェックをする
      const cavityRoll = Math.random()
      //   歯の健康が閾値以下だったら虫歯の確立が変わる
      const cavityChance =
        store.state.health < CAVITY_RISK_THRESHOLD
          ? CAVITY_PROBABILITY.HIGH
          : CAVITY_PROBABILITY.LOW

      if (cavityRoll < cavityChance) {
        // 虫歯によってさらに歯の健康が減る
        healthPenalty += CAVITY_EFFECTS.HEALTH_LOSS
        // 虫歯によってさらにお金も減る
        store.state.money += CAVITY_EFFECTS.MONEY_LOSS
        cavityEvent = `⚠️ 虫歯になりました！（-${CAVITY_EFFECTS.HEALTH_LOSS}健康, -${CAVITY_EFFECTS.MONEY_LOSS}円）`
      }

      return {
        state: {
          ...store.state,
          day: store.state.day + 1,
          health: Math.max(0, store.state.health + healthPenalty),
          money: Math.max(0, store.state.money),
          choices: [
            ...store.state.choices,
            `Next day (${healthPenalty} health penalty)`,
            cavityEvent,
          ].filter(Boolean),
          brushedToday: { morning: false, afternoon: false, night: false },
          yearlyExpenses: newExpenses,
        },
      }
    })
  },

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
          brushedToday: { ...store.state.brushedToday, [time]: true },
        },
      }
    }),
}))
