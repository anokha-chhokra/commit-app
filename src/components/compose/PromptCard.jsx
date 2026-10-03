export default function PromptCard({ prompt, onUsePrompt, onFreeWrite }) {
  if (!prompt) {
    return (
      <div className="prompt-card">
        <div className="prompt-top">
          <span className="prompt-tag px">✎ FREE WRITE</span>
          <button type="button" className="prompt-link" onClick={onUsePrompt}>use a prompt instead</button>
        </div>
      </div>
    )
  }
  return (
    <div className="prompt-card">
      <div className="prompt-top">
        <span className="prompt-tag px">{prompt.icon} {prompt.label.toUpperCase()} QUEST</span>
        <button type="button" className="prompt-link" onClick={onFreeWrite}>free write instead</button>
      </div>
      <div className="prompt-text">{prompt.text}</div>
    </div>
  )
}
