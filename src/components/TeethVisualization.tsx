import React from 'react'

interface TeethVisualizationPropos {
  health: number
}

const TeethVisualization: React.FC<TeethVisualizationPropos> = ({ health }) => {
  // 歯の色を決める ※ここあとできれいに
  const getToothColor = (health: number) => {
    if (health > 80) return '#ffffff' // 白
    if (health > 60) return '#ffcc66' // 黄ばみ
    if (health > 40) return '#cc6600' // 茶色
    if (health > 20) return '#993300' // 黒ずみ
    return '#666666' // 歯がなくなる
  }

  // 歯の数を決める(健康が悪いほど抜ける)
  const totalTeeth = 16
  const missingTeeth = Math.max(0, Math.floor((100 - health) / 20))
  const teethArray = Array.from(
    { length: totalTeeth },
    (_, i) => i >= totalTeeth - missingTeeth
  )

  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '5px' }}>
      {teethArray.map((isMissing, i) => (
        <div
          key={i}
          style={{
            width: '20px',
            height: '30px',
            backgroundColor: isMissing ? 'transparent' : getToothColor(health),
            border: '1px solid #000',
            borderRadius: '5px',
          }}
        ></div>
      ))}
    </div>
  )
}

export default TeethVisualization
