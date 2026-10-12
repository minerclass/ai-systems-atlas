# AI Systems Atlas

classification: public

Three interactive learning experiences for curious adults and educators, by Micah J. Miner.

- **Company Constellations:** explore NVIDIA, OpenAI, Anthropic, Google, Google DeepMind, X, and xAI; compare two timelines through a chosen year.
- **Inside the Chip:** switch between conceptual CPU, GPU, NPU, and TPU schematics; expand technical explanations.
- **Follow a Prompt:** step through local and cloud inference; vary model size, weight precision, compute memory, and explicit memory allowances.

Each station includes a distinction challenge with explanatory feedback. The page supports keyboard interaction, reduced motion, and printing. It needs no build, accounts, external fonts, analytics, or runtime dependencies. Nothing is submitted to a model. Progress is kept only in page memory.

## Open and retrieve

Live: https://minerclass.github.io/ai-systems-atlas/

Open `index.html` directly, or serve the directory with `python -m http.server 8000`. Download the repository ZIP and extract it to use on another computer. Keep `index.html`, `styles.css`, `data.js`, and `app.js` together. The experience works offline; source links require internet access.

## Source and calculation limits

Sources were checked October 12, 2026. The timelines select turning points rather than every release. Primary corporate announcements establish dates and stated positions, not independent performance findings. Source links are attached to individual milestones and listed in the page footer; see `sources.md`.

Schematics are teaching abstractions, not physical chip layouts. The memory lab uses raw decimal-GB weight storage (`parameters in billions * bits / 8`), plus an explicit 10% teaching allowance for weight metadata, a user-selected runtime/context allowance, and a user-selected OS reserve. It does not estimate an actual KV cache or benchmark a computer. It assumes one usable compute-memory pool. It does not add system RAM to dedicated VRAM or treat storage as equivalent memory.

## Editing and deployment

Content lives in `data.js`; interface behavior in `app.js`; layout in `styles.css`. Use local relative paths so the site works under a GitHub Pages repository path and from a downloaded folder.

GitHub Pages publishes the root of `main` using branch-based deployment. Before future releases, inspect the current checkout, pull safely, review source dates and assumptions, and test desktop/mobile interaction and accessibility. Use a clone outside OneDrive. Do not introduce private research or account data.
