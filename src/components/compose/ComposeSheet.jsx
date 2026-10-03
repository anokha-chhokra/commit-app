import { useState } from 'react'
import { PROMPTS, promptForDay, promptById } from '../../constants/prompts.js'
import { TAG_OPTIONS } from '../../constants/tags.js'
import { wordCount, computeEntryPoints, uid } from '../../utils/entryLogic.js'
import { todayKey, nowHM } from '../../utils/date.js'
import MoodPicker from './MoodPicker.jsx'
import PromptCard from './PromptCard.jsx'

export default function ComposeSheet({ editing, onClose, onSave, onDelete }) {
  const [promptId, setPromptId] = useState(editing ? editing.promptId : promptForDay().id)
  const [mood, setMood] = useState(editing ? editing.mood : 4)
  const [text, setText] = useState(editing ? editing.text : '')
  const [tags, setTags] = useState(editing ? editing.tags || [] : [])
  const [confirmDelete, setConfirmDelete] = useState(false)

  const prompt = promptId ? promptById(promptId) : null
  const words = wordCount(text)
  const points = computeEntryPoints(words)

  function toggleTag(t) {
    setTags((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]))
  }
  function shufflePrompt() {
    const idx = PROMPTS.findIndex((p) => p.id === promptId)
    setPromptId(PROMPTS[(idx + 1) % PROMPTS.length].id)
  }
  function handleSave() {
    if (!text.trim()) return
    const w = wordCount(text)
    onSave({
      id: editing ? editing.id : uid(),
      date: editing ? editing.date : todayKey(),
      time: editing ? editing.time : nowHM(),
      promptId,
      text,
      mood,
      tags,
      wordCount: w,
      pointsEarned: computeEntryPoints(w),
      createdAt: editing ? editing.createdAt : Date.now(),
      updatedAt: Date.now(),
    })
  }
  function handleDeleteClick() {
    if (confirmDelete) { onDelete(editing.id) }
    else { setConfirmDelete(true); setTimeout(() => setConfirmDelete(false), 3000) }
  }

  return (
    <div className="sheet-backdrop" onClick={onClose}>
      <div className="sheet" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-title px">{editing ? 'EDIT ENTRY' : 'NEW ENTRY'}</div>

        <PromptCard
          prompt={prompt}
          onUsePrompt={shufflePrompt}
          onFreeWrite={() => setPromptId(null)}
        />

        <div className="field-label px">HOW ARE YOU FEELING?</div>
        <MoodPicker value={mood} onChange={setMood} />

        <div className="field-label px">YOUR ENTRY</div>
        <div className="compose-box">
          <textarea value={text} placeholder="Start writing…" onChange={(e) => setText(e.target.value)} />
        </div>

        <div className="field-label px">TAGS</div>
        <div className="seg-row">
          {TAG_OPTIONS.map((t) => (
            <button
              key={t}
              type="button"
              className={'seg-btn' + (tags.includes(t) ? ' active' : '')}
              onClick={() => toggleTag(t)}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="word-count px">{words} WORDS · +{points} PTS ON SAVE</div>

        <div className="sheet-actions">
          <button type="button" className="btn ghost" onClick={onClose}>CANCEL</button>
          <button type="button" className="btn primary" onClick={handleSave}>{editing ? 'SAVE' : 'SAVE ENTRY'}</button>
        </div>

        {editing && (
          <div className="del-row">
            <button type="button" className="btn danger" onClick={handleDeleteClick}>
              {confirmDelete ? 'TAP AGAIN TO CONFIRM' : 'DELETE ENTRY'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
