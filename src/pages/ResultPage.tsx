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
  const { state } = useGameStore()

  return (
    <div>
      <h1>Result</h1>
      <h2>80歳到達 歯はどれくらい守れた？</h2>
      <p>📅 年齢: {state.age}歳</p>
      <p>💰 貯金: {state.money.toLocaleString()}円</p>
      <p>🦷 健康レベル: {state.health}</p>

      <h2>最終的な歯の状態</h2>

      <h2>医療費の推移</h2>
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
      <h2>歯を守ることに対する経済効果</h2>
      <p>hogehogehoegehogehogehogehogheo</p>
    </div>
  )
}

export default ResultPage
