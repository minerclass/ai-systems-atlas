# AI Systems Atlas

classification: public

Four interactive learning experiences for curious adults and educators, by Micah J. Miner.

- **Company Constellations:** explore NVIDIA, OpenAI, Anthropic, Google, Google DeepMind, X, and xAI; compare two timelines through a chosen year; then follow the machine map from the product a person uses, to the lab that builds the model, to the data centers it runs in, to the chip that does the arithmetic.
- **Inside the Chip:** switch between labeled CPU, GPU, NPU, TPU, and Trainium schematics; see where each chip keeps its memory; read one comparison table; expand technical explanations.
- **Follow a Prompt:** step through local and cloud inference; vary model size, weight precision, compute memory, and explicit memory allowances. Links to the companion [Raspberry Pi Generations](https://minerclass.github.io/raspberry-pi-generations/), a small local machine whose PCIe lane carries add-on AI accelerators.
- **Read the Scoreboard:** set each lab's own Terminal-Bench 4.0 figure beside an independent run for seven frontier models, then compare how five AI agents sourced the same benchmark request. Links to the full [Frontier Benchmark Atlas](https://minerclass.github.io/frontier-benchmark-atlas/).

Each station includes a distinction challenge with explanatory feedback. The page supports keyboard interaction, reduced motion, and printing. It needs no build, accounts, external fonts, analytics, or runtime dependencies. Nothing is submitted to a model. Progress is kept only in page memory.

## Open and retrieve

Live: https://minerclass.github.io/ai-systems-atlas/

Open `index.html` directly, or serve the directory with `python -m http.server 8000`. Download the repository ZIP and extract it to use on another computer. Keep `index.html`, `styles.css`, `data.js`, and `app.js` together. The experience works offline; source links require internet access.

## Source and calculation limits

Sources were checked October 12, 2026; the scoreboard figures were checked October 14, 2026. The timelines select turning points rather than every release. Primary corporate announcements establish dates and stated positions, not independent performance findings. Source links are attached to individual milestones and listed in the page footer; see `sources.md`.

The machine map follows the organization selected in the constellation and the year control. A box appears in the year this atlas first has a source for it, not at a founding date. Each link carries the company announcement that dates it. Solid links are paths in use; dashed teal links are also offered beside the main path; dashed gold links are announced and not yet in use. The map is not a complete inventory of suppliers, and an announced path is not proof of deployment. X is drawn as a distribution platform, never as a silicon path. The NVIDIA GPU box lights for every lab whose sourced path reaches it. Google and Google DeepMind stay separate organizations. No valuations or capacity figures are drawn.

Schematics are teaching abstractions, not physical chip layouts. Block sizes and cell counts are roles, not die area, core counts, or speed. The memory lab uses raw decimal-GB weight storage (`parameters in billions * bits / 8`), plus an explicit 10% teaching allowance for weight metadata, a user-selected runtime/context allowance, and a user-selected OS reserve. It does not estimate an actual KV cache or benchmark a computer. It assumes one usable compute-memory pool. It does not add system RAM to dedicated VRAM or treat storage as equivalent memory.

The scoreboard compares one benchmark, Terminal-Bench 4.0. A lab's figure is a claim about its own model; an independent run is one more measurement with its own effort level and harness, not a final verdict. Settings differ between rows and columns, and the detail panel names them. One independent figure (Claude Fable 5.1) is printed in Meta's model card rather than by the evaluator, and the page says so. The five-agent source mix comes from the Frontier Benchmark Atlas hub as of October 14, 2026.

## Editing and deployment

Content lives in `data.js`: `sources`, `companies` (with `events`), `dependencies` (machine-map `nodes` and `links`), `chips` (with `schematic` blocks and `compare` rows), and `scoreboard` (`rows` with a `claim` and an optional `indep` figure, and `agents`). Interface behavior is in `app.js`; layout is in `styles.css`. Every milestone, link, chip, and scoreboard figure must name a source id that exists in `sources`. After changing `sources`, run `python tools/gen_sources.py` to regenerate `sources.md`. Use local relative paths so the site works under a GitHub Pages repository path and from a downloaded folder.

GitHub Pages publishes the root of `main` using branch-based deployment. Before future releases, inspect the current checkout, pull safely, review source dates and assumptions, and test desktop/mobile interaction and accessibility. Use a clone outside OneDrive. Do not introduce private research or account data.
