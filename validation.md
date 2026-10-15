# Release verification

classification: public

## October 15, 2026, third pass: station 04, Read the scoreboard

Prepared on surface-arm / Claude Code, October 14–15, 2026. Verified in the Claude desktop app's built-in browser against a local `python -m http.server` copy of the working tree.

Every scoreboard figure was checked against its cited page on October 14, 2026: Anthropic's Opus 5.5, Sonnet 5.5 and Fable 5.1 launch tables; Google DeepMind's Gemini 4 Argon model card; Cursor's Grok 4.7 page; Artificial Analysis's Sonnet 5.5 and Muse Wonder articles; and Meta's Muse Wonder evaluation table. All nine new source ids resolve in `sources`, none is unused, and `sources.md` was regenerated (54 sources).

Scripted in-page checks at 1280 pixels passed with no console messages: seven model buttons; seven plot rows with seven lab markers and six independent markers (Grok 4.7 has none); exactly one highlighted row and one pressed button after each of the seven selections; the detail panel's difference line for each model; seven value-table rows; five agent bars; wrong and right answers for challenge 04 with feedback; progress counting to "2 of 4" across two stations and resetting to "0 of 4"; four station links; no duplicate element ids.

At 375 pixels the page had no horizontal overflow, but the plot scaled its labels to about 5.5 pixels. The fix keeps the drawing at least 600 pixels wide inside its own horizontally scrolling container on narrow screens, with a hint, following the machine map's pattern. That fix was not re-measured: the built-in browser stopped responding while the app window was hidden, and headless Edge on this machine returned blank frames. Screenshots were not reviewed in this pass, and print-to-PDF was not re-run (print rules hide the model buttons and keep the plot, detail, table and agent bars).

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
