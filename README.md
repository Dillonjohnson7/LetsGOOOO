# lets GOOOO 💪 — Workout Tracker

A personalized workout tracker with auto-generated routines, per-set tracking, SVG exercise illustrations, stretching cooldowns, and meditation timer.

## Features

- **3 modes**: Bodyweight, Basic Equipment, Full Gym
- **Auto-calibrated** workouts based on height, weight, and lifting experience
- **Per-set tracking** with checkboxes and auto-rest timer
- **SVG exercise illustrations** for every exercise (40+ unique poses)
- **4 rotating workout variations** per body part per mode (keeps it fresh)
- **Stretching cooldown** with guided timer
- **Meditation timer** (3/5/10 min) with breathing ring
- **Monthly baseline check-in** to recalibrate
- **Premium tier**: Yoga & Animal Flow (free for you, $9.99 for everyone else)
- **Guarantee**: Amazing looks and longevity for you AND your family

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
letsgooo-app/
├── index.html          # Entry HTML with PWA meta tags
├── package.json        # Dependencies & scripts
├── vite.config.js      # Vite configuration
├── src/
│   ├── main.jsx        # React root mount
│   └── App.jsx         # Full application (single-file)
└── README.md
```

## Tech Stack

- **React 18** — UI framework
- **Vite 6** — Build tool & dev server
- **Inline SVG** — Exercise illustrations (no external assets)
- **CSS-in-JS** — All styles are inline (zero CSS files)

## Working with Claude Code

This project is set up for easy iteration with Claude Code. The entire app lives in `src/App.jsx`. Key sections:

1. **SVG Illustrations** (top) — `ExerciseFigure` + `getExerciseSVG`
2. **Workout Database** — `WORKOUTS`, `STRETCHES`, `YOGA_FLOWS`, `ANIMAL_FLOWS`
3. **Intensity Calculator** — `calcIntensity` + `adjustWorkout`
4. **Components** — `Onboarding`, `MeditationTimer`, `StretchView`, `WorkoutView`, `PremiumModal`, `PremiumWorkout`, `MonthlyCheckIn`
5. **Main App** — screen routing & state management
6. **Styles** — all style constants at the bottom

## Future Ideas

- Persist data with localStorage or a backend
- Add workout history / calendar view
- Progressive overload tracking
- Rest day recommendations
- Dark/light theme toggle
- PWA with offline support
- Sound effects / haptics for timer completion
