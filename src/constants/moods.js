export const MOOD_META = [
    { 
        value: 1, 
        emoji: '😞', 
        color: '#FF3355', 
        label: 'very low' 
    },
    { 
        value: 2, 
        emoji: '😕', 
        color: '#FF8A3D', 
        label: 'low' 
    },
    { 
        value: 3, 
        emoji: '😐', 
        color: '#8C7FB8', 
        label: 'neutral' 
    },
    { 
        value: 4, 
        emoji: '🙂', 
        color: '#FFD23F', 
        label: 'good' 
    },
    { 
        value: 5, 
        emoji: '😄', 
        color: '#4AFF6E', 
        label: 'great' 
    },
]

export function moodMeta(value) {
  return MOOD_META.find((m) => m.value === value) || MOOD_META[2]
}
