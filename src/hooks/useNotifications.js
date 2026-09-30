import { useState, useEffect, useRef, useCallback } from 'react'
import { todayKey, pad } from '../utils/date.js'
import { getEventComp } from '../utils/eventLogic.js'

export function useNotifications(dataRef, journalReminderTime, onDue) {
  const [status, setStatus] = useState('unsupported')
  const notifiedRef = useRef({})

  useEffect(() => {
    if (typeof Notification === 'undefined') { 
        setStatus('unsupported'); 
        return 
    }
    setStatus(Notification.permission)
  }, [])

  useEffect(() => {
    const iv = setInterval(() => {
      const now = new Date()
      const hm = pad(now.getHours()) + ':' + pad(now.getMinutes())
      const key = todayKey()
      const { events, entries } = dataRef.current

      events.forEach((ev) => {
        if (ev.time !== hm) 
            return 
            const comp = getEventComp(ev, key)
        if (comp.done) 
            return 
            const nk = ev.id + '-' + key
        if (notifiedRef.current[nk]) 
            return 
            notifiedRef.current[nk] = true

        onDue('⏰ Time for: ' + ev.title)
        fireNotification('commit() journal', ev.title + ' is due now', nk)
      })

      if (journalReminderTime === hm) {
        const hasEntryToday = entries.some((e) => e.date === key)
        const nk2 = 'journal-' + key
        if (!hasEntryToday && !notifiedRef.current[nk2]) {
          notifiedRef.current[nk2] = true
          onDue('📝 Time to journal')
          fireNotification('commit() journal', "Time to write today's entry", nk2)
        }
      }
    }, 20000)
    return () => clearInterval(iv)
  }, [dataRef, journalReminderTime, onDue])

  const requestPermission = useCallback(() => {
    if (typeof Notification === 'undefined') { 
        setStatus('unsupported'); 
        return 
    }
    try {
      const result = Notification.requestPermission()
      if (result && result.then) {
        result.then(setStatus).catch(() => setStatus('denied'))
      } 
      else {
        setStatus(Notification.permission)
      }
    } 
    catch {
      setStatus('denied')
    }
  }, [])

  return { status, requestPermission }
}

function fireNotification(title, body, tag) {
  if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
    try { 
        new Notification(title, { body, tag }) 
    } 
    catch { 

    }
  }
}
