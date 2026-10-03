import { pad, todayKey, MONTHS } from '../../utils/date.js'
import { MOOD_META, moodMeta } from '../../constants/moods.js'

export default function CalendarView({ entries, stats, onSelectDate }) {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()
  const firstOfMonth = new Date(year, month, 1)
  const startOffset = firstOfMonth.getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const daysInPrevMonth = new Date(year, month, 0).getDate()

  const entryByDate = {}
  entries.forEach((e) => { entryByDate[e.date] = e })

  const cells = []
  for (let i = 0; i < startOffset; i++) {
    cells.push({ day: daysInPrevMonth - startOffset + 1 + i, out: true })
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, out: false, key: `${year}-${pad(month + 1)}-${pad(d)}` })
  }
  while (cells.length % 7 !== 0) {
    cells.push({ day: cells.length - (startOffset + daysInMonth) + 1, out: true })
  }

  const todayKeyVal = todayKey()
  const monthPrefix = `${year}-${pad(month + 1)}`
  const monthEntries = entries.filter((e) => e.date.startsWith(monthPrefix))

  return (
    <div>
      <div className="cal-nav">
        <button type="button" aria-label="previous month">‹</button>
        <div className="cal-month px">{MONTHS[month].toUpperCase()} {year}</div>
        <button type="button" aria-label="next month">›</button>
      </div>

      <div className="cal-grid">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((l, i) => (
          <div key={i} className="cal-weekday px">{l}</div>
        ))}
      </div>

      <div className="cal-grid">
        {cells.map((c, i) => {
          if (c.out) return <div key={i} className="cal-cell out"><div className="daynum">{c.day}</div></div>
          const isToday = c.key === todayKeyVal
          const entry = entryByDate[c.key]
          return (
            <button
              key={i}
              type="button"
              className={'cal-cell' + (isToday ? ' today' : '')}
              onClick={() => onSelectDate(c.key, entry)}
            >
              <div className="daynum">{c.day}</div>
              {entry && (
                <div className={'cal-dot' + (isToday ? ' today-dot' : '')} style={{ background: moodMeta(entry.mood).color }} />
              )}
            </button>
          )
        })}
      </div>

      <div className="cal-legend">
        {MOOD_META.map((m) => (
          <div key={m.value} className="cal-legend-item">
            <div className="cal-dot" style={{ background: m.color, width: '7px', height: '7px' }} />
            <span style={{ fontSize: '15px' }}>{m.emoji}</span>
          </div>
        ))}
      </div>

      <div className="cal-summary px">
        ★ {monthEntries.length} ENTRIES THIS MONTH ★<br />
        <span className="sub">LONGEST STREAK: {stats.maxStreak} DAYS</span>
      </div>
    </div>
  )
}
