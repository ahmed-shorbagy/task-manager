# 📋 Task Manager

A clean, intuitive, and feature-rich Task Manager app built with **React Native** and **Expo**. Designed with a premium UI/UX featuring animated interactions, priority levels, search, and progress tracking.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| **Add Task** | Create new tasks with a brief description |
| **Mark Complete** | Toggle tasks as done — visual strikethrough and animated checkbox |
| **Delete Task** | Remove tasks from the list with smooth animations |
| **Task List** | All tasks displayed in an optimized `FlatList` |
| **Priority Levels** | Assign Low / Medium / High priority with color-coded indicators |
| **Search** | Filter tasks in real-time by text content |
| **Filter Tabs** | Toggle between All, Active, and Completed tasks |
| **Progress Tracking** | Visual progress bar and completion percentage in the header |
| **Haptic Feedback** | Tactile response on task interactions (iOS & Android) |
| **Animations** | Smooth LayoutAnimation for add/delete, spring animations for checkboxes |
| **Empty States** | Contextual empty messages for each filter/search state |
| **Custom App Icon** | Branded indigo app icon with checkmark design |

---

## 📱 Screenshots

The app features:
- **Indigo gradient header** with progress bar and task stats
- **Search bar** for quick task lookup
- **Filter tabs** (All / Active / Done) with count badges
- **Priority selector** with color-coded chips (Low, Medium, High)
- **Task cards** with left-edge priority bars, animated checkboxes, and delete buttons

---

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| **React Native** | Cross-platform mobile framework |
| **Expo SDK 54** | Development toolchain and build system |
| **Expo Router** | File-based routing |
| **expo-haptics** | Haptic feedback for user interactions |

> **No external state management libraries** are used. All state is managed locally with React's `useState` hook, demonstrating core React state and props patterns.

---

## 📁 Project Structure

```
task-manager/
├── app/                          # Expo Router entry points
│   ├── _layout.tsx               # Root navigation layout
│   └── (tabs)/
│       ├── _layout.tsx           # Tab configuration (single screen)
│       └── index.tsx             # Entry → renders HomeScreen
├── components/
│   ├── TaskInput.js              # Text input + priority selector + add button
│   ├── TaskItem.js               # Individual task card with animations
│   ├── FilterTabs.js             # All / Active / Done filter tabs
│   ├── ProgressHeader.js         # Header with progress bar and stats
│   └── SearchBar.js              # Search input with clear button
├── screens/
│   └── HomeScreen.js             # Main screen — state management + layout
├── assets/images/
│   └── icon.png                  # Custom app icon
├── app.json                      # Expo configuration
├── package.json                  # Dependencies
└── README.md                     # This file
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- A mobile device with **Expo Go** app, or an emulator/simulator

### Setup & Run

```bash
# 1. Clone the repository
git clone https://github.com/ahmed-shorbagy/task-manager.git
cd task-manager

# 2. Install dependencies
npm install

# 3. Start the development server
npx expo start
```

### Run on Device

| Platform | Command |
|----------|---------|
| **Expo Go** | Scan the QR code with your phone |
| **Android Emulator** | Press `a` in the terminal |
| **iOS Simulator** | Press `i` in the terminal |
| **Web Browser** | Press `w` in the terminal |

---

## 🏗 Architecture & Design Decisions

| Decision | Rationale |
|----------|-----------|
| `useState` only | Simple, built-in state management — no Redux overhead |
| `React.memo` on all components | Prevents unnecessary re-renders in FlatList |
| `useCallback` for handlers | Provides stable references for memoized children |
| `useMemo` for derived state | Efficient filtering and counting without redundant computation |
| `LayoutAnimation` for transitions | Smooth add/delete animations without complex gesture libraries |
| Timestamp + counter IDs | Unique task IDs without external UUID libraries |
| `KeyboardAvoidingView` | Input stays visible when keyboard opens |
| Platform-specific shadows | Native iOS shadows and Android elevation |
| `expo-haptics` for feedback | Tactile response enhances perceived quality |

---

## 📦 Third-Party Libraries

| Library | Purpose |
|---------|---------|
| `expo` | Core Expo SDK — app runtime and development tools |
| `expo-router` | File-based navigation/routing for Expo apps |
| `expo-haptics` | Native haptic feedback (vibration) on user interactions |
| `expo-status-bar` | Status bar appearance control |
| `react-native-reanimated` | Required by Expo Router for navigation transitions |
| `react-native-gesture-handler` | Required by Expo Router for gesture-based navigation |

> All libraries are included in the default Expo template. **No additional dependencies** were installed.

---

## 📝 Code Quality

- **Modular components** — Each component handles a single responsibility
- **Thorough JSDoc comments** — All components and functions are documented
- **Consistent naming** — camelCase for variables, PascalCase for components
- **Clean separation** — State logic in `HomeScreen`, presentation in child components
- **Performance optimized** — `React.memo`, `useCallback`, `useMemo`, FlatList tuning

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start Expo development server |
| `npm run android` | Launch on Android emulator |
| `npm run ios` | Launch on iOS simulator |
| `npm run web` | Launch in web browser |
| `npm run lint` | Run ESLint code linting |

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
