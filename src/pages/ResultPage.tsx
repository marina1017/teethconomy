import { useGameStore } from '../store/gameStore'

function ResultPage() {
  const { state, setIsResultPage } = useGameStore()

  return (
    <div>
      <h1>🔍 10年後の結果</h1>
      <p>📅 最終日数: {state.day}</p>
      <p>💰 最終貯金: {state.money}円</p>
      <p>🦷 最終健康: {state.health}</p>

      <button onClick={() => setIsResultPage(false)}>⬅️ ゲームに戻る</button>
    </div>
  )
}

export default ResultPage
