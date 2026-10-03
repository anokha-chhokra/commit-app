import { useRef, useState, useEffect } from "react";
import { useJournalData } from './hooks/useJournalData'
import { useResolvedMode } from './hooks/useResolvedMode'
import { useNotifications } from './hooks/useNotifications'
import { useToasts } from './hooks/useToasts'
import { todayKey } from "./utils/date";

import Header from './components/Header/Header'
import TabBar from './components/TabBar'
import TimelineView from './components/timeline/TimelineView'
import CalendarView from './components/calendar/CalendarView'
import BadgesGrid from './components/badges/BadgesGrid'
import ComposeSheet from './components/compose/ComposeSheet'
import EventSheet from './components/events/EventSheet'
import Fab from './components/Fab'
import ToastStack from './components/ToastStack'

export default function App(){
  const {toasts, pushToast} = useToasts()

  const {events, entries, badgesUnlocked, stats, todayPoints, themeMode, setThemeMode, journalReminderTime, toggleEvent, saveEvent, deleteEvent, saveEntry, deleteEntry,} = useJournalData((badges) => pushToast(`🏅 Badge unlocked: ${badge.name}`))

  useResolvedMode(themeMode)

  const dataRef = useRef({events, entries})
  useEffect(() => {dataRef.current = {events, entries}}, [events,entries])

  const { status: notifStatus, requestPermission} = useNotifications(dataRef, journalReminderTime, (msg) => pushToast(msg))

  const [activeTab, setActiveTab] = useState('timeline')
  const [composeOpen, setComposeOpen] = useState(false)
  const [composeEditing, setComposeEditing] = useState(null)
  const [eventSheetOpen, setEventSheetOpen] = useState(false)
  const [eventEditing, setEventEditing] = useState(null)

  function openNewEntry(){
    setComposeEditing(null);
    setComposeOpen(true)
  }
  function openEditEntry(entry){
    setComposeEditing(entry);
    setComposeOpen(true)
  }
  function closeCompose(){
    setComposeOpen(false);
    setComposeEditing(null)
  }
  function handleSaveEntry(entry){
    saveEntry(entry);
    closeCompose()
  }
  function handleDeleteEntry(id){
    deleteEntry(id);
    closeCompose()
  }

  function openNewEvent(){
    setEventEditing(null);
    setEventSheetOpen(true)
  }
  function openEditEvent(ev){
    setEventEditing(ev);
    setEventSheetOpen(true)
  }
  function closeEventSheet(){
    setEventSheetOpen(false)
    setEventEditing(null)
  }
  function handleSaveEvent(eve){
    saveEvent(ev);
    closeEventSheet()
  }
  function handleDeleteEvent(id){
    deleteEvent(id);
    closeEventSheet()
  }

  function handleSelectDate(dateKeyVal, entry){
    if(entry){
      openEditEntry(entry);
      return
    }
    if(dateKeyVal === todayKey())
      openNewEntry()
  }

  return (
    <div className="app">
      <div className="scan" />
      <ToastStack toasts={toasts} />

      <Header 
      todayPoints={todayPoints}
      stats={stats}
      themeMode={themeMode}
      onThemeModeChange={setThemeMode}
      notifStatus={notifStatus}
      onEnableNotifications={requestPermission} />

      <TabBar active={activeTab} onChange={setActiveTab} />
    </div>
  )
}