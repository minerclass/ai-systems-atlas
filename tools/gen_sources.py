"""Regenerate sources.md from the sources array in data.js so the two stay in sync.

Usage, from the repository root:
    python tools/gen_sources.py

classification: public
"""
import io
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parent.parent
DATA = ROOT / "data.js"
OUT = ROOT / "sources.md"

INTRO = (
    "# Source register\n\n"
    "classification: public\n\n"
    "Checked October 12, 2026; scoreboard figures checked October 14, 2026. A lab's benchmark table is "
    "a claim about its own model; an independent run is a separate measurement with its own settings. "
    "Selected milestones, not complete histories. Announcements establish "
    "dates and stated positions; explanations are editorial synthesis. Hardware schematics, the machine "
    "map, and the memory budget are teaching abstractions. Machine-map links are dated by the company "
    "announcement that names the relationship; an announced path is not proof of deployment.\n\n"
)


def main() -> None:
    src = DATA.read_text(encoding="utf-8")
    block = src.split("sources: [", 1)[1].split("\n  ],", 1)[0]
    rows = re.findall(r"\['([^']*)','([^']*)','([^']*)','([^']*)'\]", block)
    out = io.StringIO()
    out.write(INTRO)
    for _sid, title, url, note in rows:
        out.write(f"## {title}\n\n[Primary source]({url})\n\nSupports: {note}\n\n")
    OUT.write_text(out.getvalue().rstrip("\n") + "\n", encoding="utf-8", newline="\n")
    print(f"{len(rows)} sources written to {OUT.name}")


if __name__ == "__main__":
    main()
