import { useState } from "react";
import { uid } from '../../utils/entryLogic'

const ICONS = ['📌', '🕌', '💧', '🏋️', '😴', '📚', '🧘', '💊', '🚶', '☕']

export default function EventSheet({ editing, onClose, onSave, onDelete }) {
    const [title, setTitle] = useState(editing? editing.title : '')
    const [time, setTime] = useState(editing? editing.time : '09:00')
    const [points, setPoints] = useState(editing? editing.points : 10)
    const [icon, setIcon] = useState(editing? editing.icon || '📌' : '📌')
    const [confirmDelete, setConfirmDelete] = useState(false)

    function handleSave(){
        onSave({
            ...editing,
            id: editing? editing.id : uid(),
            title: title.trim(),
            time,
            points: Math.max(1, Number(points) || 1),
            icon,
            completions: (editing && editing.completions) || {},
            createdAt: (editing && editing.createdAt) || Date.now(),
        })
    }

    function handleDeleteClick(){
        if(confirmDelete){
            onDelete(editing.id)
        }
        else{
            setConfirmDelete(true);
            setTimeout(() => setConfirmDelete(false), 3000)
        }
    }

    return (
        <div className="sheet-backdrop" onClick={onClose}>
            <div className="sheet" onClick={(e) => e.stopPropagation()}>
                <div className="sheet-title px">{editing? 'EDIT EVENT' : 'NEW EVENT'}</div>
                <div className="field-label px">ICON</div>
                <div className="seg-row">{ICONS.map((ic) => (
                    <button key={ic} type="button" className={'seg-btn' + (icon === ic ? ' active': '')} onClick={() => setIcon(ic)}>{ic}</button>
                ))}
                </div>
                <div className="two-col">
                    <div>
                        <div className="field-label px">TIME</div>
                        <input type="time" className="text-input" value={time} onChange={(e) => setTime(e.target.value)} />
                    </div>
                    <div>
                        <div className="field-label px">POINTS</div>
                        <input type="number" className="text-input" value={points} onChange={(e) => setPoints(e.target.value)} />
                    </div>
                </div>

                <div className="sheet-actions">
                    <button type="button" className="btn ghost" onClick={onClose}>CANCEL</button>
                    <button type="button" className="btn primary" onClick={handleSave}>{editing? 'SAVE':'ADD EVENT'}</button>
                </div>

                {editing && (
                    <div className="del-row">
                        <button type="button" className="btn dnager" onClick={handleDeleteClick}>
                            {confirmDelete? 'TAP AGAIN TO CONFIRM': 'DELETE EVENT'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}