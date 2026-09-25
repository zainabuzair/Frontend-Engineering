# Week 5 Capstone Project - Frontend Engineering Masterclass

A complete single-page web application demonstrating modern frontend architecture, state management, REST API synchronization, and client-side authentication.

## Key Features & Architecture
- **React Router v6**: Client-side navigation with protected route enforcement.
- **TanStack Query v5**: Efficient data fetching, cache stale-time control, optimistic query invalidation, and REST mutations.
- **REST API Integration**: Complete HTTP operations (`GET`, `POST`, `DELETE`) with remote state management.
- **Form State & Validation**: Controlled forms with real-time field error validation.
- **Authentication**: JWT token storage, local storage hydration, and authenticated session management.

## Project Structure
Day-5/
├── src/
│   ├── App.jsx          # Main application, routes, query client & components
│   ├── index.css        # Tailwind CSS imports
│   └── main.jsx         # React application entry point
├── package.json
└── README.md