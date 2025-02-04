import { useGameStore } from './store/gameStore'

function App() {
  const { state, updateHealth, updateMoney, nextDay, brushTeeth } =
    useGameStore()

  return (
    <div>
      <h1>🦷 歯の健康シミュレーター</h1>
      <p>📅 日数: {state.day}</p>
      <p>💰 貯金: {state.money}円</p>
      <p>🦷 歯の健康: {state.health}</p>

      <h2>🪥 歯みがきの選択</h2>
      <button onClick={() => brushTeeth('morning')}>☀️ 朝の歯みがき</button>
      <button onClick={() => brushTeeth('afternoon')}>🌞 昼の歯みがき</button>
      <button onClick={() => brushTeeth('night')}>🌙 夜の歯みがき</button>

      <h2>📜 選択履歴</h2>
      <ul>
        {state.choices.map((choice, index) => (
          <li key={index}>{choice}</li>
        ))}
      </ul>

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
