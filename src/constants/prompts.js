export const PROMPTS = [
    {  
        id: 'gratitude', 
        icon: '🙏', 
        label: 'Gratitude', 
        text: "Three things you're grateful for today" 
    },
    { 
        id: 'reflection', 
        icon: '🔄', 
        label: 'Reflection', 
        text: "One thing you'd do differently" 
    },
    { 
        id: 'highlight', 
        icon: '✨', 
        label: 'Highlight', 
        text: 'Best part of your day' 
    },
    { 
        id: 'challenge', 
        icon: '⚔️', 
        label: 'Challenge', 
        text: 'Something that tested you today' 
    },
    { 
        id: 'growth', 
        icon: '🌱', 
        label: 'Growth', 
        text: 'Something you learned' 
    },
]

export function promptForDay(){
    const dayOfEpoch = Math.floor(Date.now() / 86400000)
    return PROMPTS[dayOfEpoch % PROMPTS.length]
}

export function promptById(id){
    return PROMPTS.find((p) => p.id === id) || null
}