# Design QA — Mux Player

- Source visual truth: `mux-reference.png`
- Implementation screenshot: `mux-player-validated.png`
- Combined focused comparison: `mux-comparison.png`
- Home source visual truth: `home-mux-reference.png`
- Home implementation screenshot: `home-mux-player.png`
- Route: `http://localhost:3000/pt-BR/sobre`
- Viewport: 1265 × 712 CSS px, device scale 1
- State: player paused, controls visible

## Full-view comparison evidence

- The page retains the established two-column layout, fixed navigation clearance, typography, brand colors, CTA, spacing, and responsive behavior.
- The player remains 16:9 and does not introduce horizontal overflow.
- The home “Tecnologia e Inovação” section now uses the same player treatment without changing its text-column proportions.

## Focused-region comparison evidence

- The source and implementation were cropped to the player frame and normalized to 850 × 478 in `mux-comparison.png`.
- The centered circular red play control, dark 16:9 frame, white uppercase title, rounded corners, and bottom fade match the supplied target.
- The Mux demo poster appeared during runtime validation; production intentionally sets `poster=""` so the configured asset opens on the target's black idle frame.

## Required fidelity surfaces

- Fonts and typography: existing uppercase label, weight, letter spacing, and white foreground are preserved.
- Spacing and layout rhythm: 16:9 ratio, centered control, lower-left title, radius, border, and shadow match the target proportions.
- Colors and visual tokens: Automec red, neutral-black surface, and white controls remain consistent.
- Image quality and asset fidelity: the official Mux player renders the video; no simulated video image is used.
- Copy and content: title changed to “Conheça nossa fábrica”, with equivalent English and Spanish translations.

## Runtime checks

- Official `@mux/mux-player-react` lazy component loaded with a valid public demo Playback ID.
- Player play action changed the Mux media state from paused to playing.
- The custom title overlay hides while playback is active.
- No Mux runtime console errors.
- Without `NEXT_PUBLIC_MUX_PLAYBACK_ID`, a stable non-interactive visual fallback is rendered.
- The home accepts `NEXT_PUBLIC_MUX_HOME_PLAYBACK_ID` and falls back to the shared `NEXT_PUBLIC_MUX_PLAYBACK_ID`.
- The home fallback was rendered in-browser with no console errors or horizontal overflow.
- Production build passes without a Playback ID.

## Findings

- No actionable P0, P1, or P2 issues remain.
- P3: the final production video itself cannot be reviewed until the Automec Playback ID is supplied.

---

## Product video cards

- Source visual truth: `products-video-card-reference.png` (425 × 712 px).
- Desktop implementation: `products-video-full-height.png`.
- Route: `http://localhost:3000/pt-BR/produtos`.

### Evidence

- Four video cards are rendered from the first four products.
- At the target desktop size, every card measures exactly 425 × 713 CSS px; measured ratio: 0.59607.
- The Mux player occupies 100% of the card width and height; there is no white content section.
- Product model and title are presented as lightweight overlays and disappear during playback.
- Each card has an independent Mux Playback ID and a stable fallback when its ID is absent.
- Browser console: no runtime errors.
- Production build: passed.

### Required fidelity surfaces

- Fonts and typography: compact uppercase badge, model, and title overlays use the established project hierarchy.
- Spacing and layout rhythm: target 425 × 713 dimensions and border are preserved while video fills the complete card.
- Colors and visual tokens: the full dark media surface, Automec red play control, and white overlays use existing project tokens.
- Image and video fidelity: the complete source card surface is intentionally replaced by the official Mux player, as requested.
- Copy and content: overlays use localized titles already defined for the four products.

final result: passed
