import { useState, useEffect } from 'react'
import './DiagnosisModal.scss'
import { useUIStore } from '../store/uiStore'
import { DIAGNOSIS_RESULTS } from '../constants/gameConstants'
import { useGameStore } from '../store/gameStore'

interface DiagnosisModalProps {
  onClose: (cost: number, healthImpact: number) => void
}

const DiagnosisModal: React.FC<DiagnosisModalProps> = ({ onClose }) => {
  const { state } = useGameStore()
  const { isModalOpen, closeModal, setActionTaken } = useUIStore()
  const [status, setStatus] = useState<'loading' | 'done'>('loading')
  const [result, setResult] = useState<null | {
    message: string
    cost: number
    healthImpact: number
  }>(null)

  // 健康スコアによって病気発見の確率を変える
  const getAdjustedProbabilities = (health: number) => {
    const diagnosisArray = Object.values(DIAGNOSIS_RESULTS)
    const baseProbabilities = diagnosisArray.map(d => d.baseProbability)
    // 健康スコアが低いほど、インプラント確率を上げる
    const implantRiskFactor = 1 + (100 - health) / 100
    baseProbabilities[3] *= implantRiskFactor // インプラントの確率だけ上げる

    // 確率を正規化 (合計が 1 になるように調整)
    const total = baseProbabilities.reduce((sum, p) => sum + p, 0)
    return baseProbabilities.map(p => p / total)
  }

  useEffect(() => {
    if (!isModalOpen) return

    setTimeout(() => {
      const probabilities = getAdjustedProbabilities(state.health)
      const random = Math.random()

      // 確率に基づいて診断結果を決定
      const diagnosisArray = Object.values(DIAGNOSIS_RESULTS)
      const selectedDiagnosis = diagnosisArray.reduce(
        (acc, diagnosis, index) => {
          const accumulated = acc.probability + probabilities[index]
          return random < accumulated
            ? { diagnosis, probability: accumulated }
            : acc
        },
        { diagnosis: diagnosisArray[0], probability: 0 }
      ).diagnosis

      setResult(selectedDiagnosis)
      setStatus('done')
    }, 1000)
  }, [isModalOpen])

  const handleClose = () => {
    if (result) {
      onClose(result.cost, result.healthImpact)
    }
    closeModal()
    setActionTaken(false)
  }

  return (
    <div className="modal">
      <div className="modal-container">
        {status === 'loading' ? (
          <p className="loading-text">「歯医者で診察を受けます...」</p>
        ) : (
          <>
            <p className="result-text">{result?.message}</p>
            <button onClick={handleClose} className="modal-close-button">
              ✗
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default DiagnosisModal
