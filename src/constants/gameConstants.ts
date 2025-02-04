//歯磨きの磨き方の効果
export const BRUSH_EFFECTS = {
  LOW: 2, // 適当に磨いた場合
  MEDIUM: 5, // そこそこに磨いた場合
  HIGH: 10, // 完璧に磨いた場合
}

// 磨き方の確率(ゲーム前のアンケートによって確立をかえてもいいかも？)
// よく歯磨き指導されるとかで適当に磨く確立をあげちゃうとか
export const BRUSH_PROBABILITIES = {
  LOW: 0.3, //適当に磨く確立
  MEDIUM: 0.7, //そこそこ磨く確立
}

// ペナルティ
export const PENALTIES = {
  NO_BRUSHING: -7, // 磨かなかった場合の健康減少
  SUGAR_INTAKE: -10, // 甘いものを食べた場合
}

//加算項目
export const REWARDS = {
  DENTIST_VISIT: 20, // 歯医者に行くと回復
}
