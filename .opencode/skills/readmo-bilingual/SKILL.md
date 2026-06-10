---
name: readmo-bilingual
description: Use when working with Korean/English bilingual content, translation, or "지문/해석" patterns in the Read:Mo project.
---

# Read:Mo — Korean-English Bilingual Service

Read:Mo is a Korean-English bilingual reading service for CSAT/SAT English passages.

## Core conventions

- **Translation pairs**: every passage has `content` (English) and `translation` (Korean), matched by array index. Never break this pairing.
- **Font**: body text uses `font-serif` (Noto Serif via `next/font`). Headings use `font-sans` (Geist).
- **Translation toggle**: use `components/translation-toggle.tsx` — it's a client component with `useState` + `max-h`/`opacity` transition. Do not reimplement.
- **UI language**: all visible text (Nav, buttons, labels, descriptions) is in Korean.
- **Background**: `#FAFAFA` global. Cards: `bg-white`.
