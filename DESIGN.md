# Design System Specification: Core Theme

## 1. Overview & Creative North Star: "Warm Command Surface"
The current core theme is a restrained, technical CTF interface with editorial typography and ember-toned depth. It is no longer aiming for glassy futurism or decorative spectacle. The intended result is a product that feels:

* precise rather than playful
* warm rather than neon
* authored rather than templated
* sharp rather than soft

This system should feel like a serious event control surface with just enough warmth to avoid the cold, generic “enterprise dashboard” look.

### Core principles
* **Precision geometry:** corners are tight and deliberate, not bubbly or pill-shaped.
* **Tonal layering:** hierarchy comes from surface shifts, not loud outlines.
* **Editorial restraint:** headlines can feel designed, but supporting copy should stay direct.
* **Operational clarity:** pages should get to the task quickly. Avoid decorative explanation.

---

## 2. Color System: Ember Tones on Tonal Surfaces
The palette is built around dark ember surfaces with warm orange primary actions and muted gold accents.

### Dark theme tokens
* `surface`: `#150c09`
* `surface-low`: `#1b110e`
* `surface-high`: `#291d19`
* `surface-highest`: `#30231e`
* `surface-bright`: `#392824`
* `text`: `#fdeae4`
* `text-soft`: `rgb(253 234 228 / 0.72)`
* `text-muted`: `rgb(253 234 228 / 0.54)`
* `primary`: `#ff9062`
* `primary-strong`: `#ff793e`
* `accent`: `#f4c46d`
* `success`: `#b8d67d`
* `danger`: `#ff8b7a`
* `outline`: `rgb(253 234 228 / 0.12)`

### Light theme tokens
* `surface`: `#f4ebe6`
* `surface-low`: `#ebe0d8`
* `surface-high`: `#e1d1c5`
* `surface-highest`: `#d8c5b8`
* `surface-bright`: `#fff6f0`
* `text`: `#261512`
* `text-soft`: `rgb(38 21 18 / 0.76)`
* `text-muted`: `rgb(38 21 18 / 0.58)`
* `primary`: `#d96c34`
* `primary-strong`: `#bf5422`
* `accent`: `#b88924`
* `success`: `#6f8c37`
* `danger`: `#b14f45`
* `outline`: `rgb(38 21 18 / 0.08)`

### Color rules
* Use surface shifts before introducing extra decoration.
* Use `primary` for the main action only. Do not scatter orange everywhere.
* Use `accent` sparingly for metadata or highlights, not as a second CTA system.
* Keep status colors functional. Success and danger should read as state, not theme.

---

## 3. Geometry & Radii
The live theme is sharper than the original spec. These values are the standard now:

* `radius`: `0.28rem`
* `radius-lg`: `0.5rem`
* `radius-xl`: `0.68rem`

### Geometry rules
* Default interactive radius: `0.28rem`
* Larger panels, modals, navbar shell, footer shell: `0.5rem` to `0.68rem`
* Never use full pills unless a specific component truly requires it
* Avoid “friendly” rounding on cards, badges, filters, and helper controls

This system should feel machined, not inflated.

---

## 4. Typography
Typography carries most of the system’s personality.

### Fonts
* **Display:** `Space Grotesk`
* **Body:** `Manrope`

### Usage
* Use `Space Grotesk` for page titles, key section headers, and select branded moments.
* Use `Manrope` for body text, forms, tables, metadata, and utility UI.
* Keep body copy clear and compact. This is not a marketing site.

### Hierarchy guidance
* Headlines should feel firm and editorial, with tight tracking.
* Eyebrow labels are uppercase, spaced, and quiet.
* Supporting text should stay low-drama and readable.
* Do not force lowercase styling for headings or brand names.

---

## 5. Layout & Composition
The layout language is structured, quiet, and asymmetrical where useful.

### Layout rules
* Prefer strong left-aligned reading flow over centered marketing layouts.
* Use split hero layouts only when the second column carries real information.
* Keep page heads compact on operational pages like challenges, scoreboard, settings, and auth.
* Reduce wrapper-on-wrapper composition. The primary surface should hold the content.

### Content strategy
* Home can be slightly more editorial.
* Functional pages should not spend vertical space explaining obvious tasks.
* Empty states should be clear and useful, not poetic.

---

## 6. Surfaces, Borders, and Depth
This system no longer uses blur-heavy floating glass. Depth is now controlled and mostly solid.

### Surface hierarchy
* `surface` for the page background
* `surface-low` for broad structural zones
* `surface-high` for main panels
* `surface-highest` for emphasized containers such as navbar shell, footer shell, and modals

### Borders
* Borders are allowed, but they should be faint and structural.
* Use `outline` or similar low-contrast separators when needed.
* Prefer section breaks, spacing, and tonal changes over heavy borders.

### Shadows
* Shadows should be soft and low-contrast.
* Default elevated shadow: subtle dark lift, not dramatic glow.
* Orange glow is reserved for small branded accents, not whole surfaces.

### Explicit rule
* Do not use backdrop blur or glassmorphism as a default styling mode.
* Do not rely on broad page gradients as the main source of atmosphere.

---

## 7. Components

### Navbar
* Navbar is a contained shell, not a flat strip.
* Primary nav should read as the main route group.
* Utility controls should be visually secondary and denser than primary links.
* On desktop, utility items should feel quiet, not like a second main nav.

### Buttons
* **Primary:** warm orange fill, dark text, no decorative gradient dependency
* **Secondary:** tonal surface button, not outlined by default
* **Ghost/utility:** subtle background on hover, quiet by default

### Cards and panels
* Use panels when content needs containment or task grouping.
* Avoid nested card stacks unless there is a clear hierarchy reason.
* Featured states should come from composition and tone, not oversized rounding.

### Inputs
* Inputs sit on tonal fills, not browser-default white.
* Focus state should use the warm focus ring and brighter surface treatment.
* File inputs, selects, readonly fields, and disabled states must look intentional.

### Tables
* Tables should feel integrated into the surface system.
* Header rows should be quiet and uppercase.
* Avoid hacks that force columns into narrow widths or vertical text.

### Challenge flow
* The challenge board should scan clearly by category.
* Modal content should feel like a proper workspace, not a generic Bootstrap dialog.
* Solved, submit, file, and hint states should all follow the same tonal language.

---

## 8. Motion & Interaction
Motion is restrained and should support clarity, not attract attention.

### Motion rules
* Use quick, smooth transitions with a controlled easing curve.
* Hover states should mostly shift tone, not scale dramatically.
* Focus states must remain visible and warm.
* Avoid ornamental motion, parallax, or over-animated dashboard behavior.

---

## 9. Copy & Tone
The product voice should be direct and useful.

### Tone rules
* Prefer plain language over branded metaphors.
* Remove copy that merely repeats what the page title already says.
* Explain only what is necessary for action or orientation.
* Avoid “AI slickness” such as decorative overline prose, vague claims, or over-written helper text.

### Good examples
* `Challenges`
* `Scoreboard`
* `Open Challenges`
* `No challenges are available`

### Bad examples
* explanatory paragraphs on obvious operational pages
* decorative labels that do not add meaning
* generic product-marketing statements on task-focused screens

---

## 10. Do's and Don'ts

### Do
* Use the ember palette with restraint.
* Keep corners tight and consistent.
* Let typography carry identity.
* Use spacing and surface shifts to establish hierarchy.
* Make operational pages fast to parse.

### Don’t
* Don’t use pill shapes or oversized radii.
* Don’t reintroduce blur-heavy glass surfaces.
* Don’t overuse gradients or glowing accents.
* Don’t add explanatory copy where the UI is already self-evident.
* Don’t fall back to generic Bootstrap green, white, or stock component styling.
