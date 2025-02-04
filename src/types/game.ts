export type BrushedToday = {
  morning: boolean
  afternoon: boolean
  night: boolean
}

export type GameState = {
  day: number //日数
  health: number //健康点
  money: number //医療費
  choices: string[] //選択肢
  brushedToday: BrushedToday
}
