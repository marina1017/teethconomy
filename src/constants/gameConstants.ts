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
  FINAL_AGE: 80,
  HEALTH: 100,
  MONEY: 500000, //デフォルト100万
  LIFE_STYLE: LIFE_STYLE.NORMAL,
}

/////////////////////////////
// ゲーム自体の設定
/////////////////////////////

// 何年おきに選択が発生するか
export const GAME_PROGRESS_YEARS = 5

// 定期検診
export const CHECKUP = {
  COST: 3000,
  TIME: 4,
  HEALTH_BOOST: 3,
}
// 定期検診にかかる値段(年４回)
export const CHECKUP_TOTAL_COST =
  CHECKUP.COST * CHECKUP.TIME * GAME_PROGRESS_YEARS

// フロス
export const FLOSS = {
  COST: 5000,
  HEALTH_BOOST: 2,
}

// 普段通り歯を磨く場合の変更スコアの減少量
export const NO_ACTION_HEALTH_LOSS = 10

// 診察時の設定
export const DIAGNOSIS_TYPE = {
  HEALTHY: 'healthy',
  CAVITY: 'cavity',
  PERIODONTITIS: 'periodontitis',
  IMPLANT: 'implant',
} as const

export type DiagnosisType = (typeof DIAGNOSIS_TYPE)[keyof typeof DIAGNOSIS_TYPE]

export const DIAGNOSIS_RESULTS: Record<DiagnosisType, DiagnosisResult> = {
  [DIAGNOSIS_TYPE.HEALTHY]: {
    message: '虫歯なし！！',
    cost: 0,
    healthImpact: 0,
    baseProbability: 0.4,
  },
  [DIAGNOSIS_TYPE.CAVITY]: {
    message: '虫歯があった・・・治療費3万円',
    cost: 30000,
    healthImpact: 5,
    baseProbability: 0.3,
  },
  [DIAGNOSIS_TYPE.PERIODONTITIS]: {
    message: '歯周病が進行しています 治療費10万円',
    cost: 100000,
    healthImpact: 10,
    baseProbability: 0.2,
  },
  [DIAGNOSIS_TYPE.IMPLANT]: {
    message: '歯を失いました インプラント費用30万円',
    cost: 300000,
    healthImpact: 50,
    baseProbability: 0.1,
  },
} as const
