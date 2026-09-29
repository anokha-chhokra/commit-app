const MODES = ['auto', 'day', 'evening', 'night']

export default function ModeSwitcher({ themeMode, onChange }) {
  return (
    <div className="mode-row">
      {MODES.map((m) => (
        <button
          key={m}
          type="button"
          className={'mode-chip' + (themeMode === m ? ' active' : '')}
          onClick={() => onChange(m)}
        >
          {m.toUpperCase()}
        </button>
      ))}
    </div>
  )
}