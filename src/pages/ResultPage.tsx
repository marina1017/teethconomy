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

import './ResultPage.scss'

function ResultPage() {
  const { state } = useGameStore()

  return (
    <div className="content">
      <div className="result">
        <h1 className="result-title">結果発表</h1>
        <div className="result-item">
          <h2 className="result-item-title">80歳到達 歯はどれくらい守れた？</h2>
          <p>貯金: {state.money.toLocaleString()}円</p>
          <p>健康スコア: {state.health}</p>
        </div>

        <div className="result-item">
          <h2 className="result-item-title">医療費の推移</h2>
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
          <p className="result-item-description">
            今回のシミュレーションでは、後半になるにつれて医療費がかさんでいました。(結果によってテキストを変える)
          </p>
        </div>
        <div className="result-item">
          <h2 className="result-item-title">歯を守ることに対する経済効果</h2>
          <p className="result-item-description">
            歯の健康を守ることは、将来の自分への投資です。定期的なケアをすることで、虫歯や歯周病のリスクを減らし、高額な治療費を避けることができます。一方で、歯の健康を軽視すると、治療のために数十万円もの出費が必要になり、経済的な負担が大きくなってしまいます。小さな努力を積み重ねることで、生涯の医療費を抑え、健康な歯で快適に過ごすことができます。あなたの選択が、未来の生活に大きな影響を与えるのです。
          </p>
          {/* <p className="result-item-description">
            hogehogehogehgoehogehogehogehgoehogehogehogehgoehogehogehogehgoehogehogehogehgoehogehogehogehgoehogehogehogehgoe
          </p> */}
        </div>
      </div>
    </div>
  )
}

export default ResultPage
