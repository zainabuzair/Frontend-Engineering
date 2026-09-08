# Day 2: Props, State & Events

## 📌 Executive Summary
Today's session expanded on fundamental React concepts by introducing interactive state management, unidirectional data flow via **Props**, event handling, and controlled form inputs. The core objective was to move beyond static UI rendering and create interactive, responsive components.

During the hands-on setup, a dedicated environment (`Day-2`) was created to build stateful counters, interactive card collections, and controlled form elements that facilitate parent-child communication.

---

## 📑 Topics Covered

### 1. Data Flow & Structure
* **Props (Properties):** Unidirectional data passed from parent to child components to configure UI elements dynamically.
* **Passing Data Between Components:** Demonstrating how parent components feed configuration data down the component tree.
* **Component Composition:** Structuring reusable UI widgets (`ProductCard`, `Counter`, `InteractiveForm`) inside a unified root layout (`App.jsx`).

### 2. State Management & Lifecycle
* **`useState` Hook:** React's built-in Hook allowing functional components to hold and update local state variables.
* **State Updates & Re-rendering:** Understanding how updating state triggers React to re-render the component and update the DOM efficiently.

### 3. Events & Interactivity
* **Event Handling:** Capturing user actions using JSX event handlers like `onClick` and `onSubmit`.
* **Controlled Inputs in Forms:** Binding form input `value` attributes directly to React state and handling updates via `onChange`.
* **Parent-Child Communication:** Passing callback functions from parent components to child components to send state updates up the component tree.

---

## 🛠️ Project Structure

```text
Day-2/
├── node_modules/
├── public/
├── src/
│   ├── components/
│   │   ├── Counter.jsx          # Demonstrates useState and click handlers
│   │   ├── ProductCard.jsx      # Reusable card with props & local like state
│   │   └── InteractiveForm.jsx  # Controlled form lifting state up to App
│   ├── App.jsx                  # Main component managing card array state
│   ├── index.css                # Layout, card grid, and form styling
│   └── main.jsx                 # Application entry point
├── index.html                   # Main HTML document container
├── package.json                 # Project dependencies and npm scripts
└── vite.config.js               # Vite build configuration
```

---

## 🚀 Getting Started

### Prerequisites
* **Node.js** (v18.0.0 or higher)
* **npm** (Node Package Manager)

---

## 📝 Hands-on Implementation Summary

1. **Project Setup:** Created a standalone React application using `npm create vite@latest Day-2`.
2. **Interactive Counter:** Implemented `Counter.jsx` with `useState` to increment, decrement, and reset numeric values dynamically.
3. **Controlled Form & State Lifting:** Built `InteractiveForm.jsx` to collect user input and communicate newly created card data to `App.jsx`.
4. **Dynamic Card Grid:** Rendered custom product cards using `ProductCard.jsx`, featuring local "Like" state toggles inside each instance.

---
