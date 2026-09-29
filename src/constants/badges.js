export const BADGES = [
    { 
        id: 'first_entry', 
        name: 'First Entry', 
        desc: 'Write your first entry', 
        icon: '🌱', 
        check: (s) => s.totalEntries >= 1 
    },
    { 
        id: 'streak_3', 
        name: 'Warm Up', 
        desc: '3-day journaling streak', 
        icon: '🔥', 
        check: (s) => s.maxStreak >= 3 
    },
    { 
        id: 'streak_7', 
        name: 'Week One', 
        desc: '7-day journaling streak', 
        icon: '🔥', 
        check: (s) => s.maxStreak >= 7 
    },  
    { 
        id: 'streak_30', 
        name: 'Dedicated', 
        desc: '30-day journaling streak', 
        icon: '🔥', 
        check: (s) => s.maxStreak >= 30 
    },
    { 
        id: 'entries_50', 
        name: 'Half Century', 
        desc: '50 entries written', 
        icon: '📖', 
        check: (s) => s.totalEntries >= 50 
    },
    { 
        id: 'entries_100', 
        name: 'Centurion', 
        desc: '100 entries written', 
        icon: '📖', 
        check: (s) => s.totalEntries >= 100 
    },
    { 
        id: 'words_10000', 
        name: 'Wordsmith', 
        desc: '10,000 words written', 
        icon: '✍️', 
        check: (s) => s.totalWords >= 10000 
    },
    { 
        id: 'night_owl', 
        name: 'Night Owl', 
        desc: 'Log an entry after 9pm', 
        icon: '🌙', 
        check: (s) => s.nightOwlDone 
    },
    { 
        id: 'early_bird', 
        name: 'Early Bird', 
        desc: 'Log an entry before 7am', 
        icon: '🌅', 
        check: (s) => s.earlyBirdDone 
    },
    { 
        id: 'points_1000', 
        name: 'High Scorer', 
        desc: 'Earn 1,000 total points', 
        icon: '⭐', 
        check: (s) => s.totalPoints >= 1000 
    },
]
