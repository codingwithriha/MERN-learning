# misc-demo — Notes

## What this project teaches
Styling options available in Next.js beyond plain global CSS: **CSS Modules** and
**Sass/SCSS** (including Sass modules and shared Sass variables).

## Key concepts
- [x] Global CSS (`globals.css`) — imported once in the root layout, applies everywhere
- [x] CSS Modules (`*.module.css`) — locally-scoped class names, imported as a JS object
- [x] Sass support — `sass` added as a dependency, `.scss` files work out of the box
- [x] Sass Modules (`*.module.scss`) — scoped Sass, same idea as CSS Modules but with
  Sass features (variables, `@use`)
- [x] Shared Sass variables file (`colors.scss`) imported into multiple modules with
  `@use "../colors" as colors`

## File-by-file breakdown
- `src/app/colors.scss` — defines `$primary` / `$secondary` Sass variables shared across
  the app.
- `src/app/about/about.module.css` vs `about.module.scss` — same page has **both** a
  CSS Module and a Sass Module side-by-side to compare syntax; the page (`page.tsx`)
  actually imports the `.scss` one (`styles.highlightscss`).
- `src/app/contact/` — same pattern as `about/`, using `$secondary` instead of
  `$primary`, proving the shared `colors.scss` variables give consistent theming across
  pages.
- `src/app/globals.css` — has an extra rule (`h2 { color: orange; }`) demonstrating that
  global styles still apply *underneath* module styles (specificity/cascade order
  matters — module class wins here because it's more specific, not because it's a
  module).

## Gotchas / things to remember
- CSS Module / Sass Module class names must be accessed via the imported `styles`
  object (`styles.highlightscss`), **not** as a plain string — this is what gives the
  scoping.
- `@use` (not `@import`) is the modern Sass syntax for pulling in shared variable files.
- You need the `sass` package in `devDependencies` for `.scss` to work at all (check
  `package.json`).