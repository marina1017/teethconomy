import React, { useState } from 'react'
import { useGameStore } from './store/gameStore'
import ResultPage from './pages/ResultPage'
import TeethVisualization from './components/TeethVisualization'
import DiagnosisModal from './components/DiagnosisModal'
import './App.scss'

function App() {
  const { state, nextDecade } = useGameStore()
  // 診察時のモーダル
  const [isModalOpen, setIsModalOpen] = useState(false)
  // モーダル表示時に行動を制御
  const [actionTaken, setActionTaken] = useState(false)

  //定期検診時のモーダルの閉じるボタンが押されたとき
  const handleDiagnosisComplete = (cost: number, healthImpact: number) => {
    state.money = Math.max(0, state.money - cost)
    state.health = Math.max(0, state.health - healthImpact)
    setActionTaken(false)
  }

  // 定期検診を受けたとき
  const handleCheckup = () => {
    nextDecade('checkup')
    setIsModalOpen(true)
    setActionTaken(true)
  }

  // 電動歯ブラシか何もしないを選んだとき
  const handleActionSelection = (action: 'electricBrush' | 'nothing') => {
    nextDecade(action)
    // setActionTaken(true)
  }

  return (
    <div className="app-container">
      {state.age >= 80 ? (
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
              このコンテンツでは、定期検診を約3000円、虫歯の治療費を3000円、インプラントを30万として計算しています
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
                      '--progress': ((state.age - 20) / (80 - 20)) * 100,
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
                      '--progress': (state.money / 100000) * 100,
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
                      '--progress': (state.health / 100) * 100,
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
            <h3 className="action-title">次の10年の行動を選んでください</h3>
            <div className="actions">
              <button
                className="actions-button checkup"
                onClick={handleCheckup}
                disabled={actionTaken}
              >
                定期検診を受ける (1万円)
              </button>
              <button
                className="actions-button electric-brush"
                onClick={() => handleActionSelection('electricBrush')}
                disabled={actionTaken}
              >
                フロスを使って丁寧に磨く (5000円)
              </button>
              <button
                className="actions-button nothing"
                onClick={() => handleActionSelection('nothing')}
                disabled={actionTaken}
              >
                何もしない (無料)
              </button>
            </div>
          </div>

          {isModalOpen && (
            <DiagnosisModal
              onClose={() => setIsModalOpen(false)}
              onComplete={(cost, healthImpact) =>
                handleDiagnosisComplete(cost, healthImpact)
              }
            />
          )}
        </div>
      )}
    </div>
  )
}

export default App
