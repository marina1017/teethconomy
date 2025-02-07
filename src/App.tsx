import { useGameStore } from './store/gameStore'
import ResultPage from './pages/ResultPage'

function App() {
  const { state, isResultPage, nextDecade } = useGameStore()

  return (
    <div>
      {state.age >= 80 ? (
        <ResultPage />
      ) : (
        <div>
          <h1>🦷 歯の健康シミュレーター</h1>
          <p>📅 現在の年齢: {state.age}歳</p>
          <p>💰 貯金: {state.money.toLocaleString()}円</p>
          <p>🦷 健康レベル: {state.health}</p>

          <h3>次の10年の行動を選んでください</h3>
          <div>
            <button onClick={() => nextDecade('checkup')}>
              🩺 定期検診を受ける (1万円)
            </button>
            <button onClick={() => nextDecade('electricBrush')}>
              🪥 電動歯ブラシを使う (5000円)
            </button>
            <button onClick={() => nextDecade('nothing')}>
              🚫 何もしない (無料)
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
