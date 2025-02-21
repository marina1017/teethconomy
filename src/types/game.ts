export const LIFESTYLES = {
  CAREFUL: 'careful',
  NORMAL: 'normal',
  LAZY: 'lazy',
  AVOIDER: 'avoider',
} as const

export type BrushedToday = {
  morning: boolean
  afternoon: boolean
  night: boolean
}

export type GameState = {
  age: number // 現在の年齢(10歳刻みで進む)
  health: number //健康点 (0~100)
  money: number //貯金
  lifestyle: (typeof LIFESTYLES)[keyof typeof LIFESTYLES]
  yearlyExpenses: { year: number; cost: number }[] //年間の医療費
}
