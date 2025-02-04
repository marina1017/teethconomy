import { useGameStore } from './store/gameStore'

function App() {
  const { state, updateHealth, updateMoney, nextDay } = useGameStore()

  return (
    <div>
      <h1>🦷 歯の健康シミュレーター</h1>
      <p>📅 日数: {state.day}</p>
      <p>💰 貯金: {state.money}円</p>
      <p>🦷 歯の健康: {state.health}</p>

      <button onClick={() => updateHealth(-10)}>
        😈 甘いものを食べる（健康-10）
      </button>
      <button onClick={() => updateMoney(-2000)}>
        🦷 歯医者に行く（-2000円）
      </button>
      <button onClick={nextDay}>⏭️ 次の日へ</button>
    </div>
  )
}

export default App
