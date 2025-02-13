import { useState } from 'react'
import { useGameStore } from './store/gameStore'
import ResultPage from './pages/ResultPage'
import TeethVisualization from './components/TeethVisualization'
import DiagnosisModal from './components/DiagnosisModal'

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
    <div>
      {state.age >= 80 ? (
        <ResultPage />
      ) : (
        <div>
          <h1>TeethConomy</h1>
          <h2>歯の健康を守れ</h2>
          <p>
            歯を守ることはhogehogehogehogheogehogehogehogehogheogehogehogehogehogheogehogehogehogehogheogehogehogehogehogheoge
          </p>
          <p>📅 現在の年齢: {state.age}歳</p>
          <p>💰 貯金: {state.money.toLocaleString()}円</p>
          <p>🦷 健康レベル: {state.health}</p>

          {/* 🦷 歯の状態の可視化 */}
          <TeethVisualization health={state.health} />

          <h3>次の10年の行動を選んでください</h3>
          <div>
            <button onClick={handleCheckup} disabled={actionTaken}>
              🩺 定期検診を受ける (1万円)
            </button>
            <button
              onClick={() => handleActionSelection('electricBrush')}
              disabled={actionTaken}
            >
              🪥 電動歯ブラシを使う (5000円)
            </button>
            <button
              onClick={() => handleActionSelection('nothing')}
              disabled={actionTaken}
            >
              🚫 何もしない (無料)
            </button>
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
