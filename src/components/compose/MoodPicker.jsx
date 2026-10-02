import { MOOD_META } from '../../constants/moods.js'

export default function MoodPicker({ value, onChange }) {
  return (
    <div className="mood-row">
      {MOOD_META.map((m) => {
        const selected = value === m.value
        return (
          <button key={m.value} type="button" aria-label={'Mood: ' + m.label} aria-pressed={selected} className={'mood-btn' + (selected ? ' selected' : '')} onClick={() => onChange(m.value)}>
            <span style={selected ? { display: 'inline-block', animation: 'bounce 1s ease-in-out infinite' } : undefined}>
              {m.emoji}
            </span>
          </button>
        )
      })}
    </div>
  )
}
