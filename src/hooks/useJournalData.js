import { useState, useEffect, useMemo, useCallback } from 'react'
import { loadState, saveState } from '../utils/storage.js'
import { createDefaultEvents } from '../constants/defaultEvents.js'
import { BADGES } from '../constants/badges.js'
import { toggleEventDone } from '../utils/eventLogic.js'
import { computeStats, computeTodayPoints } from '../utils/stats.js'
import { todayKey } from '../utils/date.js'

export function useJournalData(onBadgeUnlocked) {
  const [events, setEvents] = useState(() => {
    const s = loadState()
    return s ? s.events : createDefaultEvents()
  })
  const [entries, setEntries] = useState(() => {
    const s = loadState()
    return s ? s.entries : []
  })
  const [badgesUnlocked, setBadgesUnlocked] = useState(() => {
    const s = loadState()
    return (s && s.badgesUnlocked) || {}
  })
  const [themeMode, setThemeMode] = useState(() => {
    const s = loadState()
    return (s && s.themeMode) || 'evening'
  })
  const [journalReminderTime, setJournalReminderTime] = useState(() => {
    const s = loadState()
    return (s && s.journalReminderTime) || '20:00'
  })

  useEffect(() => {
    saveState({ events, entries, badgesUnlocked, themeMode, journalReminderTime })
  }, [events, entries, badgesUnlocked, themeMode, journalReminderTime])

  const stats = useMemo(() => computeStats(entries, events), [entries, events])
  const todayPoints = useMemo(() => computeTodayPoints(entries, events), [entries, events])

  useEffect(() => {
    const newly = BADGES.filter((b) => !badgesUnlocked[b.id] && b.check(stats))
    if (newly.length) {
      const next = { ...badgesUnlocked }
      newly.forEach((b) => { next[b.id] = todayKey() })
      setBadgesUnlocked(next)
      newly.forEach((b) => onBadgeUnlocked && onBadgeUnlocked(b))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stats.totalEntries, stats.totalWords, stats.maxStreak, stats.totalPoints, stats.nightOwlDone, stats.earlyBirdDone])

  const toggleEvent = useCallback((ev) => {
    setEvents((prev) => prev.map((e) => (e.id === ev.id ? toggleEventDone(e) : e)))
  }, [])

  const saveEvent = useCallback((ev) => {
    setEvents((prev) => {
      const exists = prev.some((e) => e.id === ev.id)
      return exists ? prev.map((e) => (e.id === ev.id ? ev : e)) : [...prev, ev]
    })
  }, [])

  const deleteEvent = useCallback((id) => {
    setEvents((prev) => prev.filter((e) => e.id !== id))
  }, [])

  const saveEntry = useCallback((entry) => {
    setEntries((prev) => {
      const exists = prev.some((e) => e.id === entry.id)
      return exists ? prev.map((e) => (e.id === entry.id ? entry : e)) : [...prev, entry]
    })
  }, [])

  const deleteEntry = useCallback((id) => {
    setEntries((prev) => prev.filter((e) => e.id !== id))
  }, [])

  return {
    events, entries, badgesUnlocked, stats, todayPoints,
    themeMode, setThemeMode, journalReminderTime, setJournalReminderTime,
    toggleEvent, saveEvent, deleteEvent, saveEntry, deleteEntry,
  }
}
