# Design QA — seção Nossa História

- Source visual truth: `mobile-reference-desktop.png`
- Desktop implementation screenshot: `desktop-after.png`
- Mobile implementation screenshot: `mobile-after.png`
- Combined comparison: `design-comparison.png`
- Route: `http://localhost:3000/pt-BR/sobre`
- State: page loaded, video paused, mobile menu closed

## Capture normalization

- Source pixels: 1917 × 906.
- Desktop browser CSS viewport: 1903 × 904 at device scale 1; the in-app capture surface exported 1265 × 712.
- Mobile browser viewport: 320 × 800; document client width 305 px after scrollbar allocation.
- Mobile capture pixels: 320 × 800.
- The desktop source and implementation were placed in one comparison canvas. The in-app browser export was rendered at its native capture size rather than upscaled, so typography and spacing were judged proportionally.

## Full-view comparison evidence

- The desktop implementation preserves the source hierarchy, two-column layout, red/black/white palette, CTA treatment, video aspect ratio, header structure, border treatment, and copy.
- The mobile implementation stacks content before the video, clears the fixed header, keeps the heading on one line down to the tested 305 px content viewport, and avoids horizontal overflow.

## Focused-region evidence

- Header: phone and language controls remain visible at 320 px; the long address and email are progressively hidden to prevent wrapping.
- History content: the left rule, body-copy hierarchy, full-width CTA, and spacing remain readable without clipping.
- Video card: the 16:9 frame, centered play control, label, and duration remain visible at the narrow breakpoint.

## Findings

- No actionable P0, P1, or P2 issues remain.
- P3: the mobile header intentionally omits address and email because the narrow viewport cannot accommodate them without wrapping; phone and language access remain available.

## Required fidelity surfaces

- Fonts and typography: existing project fonts, weights, uppercase hierarchy, letter spacing, and copy are preserved; mobile sizes were reduced only where needed for fit.
- Spacing and layout rhythm: desktop spacing is preserved; mobile now has explicit fixed-header clearance, tighter content rhythm, and a 40 px section gap.
- Colors and visual tokens: existing brand red, neutral text, black borders, and white surfaces are unchanged.
- Image quality and asset fidelity: the existing Automec logo and video presentation are reused; no replacement assets or approximations were introduced.
- Copy and content: all supplied Portuguese content is unchanged.

## Interaction and runtime checks

- Mobile navigation opens and closes successfully.
- No horizontal document overflow at the 320 px test viewport.
- Browser console: no runtime errors; one pre-existing Next Image aspect-ratio warning remains.
- Production build: passed.

## Comparison history

- Initial P2: fixed navigation covered the “Credibilidade” label on mobile, and the top-bar phone wrapped across lines.
- Fix: added mobile-only section clearance, responsive top-bar visibility rules, nowrap contact controls, fluid heading sizing, full-width CTA, and compact video controls.
- Post-fix evidence: `mobile-after.png` at 320 × 800 shows the complete header and section without clipping or horizontal overflow.

final result: passed
