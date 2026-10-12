# Release verification

classification: public

## October 12, 2026, second pass: machine map, labeled schematics, Trainium, timeline additions

Prepared on surface-intel / Claude Code, October 12, 2026, after the first release below. Verified in the Claude desktop app's built-in browser (Chromium) against a local `python -m http.server` copy of the working tree.

Scripted in-page checks passed across 96 selection states with zero errors: all seven organizations at 13 year cutoffs (1993, 1999, 2010, 2015, 2016, 2017, 2019, 2021, 2022, 2023, 2024, 2025, 2026) for the machine map, plus the five chip modes. For every organization and year the check confirmed that the text equivalent names the year, every box carries exactly one state (in use, also offered, dim, or not yet), a box is dashed exactly when the year precedes its first sourced appearance, no visible link touches a not-yet box, the number of drawn wires equals the number of distinct visible links, and the milestone count equals the events dated on or before the cutoff for both compared organizations. Every milestone, company, link, and chip source id resolves to an entry in `sources`, no source entry is unused, every rendered source link is an absolute URL, and the page has no duplicate element ids.

Also confirmed: the five schematics render as labeled SVG with block, cell, and text counts matching `data.js`; the comparison table highlights the active chip column; the "Compare with" dropdown now updates the detail panel; keyboard Enter on a focused machine-map box selects that organization; the motion toggle removes cell animation; four Open Graph tags are present. No console messages and no network requests other than the four local application files occurred during the checks.

Layout checked at 320 and 375 pixels (no horizontal page overflow; the machine map and comparison table scroll inside their panels; chip buttons wrap to two rows) and at the pane's desktop width. Screenshots of the machine map, the GPU schematic, and the comparison table were reviewed at desktop and phone widths.

Limits of this pass: the browser pane reports a reduced-motion preference, so animation was verified off rather than on; print-to-PDF was not re-run (print rules hide the wires and legend and keep the text equivalent and schematics); the 768, 1280, and 1536 pixel widths were not re-measured. The earlier 128-state headless Edge check was not re-run; its helper was never committed. The six source pages that refuse scripted requests (three openai.com pages, intel.com, and two x.ai pages) were opened in a real browser earlier the same day and matched their cited dates.

## October 12, 2026, first release

Prepared on surface-intel / Codex, October 12, 2026.

Headless Microsoft Edge interaction checks passed across 128 selection states. Checks covered all seven organization nodes, timeline comparisons and historical cutoffs, four chip modes, all ten local/cloud prompt steps, memory-budget changes including over-budget states, and correct/incorrect challenge feedback and reset behavior.

Keyboard activation, reduced-motion defaults, offline operation, print-to-PDF, internal anchors, control labels, and unique element IDs passed. No page errors or external network requests occurred during interaction. Layout checks passed at widths of 320, 390, 768, 1280, and 1536 pixels after a narrow-screen chip-control overflow was corrected.

Desktop and mobile screenshots were reviewed. This is targeted verification, not a complete WCAG conformance audit or a test of real model inference. The memory lab is illustrative, not a hardware benchmark. Sources are linked in the page and `sources.md`.
