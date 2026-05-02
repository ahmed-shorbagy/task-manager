# 📋 Task Manager

A clean, minimal React Native task manager app built with **Expo**.

## Features

- ✅ **Add tasks** — Type a task and tap the add button (or press return)
- ✅ **Toggle completion** — Tap a task to mark it done (visual strikethrough + green checkbox)
- ✅ **Delete tasks** — Remove tasks with the delete button
- ✅ **Empty submission prevention** — The add button is disabled when input is empty
- ✅ **Unique task IDs** — Each task gets a unique identifier
- ✅ **Optimized rendering** — `React.memo`, `useCallback`, and FlatList tuning
- ✅ **Task progress counter** — See how many tasks you've completed
- ✅ **Empty state** — Friendly placeholder when no tasks exist

## Tech Stack

- **React Native** with Expo SDK 54
- **Functional components** + React Hooks (`useState`, `useCallback`)
- **No external state management** — pure `useState`
- **No backend or database** — everything runs locally in memory

## Project Structure

```
task-manager/
├── app/                    # Expo Router entry points
│   ├── _layout.tsx         # Root navigation layout
│   └── (tabs)/
│       ├── _layout.tsx     # Tab configuration
│       └── index.tsx       # Entry point → renders HomeScreen
├── components/
│   ├── TaskInput.js        # Text input + add button component
│   └── TaskItem.js         # Individual task row component
├── screens/
│   └── HomeScreen.js       # Main screen with task state management
├── app.json                # Expo configuration
├── package.json            # Dependencies
└── README.md               # This file
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- A mobile device with **Expo Go** or an emulator/simulator

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ahmed-shorbagy/task-manager.git
   cd task-manager
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npx expo start
   ```

4. **Run on a device**
   - Scan the QR code with Expo Go (Android) or Camera app (iOS)
   - Or press `a` for Android emulator / `i` for iOS simulator

## Design Decisions

| Decision | Rationale |
|----------|-----------|
| `useState` only | Keeps state management simple and avoids unnecessary dependencies |
| `React.memo` on components | Prevents re-renders of unchanged task items in the FlatList |
| `useCallback` for handlers | Stable function references for memoized child components |
| Timestamp-based IDs | Ensures unique task identifiers without external libraries |
| `KeyboardAvoidingView` | Input remains visible when the keyboard is open |
| Platform-specific shadows | Native look on both iOS (shadow) and Android (elevation) |

## Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start Expo dev server |
| `npm run android` | Start on Android |
| `npm run ios` | Start on iOS |
| `npm run web` | Start on web |

## License

This project is open source and available under the [MIT License](LICENSE).
