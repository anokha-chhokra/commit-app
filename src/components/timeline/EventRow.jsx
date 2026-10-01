import { getEventComp } from "../../utils/eventLogic";
import { todayKey } from "../../utils/date";

export default function EventRow({ event, onToggle, onEdit}){
    const comp = getEventComp(event, todayKey())

    return (
        <div className="row">
            <div className="row-time">{event.time}</div>
            <div className="row-line">
                <div className="row-dot" style={{background: comp.done ? 'var(--tertiary)' : 'var(--surface-2)',borderColor: comp.done ? '#000' : 'var(--outline)',}}/>
                <div className="row-connector" />
            </div>
            <div className={'event-card' + (comp.done? ' done':'')}>
                <button type="button" aria-label={'Edit '+event.title} className="event-icon pxnotch" style={{ background: 'var(--primary-container)', border: 'none', padding: 0 }} onClick={() => onEdit(event)}>
                    {event.icon}
                </button>
                <button type="button" aria-label={'Edit ' + event.title} style={{ flex: 1, textAlign: 'left', background: 'none', border: 'none', padding: 0, font: 'inherit', color: 'inherit' }} onClick={() => onEdit(event)}>
                    <span className={'event-title' + (comp.done? ' strike':'')}>
                        {event.title}
                    </span>
                </button>
                <button type="button" aria-label={comp.done ? 'Mark ' + event.title + ' as not done' : 'Mark ' + event.title + ' as done'} style={{ background: 'none', border: 'none', padding: 0 }} onClick={() => onToggle(event)}>
                    {comp.done ? <span className="event-star">★</span> : <span className="event-ring" />}
                </button>
            </div>
        </div>
    )
}