# Day 5: Final Master Project Presentation & Evaluation

## Project Title
**DevTrack — Developer Workspace & Task Management Platform**

---

## 1. Project Overview
DevTrack is an intermediate-level frontend application built to streamline developer task tracking, project management, and workflow metrics. It combines dynamic client-side routing, asynchronous mock API integration, reactive state management with caching, multi-criteria filtering, and local data persistence into a modern, responsive user interface.

---

## 2. Problem Statement
Software developers and team leads often struggle with fragmented task management tools that are either overly bloated or lack real-time reactivity, fast client-side searching, and local persistence. DevTrack addresses this by providing a lightweight, type-safe, and lightning-fast web application tailored for managing developer deliverables.

---

## 3. Features
* **Interactive Analytics Dashboard:** Real-time completion rates, active task counters, and high-priority flags.
* **Full CRUD Operations:** Create, read, update status, and delete tasks dynamically.
* **Advanced Search & Filtering:** Instant text search across titles/descriptions with filtering by status and priority level.
* **Multi-Field Sorting:** Sort tasks dynamically by date, priority weight, or alphabetical title order (ASC/DESC).
* **LocalStorage Data Persistence:** Remembers user search queries, active filter tabs, and task data across browser sessions.
* **Modal-Driven Forms:** Clean, isolated form components for creating new tasks with custom priorities.
* **Type-Safe Component Architecture:** Built completely with TypeScript to catch errors at compile time.

---

## 4. Technology Stack
* **Frontend Framework:** React 18 (with Vite)
* **Language:** TypeScript
* **Routing:** React Router DOM (v6)
* **Data Fetching & Caching:** `@tanstack/react-query`
* **Styling & UI:** Tailwind CSS & Lucide React (Icons)
* **State & Persistence:** React Hooks & Browser `localStorage`

---

## 5. Project Architecture
The project follows a modular, feature-based architecture separating presentational components, pages, custom hooks, service layers, and global TypeScript declarations:

```text
src/
├── assets/          # Static media and graphics
├── components/      # Reusable UI elements
│   ├── common/      # Generic atomic components (Button, Badge, Modal)
│   └── layout/      # Core app scaffolding (Layout, Navbar, Sidebar)
├── hooks/           # Custom React hooks (useTasks, useLocalStorage)
├── pages/           # Application views (Dashboard, Tasks, Projects, Settings)
├── services/        # Asynchronous API service layer & storage logic
├── types/           # Centralized TypeScript declarations & interfaces
├── App.tsx          # Router configuration & React Query Provider setup
└── main.tsx         # Application entry point