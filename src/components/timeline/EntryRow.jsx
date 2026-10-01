import { moodMeta } from "../../constants/moods";

export default function EntryRow({ entry, onEdit }){
    const mood = moodMeta(entry.mood)
    const preview = (entry.text || '').slice(0,90) + ((entry.text || '').length > 90 ? '...' : '')

    return (
        <div className="row">
            <div className="row-time">{entry.time}</div>
            <div className="row-line">
                <div className="row-dot" style={{ background: 'var(--secondary)' }} />
                <div className="row-connector" />
            </div>
            <button type="button" className="entry-card" onClick={() => onEdit(entry)}>
                <div className="entry-top">
                    <span className="entry-mood">{mood.emoji}</span>
                    <span className="entry-label px">{entry.promptId ? 'JOURNAL ENTRY':'FREE WRITE'}</span>
                </div>
                <div className="entry-preview">{preview}</div>
            </button>
        </div>
    )
}