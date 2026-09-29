import { uid } from '../utils/entryLogic'

export function createDefaultEvents(){
    const now = Date.now()
    const ev = (o) => ({
        id: uid(),
        completions: {},
        createdAt: now, ...o
    })

    return [
        ev({ 
            title: 'Water', 
            icon: '💧', 
            time: '08:00', 
            points: 5 }),
        ev({ 
            title: 'Water', 
            icon: '💧', 
            time: '14:30', 
            points: 5 }),
        ev({ 
            title: 'Water', 
            icon: '💧', 
            time: '18:00', 
            points: 5 }),
        ev({ 
            title: 'Workout', 
            icon: '🏋️', 
            time: '22:00', 
            points: 20 }),
        ev({ 
            title: 'Wind down', 
            icon: '😴', 
            time: '23:00', 
            points: 8 }),
    ]
}