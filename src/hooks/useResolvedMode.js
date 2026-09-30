import { useEffect, useState } from 'react'

export function resolveMode(themeMode) {
  if (themeMode !== 'auto') 
    return themeMode
  const hr = new Date().getHours()
  if (hr >= 6 && hr < 17) 
    return 'day'
  if (hr >= 17 && hr < 21) 
    return 'evening'
  return 'night'
}

export function useResolvedMode(themeMode) {
  const [, tick] = useState(0)

  useEffect(() => {
    if (themeMode !== 'auto') 
        return
        const iv = setInterval(() => tick((t) => t + 1), 60000)
    return () => clearInterval(iv)
  }, [themeMode])

  const resolvedMode = resolveMode(themeMode)

  useEffect(() => {
    document.body.className = 'mode-' + resolvedMode
  }, [resolvedMode])

  return resolvedMode
}
