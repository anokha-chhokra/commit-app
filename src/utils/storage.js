const STORAGE_KEY = 'journal_8bit_state_v1'

export function loadState() {
    try{
        const raw = localStorage.getItem(STORAGE_KEY)
        if(!raw)
            return null
        const parsed = JSON.parse(raw)
        if(!parsed || !Array.isArray(parsed.events) || !Array.isArray(parsed.entries))
            return null
        return parsed
    }
    catch{
        return null
    }
}

export function saveState(state){
    try{
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    }
    catch{
        
    }
}