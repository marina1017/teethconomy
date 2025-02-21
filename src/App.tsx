import React, { useState } from 'react'
import { useGameStore } from './store/gameStore'
import { useUIStore } from './store/uiStore'
import ResultPage from './pages/ResultPage'
import TeethVisualization from './components/TeethVisualization'
import DiagnosisModal from './components/DiagnosisModal'
import './App.scss'
import {
  DEFAULT,
  CHECKUP,
  CHECKUP_TOTAL_COST,
  GAME_PROGRESS_YEARS,
  FLOSS,
} from './constants/gameConstants'

function App() {
  const { state, nextDecade } = useGameStore()
  const { isModalOpen, openModal, closeModal, actionTaken, setActionTaken } =
    useUIStore()

  //定期検診時のモーダルの閉じるボタンが押されたとき
  const handleDiagnosisComplete = (cost: number, healthImpact: number) => {
    state.money = Math.max(0, state.money - cost)
    state.health = Math.max(0, state.health - healthImpact)
    closeModal()
    setActionTaken(false)
  }

  // 定期検診を受けたとき
  const handleCheckup = () => {
    nextDecade('checkup')
    openModal()
    setActionTaken(true)
  }

  // フロスか何もしないを選んだとき
  const handleActionSelection = (action: 'flossing' | 'nothing') => {
    nextDecade(action)
    setActionTaken(false)
  }

  return (
    <div className="app-container">
      {state.age >= DEFAULT.FINAL_AGE ? (
        <ResultPage />
      ) : (
        <div className="content">
          <div className="header">
            <h1 className="header-title">TeethConomy</h1>
            <h2 className="header-subtitle">
              ~歯の健康シミュレーションゲーム~
            </h2>
          </div>
          <div className="description">
            <p className="description-title">歯は一生のパートナー！</p>
            <p className="description-text">
              このゲームでは、日々の歯のケアが将来の健康や医療費にどれだけ影響するのかをシミュレーションできます。
              あなたの選択次第で、80歳になったときの歯の状態が大きく変わります。
              フロスを使う？ 定期検診を受ける？ それとも何もしない？
            </p>
            <p className="description-text">
              気をつけないと、将来、高額な治療費やインプラントが必要になるかも…？
              逆に、しっかりケアすれば、健康な歯で長く過ごせるはず！
            </p>
            <p className="description-text">
              さあ、あなたはどんな選択をしますか？
            </p>

            <p className="description-annotation">
              このコンテンツでは、定期検診を約{CHECKUP_TOTAL_COST}円(1回
              {CHECKUP.COST}円 年{CHECKUP.TIME}回 ×{GAME_PROGRESS_YEARS}
              年として)、虫歯の治療費を3000円、インプラントを30万として計算しています。
            </p>
          </div>

          <div className="stats">
            <div className="stats-item">
              <div className="stats-item-circle">
                <span className="stats-item-number">
                  {state.age}
                  <span className="stats-item-unit">歳</span>
                </span>
                <span
                  className="stats-item-progress"
                  style={
                    {
                      '--progress':
                        ((state.age - DEFAULT.AGE) /
                          (DEFAULT.FINAL_AGE - DEFAULT.AGE)) *
                        100,
                    } as React.CSSProperties
                  }
                ></span>
              </div>
              <span className="stats-item-label">現在の年齢</span>
            </div>
            <div className="stats-item">
              <div className="stats-item-circle">
                <span className="stats-item-number">
                  {state.money.toLocaleString()}
                  <span className="stats-item-unit">円</span>
                </span>
                <span
                  className="stats-item-progress"
                  style={
                    {
                      '--progress': (state.money / DEFAULT.MONEY) * 100,
                    } as React.CSSProperties
                  }
                ></span>
              </div>
              <span className="stats-item-label">貯金</span>
            </div>
            <div className="stats-item">
              <div className="stats-item-circle">
                <span className="stats-item-number">{state.health}</span>
                <span
                  className="stats-item-progress"
                  style={
                    {
                      '--progress': (state.health / DEFAULT.HEALTH) * 100,
                    } as React.CSSProperties
                  }
                ></span>
              </div>
              <span className="stats-item-label">健康スコア</span>
            </div>
          </div>
          <div className="teeth-container">
            <TeethVisualization health={state.health} />
          </div>
          <div className="action">
            <h3 className="action-title">
              次の{GAME_PROGRESS_YEARS}年の行動を選んでください
            </h3>
            {isModalOpen && (
              <DiagnosisModal onClose={handleDiagnosisComplete} />
            )}
            <div className="actions">
              <button
                className="actions-button checkup"
                onClick={handleCheckup}
                disabled={actionTaken || state.money < CHECKUP_TOTAL_COST}
              >
                定期検診を受ける ({CHECKUP_TOTAL_COST}万円)
              </button>
              <button
                className="actions-button electric-brush"
                onClick={() => handleActionSelection('flossing')}
                disabled={actionTaken || state.money < FLOSS.COST}
              >
                フロスを使って丁寧に磨く ({FLOSS.COST}円)
              </button>
              <button
                className="actions-button nothing"
                onClick={() => handleActionSelection('nothing')}
                disabled={actionTaken}
              >
                普段通り歯を磨く(0円)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
