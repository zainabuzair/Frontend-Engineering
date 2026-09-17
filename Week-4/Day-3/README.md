# Day 3: Tailwind CSS & Utility-First Architecture

## 📌 Topic Overview
This project demonstrates how to build a responsive, dark-mode ready **Dashboard Interface** using **React**, **TypeScript**, and **Tailwind CSS (v4)** with Vite. It covers utility-first styling principles, layout design using Flexbox and Grid, dynamic theme toggling, component isolation with custom props, and responsive design breakpoints.

---

## 🚀 Setup & Execution Instructions

### Prerequisites
- **Node.js**: v18+
- **Package Manager**: `npm`

### Setup Steps
1. Navigate into the `Day-3` project directory:
   ```bash
   cd ~/Desktop/Week-4/Day-3
   ```
2. Install project dependencies:
   ```bash
   npm install
   ```
3. Install `@tailwindcss/vite` plugin and `lucide-react`:
   ```bash
   npm install @tailwindcss/vite lucide-react
   ```

### Running the Application
Start the Vite development server:
```bash
npm run dev
```
Open the local URL provided in your terminal (e.g., `http://localhost:5173`) in your browser.

To verify type safety and build the project:
```bash
npm run build
```

---

## 📚 Core Concepts Covered

| Concept | Description & Implementation |
| :--- | :--- |
| **Utility-First CSS** | Constructing UI components directly in markup using Tailwind utility classes for typography, colors, spacing, borders, and shadows. |
| **Flexbox & Grid Layouts** | Building structured metric grids (`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4`) and responsive navbars (`flex items-center justify-between`). |
| **Responsive Utilities** | Utilizing mobile-first breakpoint prefixes (`sm:`, `md:`, `lg:`) to adjust column spans, spacing, and element visibility dynamically. |
| **Dark Mode Integration** | Enabling class-based dark mode (`className={darkMode ? "dark" : ""}`) and applying dark styling overrides (`dark:bg-slate-900 dark:text-slate-100`). |
| **Hover & State Styling** | Incorporating interactive feedback states like `hover:shadow-xl`, `hover:-translate-y-0.5`, `active:scale-95`, and `group-hover:text-indigo-600`. |
| **Tailwind CSS v4 Setup** | Configuring `@import "tailwindcss";` in `src/index.css` and using `@tailwindcss/vite` plugin in `vite.config.ts`. |

---

## 🛠️ Key Implementation Highlights

### 1. Tailwind v4 Directive Configuration (`src/index.css`)
```css
@import "tailwindcss";

@layer base {
  body {
    @apply bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-100 transition-colors duration-200;
  }
}
```

### 2. Vite & Tailwind v4 Integration (`vite.config.ts`)
```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

### 3. Responsive Metric Card Component (`src/components/MetricCard.tsx`)
```tsx
export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  isPositive,
  icon,
}) => {
  return (
    <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {title}
        </span>
        <div className="p-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
          {icon}
        </div>
      </div>
      <div className="mt-4 flex items-baseline justify-between">
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {value}
        </h2>
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
            isPositive
              ? "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400"
              : "bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400"
          }`}
        >
          {change}
        </span>
      </div>
    </div>
  );
};
```

---

## 📁 Project Directory Structure

```text
Day-3/
├── node_modules/          # Installed dependencies
├── public/                # Static public assets
│   └── vite.svg           # Vite logo
├── src/                   # Source files
│   ├── components/        # UI Components
│   │   ├── CourseGrid.tsx # Course grid layout with hover states
│   │   ├── MetricCard.tsx # Metric summary card with dark mode styling
│   │   └── Navbar.tsx     # Navigation header with dark mode toggle & search
│   ├── types/             # Centralized TypeScript types
│   │   └── dashboard.ts   # Interfaces for Dashboard data models & props
│   ├── App.tsx            # Main parent layout managing state & theme mode
│   ├── index.css          # Tailwind CSS v4 entry (@import "tailwindcss";)
│   ├── main.tsx           # React DOM root render entry
│   └── vite-env.d.ts      # Vite client declarations
├── index.html             # Main HTML entry
├── package.json           # Dependencies and scripts
├── tsconfig.app.json      # App-level TypeScript config (includes src/vite-env.d.ts)
├── tsconfig.json          # TypeScript root reference
├── tsconfig.node.json     # Node-level TypeScript config
└── vite.config.ts         # Vite build configuration with @tailwindcss/vite plugin
```