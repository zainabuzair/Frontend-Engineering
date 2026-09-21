🚀 React Router Masterclass — Week 5, Day 1

A single-page application (SPA) demonstration built with React, React Router v6, and Tailwind CSS. This repository serves as a hands-on guide and reference for client-side routing, dynamic route parameters, nested routes, protected authentication guards, and state persistence across page transitions.

📅 Today's Tasks & Accomplishments Summary

During today's session, we completed the core foundation of SPA client-side routing and UI styling:

SPA Client-Side Navigation setup:

Implemented declarative navigation without triggering browser full-page reloads.

Built interactive navigation links, mobile-responsive menu triggers, and dynamic URL state sync.

Route Parameters (/products/:id):

Designed dynamic route parameter extraction using React Router hooks.

Created full-featured view pages rendering product specs, live stock statuses, and dynamic parameter parsing.

Nested Layout & Tabbed Routing:

Created parent/child view hierarchies.

Preserved state while toggling between inner child views without unmounting parent components.

Authentication & Guarded Routes:

Built mock authentication state context (isLoggedIn, user).

Created route guards to protect dashboard views and redirect unauthenticated users to login prompts.

Tailwind CSS Integration & Environment Configuration:

Configured styling utility integration via Tailwind CSS and PostCSS.

Resolved environment dependencies and styles importing in index.css.

🛠️ Tech Stack & Technologies

Framework: React 18+

Build Tool: Vite

Routing: React Router v6

Styling: Tailwind CSS

Iconography: Lucide React (lucide-react)

📁 Project Structure

├── src/
│   ├── App.jsx          # Master React Application (Router, Pages, Context, Components)
│   ├── index.css        # Tailwind CSS imports & global styles
│   └── main.jsx         # React DOM root entry point
├── vite.config.js       # Vite configuration with Tailwind CSS plugin
├── package.json         # Project dependencies & scripts
└── README.md            # Project documentation


⚡ Getting Started Locally

Follow these instructions to run the project on your local environment:

1. Clone the repository

git clone <your-repository-url>
cd Day-1


2. Install dependencies

npm install


3. Ensure Tailwind CSS packages are installed

npm install tailwindcss @tailwindcss/vite lucide-react



💡 Key Routing Concepts Demonstrated

Feature

Key Hook / Component

Usage

Declarative Links

<Link>, <NavLink>

Smooth client-side navigation without reloads

Dynamic Parameters

useParams()

Extract URL parameters like :productId

Programmatic Navigation

useNavigate()

Redirect users after actions (e.g. Login / Logout)

Protected Routes

Auth Context + Conditional Render

Protect sensitive views (Dashboard) behind auth checks

Nested Layouts

<Outlet />
