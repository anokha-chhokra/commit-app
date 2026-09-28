import { todayKey } from "./date";

export function getEventComp(ev, key){
    return (ev.completions && ev.completions[key]) || {done: false, pointsEarned: 0}
}

export function toggleEventDone(ev){
    const key = todayKey
    const comp = getEventComp(ev, key)
    const done = !comp.done

    return{
        ...ev,
        completions: {
            ...ev.completions,
            [key]: { done, pointsEarned: done? ev.points: 0},
        },
    }
}