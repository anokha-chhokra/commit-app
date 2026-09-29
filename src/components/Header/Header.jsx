import { useState } from 'react'
import StatsRow from './StatsRow.jsx'
import ModeSwitcher from './ModeSwitcher.jsx'

export default function Header({
  todayPoints, stats, themeMode, onThemeModeChange,
  notifStatus, onEnableNotifications,
}) {
  const [bannerDismissed, setBannerDismissed] = useState(false)
  const showBanner = notifStatus !== 'granted' && notifStatus !== 'unsupported' && !bannerDismissed

  return (
    <header className="top">
      <div className="wordmark-row">
        <div className="wordmark px">commit<span className="dim">()</span></div>
        <button
          type="button"
          aria-label="notifications"
          className={'icon-btn' + (notifStatus !== 'granted' ? ' off' : '')}
          onClick={onEnableNotifications}
        >
          {notifStatus === 'granted' ? '🔔' : '🔕'}
        </button>
      </div>

      <StatsRow todayPoints={todayPoints} streak={stats.maxStreak} total={stats.totalPoints} />
      <ModeSwitcher themeMode={themeMode} onChange={onThemeModeChange} />

      {showBanner && (
        <div className="banner">
          <span>Enable reminders for events and your daily journal nudge.</span>
          <button type="button" onClick={onEnableNotifications}>ENABLE</button>
          <button type="button" className="dismiss" onClick={() => setBannerDismissed(true)}>✕</button>
        </div>
      )}
    </header>
  )
}
