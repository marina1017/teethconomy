export type BrushedToday = {
  morning: boolean
  afternoon: boolean
  night: boolean
}

export type GameState = {
  age: number // 現在の年齢(10歳刻みで進む)
  health: number //健康点 (0~100)
  money: number //貯金
  lifestyle: 'careful' | 'normal' | 'lazy' | 'avoider' //歯磨きライフスタイル
  yearlyExpenses: { year: number; cost: number }[] //年間の医療費
}
