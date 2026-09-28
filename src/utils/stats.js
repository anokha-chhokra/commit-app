import { todayKey } from './date'
import { computeEntryStreak } from './entryLogic'
import { getEventComp } from './eventLogic'

export function computeStats(entries, events) {
  let totalWords = 0
  let journalPoints = 0
  entries.forEach((e) => {
    totalWords += e.wordCount || 0
    journalPoints += e.pointsEarned || 0
  })

  let eventPoints = 0
  events.forEach((ev) => {
    Object.keys(ev.completions || {}).forEach((k) => {
      const c = ev.completions[k]
      if (c.done) eventPoints += c.pointsEarned || 0
    })
  })

  const nightOwlDone = entries.some((e) => parseInt((e.time || '12:00').split(':')[0], 10) >= 21)
  const earlyBirdDone = entries.some((e) => parseInt((e.time || '12:00').split(':')[0], 10) < 7)

  return {
    totalPoints: journalPoints + eventPoints,
    totalEntries: entries.length,
    totalWords,
    maxStreak: computeEntryStreak(entries),
    nightOwlDone,
    earlyBirdDone,
  }
}

export function computeTodayPoints(entries, events) {
  const key = todayKey()
  let pts = 0
  entries.forEach((e) => { if (e.date === key) pts += e.pointsEarned || 0 })
  events.forEach((ev) => { const c = getEventComp(ev, key); if (c.done) pts += c.pointsEarned || 0 })
  return pts
}
