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
          <p className="description">あなたの歯は、一生のパートナー！</p>
          <p className="description">
            このゲームでは、日々の歯のケアが将来の健康や医療費にどれだけ影響するのかをシミュレーションできます。
            あなたの選択次第で、80歳になったときの歯の状態が大きく変わります。
            電動歯ブラシを使う？ 定期検診を受ける？ それとも何もしない？
          </p>
          <p className="description">
            気をつけないと、将来、高額な治療費やインプラントが必要になるかも…？
            逆に、しっかりケアすれば、健康な歯で長く過ごせる！
            さあ、あなたはどんな選択をしますか？
          </p>
          <div className="stats">
            <p className="stats-item">
              <span className="stats-number">{state.age}</span>
              <span className="stats-label">現在の年齢</span>
              <span
                className="stats-progress"
                // これ後でもう少しいい方法がないか探す
                style={
                  {
                    '--progress': (state.age / 80) * 100,
                  } as React.CSSProperties
                }
              ></span>
            </p>
            <p className="stats-item">貯金: {state.money.toLocaleString()}円</p>
            <p className="stats-item">健康レベル: {state.health}</p>
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
                🩺 定期検診を受ける (1万円)
              </button>
              <button
                className="actions-button electric-brush"
                onClick={() => handleActionSelection('electricBrush')}
                disabled={actionTaken}
              >
                🪥 電動歯ブラシを使う (5000円)
              </button>
              <button
                className="actions-button nothing"
                onClick={() => handleActionSelection('nothing')}
                disabled={actionTaken}
              >
                🚫 何もしない (無料)
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
