# ⏱️ Expo Timer Manager App

A feature-rich timer management application built with React Native and Expo. Manage multiple timers with categories, track completion history, and visualize progress.

![App Preview](https://via.placeholder.com/800x400.png?text=Timer+App+Preview) <!-- Add actual screenshot later -->

## ✨ Features

- 🎯 Create timers with custom names/categories
- 📊 Visual progress indicators
- 📅 Completion history tracking
- 🚀 Bulk category controls (Start/Pause/Reset All)
- 🔔 50% completion alerts
- 🌓 Light/Dark mode support
- 📥 Export timer history

## 🛠️ Getting Started

### Prerequisites

- Node.js v18+
- Expo CLI (`npm install -g expo-cli`)
- Android/iOS simulator or physical device

### Installation

1. **Clone repository**

   ```bash
   git clone https://github.com/anandjha8719/timer-Hflex.git
   cd timer-Hflex

   ```

2. **Install dependencies**
   ```bash
   npm install
   npx expo install @react-navigation/native react-native-paper @react-native-async-storage/async-storage react-native-safe-area-context react-native-screens react-native-gesture-handler @expo/vector-icons
   ```

3 **Start development sever**

```bash
npx expo start

## 🧠 Implementation Assumptions

### 📌 Data Persistence
- Uses **AsyncStorage** for local data persistence
- Maximum **1,000 timers** stored locally
- History limited to **last 500 completed timers**

### 📱 Device Capabilities
- **Timezone-aware** history timestamps
- Categories are **case-sensitive** (`"Work"` ≠ `"work"`)
- Timer resolution limited to **1-second intervals**

### ⚙️ Technical Constraints
- Optimized for **mobile screens** (not tablet-optimized)
- **Not designed for background operation** (timers pause when the app is inactive)
```
