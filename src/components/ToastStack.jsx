export default function ToastStack({ toasts }){
    return (
        <div className="toast-stack">
            {toasts.map((t) => (
                <div key={t.id} className="toast">{t.msg}</div>
            ))}
        </div>
    )
}