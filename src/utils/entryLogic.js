import { dateKey, todayKey, addDays } from "./date";

//generate random UID for entries
export function uid(){
    return Math.random().toString(36).slice(2,9) + Date.now().toString(36).slice(-4)
}

//count # of words entered for entry-based points
export function wordCount(text){
    const t = (text || '').trim()
    if(!t)
        return 0
    return t.split(/\s+/).length
}

//10 points per entry and additional 2 points per 20 words (max 20 additional points)
export function computeEntryPoints(words){
    return 10+Math.min(Math.floor(words/20) * 2, 20)
}


//count the # of days a journal has been entered
export function computeEntryStreak(entries){
    const dates = {}
    entries.forEach((e) => {dates[e.date] = true})
    
    let count = 0
    let cursor = new Date()
    if(!dates[todayKey()])
        cursor = addDays(cursor, -1)

    while(true){
        if(dates[dateKey(cursor)]){
            count++
            cursor = addDays(cursor, -1)
        }
        else
            break
    if(count > 3650)
        break
    }
    return count
}