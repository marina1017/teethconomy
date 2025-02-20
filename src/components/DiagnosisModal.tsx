import { useState, useEffect } from 'react'
import './DiagnosisModal.css'
import { useUIStore } from '../store/uiStore'

interface DiagnosisModalProps {
  onClose: (cost: number, healthImpact: number) => void
}

const DiagnosisModal: React.FC<DiagnosisModalProps> = ({ onClose }) => {
  const { isModalOpen, closeModal, setActionTaken } = useUIStore()
  const [status, setStatus] = useState<'loading' | 'done'>('loading')
  const [result, setResult] = useState<null | {
    message: string
    cost: number
    healthImpact: number
  }>(null)

  useEffect(() => {
    if (!isModalOpen) return

    setTimeout(() => {
      const random = Math.random()
      let diagnosis
      if (random < 0.4) {
        diagnosis = { message: '虫歯なし！！', cost: 0, healthImpact: 0 }
      } else if (random < 0.7) {
        diagnosis = {
          message: '虫歯あった・・・治療費3万円',
          cost: 30000,
          healthImpact: 5,
        }
      } else if (random < 0.9) {
        diagnosis = {
          message: '歯周病が進行しています 治療費10万円',
          cost: 100000,
          healthImpact: 10,
        }
      } else {
        diagnosis = {
          message: '歯を失いました インプラント費用30万円',
          cost: 300000,
          healthImpact: 50,
        }
      }
      setResult(diagnosis)
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
    <div className="modal-overlay">
      <div className="modal-container">
        {status === 'loading' ? (
          <p className="loading-text">「歯医者で診察を受けます...」</p>
        ) : (
          <>
            <p className="result-text">{result?.message}</p>
            <button onClick={handleClose} className="close-button">
              閉じる
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default DiagnosisModal
