import { BADGES } from '../../constants/badges.js'

export default function BadgesGrid({ badgesUnlocked }) {
  const unlockedCount = Object.keys(badgesUnlocked).length

  return (
    <div>
      <div className="day-label px">BADGES ({unlockedCount}/{BADGES.length})</div>
      <div className="badge-grid">
        {BADGES.map((b) => {
          const unlocked = !!badgesUnlocked[b.id]
          return (
            <div key={b.id} className={'badge-tile' + (unlocked ? '' : ' locked')}>
              {unlocked && <div className="badge-check">✓</div>}
              <div className="badge-icon">{b.icon}</div>
              <div className="badge-name px">{b.name.toUpperCase()}</div>
              <div className="badge-desc">{b.desc}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
