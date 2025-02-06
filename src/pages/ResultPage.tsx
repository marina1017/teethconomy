import { useGameStore } from '../store/gameStore'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

function ResultPage() {
  const { state, setIsResultPage } = useGameStore()

  return (
    <div>
      <h1>🔍 10年後の結果</h1>
      <p>📅 最終日数: {state.day}</p>
      <p>💰 最終貯金: {state.money}円</p>
      <p>🦷 最終健康: {state.health}</p>

      <h3>医療費の推移</h3>
      {state.yearlyExpenses.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={state.yearlyExpenses}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis></YAxis>
            <Tooltip></Tooltip>
            <Line
              type="monotone"
              dataKey="cost"
              stroke="#8884d8"
              strokeWidth={2}
            ></Line>
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <p>📉 データがありません</p>
      )}

      <button onClick={() => setIsResultPage(false)}>⬅️ ゲームに戻る</button>
    </div>
  )
}

export default ResultPage
