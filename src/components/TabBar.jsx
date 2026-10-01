const TABS = [
    { 
        id: 'timeline', 
        label: 'TIMELINE' 
    },
    { 
        id: 'calendar', 
        label: 'CALENDAR' 
    },
    { 
        id: 'badges', 
        label: 'BADGES' 
    },
]

export default function TabBar({ active, onChange }){
    return (
        <nav aria-label="views" className="tabbar">
            {TABS.map((t) => (
                <button key={t.id} type="button" className={'tab' + (active === t.id ? ' active' : '')} onClick={() => onChange(t.id)}>
                    {t.label}
                </button>
            ))}
        </nav>
    )
}