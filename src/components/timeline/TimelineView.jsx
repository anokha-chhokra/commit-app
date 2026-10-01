import { todayKey, nowHM, friendlyDay } from '../../utils/date.js'
import EventRow from './EventRow.jsx'
import EntryRow from './EntryRow.jsx'

function getTimelineItems(events, entries, key) {
  const items = []
  events.forEach((ev) => items.push({ kind: 'event', time: ev.time, data: ev }))
  entries.filter((e) => e.date === key).forEach((e) => items.push({ kind: 'entry', time: e.time, data: e }))
  return items.sort((a, b) => (a.time < b.time ? -1 : a.time > b.time ? 1 : 0))
}

export default function TimelineView({ events, entries, onToggleEvent, onEditEvent, onEditEntry, onAddEvent }) {
  const key = todayKey()
  const items = getTimelineItems(events, entries, key)
  const hm = nowHM()
  const pastItems = items.filter((it) => it.time <= hm)
  const futureItems = items.filter((it) => it.time > hm)

  const renderItem = (it) =>
    it.kind === 'event' ? (
      <EventRow key={it.data.id} event={it.data} onToggle={onToggleEvent} onEdit={onEditEvent} />
    ) : (
      <EntryRow key={it.data.id} entry={it.data} onEdit={onEditEntry} />
    )

  return (
    <div>
      <div className="day-label px">
        ▸ {friendlyDay(new Date()).toUpperCase()}
      </div>
      {items.length === 0 ? (
        <div className="empty-state">
          <span className="px">NO EVENTS YET</span>
          Tap + to write an entry, or add an event below.
        </div>
      ) : (
        <div>
          {pastItems.map(renderItem)}
          {futureItems.length > 0 && (
            <div className="now-marker">
              <div className="now-line" />
              <div className="now-badge px">
                ▸NOW {hm}
              </div>
              <div className="now-line" />
            </div>
          )}
          {futureItems.map(renderItem)}
        </div>
      )}

      <button type="button" className="add-event-row" onClick={onAddEvent}>+ ADD EVENT</button>
    </div>
  )
}
