import React, { useEffect, useState } from 'react'

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
  const totalTeeth = 32
  const [missingTeeth, setMissingTeeth] = useState<Set<number>>(new Set())

  useEffect(() => {
    setMissingTeeth(prev => {
      const newMissingTeeth = new Set(prev)
      // ここ後で抜け方を考える　よりリアルにしたい
      const missingTeethCount = Math.max(0, Math.floor((100 - health) / 20))
      while (newMissingTeeth.size < missingTeethCount) {
        newMissingTeeth.add(Math.floor(Math.random() * totalTeeth))
      }
      return newMissingTeeth
    })
  }, [health])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '5px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'center', gap: '5px' }}>
        {Array.from({ length: 16 }).map((_, i) => (
          <div
            key={i}
            style={{
              width: '20px',
              height: '30px',
              backgroundColor: missingTeeth.has(i)
                ? 'transparent'
                : getToothColor(health),
              border: '1px solid #000',
              borderRadius: '5px 5px 2px 2px',
            }}
          ></div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '5px' }}>
        {Array.from({ length: 16 }).map((_, i) => (
          <div
            key={i}
            style={{
              width: '20px',
              height: '30px',
              backgroundColor: missingTeeth.has(i + 8)
                ? 'transparent'
                : getToothColor(health),
              border: '1px solid #000',
              borderRadius: '2px 2px 5px 5px',
            }}
          ></div>
        ))}
      </div>
    </div>
  )
}

export default TeethVisualization
