# Week 5 – Day 2: REST API Integration & Data Management

A modern, interactive React application built with **Vite** and **Tailwind CSS** that demonstrates client-side data fetching, full CRUD operations, network error handling, custom headers, and live HTTP request/response inspection using both native `fetch()` and `axios`.

---

##  Table of Contents
- [Overview & Objectives](#-overview--objectives)
- [Key Topics Covered](#-key-topics-covered)
- [Project Architecture](#-project-architecture)
- [REST API Reference & HTTP Specifications](#-rest-api-reference--http-specifications)
- [Features](#-features)
- [Step-by-Step Setup Guide](#-step-by-step-setup-guide)
- [Learning Takeaways](#-learning-takeaways)

---

##  Overview & Objectives

The goal of today's hands-on lab was to connect a React client application to a live public REST API (`JSONPlaceholder`) to dynamically fetch, display, create, update, and delete remote data. 

### Learning Objectives:
* Master client-server data flow concepts over HTTP/HTTPS.
* Understand REST architecture, request methods, and standard HTTP response status codes.
* Compare native browser `fetch()` with `axios` for network requests.
* Implement UI states for **Loading (Skeleton UI)**, **Success**, and **Error handling**.
* Inspect HTTP headers (`Content-Type`, `Authorization`, `Accept`) and JSON payloads in real time.

---

##  Key Topics Covered

1. **REST API Core Concepts**
   - Endpoints, resources, JSON data serialization, and request/response lifecycles.
2. **HTTP Request Methods**
   - **`GET`**: Retrieve posts with dynamic pagination and filtering.
   - **`POST`**: Submit new resource payloads to the server.
   - **`PUT`**: Replace an existing resource entirely.
   - **`PATCH`**: Perform partial field updates on a resource.
   - **`DELETE`**: Remove resources with optimistic UI updates.
3. **HTTP Status Codes**
   - `200 OK` / `201 Created` (Success)
   - `400 Bad Request` / `404 Not Found` (Client Errors)
   - `500 Internal Server Error` (Server Failures)
4. **Data Fetching Libraries**
   - Native `window.fetch()` API.
   - `axios` instance configuration, headers, and request cancelation.
5. **Asynchronous React State**
   - Managing `loading`, `error`, `data`, and pagination state cleanly without infinite re-render loops (`useCallback` / `useEffect`).

---

##  Project Architecture

Day-2/
├── node_modules/
├── public/
├── src/
│   ├── assets/
│   ├── App.jsx              # Main React App with CRUD, Drawer & API Playground
│   ├── index.css            # Tailwind CSS directives (@import "tailwindcss";)
│   └── main.jsx             # React DOM entry point
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js           # Vite config with @tailwindcss/vite plugin

---

##  REST API Reference & HTTP Specifications

The application connects to **JSONPlaceholder**: `https://jsonplaceholder.typicode.com`

| HTTP Method | Endpoint | Purpose | Expected Status Code |
| :--- | :--- | :--- | :--- |
| **`GET`** | `/posts` | Retrieve post feed | `200 OK` |
| **`POST`** | `/posts` | Create a new post | `201 Created` |
| **`PUT`** | `/posts/:id` | Full update on post `:id` | `200 OK` |
| **`PATCH`** | `/posts/:id` | Partial update on post `:id` | `200 OK` |
| **`DELETE`** | `/posts/:id` | Remove post `:id` | `200 OK` |

---

##  Features

*  **Dual-Client Switcher**: Instantly toggle between `fetch()` and `axios` to compare network call implementations side by side.
*  **Live HTTP Inspector Drawer**: Real-time terminal output showing URL, method, status codes, latency (ms), request headers, and response JSON payload.
*  **Full CRUD Playground**: Interactive modals to test `POST`, `PUT`, `PATCH`, and optimistic `DELETE` operations.
*  **Error Sandbox**: Test network failure states (e.g., forced `404` or `500` server errors) with user friendly retry UI.
*  **Search & Filtering**: Search posts live by title/body and filter by User Author ID.
*  **Optimistic Updates & Toast Notifications**: Non-blocking system messages that provide immediate feedback during API interactions.

