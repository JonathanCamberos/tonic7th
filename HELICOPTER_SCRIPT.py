#!/usr/bin/env python3
"""Generate a local HELICOPTER_VIEW.md snapshot of tracked repository files.

This file is intended to be git-tracked, while the generated
HELICOPTER_VIEW.md file is ignored and kept local.
"""

from pathlib import Path
import subprocess

ROOT = Path(__file__).resolve().parent
OUTPUT_FILE = ROOT / "HELICOPTER_VIEW.md"

IGNORE_UTF8_ERRORS = True


def get_tracked_files():
    result = subprocess.run(
        ["git", "ls-files"],
        cwd=ROOT,
        text=True,
        capture_output=True,
        check=True,
    )
    return [line.strip() for line in result.stdout.splitlines() if line.strip()]


def read_file_content(path: Path) -> str:
    try:
        return path.read_text(encoding="utf-8")
    except UnicodeDecodeError:
        if IGNORE_UTF8_ERRORS:
            return "[binary or unreadable file skipped]"
        raise


def write_snapshot(files):
    with OUTPUT_FILE.open("w", encoding="utf-8") as out:
        out.write("# HELICOPTER_VIEW\n\n")
        out.write("This file is an aggregated snapshot of tracked repository files for high-level review.\n\n")
        for path in files:
            file_path = ROOT / path
            out.write(f"## FILE: {path}\n\n")
            out.write("```\n")
            out.write(read_file_content(file_path))
            out.write("\n```")
            out.write("\n\n")


def main():
    files = get_tracked_files()
    write_snapshot(files)
    print(f"wrote {OUTPUT_FILE} with {len(files)} files")


if __name__ == "__main__":
    main()
