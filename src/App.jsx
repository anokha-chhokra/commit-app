import { useState } from 'react'
import Header from './components/Header/Header'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>commit() journal</h1>    
      <Header
        todayPoints={todayPoints}
        stats={stats}
        themeMode={themeMode}
        onThemeModeChange={setThemeMode}
        notifStatus={notifStatus}
        onEnableNotifications={requestPermission}
      />
    </>
  )
}

export default App
