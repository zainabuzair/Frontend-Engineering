## Week 5, Day 2: REST API Integration Masterclass
Welcome to today's hands-on masterclass on REST API Integration in React! Today, we explore how modern web applications communicate with backend services using HTTP protocols, asynchronous request handling, and robust state management.

---

## Table of Contents
1) Overview

2) Key Concepts Covered

3) Architecture & Features

4) HTTP Verbs & REST Standards

5) Fetch API vs Axios

6) Getting Started

7) Hands-On Practice Challenges

---

## Overview
This repository contains an interactive dashboard designed to master API requests, CRUD operations, state synchronization, and real-time HTTP debugging. The application connects to standard RESTful endpoints, parses payloads into meaningful English learning topics, and allows real-time inspection of headers and network responses.

---

## Key Concepts Covered
* Stateless Client-Server Communication: Understanding the foundational architecture of modern web APIs.

* Asynchronous JavaScript: Utilizing async/await and handling promises gracefully.

* HTTP Verbs & Semantics: Proper usage of GET, POST, PUT, PATCH, and DELETE.

* Axios vs Native Fetch: Comparing built-in web capabilities against specialized HTTP client libraries.

* Optimistic UI Updates: Updating the UI immediately while managing network fallbacks upon failure.

* Error Handling & Feedback: Categorizing 4xx and 5xx error codes and presenting actionable feedback to  users.

---

## Architecture & Features
* API Playground: Interactive interface for pagination, real-time search filtering, author filtering, and standard CRUD operations.

* HTTP Client Switcher: Seamless toggle between native fetch() and Axios simulation modes to observe execution differences.

* Live Request/Response Inspector: Full terminal log showcasing raw headers, execution latency in milliseconds, status codes, and JSON response payloads.

* Interactive Error Testing: Built-in options to simulate 404 Not Found and 500 Internal Server Error scenarios for testing resilience.

* Modern Pastel UI: Responsive layout built with React, Lucide Icons, and Tailwind CSS.

---

## Hands-On Practice Challenges
To reinforce today's learning, try implementing the following features:

1) AbortController Timeout: Add an explicit 5-second network timeout to all native fetch() calls.

2) Custom Header Builder: Extend the HTTP Inspector tab to permit custom headers like Authorization: Bearer <token>.

3) Local Storage Cache: Cache fetched posts in localStorage to improve offline capability when network access is intermittent.

4) Debounced Search: Refactor the search input in the API Playground with a 300ms debounce to minimize unnecessary filter operations.

---

## File Structure
Day-3/
├── 📁 public/
│   └── favicon.ico               # Application favicon icon
├── 📁 src/
│   ├── App.jsx                   # Main React Dashboard (UI, API integration, Inspector, Modals)
│   ├── main.jsx                  # Application entry point & React DOM renderer
│   └── index.css                 # Global styles & Tailwind CSS directives
├── .gitignore                    # Git untracked files specification
├── index.html                    # Single Page Application HTML template
├── package.json                  # Dependencies, scripts, and package metadata
├── postcss.config.js             # PostCSS configuration for Tailwind CSS
├── tailwind.config.js            # Tailwind CSS design system configuration
├── README.md                     # Comprehensive project documentation
└── vite.config.js                # Vite dev server and build configuration

---