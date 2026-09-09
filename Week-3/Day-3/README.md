# Day 3: Lists, Conditional Rendering & Hooks

## 📌 Executive Summary
Today's session focused on handling dynamic lists, implementing conditional UI rendering, and managing asynchronous side effects using React's `useEffect` Hook. The primary objective was to build a real-world, searchable, and filterable application that processes state updates efficiently while preserving structural performance.

A dedicated standalone project directory (`Day-3`) was initialized to build a searchable inventory catalog complete with real-time filtering, category toggling, mock API fetching, loading state feedback, and empty search fallback screens.

---

## 📑 Topics Covered

### 1. Rendering Lists & Optimization
* **Rendering Lists with `.map()`:** Transforming arrays of JavaScript objects into structured JSX elements dynamically.
* **The Importance of Keys:** Utilizing unique `key` props (e.g., `item.id`) to assist React's virtual DOM reconciliation algorithm in tracking, reordering, and re-rendering list items efficiently.

### 2. Conditional Rendering Techniques
* **Ternary Operators:** Displaying alternative UI states concisely (`condition ? <ComponentA /> : <ComponentB />`), such as toggling stock badge styles (`in-stock` vs `out-of-stock`).
* **Logical `&&` Rendering:** Short-circuiting UI elements that should only render when a condition evaluates to true.
* **Early Return / Fallback Views:** Displaying clear empty-state notifications when filtered search queries return zero results.

### 3. Asynchronous Operations & `useEffect` Hook
* **Component Lifecycle Concepts:** Understanding Mount, Update, and Unmount phases in functional React components.
* **Side Effects Management:** Fetching data, setting timers, or subscribing to external services outside the main render loop using `useEffect`.
* **Dependency Arrays:**
  * `[]` *(Empty Array)*: Runs effect only once when the component mounts.
  * `[stateVar]`: Runs effect on mount and whenever specified state/prop variables change.
  * *No Array*: Runs effect on every single component render cycle.

---

## 🛠️ Project Structure

```text
Day-3/
├── node_modules/
├── public/
├── src/
│   ├── components/
│   │   ├── SearchBar.jsx     # Controlled input component for search queries
│   │   ├── FilterTabs.jsx    # Category filter navigation buttons
│   │   └── ProductList.jsx   # List rendering, keys & conditional stock badges
│   ├── App.jsx               # App container handling useEffect side effects & filtering
│   ├── index.css             # Grid layouts, tab styling, and badge designs
│   └── main.jsx              # Application entry point
├── index.html                # Main HTML document container
├── package.json              # Project dependencies and npm scripts
└── vite.config.js            # Vite build configuration
```

---

## 🚀 Getting Started

### Prerequisites
* **Node.js** (v18.0.0 or higher)
* **npm** (Node Package Manager)


## 📝 Hands-on Implementation Summary

1. **Project Setup:** Created a standalone React application using `npm create vite@latest Day-3`.
2. **Simulated Asynchronous Data Fetching:** Utilized `useEffect` in `App.jsx` with a 1-second timer delay to mimic fetching data from an external inventory database on component mount.
3. **Real-time Controlled Search:** Implemented `SearchBar.jsx` to filter item names dynamically as the user types.
4. **Category Filter Navigation:** Developed `FilterTabs.jsx` to filter database products based on dynamic category selections ("All", "Electronics", "Books", "Clothing").
5. **Conditional Feedback & List Rendering:** Rendered loaded data via `.map()` inside `ProductList.jsx`, featuring stock status badges and empty result fallbacks.

