import { useState, useCallback } from 'react'
import { uid } from '../utils/entryLogic'

export function useToasts() {
  const [toasts, setToasts] = useState([])

  const pushToast = useCallback((msg) => {
    const id = uid()
    setToasts((prev) => [...prev, { id, msg }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3400)
  }, [])

  return { toasts, pushToast }
}
