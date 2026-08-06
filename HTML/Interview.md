# 📘 HTML Interview Handbook


## 📑 Table of Contents

1. Introduction to HTML
2. Core Concepts
3. Internal Working (How Browsers Parse HTML)
4. Visual Diagrams
5. Code Examples (Simple → Intermediate → Production)
6. Real-World Examples
7. Best Practices
8. Common Beginner Mistakes
9. Advanced Topics
10. Interview Questions (Beginner / Intermediate / Advanced / Scenario / Practical / Debugging / Coding)
11. Follow-up Questions
12. Coding Exercises (Easy / Medium / Hard / Interview-Level)
13. MCQs
14. Flashcards
15. Cheat Sheet
16. Revision Notes (5 / 15 / 30 / 60 minutes)
17. Common Bugs & Debugging
18. Production Interview Stories
19. Frequently Asked Interview Questions Bank
20. Company-Specific Questions
21. Final Revision Checklist

---

## 1. Introduction to HTML

### What is HTML?

**HTML (HyperText Markup Language)** is the standard **markup language** used to structure content on the web. It is not a programming language — it doesn't have loops, conditionals, or variables. Instead, it describes the **structure and meaning (semantics)** of content using **elements** (tags).

Think of HTML as the **skeleton** of a webpage:
- **HTML** = Skeleton (structure)
- **CSS** = Skin & clothes (presentation)
- **JavaScript** = Muscles & brain (behavior/interactivity)

### Why was HTML created?

HTML was created in **1991 by Tim Berners-Lee** at CERN, originally to share scientific documents between researchers using **hyperlinks**. The idea was simple: documents that could "link" to other documents, forming a "web" of information — hence **World Wide Web**.

### Why do companies use it?

Every single website and web application — regardless of framework (React, Angular, Vue) — ultimately renders down to HTML in the browser. Companies use it because:
- It's the **only language browsers natively understand** for structuring content.
- It's required for **SEO** (search engines parse HTML).
- It's required for **accessibility** (screen readers rely on semantic HTML).
- It's the foundation every frontend framework builds on top of.

### Real-World Analogy

Imagine building a house:
- **HTML** = the walls, doors, rooms, foundation (structure — "this is a bedroom, this is a kitchen")
- **CSS** = paint, furniture, interior design (how it looks)
- **JavaScript** = electricity, smart switches, automation (how it behaves)

You cannot skip the foundation. A house without walls (HTML) cannot be painted (CSS) or automated (JS).

### History (Quick Timeline)

| Year | Milestone |
|------|-----------|
| 1991 | Tim Berners-Lee proposes HTML |
| 1995 | HTML 2.0 standardized by IETF |
| 1997 | HTML 3.2 and 4.0 (tables, frames) released by W3C |
| 2000 | XHTML 1.0 (stricter XML-based HTML) |
| 2014 | **HTML5** becomes official W3C recommendation |
| Present | HTML5 is a "living standard" maintained by WHATWG |

### Advantages

- Universally supported by every browser.
- Simple, human-readable syntax.
- Backbone for SEO and accessibility.
- Works with every backend/frontend technology.
- Free and open standard (no licensing).

### Disadvantages

- Static by itself — no logic/interactivity (needs CSS/JS).
- Different browsers historically rendered HTML inconsistently (less of an issue today).
- Deeply nested markup can become hard to maintain without a component-based framework.
- No built-in data binding or state management.

---

## 2. Core Concepts

### 2.1 Elements and Tags

An **element** consists of an **opening tag**, **content**, and a **closing tag**:

```html
<p>This is a paragraph.</p>
```

- `<p>` → opening tag
- `This is a paragraph.` → content
- `</p>` → closing tag

Some elements are **void/self-closing** (no content, no closing tag):
```html
<img src="cat.jpg" alt="A cat" />
<br />
<input type="text" />
<hr />
```

### 2.2 Attributes

Attributes provide **additional information** about an element, written inside the opening tag as `name="value"` pairs.

```html
<a href="https://example.com" target="_blank" rel="noopener noreferrer">Visit</a>
```

- `href` → destination URL
- `target="_blank"` → opens in new tab
- `rel="noopener noreferrer"` → security best practice for new-tab links

### 2.3 The Document Structure

Every HTML document follows this skeleton:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>My Page</title>
</head>
<body>
  <!-- visible content goes here -->
</body>
</html>
```

- `<!DOCTYPE html>` → tells the browser to render in **standards mode** (HTML5).
- `<html lang="en">` → root element; `lang` helps screen readers and SEO.
- `<head>` → metadata, not rendered visibly (title, charset, links to CSS, SEO tags).
- `<body>` → everything the user actually sees.

### 2.4 Semantic HTML

**Semantic elements** clearly describe their meaning to both the browser and the developer, as opposed to generic `<div>`/`<span>`.

| Non-Semantic | Semantic Equivalent |
|---|---|
| `<div class="header">` | `<header>` |
| `<div class="nav">` | `<nav>` |
| `<div class="main-content">` | `<main>` |
| `<div class="article">` | `<article>` |
| `<div class="sidebar">` | `<aside>` |
| `<div class="footer">` | `<footer>` |

Why it matters:
- **Accessibility**: screen readers announce "navigation", "main content", etc.
- **SEO**: search engines weigh semantic tags for content relevance.
- **Maintainability**: code is self-documenting.

### 2.5 Text-Level Elements

```html
<h1>Main Heading</h1> ... <h6>Smallest Heading</h6>
<p>Paragraph</p>
<strong>Bold, semantically important</strong>
<em>Italic, semantically emphasized</em>
<blockquote>Quoted block</blockquote>
<code>inline code</code>
<pre>preformatted text (preserves whitespace)</pre>
```

**Important distinction:** `<strong>`/`<em>` are semantic (meaning "important"/"emphasis"), while `<b>`/`<i>` are purely visual (bold/italic with no semantic meaning). Interviewers frequently test this distinction.

### 2.6 Lists

```html
<ul>
  <li>Unordered item</li>
</ul>

<ol>
  <li>Ordered item</li>
</ol>

<dl>
  <dt>Term</dt>
  <dd>Definition</dd>
</dl>
```

### 2.7 Links and Navigation

```html
<a href="/about">Internal link</a>
<a href="https://google.com">External link</a>
<a href="#section1">Anchor link (same page)</a>
<a href="mailto:test@test.com">Email link</a>
<a href="tel:+1234567890">Phone link</a>
```

### 2.8 Images and Media

```html
<img src="logo.png" alt="Company Logo" width="200" height="100" loading="lazy" />

<video controls width="640">
  <source src="movie.mp4" type="video/mp4" />
  Your browser does not support video.
</video>

<audio controls>
  <source src="song.mp3" type="audio/mpeg" />
</audio>
```

- `alt` is **mandatory** for accessibility and SEO — describes the image for screen readers and shows if the image fails to load.
- `loading="lazy"` defers offscreen image loading — a major performance best practice.

### 2.9 Tables

```html
<table>
  <caption>Monthly Sales</caption>
  <thead>
    <tr><th>Month</th><th>Revenue</th></tr>
  </thead>
  <tbody>
    <tr><td>Jan</td><td>$10,000</td></tr>
  </tbody>
  <tfoot>
    <tr><td>Total</td><td>$10,000</td></tr>
  </tfoot>
</table>
```

Tables should be used **only for tabular data**, never for page layout (a historical anti-pattern from the 1990s-2000s).

### 2.10 Forms

Forms are the **primary way users send data to a server**.

```html
<form action="/submit" method="POST">
  <label for="name">Name:</label>
  <input type="text" id="name" name="name" required minlength="2" />

  <label for="email">Email:</label>
  <input type="email" id="email" name="email" required />

  <label for="age">Age:</label>
  <input type="number" id="age" name="age" min="1" max="120" />

  <label for="country">Country:</label>
  <select id="country" name="country">
    <option value="us">USA</option>
    <option value="pk">Pakistan</option>
  </select>

  <textarea name="message" rows="4"></textarea>

  <input type="checkbox" id="agree" name="agree" />
  <label for="agree">I agree to terms</label>

  <button type="submit">Submit</button>
</form>
```

Key concepts:
- `action` → URL the form data is sent to.
- `method="GET"` (data in URL, visible, cacheable) vs `method="POST"` (data in body, used for sensitive/large data).
- `<label for="id">` must match the input's `id` — critical for accessibility (clicking label focuses input, screen readers announce it).
- `name` attribute (not `id`) is what gets sent as the form-data key to the server.
- HTML5 built-in validation: `required`, `pattern`, `min`, `max`, `minlength`, `maxlength`, `type="email"`.

### 2.11 Input Types (HTML5)

```html
<input type="text" />
<input type="password" />
<input type="email" />
<input type="number" />
<input type="date" />
<input type="time" />
<input type="color" />
<input type="range" />
<input type="file" />
<input type="radio" name="gender" />
<input type="checkbox" />
<input type="search" />
<input type="tel" />
<input type="url" />
<input type="hidden" />
```

### 2.12 Metadata and SEO Tags

```html
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="description" content="Best online store for shoes" />
<meta name="keywords" content="shoes, online store" />
<meta name="robots" content="index, follow" />

<!-- Open Graph (social sharing previews) -->
<meta property="og:title" content="My Page Title" />
<meta property="og:image" content="/preview.png" />

<link rel="stylesheet" href="style.css" />
<link rel="icon" href="favicon.ico" />
<script src="script.js" defer></script>
```

### 2.13 Global Attributes

Attributes usable on almost any HTML element:

| Attribute | Purpose |
|---|---|
| `id` | Unique identifier |
| `class` | CSS/JS hook, reusable across elements |
| `style` | Inline CSS (avoid in production) |
| `title` | Tooltip text |
| `data-*` | Custom data attributes for JS (`data-user-id="5"`) |
| `contenteditable` | Makes element editable by the user |
| `hidden` | Hides the element |
| `tabindex` | Controls keyboard tab order |
| `draggable` | Enables drag-and-drop |
| `aria-*` | Accessibility attributes |

### 2.14 iframe

```html
<iframe src="https://example.com" width="600" height="400" loading="lazy" title="Embedded content"></iframe>
```
Used to embed another HTML document (YouTube videos, Google Maps, payment widgets like Stripe). Security-sensitive — the `sandbox` attribute restricts what an embedded iframe can do.


---

## 3. Internal Working — How Browsers Parse HTML

Understanding this is what separates a "tag memorizer" from someone who truly understands the web platform — a common differentiator in senior interviews.

### 3.1 The Critical Rendering Path

```
1. Browser requests HTML file from server
        ↓
2. Browser receives raw HTML bytes
        ↓
3. HTML PARSER converts bytes → tokens → DOM Tree (nodes)
        ↓
4. When parser encounters <link rel="stylesheet">:
        → CSS is fetched and parsed → CSSOM Tree built
        ↓
5. When parser encounters <script> (no defer/async):
        → PARSING PAUSES, JS is downloaded & executed, THEN parsing resumes
        ↓
6. DOM Tree + CSSOM Tree combined → RENDER TREE
        ↓
7. LAYOUT (Reflow): browser calculates exact position/size of every element
        ↓
8. PAINT: pixels are drawn onto the screen
        ↓
9. COMPOSITE: layers are combined by the GPU into the final image
```

### 3.2 DOM (Document Object Model)

The DOM is an **in-memory, tree-like, object representation** of the HTML document that JavaScript can read and manipulate.

```
Document
 └── html
      ├── head
      │    └── title
      └── body
           ├── header
           ├── main
           │    ├── h1
           │    └── p
           └── footer
```

Each HTML tag becomes a **node** (object) in this tree. JavaScript APIs like `document.getElementById()` or `document.querySelector()` traverse this tree.

### 3.3 Why `<script>` placement matters

- `<script src="app.js">` (no attribute) placed in `<head>` → **blocks HTML parsing** until the script downloads AND executes.
- `<script defer>` → downloads in parallel, executes **after** HTML parsing completes, in order. **Recommended default.**
- `<script async>` → downloads in parallel, executes **immediately when ready** (may interrupt parsing, order not guaranteed). Good for independent scripts like analytics.

```
Without defer/async:      HTML parsing → [PAUSE: download+execute JS] → resume parsing
With defer:                HTML parsing (continues) ...JS downloads in background... → JS executes after parse
With async:                HTML parsing (continues) ...JS downloads... → [PAUSE: execute JS immediately] → resume
```

### 3.4 Parsing Errors & Error Recovery

Unlike XML, HTML parsers are **forgiving** — malformed HTML (unclosed tags, wrong nesting) doesn't crash the page. The browser applies **error-correction algorithms** (per the WHATWG HTML spec) to auto-close tags and fix structure. This is convenient but can produce unpredictable DOM structures — hence "write valid HTML" remains best practice.

### 3.5 Reflow vs Repaint (Performance)

- **Reflow (Layout)**: Recalculating element geometry (size/position) — expensive. Triggered by: changing width/height, adding/removing DOM nodes, reading `offsetHeight` etc.
- **Repaint**: Redrawing pixels without changing layout (e.g., color change) — cheaper than reflow.
- **Composite**: GPU-accelerated layer changes (e.g., `transform`, `opacity`) — cheapest, avoids both reflow and repaint.

This is why interview questions often ask: *"Why is `transform: translateX()` more performant than changing `left`?"* — because `transform` triggers only compositing, while `left` triggers a full reflow.

---

## 4. Visual Diagrams

### 4.1 The Web Stack

```
        ┌───────────────┐
        │    Browser     │
        └───────┬───────┘
                │  HTTP Request
                ▼
        ┌───────────────┐
        │     Server      │
        └───────┬───────┘
                │  Returns HTML/CSS/JS
                ▼
        ┌───────────────┐
        │  HTML  (structure) │
        │  CSS   (style)      │
        │  JS    (behavior)   │
        └───────────────┘
```

### 4.2 HTML Document Anatomy

```
<!DOCTYPE html>          ← Tells browser: "render in standards mode"
<html lang="en">         ← Root element
  <head>                 ← Invisible metadata
    <meta charset>
    <title>
    <link rel="stylesheet">
  </head>
  <body>                 ← Visible content
    <header>
    <nav>
    <main>
      <article>
      <section>
    </main>
    <aside>
    <footer>
  </body>
</html>
```

### 4.3 Semantic Page Layout Diagram

```
┌─────────────────────────────────────────┐
│                 <header>                  │
├─────────────────────────────────────────┤
│                  <nav>                    │
├───────────────┬───────────────────────────┤
│                │                           │
│   <aside>      │        <main>             │
│   (sidebar)    │   <article><section>      │
│                │                           │
├───────────────┴───────────────────────────┤
│                <footer>                   │
└─────────────────────────────────────────┘
```

### 4.4 Form Submission Flow

```
User fills form
      ↓
Clicks Submit (type="submit")
      ↓
Browser validates (required, pattern, type=email...)
      ↓
   Valid? ──No──> Browser shows native error, submission blocked
      │
     Yes
      ↓
Browser packages form data using `name` attributes
      ↓
Sends HTTP request to `action` URL using `method` (GET/POST)
      ↓
Server processes and responds
```


---

## 5. Code Examples (Simple → Intermediate → Production)

### 5.1 A Simple Page

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Hello</title>
</head>
<body>
  <h1>Hello World</h1>
  <p>This is my first page.</p>
</body>
</html>
```
*Line-by-line:* Declares HTML5 doctype, sets language, defines character encoding, gives the tab a title, and renders one heading and one paragraph.

### 5.2 An Intermediate Page — Profile Card

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Profile Card</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <main class="card">
    <img class="avatar" src="avatar.jpg" alt="Photo of Jane Doe" />
    <h2>Jane Doe</h2>
    <p class="role">Frontend Engineer</p>
    <ul class="skills">
      <li>HTML</li>
      <li>CSS</li>
      <li>JavaScript</li>
    </ul>
    <a class="btn" href="mailto:jane@example.com">Contact Me</a>
  </main>
</body>
</html>
```
*Why it's "intermediate":* uses semantic `<main>`, meaningful `alt` text, classes for styling hooks, a list for structured skill data, and an accessible mailto link — instead of one giant `<div>` soup.

### 5.3 Production-Level Example — Accessible, SEO-Ready Landing Section

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Acme Shoes — Handmade Leather Shoes</title>
  <meta name="description" content="Shop handmade leather shoes crafted in small batches. Free shipping over $50." />
  <meta property="og:title" content="Acme Shoes" />
  <meta property="og:image" content="/og-image.jpg" />
  <link rel="canonical" href="https://acmeshoes.com/" />
  <link rel="icon" href="/favicon.ico" />
  <link rel="stylesheet" href="/styles.css" />
  <script src="/analytics.js" defer></script>
</head>
<body>
  <a class="skip-link" href="#main">Skip to main content</a>

  <header>
    <nav aria-label="Primary">
      <a href="/" aria-current="page">Acme Shoes</a>
      <ul>
        <li><a href="/shop">Shop</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/cart" aria-label="View cart, 2 items">Cart (2)</a></li>
      </ul>
    </nav>
  </header>

  <main id="main">
    <section aria-labelledby="hero-heading">
      <h1 id="hero-heading">Handmade Leather Shoes, Built to Last</h1>
      <p>Crafted in small batches. Free shipping over $50.</p>
      <a class="btn-primary" href="/shop">Shop Now</a>
    </section>

    <section aria-labelledby="featured-heading">
      <h2 id="featured-heading">Featured Products</h2>
      <ul class="product-grid">
        <li>
          <article>
            <img src="/shoe1.jpg" alt="Brown leather oxford shoe" loading="lazy" width="300" height="300" />
            <h3>Classic Oxford</h3>
            <p>$120</p>
          </article>
        </li>
      </ul>
    </section>
  </main>

  <footer>
    <p>&copy; 2026 Acme Shoes. All rights reserved.</p>
  </footer>
</body>
</html>
```

**Why this is "production-level":**
1. `<a class="skip-link">` → accessibility requirement for keyboard users to bypass repetitive nav.
2. `aria-label` / `aria-labelledby` / `aria-current` → screen-reader clarity.
3. `meta description` / `og:title` / `canonical` → SEO and social-share readiness.
4. `loading="lazy"` + explicit `width`/`height` → performance and prevents Cumulative Layout Shift (CLS).
5. `<script defer>` → doesn't block rendering.
6. Semantic sectioning (`header`, `nav`, `main`, `section`, `article`, `footer`) throughout.

---

## 6. Real-World Examples

- **E-commerce (Amazon-style):** `<table>` for spec comparisons, `<form>` with `type="search"` for the search bar, `<picture>`/`srcset` for responsive product images across devices, `aria-live` regions for "Added to Cart" notifications.
- **News sites (BBC/NYTimes):** Heavy use of `<article>`, `<time datetime="2026-08-06">` for publish dates (machine-readable for SEO), `<figure>`/`<figcaption>` for images with captions.
- **SaaS Dashboards:** `<nav>` + `<aside>` for sidebars, `<progress>` and `<meter>` elements for usage stats, `role="dialog"` for modals.
- **Banking apps:** Extremely strict `<form>` validation (`pattern`, `inputmode="numeric"`), autocomplete attributes (`autocomplete="off"` for sensitive fields), and CSP-friendly markup for security.

In every MERN project, your React components ultimately render **JSX which compiles to these exact HTML elements** — so writing semantic HTML directly is exactly what you're doing (perhaps unknowingly) inside every `return()` statement in React.


---

## 7. Best Practices

### Structure & Semantics
- Use one `<h1>` per page; keep heading levels sequential (don't skip `h2` → `h4`).
- Prefer semantic tags (`<nav>`, `<main>`, `<article>`) over generic `<div>`s.
- Always set `<html lang="...">` for accessibility and translation tools.

### Accessibility (a11y)
- Every `<img>` needs meaningful `alt` text (or `alt=""` if purely decorative).
- Every form `<input>` needs an associated `<label>`.
- Use `aria-*` attributes only when semantic HTML can't express the meaning natively (don't overuse ARIA — "No ARIA is better than bad ARIA").
- Ensure sufficient color contrast (handled in CSS but planned at HTML/design stage).
- Ensure logical tab order; avoid arbitrary positive `tabindex` values.

### Performance
- Add `width` and `height` to `<img>`/`<video>` to prevent layout shift.
- Use `loading="lazy"` for below-the-fold images.
- Use `<link rel="preload">` for critical fonts/assets.
- Minimize DOM depth/nesting — deep trees slow down rendering and JS traversal.

### SEO
- Unique, descriptive `<title>` and `<meta name="description">` per page.
- Use structured, hierarchical headings.
- Use `<link rel="canonical">` to avoid duplicate-content penalties.

### Security
- Always use `rel="noopener noreferrer"` with `target="_blank"` (prevents the new tab from accessing `window.opener` — a real vulnerability called "tabnabbing").
- Sanitize any user-generated content before inserting into HTML (prevents XSS).
- Use `sandbox` on untrusted `<iframe>` sources.

### Naming & Maintainability
- Use meaningful, kebab-case `class` names (`class="nav-item"`, not `class="div1"`).
- Keep markup DRY — extract repeated structures into components (in React/templating engines) rather than copy-pasting HTML blocks.

---

## 8. Common Beginner Mistakes

| Mistake | Why Beginners Do It | How to Avoid |
|---|---|---|
| Using `<div>` for everything | Don't know semantic tags exist yet | Learn `<header>/<nav>/<main>/<article>/<footer>` early |
| Missing `alt` on images | Doesn't visibly break the page | Always add `alt`; treat it as mandatory syntax |
| Not closing tags properly | Browsers auto-correct, hiding the bug | Validate HTML with the W3C validator |
| Using `<br>` for spacing | Quick visual fix | Use CSS `margin`/`padding` instead |
| Nesting block elements inside inline elements (e.g., `<div>` inside `<span>`) | Unaware of content model rules | Learn block vs inline element rules |
| Using `<b>`/`<i>` instead of `<strong>`/`<em>` | They "look the same" | Understand semantic vs visual meaning |
| Forgetting `label for` / input `id` match | Doesn't affect visuals | Always pair labels correctly for accessibility |
| Using tables for page layout | Old tutorials/legacy habits | Use CSS Grid/Flexbox for layout |
| Multiple `<h1>` tags per page | Think "bigger heading = more important" | One `<h1>`, logical nesting after |
| Not setting viewport meta tag | Forgetting mobile responsiveness | Always include `<meta name="viewport">` |

---

## 9. Advanced Topics

### 9.1 The `<template>` and `<slot>` Elements
`<template>` holds markup that is **not rendered** until cloned via JavaScript — foundational for Web Components.
```html
<template id="row-template">
  <tr><td class="name"></td><td class="price"></td></tr>
</template>
```

### 9.2 Web Components (Custom Elements)
```html
<script>
class MyBadge extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<span style="color:blue">${this.getAttribute('text')}</span>`;
  }
}
customElements.define('my-badge', MyBadge);
</script>
<my-badge text="New"></my-badge>
```
Framework-agnostic reusable components — natively supported by all modern browsers.

### 9.3 Shadow DOM
Encapsulates a subtree of DOM/CSS so styles don't leak in or out — the mechanism behind Web Components and native elements like `<video controls>`.

### 9.4 Responsive Images (`srcset` / `<picture>`)
```html
<img
  src="small.jpg"
  srcset="small.jpg 480w, medium.jpg 800w, large.jpg 1200w"
  sizes="(max-width: 600px) 480px, 800px"
  alt="Responsive product photo"
/>

<picture>
  <source media="(min-width: 800px)" srcset="desktop.jpg" />
  <source media="(max-width: 799px)" srcset="mobile.jpg" />
  <img src="fallback.jpg" alt="Hero banner" />
</picture>
```

### 9.5 `contenteditable` and Rich Text Editors
Basis of tools like Google Docs' web editor / Notion — an element with `contenteditable="true"` becomes directly editable by the user without JavaScript-managed inputs.

### 9.6 Microdata / Structured Data (schema.org)
```html
<div itemscope itemtype="https://schema.org/Product">
  <span itemprop="name">Classic Oxford</span>
  <span itemprop="price">120</span>
</div>
```
Helps search engines display **rich snippets** (star ratings, prices) directly in search results.

### 9.7 The `defer`/`async`/Module Script Nuance
```html
<script type="module" src="app.js"></script>
```
`type="module"` scripts are deferred by default, support `import`/`export`, and run in strict mode automatically.

### 9.8 Preloading, Prefetching, Preconnecting
```html
<link rel="preload" href="font.woff2" as="font" crossorigin />
<link rel="prefetch" href="/next-page.html" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
```
Resource hints that let the browser start work early — a real performance lever used by production sites like Amazon and Netflix.

### 9.9 Content Security Policy via `<meta>`
```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'" />
```
Restricts what sources scripts/styles/images can load from — mitigates XSS.

### 9.10 Accessibility Tree & ARIA Roles
The browser builds a parallel **accessibility tree** from the DOM, consumed by screen readers. `role`, `aria-live`, `aria-expanded`, `aria-hidden` directly shape this tree — critical knowledge for senior/staff-level frontend interviews.


---

## 10. Interview Questions — By Category

Each question is followed by: the ideal answer, why it's correct, common wrong answers, and what the interviewer is really testing.

### 🟢 Beginner Questions

**Q1. What is HTML and is it a programming language?**
> **Answer:** HTML is a *markup language*, not a programming language — it has no logic, loops, or conditionals; it only describes structure and content.
> **Why correct:** Tests fundamental understanding of what HTML actually is.
> **Common wrong answer:** "HTML is a programming language used to build websites." This conflates "building websites" with "programming" — HTML alone can't compute anything.
> **What's being tested:** Basic conceptual clarity before diving deeper.

**Q2. What is the difference between HTML elements and tags?**
> **Answer:** A *tag* is the markup syntax itself (`<p>`, `</p>`); an *element* is the tag plus its content and closing tag together (`<p>Hello</p>`).
> **Why correct:** Precise terminology matters in technical communication.
> **Wrong answer:** Using "tag" and "element" interchangeably without distinction (acceptable casually, but interviewers may probe further).
> **Tested:** Attention to terminology/precision.

**Q3. What does `<!DOCTYPE html>` do?**
> **Answer:** It tells the browser to render the page in **standards mode** using the HTML5 spec, avoiding "quirks mode" which mimics old, inconsistent browser behavior.
> **Tested:** Understanding of browser rendering modes.

**Q4. What's the difference between `<div>` and `<span>`?**
> **Answer:** `<div>` is a block-level element (takes full width, starts on a new line); `<span>` is inline (only takes as much width as its content, doesn't break line).
> **Tested:** Block vs inline content model — foundational for CSS layout later.

**Q5. Why is the `alt` attribute important on images?**
> **Answer:** It provides alternative text for screen readers (accessibility), displays if the image fails to load, and is used by search engines for image SEO.
> **Tested:** Accessibility awareness — a growing focus area in modern interviews.

**Q6. What is semantic HTML? Give examples.**
> **Answer:** HTML that conveys meaning about its content, not just appearance — e.g., `<header>`, `<article>`, `<footer>` vs generic `<div>`s.
> **Tested:** Whether the candidate writes maintainable, accessible markup.

**Q7. What's the difference between `id` and `class` attributes?**
> **Answer:** `id` must be unique per page and is used for a single specific element (also usable as a JS hook/URL fragment); `class` can be reused across multiple elements for shared styling/behavior.
> **Tested:** CSS specificity/selector fundamentals.

**Q8. What are void/self-closing elements? Name a few.**
> **Answer:** Elements with no content and no closing tag: `<img>`, `<br>`, `<hr>`, `<input>`, `<meta>`, `<link>`.
> **Tested:** Familiarity with HTML element categories.

**Q9. What's the difference between `<ol>` and `<ul>`?**
> **Answer:** `<ol>` = ordered (numbered) list; `<ul>` = unordered (bulleted) list.
> **Tested:** Basic vocabulary.

**Q10. What does the `<head>` tag contain, and is it visible on the page?**
> **Answer:** Metadata — title, charset, links to CSS, SEO meta tags. Not directly rendered/visible in the page body.
> **Tested:** Document structure fundamentals.

**Q11. What is the purpose of the `<meta charset="UTF-8">` tag?**
> **Answer:** Declares the character encoding so the browser correctly displays special characters (accents, emojis, non-Latin scripts) instead of garbled text ("mojibake").
> **Tested:** Awareness of internationalization basics.

**Q12. What is the difference between `GET` and `POST` in a form?**
> **Answer:** `GET` appends form data to the URL (visible, bookmarkable, size-limited, used for retrieving data); `POST` sends data in the request body (hidden from URL, no size limit practically, used for creating/submitting data, especially sensitive data).
> **Tested:** HTTP fundamentals via HTML.

**Q13. What is the purpose of the `<label>` tag?**
> **Answer:** Associates descriptive text with a form control, improving accessibility (screen readers announce it) and usability (clicking the label focuses/activates the input).
> **Tested:** Forms + accessibility knowledge.

**Q14. What are HTML comments, and how do you write them?**
> **Answer:** `<!-- comment text -->` — not rendered by the browser, used for developer notes.
> **Tested:** Syntax basics.

**Q15. What is the difference between `<strong>` and `<b>`?**
> **Answer:** `<strong>` is semantic (indicates strong importance, read differently by screen readers); `<b>` is purely visual bolding with no semantic weight.
> **Tested:** Semantic vs presentational thinking.

*(Beginner bank continues in the same depth across topics like: forms/input types, tables, links, lists, media embedding, viewport meta tag, favicon, block vs inline elements, HTML entities (`&amp;`, `&nbsp;`), comments, nesting rules, `target="_blank"`, and basic document structure — totaling 30+ beginner-level questions when combined with the MCQ and Flashcard sections below, which cover additional beginner ground without duplicating full answers here.)*

---

### 🟡 Intermediate Questions

**Q1. Explain the difference between `localStorage`, `sessionStorage`, and cookies (as they relate to HTML forms/attributes).**
> **Answer:** All three store data client-side. `localStorage` persists with no expiration; `sessionStorage` clears when the tab closes; cookies are sent with every HTTP request (relevant to `autocomplete` and form security) and have explicit expiration/size limits (~4KB) — cookies are the only one accessible from the server side by default.
> **Tested:** Whether the candidate connects HTML forms to broader browser storage concepts.

**Q2. What's the difference between `defer` and `async` on `<script>` tags?**
> **Answer:** `defer` downloads in parallel but executes only after HTML parsing finishes, in document order. `async` downloads in parallel and executes as soon as it's ready, potentially interrupting parsing, with no order guarantee.
> **Tested:** Performance/loading strategy understanding — very commonly asked.

**Q3. How does the browser handle malformed/invalid HTML?**
> **Answer:** Browsers use built-in error-recovery algorithms defined in the WHATWG spec to auto-close unclosed tags and fix invalid nesting, rather than throwing a fatal error (unlike XML parsers).
> **Tested:** Internal working understanding.

**Q4. What is the difference between `<script>` in `<head>` vs at the end of `<body>`?**
> **Answer:** A blocking script in `<head>` halts HTML parsing until it downloads and executes, delaying page render. Placing it at the end of `<body>` (or using `defer`) lets the HTML render first, improving perceived performance.
> **Tested:** Rendering pipeline knowledge.

**Q5. What are data attributes and when would you use them?**
> **Answer:** `data-*` attributes store custom data directly on HTML elements, accessible via `element.dataset.xyz` in JavaScript, without polluting class/id namespace — commonly used for JS hooks that shouldn't affect styling.
> **Tested:** Real-world JS/HTML integration knowledge.

**Q6. Explain the Accessibility Tree and how ARIA roles interact with it.**
> **Answer:** The browser builds a parallel tree (derived from the DOM) specifically for assistive technologies. Native semantic elements (`<button>`, `<nav>`) already have correct roles baked in; `role`/`aria-*` attributes let you patch accessibility semantics onto elements when native tags aren't sufficient — but shouldn't be used to override or replace native semantics unnecessarily.
> **Tested:** Depth of accessibility understanding beyond "add alt text."

**Q7. What is the difference between block, inline, and inline-block elements?**
> **Answer:** Block elements start on a new line and take full available width (`<div>`, `<p>`); inline elements flow within text and only take needed width, ignoring width/height/margin-top/bottom (`<span>`, `<a>`); inline-block behaves like inline (flows in text) but respects width/height/margin like block.
> **Tested:** CSS box model foundation via HTML content model.

**Q8. What is the purpose of `rel="noopener noreferrer"`?**
> **Answer:** When using `target="_blank"`, the new page can access `window.opener` and manipulate the original page (a security risk called "tabnabbing", e.g., redirecting the original tab to a phishing page). `rel="noopener"` severs that link; `noreferrer` additionally strips the `Referer` header.
> **Tested:** Security awareness — commonly asked at companies with strong security culture (banks, fintech).

**Q9. How would you make a table accessible?**
> **Answer:** Use `<caption>` for a table description, `<th scope="col">`/`<th scope="row">` to associate headers with data cells, and `<thead>/<tbody>/<tfoot>` for structural clarity — screen readers use `scope` to announce which header applies to each cell.
> **Tested:** Practical accessibility implementation, not just theory.

**Q10. What's the difference between `<article>` and `<section>`?**
> **Answer:** `<article>` represents self-contained, independently distributable content (a blog post, a news story) that would still make sense on its own (e.g., in an RSS feed). `<section>` groups thematically related content within a page, generally needing a heading, but not necessarily standalone.
> **Tested:** Nuanced semantic HTML understanding — a frequently-confused pair.

**Q11. How does the browser decide render-blocking vs non-render-blocking resources?**
> **Answer:** CSS is render-blocking by default (browser won't paint until CSSOM is built, to avoid a flash of unstyled content). Synchronous `<script>` tags block HTML *parsing*. `defer`/`async` scripts and non-blocking resource hints (`prefetch`) don't block rendering.
> **Tested:** Deep critical-rendering-path understanding.

**Q12. What are Web Components?**
> **Answer:** A suite of native browser APIs (Custom Elements, Shadow DOM, HTML Templates) that let developers create reusable, encapsulated custom HTML tags without a framework.
> **Tested:** Awareness of framework-agnostic native capabilities — relevant since React/Vue solve similar problems at a higher level.

**Q13. What is Cumulative Layout Shift (CLS) and how does HTML markup affect it?**
> **Answer:** CLS is a Core Web Vitals metric measuring unexpected layout movement. Omitting `width`/`height` on images/videos, or injecting content above existing content without reserved space, causes high CLS. Explicit dimensions and reserved space fix it.
> **Tested:** Real-world performance/SEO impact knowledge (Core Web Vitals directly affect Google ranking).

**Q14. Explain `srcset` and `sizes` for responsive images.**
> **Answer:** `srcset` lists multiple image sources with width descriptors (`480w`); `sizes` tells the browser what rendered width to expect at different viewport breakpoints, so the browser picks the most efficient image without JS or media-query duplication.
> **Tested:** Real-world responsive/performance implementation skill.

**Q15. What's the difference between `<link rel="preload">` and `<link rel="prefetch">`?**
> **Answer:** `preload` fetches a resource needed for the *current* page with high priority (e.g., a critical font); `prefetch` fetches a resource likely needed for a *future* navigation, at low priority, using idle browser time.
> **Tested:** Advanced performance-optimization knowledge.

*(Intermediate bank continues across: form validation patterns, iframe sandboxing, microdata/schema.org, meta viewport nuances, content-editable elements, HTML5 API tags like `<canvas>`/`<svg>`, progressive enhancement, graceful degradation, and browser compatibility strategies.)*

---

### 🔴 Advanced Questions

**Q1. Walk through what happens, step by step, from typing a URL to seeing a fully rendered page (HTML-focused).**
> **Answer:** DNS resolution → TCP/TLS handshake → HTTP request → server responds with HTML bytes → browser's HTML parser tokenizes bytes into a DOM tree incrementally as bytes arrive → encountering `<link rel="stylesheet">` triggers CSS fetch/parse into CSSOM → encountering blocking `<script>` pauses HTML parsing → DOM + CSSOM merge into the Render Tree → Layout (reflow) computes geometry → Paint draws pixels → Compositor layers are combined and displayed.
> **Tested:** Whether the candidate has genuine internals knowledge, not memorized trivia — extremely common **senior/staff-level** opening question.

**Q2. How would you architect HTML markup for a design system used across dozens of teams?**
> **Answer:** Favor semantic, framework-agnostic base markup; expose consistent `data-*` hooks for JS/testing separate from styling classes (`data-testid`); document required ARIA patterns per component; ensure components degrade gracefully without JS (progressive enhancement); version the markup contract so consuming teams aren't broken by structural changes.
> **Tested:** System-design thinking applied to markup — staff-engineer level.

**Q3. Explain the Shadow DOM and its style/DOM encapsulation guarantees.**
> **Answer:** Shadow DOM attaches a separate, encapsulated DOM subtree to an element (`element.attachShadow()`), where styles defined inside don't leak out, and page-level styles don't leak in (unless using CSS custom properties, which do cross the boundary) — the same mechanism native elements like `<video>` controls use internally.
> **Tested:** Deep platform knowledge, relevant for design-system or component-library work.

**Q4. How would you diagnose and fix poor Largest Contentful Paint (LCP) caused by markup/HTML decisions?**
> **Answer:** Identify the LCP element (often a hero image or heading) via DevTools; ensure it's not lazy-loaded (lazy-loading the LCP element delays it — should be `loading="eager"` or omitted); preload the critical image/font with `<link rel="preload">`; reduce render-blocking resources above it; ensure server sends HTML quickly (avoid blocking the initial byte).
> **Tested:** Applied Core Web Vitals expertise.

**Q5. What are the trade-offs of Server-Side Rendering (SSR) vs Client-Side Rendering, purely from an HTML-delivery perspective?**
> **Answer:** SSR sends fully-formed HTML on first response — faster First Contentful Paint, better for SEO crawlers that don't execute JS well, but higher server load and Time-to-First-Byte cost. CSR sends a near-empty HTML shell with a JS bundle that renders content client-side — faster subsequent navigations (SPA feel), but slower initial paint and historically worse SEO (mitigated now by better crawler JS execution and techniques like hydration/streaming SSR).
> **Tested:** Bridges HTML knowledge into React/Next.js — a natural segue interviewers use to test full-stack thinking.

**Q6. How does `<template>` differ from simply hiding a `<div>` with `display:none`?**
> **Answer:** Content inside `<template>` is **inert** — not rendered, images inside don't load, scripts don't execute, and it's not part of the live DOM until explicitly cloned (`content.cloneNode(true)`) and appended. A hidden `<div>` IS in the live DOM — its images load, scripts run, and it's still queryable/traversable, just visually hidden.
> **Tested:** Precise internals knowledge, commonly used to catch candidates who only know surface-level facts.

**Q7. Explain how the browser's HTML parser handles streaming/incremental parsing, and why this matters for performance.**
> **Answer:** The browser doesn't wait for the entire HTML document to download before parsing — it tokenizes and builds the DOM incrementally as bytes arrive over the network, allowing the browser to start fetching referenced resources (CSS, images found early in the document) before the full page has even arrived — this is why placing critical CSS/fonts early in `<head>` improves perceived performance.
> **Tested:** True internals depth, distinguishing senior candidates.

**Q8. What is the "preload scanner" and why does it exist?**
> **Answer:** A secondary, speculative parser that scans ahead in the raw HTML (even while the main parser is blocked by a synchronous script) to discover and start downloading resources like images, CSS, and other scripts early — mitigating the performance cost of render-blocking scripts.
> **Tested:** Genuinely advanced browser-internals trivia used at companies like Google/Meta for performance-focused roles.

---

### 🎯 Scenario-Based Questions

**Q1. "Our marketing team says images are causing the whole page to jump around while loading. How do you fix this purely with HTML?"**
> **Answer:** Add explicit `width` and `height` attributes (or `aspect-ratio` via CSS) to every `<img>`/`<video>`/`<iframe>` so the browser reserves space before the asset loads, preventing Cumulative Layout Shift.
> **Tested:** Applied performance troubleshooting, not just definitions.

**Q2. "A screen-reader user reports that our custom dropdown built with `<div>`s is completely unusable. What's your first move?"**
> **Answer:** First ask whether a native `<select>` or `<button>` + list markup could replace the custom `<div>` structure (native elements have built-in keyboard/AT support for free). If a custom widget is required, apply appropriate `role`, `aria-expanded`, `aria-haspopup`, and manage keyboard focus manually per the ARIA Authoring Practices Guide (APG) pattern for listboxes/menus.
> **Tested:** Real accessibility remediation skill, not textbook recall.

**Q3. "SEO team says our SPA's product pages aren't ranking. How does HTML delivery relate to this?"**
> **Answer:** If content is rendered entirely client-side after JS execution, some crawlers (or slower crawl budgets) may index an empty shell. Recommend SSR/SSG (e.g., via Next.js) so meaningful HTML — including title, meta description, and content — is present in the initial server response.
> **Tested:** Cross-discipline reasoning (HTML ↔ SEO ↔ architecture).

**Q4. "A junior dev nested a `<button>` inside another `<button>`, and the page behaves strangely. Explain why, and how you'd catch this earlier."**
> **Answer:** Interactive elements cannot be nested per the HTML content model (invalid) — the browser's error-correction will restructure the DOM unpredictably (often closing the outer button early), causing broken click behavior. Catch it earlier via HTML validators/linters (e.g., `eslint-plugin-jsx-a11y` in a React context) in CI.
> **Tested:** Debugging + prevention process, not just the bug itself.

---

### 🛠️ Practical Questions

**Q1. Build an accessible, semantic navigation bar with a logo, 3 links, and a "current page" indicator.**
> Expected: `<nav aria-label="Primary">` wrapping a `<ul>` of `<li><a></a></li>`, with `aria-current="page"` on the active link, and a `<a href="/">` logo — not clickable `<div>`s.

**Q2. Given a messy `<div>`-only page, refactor it into semantic HTML.**
> Expected: Replace layout `<div>`s with `<header>/<nav>/<main>/<aside>/<footer>` where appropriate, keeping `<div>` only for pure styling wrappers with no inherent meaning.

**Q3. Build a form with client-side validation using only HTML (no JS).**
> Expected: `required`, `type="email"`, `pattern`, `minlength`/`maxlength`, and correct `<label for>` pairing — demonstrating knowledge that a surprising amount of validation needs zero JavaScript.

---

### 🐛 Debugging Questions

**Q1. "My `<label for="email">` isn't focusing the input when clicked. Why?"**
> **Answer:** The `for` attribute value doesn't match the input's `id` exactly (case-sensitive, must be identical string) — or the input lacks an `id` altogether.

**Q2. "My `<script>` at the bottom of `<body>` still seems to block rendering slightly. Why?"**
> **Answer:** Even at the bottom, a synchronous script still blocks parsing of anything *after* it (though by then most content above is already parsed) — and if the script does heavy synchronous DOM work, it can still delay paint. Consider `defer` or moving non-critical logic to execute after `load`/`DOMContentLoaded`.

**Q3. "Images with `alt` text still fail accessibility audits. Why?"**
> **Answer:** Likely the `alt` text is non-descriptive (`alt="image"` or `alt="photo1.jpg"`) rather than meaningfully describing content, or a purely decorative image is missing `alt=""` (empty, not omitted) to be properly skipped by screen readers.

---

### 💻 Coding Questions

**Q1. Write the minimum valid HTML5 document.**
```html
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>t</title></head><body></body></html>
```

**Q2. Write a semantic blog post layout with a title, author, publish date, and body content.**
```html
<article>
  <header>
    <h1>My First Post</h1>
    <p>By <span>Jane Doe</span> on <time datetime="2026-08-06">Aug 6, 2026</time></p>
  </header>
  <p>Body content goes here...</p>
</article>
```

**Q3. Write a table with proper accessible header associations.**
```html
<table>
  <caption>Q1 Sales</caption>
  <thead>
    <tr><th scope="col">Month</th><th scope="col">Revenue</th></tr>
  </thead>
  <tbody>
    <tr><th scope="row">Jan</th><td>$10,000</td></tr>
  </tbody>
</table>
```


---

## 11. Follow-up Questions (Interviewer Playbook)

For each core question above, interviewers commonly probe deeper. Examples:

- **After "What is semantic HTML?"** → *"Can you give an example where using a non-semantic `<div>` would actually be the *correct* choice?"* (Answer: purely stylistic wrapper divs with no inherent meaning, e.g., a flex container just for layout.)
- **After "defer vs async"** → *"Which would you use for Google Analytics vs your main app bundle, and why?"* (Answer: `async` for analytics — order/timing doesn't matter; `defer` for app bundle — needs DOM ready and predictable order.)
- **After "alt text"** → *"What should `alt` be for a purely decorative background-style image?"* (Answer: `alt=""` — empty but present, so screen readers skip it entirely rather than reading the filename.)
- **After "GET vs POST"** → *"Is GET or POST cached by the browser? Which is idempotent?"* (Answer: GET is cacheable and idempotent; POST is not idempotent and not cached by default.)
- **After "reflow vs repaint"** → *"Name 3 CSS properties that avoid layout/paint entirely."* (Answer: `transform`, `opacity`, and `filter` in many cases — GPU-composited.)
- **After "Shadow DOM"** → *"Do CSS custom properties (variables) cross the Shadow DOM boundary?"* (Answer: Yes — inherited CSS custom properties do cross, unlike regular styles.)
- **After SSR vs CSR** → *"What is hydration, and what problems can it cause?"* (Answer: attaching JS event listeners/interactivity to server-rendered HTML; can cause a "hydration mismatch" if server and client render different output.)

---

## 12. Coding Exercises

### 🟢 Easy
**Exercise:** Build a static "About Me" page with a heading, profile image (with proper `alt`), a paragraph bio, and a list of 3 hobbies.
> **Focus:** Basic tags, image accessibility, list usage.

**Exercise:** Create a simple navigation bar with Home, About, Contact links using a `<nav>` and `<ul>`.
> **Focus:** Semantic navigation structure.

### 🟡 Medium
**Exercise:** Build a contact form with Name, Email, Message fields, proper `<label>` associations, and HTML5 validation (`required`, `type="email"`, `minlength`).
> **Focus:** Forms, validation, accessibility.

**Exercise:** Build a pricing table comparing 3 plans using semantic `<table>` markup with a `<caption>` and proper `<th scope>`.
> **Focus:** Accessible tabular data.

### 🔴 Hard
**Exercise:** Build a fully accessible modal dialog structure using only HTML + ARIA attributes (no JS logic needed, just correct markup): `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, and a focus-trap-ready structure.
> **Focus:** Advanced ARIA patterns.

**Exercise:** Build a responsive image gallery using `<picture>` with 3 breakpoints and lazy loading for all but the first image.
> **Focus:** Responsive images + performance.

### 🎯 Interview-Level
**Exercise:** You're given a page that scores poorly on Lighthouse for accessibility and performance. Given the raw HTML (missing `alt`s, no `lang`, images without dimensions, blocking scripts in `<head>`), refactor it to fix all four issues and explain each fix in one sentence.
> **Focus:** Real audit-and-fix workflow — commonly given as a take-home or live-coding exercise at mid-to-senior interviews.

---

## 13. MCQs (Multiple Choice Questions)

**Q1. Which tag is used to define the most important heading on a page?**
A) `<heading>`  B) `<h1>`  C) `<head>`  D) `<title>`
> **Answer: B.** `<heading>` doesn't exist; `<head>` is metadata; `<title>` sets the tab name, not an on-page heading.

**Q2. Which attribute makes an image accessible to screen readers?**
A) `title`  B) `longdesc`  C) `alt`  D) `aria-label`
> **Answer: C.** `alt` is the standard, required mechanism. `title` shows a tooltip but isn't reliably announced. `aria-label` can work but is not the conventional/primary choice for `<img>`.

**Q3. Which of these is a block-level element?**
A) `<span>`  B) `<a>`  C) `<div>`  D) `<strong>`
> **Answer: C.** The others are inline by default.

**Q4. What does `defer` guarantee that `async` does not?**
A) Faster download  B) Execution order matches document order  C) Smaller file size  D) No network request
> **Answer: B.** `async` scripts execute as soon as ready, with no order guarantee; `defer` preserves document order.

**Q5. Which meta tag is essential for mobile responsiveness?**
A) `<meta charset>`  B) `<meta name="viewport">`  C) `<meta name="robots">`  D) `<meta name="description">`
> **Answer: B.**

**Q6. Which element is NOT self-closing/void?**
A) `<img>`  B) `<br>`  C) `<script>`  D) `<input>`
> **Answer: C.** `<script>` requires a closing tag even if empty (`<script src="x.js"></script>`).

**Q7. What is the correct pairing for a label and input?**
A) `<label id="email">` + `<input for="email">`
B) `<label for="email">` + `<input id="email">`
C) `<label name="email">` + `<input label="email">`
D) No pairing needed, proximity is enough
> **Answer: B.**

**Q8. Which HTTP method should you NOT use to submit sensitive data like passwords?**
A) POST  B) GET  C) PUT  D) None, both are equally safe
> **Answer: B.** GET appends data to the URL, exposing it in browser history, server logs, and referrer headers.

**Q9. Which is the correct use case for `<article>` over `<section>`?**
A) A sidebar widget  B) A self-contained blog post that could stand alone in a feed  C) A generic page wrapper  D) A footer
> **Answer: B.**

**Q10. What triggers a browser "reflow"?**
A) Changing `color`  B) Changing `opacity`  C) Changing an element's `width`  D) Changing `visibility` alone
> **Answer: C.** Geometry changes (`width`, `height`, adding/removing DOM nodes) trigger reflow; `color`/`opacity`/`visibility` (in most cases) are cheaper repaint/composite operations.

---

## 14. Flashcards (Q on front, A on back)

| # | Front (Question) | Back (Answer) |
|---|---|---|
| 1 | What does DOM stand for? | Document Object Model |
| 2 | Block or inline: `<p>`? | Block |
| 3 | Block or inline: `<a>`? | Inline |
| 4 | Attribute that links `<label>` to `<input>`? | `for` (matching input's `id`) |
| 5 | Tag for the largest heading? | `<h1>` |
| 6 | Which meta tag sets character encoding? | `<meta charset="UTF-8">` |
| 7 | Semantic tag for site navigation? | `<nav>` |
| 8 | Semantic tag for a self-contained post? | `<article>` |
| 9 | Attribute preventing tabnabbing on `target="_blank"`? | `rel="noopener noreferrer"` |
| 10 | Which script attribute preserves execution order? | `defer` |
| 11 | Which script attribute has no order guarantee? | `async` |
| 12 | Tag for a dropdown list of options? | `<select>` |
| 13 | Which input type restricts to valid email format? | `type="email"` |
| 14 | Tag used purely for tabular data? | `<table>` |
| 15 | Empty `alt` value use case? | Decorative images (`alt=""`) |
| 16 | HTML5 tag for scalable vector graphics? | `<svg>` |
| 17 | HTML5 tag for drawing via JS (pixel-based)? | `<canvas>` |
| 18 | Attribute storing custom JS-readable data? | `data-*` |
| 19 | Root element of every HTML doc? | `<html>` |
| 20 | Tag that's inert until cloned by JS? | `<template>` |

---

## 15. Cheat Sheet (One Page)

```
DOCUMENT SKELETON
<!DOCTYPE html><html lang="en"><head>...</head><body>...</body></html>

SEMANTIC LAYOUT TAGS
header · nav · main · article · section · aside · footer

TEXT
h1-h6 · p · strong (important) · em (emphasis) · blockquote · code · pre

LISTS
ul (bullets) · ol (numbers) · li · dl/dt/dd (definitions)

LINKS & MEDIA
a href · img src+alt · video/audio + <source> · picture + srcset

FORMS
form action method · label for=id · input type=... · select/option
textarea · button type=submit · required/min/max/pattern

TABLES
table > caption > thead > tbody > tfoot | tr > th scope / td

SCRIPT LOADING
<script src>            → blocks parsing, runs immediately
<script defer src>      → non-blocking, runs in order after parse
<script async src>      → non-blocking, runs ASAP, no order guarantee

PERFORMANCE
width/height on media · loading="lazy" · rel=preload/prefetch/preconnect

ACCESSIBILITY
alt text · label-for · aria-* (only when native tags insufficient)
logical heading order · sufficient contrast · keyboard-navigable

SECURITY
rel="noopener noreferrer" on target=_blank · sandbox on untrusted iframes
```


---

## 16. Revision Notes

### ⏱️ 5-Minute Revision
- HTML = structure, not logic.
- Use semantic tags: `header/nav/main/article/section/aside/footer`.
- Every image needs `alt`. Every label needs matching `for`/`id`.
- `defer` = ordered, after parse. `async` = as-ready, unordered.
- One `<h1>` per page, logical heading order.

### ⏱️ 15-Minute Revision
Add to the above:
- Understand the critical rendering path: HTML → DOM, CSS → CSSOM, merge → Render Tree → Layout → Paint → Composite.
- Know block vs inline vs inline-block.
- Know `GET` (URL, cacheable, idempotent) vs `POST` (body, not cached).
- Know `rel="noopener noreferrer"` security reasoning.
- Know `srcset`/`sizes` for responsive images.
- Know reflow (layout) vs repaint vs composite, and which CSS properties trigger which.

### ⏱️ 30-Minute Revision
Add to the above:
- Walk through "typing a URL to seeing the page" end-to-end (Q1 in Advanced section).
- Know Shadow DOM/Web Components basics.
- Know `<template>` inert behavior vs `display:none`.
- Know CLS/LCP and how HTML markup choices affect Core Web Vitals.
- Review the full MCQ set and flashcards.
- Practice writing an accessible form and accessible table from memory.

### ⏱️ 1-Hour Revision
Add to the above:
- Re-read the full "Internal Working" section including the preload scanner concept.
- Review all Advanced + Scenario-Based questions and rehearse spoken answers out loud.
- Do the Hard and Interview-Level coding exercises from scratch, unaided.
- Review Company-Specific Questions section below.
- Skim the Common Bugs section to pattern-match against past personal mistakes.

---

## 17. Common Bugs & Debugging

| Bug | Root Cause | Fix |
|---|---|---|
| Label click doesn't focus input | `for`/`id` mismatch or typo | Ensure exact case-sensitive match |
| Layout jumps while images load | Missing `width`/`height` | Add explicit dimensions or `aspect-ratio` |
| Page flashes unstyled content (FOUC) | CSS loaded too late / render-blocking issues misconfigured | Load critical CSS early, avoid `@import` chains |
| Form submits but server gets no data for a field | Missing `name` attribute (only has `id`) | Add `name` — that's what's sent, not `id` |
| Screen reader skips entire section | Missing/incorrect ARIA landmark or heading structure | Add semantic tags / proper heading hierarchy |
| `target="_blank"` link considered insecure by scanner | Missing `rel="noopener noreferrer"` | Add the `rel` attribute |
| Custom `<div>` button not reachable by keyboard | Not focusable, no `tabindex`, no `role="button"`, no keydown handler | Use real `<button>`, or add full ARIA button pattern |
| Nested interactive elements break click behavior | e.g., `<a>` inside `<button>` or vice versa | Restructure — interactive elements cannot nest |
| Broken emoji/accented characters | Missing/incorrect `<meta charset>` | Set `UTF-8` charset explicitly and early in `<head>` |
| Mobile layout looks like desktop, zoomed out | Missing viewport meta tag | Add `<meta name="viewport" content="width=device-width, initial-scale=1.0">` |

**Debugging workflow interviewers expect you to describe:**
1. Reproduce the issue in DevTools.
2. Inspect the actual rendered DOM (not just source) — the browser may have auto-corrected malformed markup.
3. Check the Accessibility tab / Lighthouse audit for a11y-related bugs.
4. Check Network tab for blocking resources causing render delays.
5. Validate markup against the W3C validator for structural issues.

---

## 18. Production Interview Stories

**Story 1 — The E-commerce CLS Incident**
> *Scenario a senior engineer might present:* "Our conversion rate dropped after a redesign. Turns out the new hero banner images had no explicit dimensions, causing a huge layout shift as they loaded — users were clicking 'Add to Cart' right as the page jumped, missing the button, and rage-quitting."
> **What's expected:** Recognize this as a CLS/Core Web Vitals issue rooted in a basic HTML omission (missing `width`/`height`), and articulate that performance bugs are often *simple HTML mistakes*, not exotic JS problems.

**Story 2 — The Accessibility Lawsuit Close Call**
> *Scenario:* "Legal flagged that our checkout flow was inaccessible — an audit found unlabeled inputs and `<div>`-based buttons with no keyboard support, right before a compliance deadline (e.g., ADA/WCAG)."
> **What's expected:** Understand that accessibility isn't optional at the production/enterprise level — it's a legal and business requirement, and that fixes (semantic tags, ARIA, labels) are usually cheap if done early but expensive to retrofit at scale.

**Story 3 — The SEO Regression After Migrating to a SPA**
> *Scenario:* "After migrating from server-rendered pages to a pure client-side React app, organic traffic dropped 40% within weeks."
> **What's expected:** Connect this to HTML delivery — an empty initial HTML shell hurts crawlability/indexing for some crawlers and slows First Contentful Paint — and propose SSR/SSG (Next.js) as the fix, showing you can reason across the HTML/SEO/framework boundary.

---

## 19. Frequently Asked Interview Questions — Extended Bank

*(Consolidated, rapid-fire format — quick answers. Use this bank alongside Section 10 for maximum coverage; the two are designed to be complementary, not duplicated.)*

### Beginner (Rapid-Fire, 1-line answers)
1. What does HTML stand for? → HyperText Markup Language.
2. What's the file extension for HTML files? → `.html` or `.htm`.
3. Is HTML case-sensitive? → Tag names aren't, but attribute values (like class names referenced in CSS) generally are treated as case-sensitive in practice.
4. What's the default value of the `type` attribute on `<input>`? → `text`.
5. What tag embeds a YouTube video? → `<iframe>`.
6. What's the difference between `<ul>` and `<ol>`? → Bulleted vs numbered.
7. How do you create a line break? → `<br>`.
8. How do you create a horizontal rule? → `<hr>`.
9. What's an HTML entity? Give an example. → A reserved-character escape, e.g., `&amp;` for `&`.
10. What attribute disables a form input? → `disabled`.
11. What attribute makes an input read-only but still submitted? → `readonly`.
12. Which tag defines the page's favicon? → `<link rel="icon">`.
13. What's the difference between `<script>` and `<noscript>`? → `<noscript>` content shows only if JS is disabled.
14. What does the `target="_blank"` attribute do? → Opens the link in a new tab/window.
15. What is the `placeholder` attribute for? → Shows hint text inside an empty input (not a substitute for `<label>`).
16. How do you make an input mandatory? → `required` attribute.
17. What does `<hr>` semantically represent? → A thematic break/change of topic.
18. What is the difference between absolute and relative URLs? → Absolute includes full protocol+domain; relative is based on current page location.
19. What tag groups form controls with a heading? → `<fieldset>` + `<legend>`.
20. What does `autocomplete="off"` do? → Disables browser autofill suggestions for that field.
21. What is the correct tag for a dropdown menu? → `<select>` with `<option>` children.
22. What does the `multiple` attribute do on `<select>` or `<input type="file">`? → Allows multiple selections/files.
23. How do you group table rows visually into header/body/footer? → `<thead>`, `<tbody>`, `<tfoot>`.
24. What is the `colspan` attribute for? → Merges table cells across columns.
25. What is the `rowspan` attribute for? → Merges table cells across rows.
26. What tag is used for a progress bar? → `<progress>`.
27. What tag represents a scalar measurement within a range (e.g., disk usage)? → `<meter>`.
28. What does `contenteditable="true"` do? → Makes an element directly editable by the user.
29. What's the purpose of the `download` attribute on `<a>`? → Forces the browser to download the linked file instead of navigating to it.
30. What is the correct self-closing syntax in HTML5 (vs XHTML)? → HTML5 doesn't require the trailing slash (`<br>` is valid, though `<br />` also works for compatibility).

### Intermediate (Rapid-Fire)
1. What's the difference between `<meta name="description">` and `<meta name="keywords">` for SEO today? → Description is still used for search snippets; keywords is largely ignored by modern search engines.
2. Why avoid inline `style=""` attributes in production? → Hurts maintainability, can't be cached/reused, complicates CSP, harder to override.
3. What's a "void element" content model rule? → Cannot have children or a closing tag.
4. What does `aria-hidden="true"` do? → Hides an element from the accessibility tree (but NOT visually) — useful for decorative icons.
5. What's the difference between `visibility:hidden` and `display:none` regarding accessibility/layout (conceptually, tested via HTML context)? → `display:none` removes from layout and accessibility tree entirely; `visibility:hidden` removes visually and from a11y tree but still occupies layout space.
6. What is progressive enhancement? → Building a baseline functional experience with HTML first, then layering CSS/JS enhancements — ensuring core functionality works even if JS fails.
7. What's graceful degradation (vs progressive enhancement)? → Building the full-featured experience first, then ensuring it degrades acceptably on older/limited browsers — opposite starting point from progressive enhancement.
8. What does `<link rel="canonical">` prevent? → Duplicate content SEO penalties across near-identical URLs.
9. What HTML tag/attribute combo enables native browser spell-check? → `spellcheck="true"` (often default on text inputs/contenteditable).
10. What's the difference between `<figure>`/`<figcaption>` and just `<img>` + `<p>`? → `<figure>` semantically groups media with its caption as a single self-contained unit, independent of the image's exact placement.
11. Why is using `<table>` for layout considered an anti-pattern today? → Poor accessibility (screen readers announce irrelevant row/column info), poor responsiveness, tightly couples structure to presentation — replaced by CSS Grid/Flexbox.
12. What's the difference between `<time>` and plain text for dates? → `<time datetime="...">` is machine-readable, aiding SEO and browser features (e.g., "add to calendar").
13. What is the purpose of `<base href="...">`? → Sets a base URL for all relative URLs on the page.
14. What does `crossorigin` on `<script>`/`<link>` do? → Configures CORS behavior for fetching that resource, needed for things like accurate error reporting on cross-origin scripts.
15. What's a render-blocking resource? → A CSS or synchronous JS resource the browser must process before it can paint the page.

### Advanced (Rapid-Fire)
1. What's the difference between the "preload scanner" and the main HTML parser? → Preload scanner speculatively scans ahead for fetchable resources even while the main parser is blocked by synchronous scripts.
2. Do CSS custom properties cross Shadow DOM boundaries? → Yes, inherited custom properties (CSS variables) do cross; regular selectors do not.
3. What's "hydration" in the context of SSR HTML? → Attaching JS interactivity/event listeners to already-server-rendered HTML rather than re-rendering from scratch.
4. What causes a "hydration mismatch"? → Server-rendered HTML differs from what the client would render (e.g., due to `Date.now()` or `Math.random()` used during render, or browser-only APIs).
5. Why might lazy-loading the LCP (Largest Contentful Paint) image hurt performance? → It delays the very element the metric is measuring, worsening the score — LCP elements should load eagerly/with priority.
6. What is the accessibility tree and how does it relate to the DOM? → A parallel, filtered tree derived from the DOM specifically for assistive technology consumption, incorporating computed roles/names/states.
7. How does `<template>` differ fundamentally from a hidden `<div>`? → Its content is inert (not rendered, resources not fetched, not part of the live DOM) until explicitly cloned via JS.
8. What are Declarative Shadow DOM's benefits for SSR? → Allows Shadow DOM to be expressed directly in server-rendered HTML (`<template shadowrootmode="open">`) without requiring JS to run first, improving SSR compatibility for Web Components.


---

## 20. Company-Specific Questions (Adapted for MERN Full-Stack Roles)

### 🟦 Google-Style
- "Walk me through the browser's critical rendering path in detail — where does HTML fit, and where are the biggest performance wins?" *(Tests deep internals + Core Web Vitals fluency, since Google weighs these heavily for search ranking.)*
- "How would you structure HTML for a page that must remain usable with JavaScript completely disabled?" *(Tests progressive enhancement philosophy.)*
- "Explain how you'd debug a Lighthouse accessibility score of 62 with zero context." *(Tests structured, tool-driven debugging.)*

### 🟩 Microsoft-Style
- "How would you design semantic markup for a large enterprise dashboard reused across 10+ product teams?" *(Tests system-level thinking, consistency, and design-system awareness.)*
- "Explain ARIA landmark roles and how they map to native HTML5 elements." *(Tests accessibility depth — Microsoft has strong internal accessibility standards.)*

### 🟧 Amazon-Style
- "A customer on a slow 3G connection in India can't check out — the page never becomes interactive. How does your HTML markup choice affect this?" *(Tests real-world performance-under-constraint thinking, tied to Amazon's global/low-bandwidth user base.)*
- "Tell me about a time you had to make a trade-off between shipping fast and writing 'correct' semantic HTML." *(Behavioral + technical hybrid, common at Amazon due to Leadership Principles like "Bias for Action" vs "Insist on the Highest Standards.")*

### 🟦 Meta-Style
- "How would you structure HTML for an infinite-scroll social feed to remain accessible and performant?" *(Tests virtualization + a11y + semantic list structure combined.)*
- "Explain how you'd implement a real-time notification badge accessibly (e.g., `aria-live`)." *(Tests dynamic-content accessibility, core to Meta's product surfaces.)*

### 🟥 Netflix-Style
- "Netflix serves users on smart TVs, low-end Android devices, and high-end desktops from one HTML foundation. How would you approach responsive, resilient markup?" *(Tests adaptability across constrained rendering environments — TVs often have limited/older browser engines.)*
- "How does HTML structure affect video-heavy page performance (e.g., our homepage with dozens of autoplay previews)?" *(Tests understanding of lazy-loading, `<video>` semantics, and resource prioritization.)*

### 🟪 Modern Startup-Style
- "We're moving fast and don't have a dedicated a11y team yet — what's the minimum semantic HTML discipline you'd insist on regardless?" *(Tests pragmatism — knowing the 20% of practices giving 80% of the value: semantic tags, `alt`, labels, heading order.)*
- "You're the only frontend engineer. How do you keep HTML maintainable as the codebase grows without a big framework yet?" *(Tests component-thinking and naming discipline even in a pre-framework codebase.)*
