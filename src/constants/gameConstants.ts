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
  MONEY: 500000, //デフォルト100万
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

//　フロスを使って丁寧に磨く
export const FLOSS_COST = 5000

// フロスを使うことでアップする健康スコア
export const FLOSS_HEALTH_BOOST = 3

// 普段通り歯を磨く場合の変更スコアの減少量
export const NO_ACTION_HEALTH_LOSS = 10

// 変更を害するリスクの確率
export const DISEASE_RISK_FACTOR = 10

//
export const TREATMENT_COST_LOW = 3000

export const TREATMENT_COST_HIGH = 10000

// 診察時の選択肢
export const DIAGNOSIS_RESULTS = [
  { message: '虫歯なし！！', cost: 0, healthImpact: 0, baseProbability: 0.4 },
  {
    message: '虫歯あった・・・治療費3万円',
    cost: 30000,
    healthImpact: 5,
    baseProbability: 0.3,
  },
  {
    message: '歯周病が進行しています 治療費10万円',
    cost: 100000,
    healthImpact: 10,
    baseProbability: 0.2,
  },
  {
    message: '歯を失いました インプラント費用30万円',
    cost: 300000,
    healthImpact: 50,
    baseProbability: 0.1,
  },
] as const
