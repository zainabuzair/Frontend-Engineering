# README: Basic Webpage Project

## Overview
This repository contains a simple, well-structured single-page website written in semantic **HTML5**. It serves as a foundational project demonstrating fundamental web structure, page layout, navigation, and user input handling via an HTML form.

---

## Summary of Learning Outcomes

Building this basic webpage provided hands-on experience with core web development concepts. Below is a simple breakdown of the main takeaways:

### 1. Document Structure & Boilerplate
* **HTML5 Doctype & Setup (`<!DOCTYPE html>`, `<html>`, `<head>`, `<body>`)**: Learned how to properly initialize a web page, define document metadata, set character encoding (`UTF-8`), and configure responsive viewports for various screen sizes.
* **Document Title (`<title>`)**: Learned how to set the browser tab title.

### 2. Semantic HTML Elements
Using semantic tags improves website accessibility (screen readers) and SEO (search engines):
* `<header>`: Used to enclose top-level introductory content, including the main heading (`<h1>`), visual tagline paragraph, and primary navigation bar.
* `<nav>`: Contains navigation links (`<ul>`, `<li>`, `<a>`) to guide users across different sections of the page.
* `<main>`: Encloses the core content of the document.
* `<section>`: Grouped distinct topics or content areas logically (`#home`, `#about`, `#services`, `#contact`).
* `<footer>`: Structured the document cleanly with a dedicated footer section at the bottom for copyright info (`&copy;`).
* `<hr>`: Learned how to use horizontal rules for visual section separation.

### 3. In-Page Navigation (Internal Links / Anchor Tags)
* **ID Target Linkage**: Learned how to link navigation menu items (`<a href="#section-id">`) directly to specific sections on the same page using HTML `id` attributes (e.g., `#home`, `#about`, `#services`, `#contact`). Clicking a menu item smoothly jumps the view to that section.

### 4. HTML Forms & User Input
* **Form Structure (`<form>`)**: Implemented an interactive contact form with `action="#"` and `method="post"`.
* **Input Control Types**:
  * `<input type="text">` for single-line name input.
  * `<input type="email">` for user email addresses with built-in browser validation.
  * `<textarea>` for multi-line user feedback or message submission.
  * `<button type="submit">` to handle form submission.
* **Accessibility with Labels (`<label for="...">`)**: Used `<label>` tags linked to input fields via the `id` attribute, making forms more accessible and easier to click on.
* **Validation (`required`)**: Learned to use basic HTML attributes to prevent users from submitting empty form fields.

---

## Project Structure

```text
.
├── index.html   # Main HTML file containing the website structure and content
└── README.md    # Summary of project layout and learning points