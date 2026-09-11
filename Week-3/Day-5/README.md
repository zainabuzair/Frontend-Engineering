# Week 3 Capstone: DevHub Knowledge & Resource Vault

A modular React.js developer dashboard built with Vite. This project consolidates core frontend engineering concepts—including custom hooks, asynchronous data fetching, component architecture, state lifting, controlled forms, and dynamic list filtering—into a single production-grade interface.

---

## 📸 Key Features

* **Custom Hook Architecture (`useResourceApi`):** Handles asynchronous side effects, fetch loading states, and error handling cleanly outside the UI tree.
* **Controlled Form Modal (`ResourceForm`):** Enables user-created snippets with real-time state synchronization and dynamic validation.
* **Multi-Criteria Filtering (`FilterSidebar`):** Supports live search queries combined with category tag filtering across data records.
* **Dynamic Feedback States:** Renders skeleton loaders during data fetch operations and feedback alerts when search results or network calls are empty/failing.
* **Interactive State Operations:** Features item favoriting (starred bookmarks), instant deletion, and local state updates.

---

## 🛠️ Concepts Covered

1. **React Fundamentals & JSX:** Component breakdown and declarative layout structures.
2. **Props & Immutability:** Unidirectional data flow from `App.jsx` down to specialized leaf components.
3. **State Management & Events:** Controlled form inputs, modal toggle handlers, and list updating routines.
4. **Lists & Conditional Rendering:** Dynamic mapping using unique keys, dynamic skeleton loading, and feedback banners.
5. **Side Effects & Custom Hooks:** Encapsulated API data transformation and state lifting patterns.

---

## 📂 Project Structure

```text
Week-3-Project/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── StatusBadge.jsx      # Reusable tag/badge indicator
│   │   │   ├── LoadingSkeleton.jsx  # Card loader state
│   │   │   └── AlertBanner.jsx      # Network status banner
│   │   ├── vault/
│   │   │   ├── ResourceForm.jsx     # Controlled form with modal editor
│   │   │   ├── ResourceCard.jsx     # Interactive item card with favoriting
│   │   │   └── ResourceGrid.jsx     # Responsive grid list mapper
│   │   └── sidebar/
│   │       └── FilterSidebar.jsx    # Category and search controls
│   ├── hooks/
│   │   └── useResourceApi.js        # Custom hook for side effects & API fetch
│   ├── App.jsx                       # Master state orchestrator
│   ├── main.jsx                     # Application root entrypoint
│   └── index.css                     # Modern dark dashboard theme
├── package.json
└── README.md