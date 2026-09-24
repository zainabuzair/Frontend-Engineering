## Day 4: Forms, Validation & Authentication Concepts
Welcome to Day 4 of the React Masterclass! Today's session focuses on building robust frontend forms, implementing declarative validation rules, managing error and success UI states, and understanding authentication lifecycles using simulated JWT tokens, session persistence, and protected routes.

---

## Table of Contents
1) Key Concepts Covered

2) Architecture & Features

3) Form State Lifecycle

4) Authentication Flow

5) Getting Started

6) Hands-On Practice Challenges

---

## Key Concepts Covered
* Controlled Inputs & React State: Managing user input values declaratively via React useState hooks.

* Form Validation Mechanics: Touch tracking (touched), immediate error reporting, regex pattern evaluation, and validation schemas.

* Reusable Form Primitives: Modular building blocks (InputField, PasswordField, CheckboxField, SelectField) with integrated error handling and accessibility.

* Zod & Schema Validation Concepts: Declarative schema parsing, constraint enforcement, and custom error messaging.

* Authentication Lifecycles: Handling authentication states, session persistence (localStorage), simulated JWT token creation, decoding claims, and token deletion on logout.

* Protected Routes Guarding: Wrapper components that restrict unauthorized access and redirect users to authentication portals.

---

## Architecture & Features
* Authentication Portal: Interactive tab switcher between Login and Registration views with live feedback.

* Password Strength Evaluator: Real-time evaluation calculating entropy, character variety, and minimum length with visual progress indicators.

* Protected Dashboard Component: A gated view accessible only with an active user session token.

* Real-Time Form & Session Inspector: Live inspector showcasing raw form values, field touch states, error objects, and decoded JWT token claims.

* Pastel UI Design: Styled using React, Lucide Icons, and Tailwind CSS.

---

##  Form State Lifecycle
[ User Input ] ---> [ onChange Event ] ---> [ Update Form State ]
                          |
                          v
                 [ Validate Field ]
                          |
             +------------+------------+
             |                         |
     [ Error Found ]           [ Valid Entry ]
             |                         |
  Set touched & error      Clear error message
  Render Error Badge       Enable Submit Action

---

## Authentication Flow
1) User submits valid credentials via the Login/Register interface.

2) System validates fields and simulates server response with a signed JWT Bearer Token.

3) Session token is stored in App State and persisted to localStorage.

4) The ProtectedRoute component grants access to gated views.

5) User clicks Logout to flush the token and redirect to the login portal.

---

## Hands-On Practice Challenges
1) Add Custom Zod-Style Rules: Add a rule requiring passwords to contain at least one special character (!@#$%^&*).

2) Auto-Logout Timer: Implement a 5-minute session timeout that automatically invalidates the token.

3) Show/Hide Password Strength Checklist: Expand the strength indicator to show explicit checks for numbers, uppercase letters, and symbols.

4) Remember Me Feature: Store email in localStorage when "Remember Me" is checked on login.

---

## Folder Structure
react-forms-auth-masterclass/
├── 📁 public/
│   └── favicon.ico               # Application favicon icon
├── 📁 src/
│   ├── App.jsx                   # Main React Masterclass (Forms, Validation, Auth & Protected Routes)
│   ├── main.jsx                  # Application entry point & React DOM renderer
│   └── index.css                 # Global styles & Tailwind CSS directives
├── .gitignore                    # Git untracked files specification
├── index.html                    # Single Page Application HTML template
├── package.json                  # Dependencies, scripts, and package metadata
├── postcss.config.js             # PostCSS configuration for Tailwind CSS
├── tailwind.config.js            # Tailwind CSS design system configuration
├── README.md                     # Day 4 Masterclass Documentation
└── vite.config.js                # Vite dev server and build configuration

---