# Day 4: Professional UI Development & Component Library Architecture

##  Topic Overview
This project demonstrates how to build a production-ready, accessible **UI Component Library System** using **React**, **TypeScript**, and **Tailwind CSS (v4)** with Vite. It covers component isolation, reusable design primitives (Buttons, Inputs, Modals, Badges, Alerts, Tabs, Loading Skeletons), state management, accessibility standards (WAI-ARIA 1.2), and dynamic theme execution.

---

##  Setup & Execution Instructions

### Prerequisites
- **Node.js**: v18+
- **Package Manager**: `npm`

---

## Project Directory Structure
Day-4/
├── node_modules/          # Installed dependencies
├── public/                # Static assets
│   └── vite.svg           # Vite logo
├── src/                   # Source files
│   ├── components/        # Reusable Component Library
│   │   └── ui/            # UI Primitives
│   │       ├── Button.tsx # Variant-based button primitive
│   │       ├── Feedback.tsx# Badges, Alerts, Tabs & Skeletons
│   │       ├── Input.tsx  # Forwarded ref form input primitive
│   │       └── Modal.tsx  # Key-aware accessible modal overlay
│   ├── App.tsx            # Interactive UI system preview dashboard
│   ├── index.css          # Tailwind CSS v4 directives
│   ├── main.tsx           # React DOM root render entry
│   └── vite-env.d.ts      # Vite client type declarations
├── index.html             # HTML entry file
├── package.json           # Dependencies and scripts
├── tsconfig.app.json      # TypeScript app configuration
├── tsconfig.json          # TypeScript root reference
├── tsconfig.node.json     # TypeScript node configuration
└── vite.config.ts         # Vite configuration with @tailwindcss/vite plugin

---
