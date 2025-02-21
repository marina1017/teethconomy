// ゲームの設定

/////////////////////////////
// 初期値の設定
/////////////////////////////
export const LIFE_STYLE = {
  HEALTHY: 'healthy',
  NORMAL: 'normal',
  UNHEALTHY: 'unhealthy',
}

export const DEFAULT = {
  AGE: 20, // 一旦二十歳スタートで、10歳スタートにして歯科検診みたいなのでもいいかも
  HEALTH: 100,
  MONEY: 1000000, //デフォルト100万
  LIFE_STYLE: LIFE_STYLE.NORMAL,
}

/////////////////////////////
// ゲーム自体の設定
/////////////////////////////

// 何年おきに選択が発生するか
export const GAME_PROGRESS_YEARS = 5

// 定期検診にかかる値段(年４回)
export const CHECKUP_COST = 3000 * 4 * GAME_PROGRESS_YEARS

// 定期検診でアップする健康スコア
export const CHECKUP_HEALTH_BOOST = 10

// 何もしない場合の変更スコアの減少量
export const NO_ACTION_HEALTH_LOSS = 10

// 変更を害するリスクの確率
export const DISEASE_RISK_FACTOR = 10

//
export const TREATMENT_COST_LOW = 3000

export const TREATMENT_COST_HIGH = 100000

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

// 虫歯
// 虫歯リスクの発生する閾値
export const CAVITY_RISK_THRESHOLD = 50

// 虫歯の発生確立
export const CAVITY_PROBABILITY = {
  LOW: 0.1,
  HIGH: 0.4,
}

// 虫歯の影響
export const CAVITY_EFFECTS = {
  HEALTH_LOSS: -15, // 虫歯になった場合の健康減少
  MONEY_LOSS: -3000, // 治療費（お金の減少）
}
