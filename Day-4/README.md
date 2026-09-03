# Interactive Task Tracker with Advice Generator

A vanilla JavaScript web application demonstrating core DOM manipulation concepts, event handling, asynchronous programming, form validation, and local storage integration.

## Features

- **Task Management**: Add, complete, and delete tasks dynamically.
- **Form Validation**: Client-side validation ensuring inputs are non-empty with instant error feedback.
- **Local Storage Persistence**: Save and reload tasks using `localStorage` and `JSON.stringify`/`JSON.parse`.
- **Public REST API Integration**: Fetch random advice via the Advice Slip JSON API using modern `async/await` syntax.
- **Error Handling**: Graceful error catching for network issues during API calls.

## JavaScript Concepts Covered

1. **DOM Operations**:
   - `document.getElementById()`, `document.createElement()`, `appendChild()`
   - Modifying `textContent`, `classList`, and CSS styles dynamically.
2. **Event Listeners**:
   - `submit` event with `e.preventDefault()`
   - `click` and `input` events
3. **Data Persistence**:
   - Web Storage API (`localStorage.getItem()`, `localStorage.setItem()`)
   - Processing data format using `JSON.parse()` and `JSON.stringify()`
4. **Asynchronous JS & API Basics**:
   - `fetch()` requests to a public REST endpoint (`https://api.adviceslip.com/advice`)
   - `async`/`await` control flow with `try...catch` block handling

## Getting Started

1. Clone or download the repository.
2. Ensure `index.html`, `style.css`, and `app.js` are in the same folder.
3. Open `index.html` directly in any web browser.