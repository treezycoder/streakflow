# StreakFlow

**StreakFlow** is a powerful and intuitive habit tracking web app built with **Next.js**, **React**, **Redux Toolkit**, and **Tailwind CSS**. It empowers users to build better habits, visualize progress, and stay consistent through daily streaks, reminders, and persistent settings.

## ✨ Features

- ✅ **Habit Management** – Add, edit, and remove your daily habits.
- 📊 **Progress Tracking** – Visualize your streaks and habit completion using interactive charts.
- 🔔 **Reminders & Notifications** – Stay on track with timely prompts.
- 🎨 **Custom Settings** – Toggle between light and dark themes.
- 💾 **Persistent Storage** – Redux state is synced with `localStorage` to retain data across sessions.

## 🧰 Tech Stack

- **Next.js** – App framework with SSR support and optimized performance.
- **React 19** – Modern UI development with concurrent rendering.
- **Redux Toolkit** – Scalable and easy-to-use global state management.
- **Tailwind CSS 4** – Utility-first styling for responsive design.
- **Framer Motion** – Smooth UI animations.
- **Recharts** – Elegant charting and data visualization.
- **React Icons**, **Hot Toast**, and more for UI enhancements.

## 📁 Project Structure

```
src/
├── app/             # Next.js pages and layout
├── components/      # Shared UI components
├── lib/
│   ├── assets/      # Static assets (images, icons, etc.)
│   ├── hooks/       # Custom React hooks (e.g., localStorage sync)
│   └── utils/       # Helper functions
├── redux/
│   ├── hooks/       # Typed Redux hooks
│   ├── slices/      # State slices (habits, progress, etc.)
│   └── store/       # Redux store configuration
└── types/           # Global TypeScript types
```

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/treezyvarrick/streakflow.git
cd streakflow
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

Open `http://localhost:3000` to see the app.

## 📦 Scripts

| Command         | Description                           |
| --------------- | ------------------------------------- |
| `npm run dev`   | Run development server with Turbopack |
| `npm run build` | Build for production                  |
| `npm run start` | Start production server               |
| `npm run lint`  | Lint and fix code style issues        |

## 🤝 Contributing

Contributions are welcome! Feel free to fork the project, open issues, or submit PRs to improve StreakFlow.
