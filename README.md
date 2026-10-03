# commit() journal

An 8-bit styled daily journal and habit tracker. Write a short entry each day, check off your daily events, earn points, build streaks and unlock badges. Everything runs in the browser and is stored locally, with no account and no backend.

## Features

- **Journal entries**: pick a mood (1–5), answer the daily writing prompt (or shuffle to another), add tags and write freely.
- **Daily events**: recurring habits with a time, icon and point value (water, workout, prayer, etc.). Tap to complete them; add, edit or delete your own.
- **Points**: 10 points per entry, plus 2 for every 20 words (up to +20), plus points for each completed event.
- **Streaks**: consecutive days with an entry, shown in the header and on the calendar.
- **Badges**: 10 achievements, such as First Entry, Week One, Wordsmith, Night Owl and Early Bird.
- **Calendar view**: see which days have entries; tap a day to open it, or tap today to write.
- **Reminders**: in-app toasts and optional browser notifications when an event is due, and a nightly nudge if you haven't journaled (default 20:00).
- **Themes**: `AUTO`, `DAY`, `EVENING` and `NIGHT`. Auto switches by time of day.
- **Local persistence**: all data is saved to `localStorage`.

## Getting started

Requires [Node.js](https://nodejs.org/) 18+.

```bash
git clone <repo-url>
cd commit-journal
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

### Scripts

| Command           | What it does                         |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the dev server with hot reload |
| `npm run build`   | Create a production build in `dist/` |
| `npm run preview` | Serve the production build locally   |

## Tech stack

- [React 19](https://react.dev/)
- [Vite](https://vite.dev/)
- Plain CSS (`src/index.css`)
- Browser `localStorage` and the Notifications API

## Project structure

```
src/
├── App.jsx                 # App shell, tab state, sheet open/close handlers
├── components/
│   ├── Header/             # Points, stats and theme switcher
│   ├── timeline/           # Today's events and entries
│   ├── calendar/           # Month view with streaks
│   ├── badges/             # Achievement grid
│   ├── compose/            # New/edit entry sheet, mood picker, prompt card
│   └── events/             # New/edit event sheet
├── constants/              # Badges, default events, moods, prompts, tags
├── hooks/                  # useJournalData, useNotifications, useResolvedMode, useToasts
└── utils/                  # Date, points, streak, stats and storage helpers
```

## Data and privacy

Entries, events, badges and settings are stored only in your browser under the key `journal_8bit_state_v1`. Clearing site data removes them. Nothing is sent to a server.

## Roadmap

- Export and import your data (JSON)
- Edit the nightly reminder time from the UI
- Tests for the points, streak and badge logic

## License

No license specified yet.
