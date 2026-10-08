# Feature Specification: Design Review Fixes

**Feature Branch**: `001-design-review-fixes`
**Created**: 2026-03-14
**Status**: Draft
**Input**: User description: "Fix design review findings: globe light mode, service card accessibility, i18n gaps, typo corrections, visual polish, and theme consistency improvements"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Globe Visibility in Light Mode (Priority: P1)

A visitor arrives at the GearsMap homepage with their system set to light mode. They see the hero section with a clearly visible, well-contrasted 3D globe that showcases the company's geospatial identity. The globe adapts its rendering to match whether the user is in light or dark mode.

**Why this priority**: The globe is the primary visual element of the hero section. When it's nearly invisible in light mode, the hero loses its geospatial identity and the first impression is broken for roughly half of all visitors.

**Independent Test**: Toggle between light and dark mode on the homepage and verify the globe is clearly visible and aesthetically appropriate in both modes.

**Acceptance Scenarios**:

1. **Given** the site is loaded in light mode, **When** the hero section renders, **Then** the globe appears with light-mode-appropriate colors and contrast against the light background.
2. **Given** the site is loaded in dark mode, **When** the hero section renders, **Then** the globe appears with the existing dark-mode styling (no regression).
3. **Given** the user toggles between light and dark mode, **When** the theme changes, **Then** the globe transitions to the appropriate rendering without a full page reload.

---

### User Story 2 - Keyboard-Accessible Service Cards (Priority: P1)

A visitor using only a keyboard (no mouse) navigates through the homepage. They can Tab to each of the six service cards, see a visible focus indicator, and press Enter or Space to open the service detail dialog. This is critical for users with motor disabilities and is a WCAG 2.1 Level AA requirement.

**Why this priority**: Six primary portfolio interactions are completely inaccessible to keyboard-only users, which is a WCAG 2.1 SC 2.1.1 failure. This is both an accessibility barrier and a potential legal compliance issue.

**Independent Test**: Navigate the services section using only keyboard (Tab, Enter, Space, Escape) and verify all cards are reachable and activatable.

**Acceptance Scenarios**:

1. **Given** a keyboard user is on the homepage, **When** they Tab through the services section, **Then** each service card receives visible focus in sequential order.
2. **Given** a service card has keyboard focus, **When** the user presses Enter or Space, **Then** the service detail dialog opens.
3. **Given** a service dialog is open, **When** the user presses Escape, **Then** the dialog closes and focus returns to the triggering card.
4. **Given** a screen reader is active, **When** the user navigates to a service card, **Then** the card's title and description are announced with an appropriate role.

---

### User Story 3 - Complete Internationalization Coverage (Priority: P2)

A French-speaking visitor selects "FR" from the language switcher. Every visible string on the page — including toast notifications, button loading states, team member roles, status badges, and form feedback — displays in French. No English strings leak through regardless of the selected language.

**Why this priority**: Incomplete translations undermine user trust and create a broken multilingual experience. While the site functions, the mixed-language output appears unprofessional.

**Independent Test**: Switch to each supported language (ES, EN, FR) and scroll through the entire page, verifying every visible string is translated. Trigger toast messages via the contact form to verify dynamic strings.

**Acceptance Scenarios**:

1. **Given** the language is set to FR, **When** the contact form is submitting, **Then** the submit button shows the French translation of "Sending...".
2. **Given** the language is set to FR, **When** the contact form submission succeeds, **Then** the success toast displays in French.
3. **Given** the language is set to FR, **When** the contact form submission fails, **Then** the error toast displays in French.
4. **Given** the language is set to ES, **When** the user views the team section, **Then** all team member roles display in Spanish.
5. **Given** the language is set to EN, **When** the user views project cards, **Then** status badges (e.g., "In Development") display in English.
6. **Given** the language is set to any supported language, **When** the user views the hero floating data cards, **Then** all card values display in the selected language.

---

### User Story 4 - Typo and Text Correctness (Priority: P2)

A Spanish-speaking visitor sees grammatically correct headings throughout the site. The contact section heading displays "Contáctenos" with the proper accent mark, not "Contactenos".

**Why this priority**: Typographical errors in prominent headings reduce perceived professionalism, especially for a company's primary marketing site.

**Independent Test**: Load the site in Spanish and verify the contact section heading displays with correct accents and spelling.

**Acceptance Scenarios**:

1. **Given** the site is displayed in Spanish, **When** the user scrolls to the contact section, **Then** the heading reads "Contáctenos" (with accent on á).

---

### User Story 5 - Visual Polish and Theme Consistency (Priority: P3)

The site uses a consistent design token system throughout. All color values follow the same format, z-index layering is predictable, and interactive elements use theme-aware color tokens rather than hardcoded values.

**Why this priority**: While not user-facing bugs, inconsistencies in the design token system create maintenance burden and potential visual regressions when themes are modified.

**Independent Test**: Inspect the CSS variables and verify all color tokens use the same color space format. Toggle dark mode and verify no hardcoded color values break the theme.

**Acceptance Scenarios**:

1. **Given** the design token system uses OKLCH, **When** all color tokens are reviewed, **Then** accent-related tokens use OKLCH values instead of hex.
2. **Given** a dialog CTA button exists, **When** the user views it in dark mode, **Then** the button text uses the theme-aware foreground token, not hardcoded white.
3. **Given** the page has a noise overlay and a sticky header, **When** both are rendered, **Then** the header always appears above the overlay with no visual z-index conflicts.

---

### User Story 6 - Accessibility Decorative Elements (Priority: P3)

Decorative elements like the 3D globe canvas are properly marked so assistive technologies skip them, and duplicate CSS declarations are cleaned up to maintain stylesheet hygiene.

**Why this priority**: While low impact individually, these items contribute to overall code quality and accessibility best practices.

**Independent Test**: Run a screen reader over the hero section and verify the globe is not announced. Search the global stylesheet for duplicate declarations.

**Acceptance Scenarios**:

1. **Given** a screen reader is navigating the hero section, **When** it encounters the globe canvas, **Then** the canvas is skipped (hidden from the accessibility tree).
2. **Given** the global stylesheet, **When** it is reviewed, **Then** no duplicate property declarations exist within the same selector.

---

### Edge Cases

- What happens when the theme is set to "system" and the OS preference changes while the globe is visible? The globe should reactively update.
- What happens when the language is changed while a toast notification is already displayed? Existing toasts may remain in the previous language (acceptable); new toasts must use the new language.
- What happens when a keyboard user rapidly Tab-presses through service cards? Focus should move sequentially without skipping cards or triggering unintended dialogs.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The 3D globe MUST render with appropriate contrast for both light and dark themes, adapting reactively to theme changes.
- **FR-002**: All six service cards MUST be reachable and activatable via keyboard (Tab, Enter/Space) with visible focus indicators.
- **FR-003**: The service card dialog MUST return focus to the triggering card when closed via Escape or the close button.
- **FR-004**: All user-visible strings on the page MUST be sourced from the translation system, including: toast messages, button loading states, team roles, project status badges, and floating card values.
- **FR-005**: Translations MUST exist for all three supported languages (ES, EN, FR) for every translatable string.
- **FR-006**: The Spanish contact section heading MUST display "Contáctenos" with the correct accent.
- **FR-007**: All color tokens in the design system MUST use the OKLCH color space consistently (no mixed hex values for design tokens).
- **FR-008**: Interactive elements in dialogs MUST use theme-aware color tokens (e.g., foreground tokens) instead of hardcoded color values.
- **FR-009**: The z-index stacking order MUST ensure the header renders above all decorative overlays.
- ~~**FR-010**: Logo images MUST not trigger browser console warnings about dimension mismatches.~~ *(Removed — fix requires inline styles, which violates constitution Technology Constraints. Warning is cosmetic.)*
- **FR-011**: The globe canvas element MUST be hidden from the accessibility tree.
- **FR-012**: The global stylesheet MUST not contain duplicate property declarations within the same rule.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: The globe is clearly visible and identifiable as a world map in both light and dark mode, confirmed by visual inspection at 1440px and 375px widths.
- **SC-002**: All six service cards are reachable via keyboard Tab navigation and activatable via Enter/Space, verified by completing a full keyboard-only walkthrough of the services section.
- **SC-003**: 100% of user-visible strings display in the selected language (ES, EN, FR) with zero English fallback leakage when a non-English language is active.
- **SC-004**: Zero browser console warnings or errors related to the changes on page load and after theme toggle.
- **SC-005**: The site passes WCAG 2.1 Level AA automated checks for the services section with zero critical violations.
- **SC-006**: All design tokens in the global stylesheet use a consistent color space format with no mixed notations.

## Assumptions

- The existing theme hook provides a resolved theme value that reflects the actual active theme (not "system").
- The globe rendering library accepts a parameter that controls light vs. dark rendering.
- The dialog trigger component correctly forwards keyboard events when wrapping a semantic button element.
- The existing i18n system supports adding new translation keys without structural changes.
- The OKLCH equivalent of the current accent hex value renders visually identical in supported browsers.
