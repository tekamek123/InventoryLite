# InventoryLite 📦

A sleek, lightweight inventory management mobile application built with **React Native (Expo)** and **NativeWind (Tailwind CSS)**. This project demonstrates basic user registration, product management, stock adjustment, and transaction logging—all using local state.

## 🚀 Features

- **User Management**: Register users with email and full name.
- **Product Management**: Create products with SKU, name, price, and initial quantity.
- **Stock Control**: Adjust inventory levels (add/remove) with safety checks to prevent negative stock.
- **Live Status**: View real-time product status including quantity and last updated timestamps.
- **Transaction History**: Comprehensive log of all inventory changes with pagination.
- **Responsive UI**: Built with NativeWind for a modern, consistent look across devices.

## 🛠️ Tech Stack

- **Framework**: [Expo](https://expo.dev/) (React Native)
- **Styling**: [NativeWind v4](https://www.nativewind.dev/) (Tailwind CSS for React Native)
- **Navigation**: [React Navigation](https://reactnavigation.org/)
- **State Management**: React Context API & Hooks (`useState`, `useCallback`, `useMemo`)
- **Icons**: [Lucide React Native](https://lucide.dev/guide/packages/lucide-react-native)

## 📦 Setup & Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm start
   ```

3. **Run on a device**:
   - Use the **Expo Go** app on your iOS or Android device.
   - Scan the QR code displayed in your terminal.

## 🧠 Approach & Trade-offs

### Approach
- **Local State Simulation**: Since no backend was required, I used the React Context API to simulate a centralized "database". This provides a single source of truth for users, products, and transactions across different screens.
- **Modern UI/UX**: Leveraged NativeWind (Tailwind CSS) to create a premium feel with custom cards, vivid status badges, and smooth transitions. I focused on white-space and elevation to make the app feel "Pro".
- **Safety First**: Implemented logic in the state provider to prevent negative stock and ensure SKU uniqueness, mirroring real-world database constraints.
- **Scalable Structure**: Organized the codebase into `src/components`, `src/screens`, and `src/context` to demonstrate clean architectural separation, even for a "small assignment".

### Trade-offs
- **In-Memory Storage**: Data is currently stored in memory. In a production environment, I would integrate **AsyncStorage** for persistence or a local database like **SQLite/Realm**.
- **User Association**: For simplicity in this demo, transactions are logged as "System" or generic actions. A full app would require an "Active User" selection during registration or a login flow to properly attribute stock changes.
- **Pagination Strategy**: Implemented client-side pagination for transaction history. For a real app with thousands of logs, I would implement server-side pagination with infinite scrolling.

---
*Created for the InventoryLite Assignment - Feb 2026*
