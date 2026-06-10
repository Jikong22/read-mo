---
name: post-lesson
description: Write an Obsidian lesson note when the user indicates the current work session is done. Trigger on sign-off phrases like "그만할게", "끝", "다음에", "오늘은 여기까지".
---

# Post-Session Lesson Note

When the user ends a work session, write a lesson note to their Obsidian vault.

## Format

- **Path**: `D:\JihObsidian\Read-Mo_YYYY-MM-DD.md`
- **Language**: Korean
- **Sections**:
  1. `# Read:Mo — Day N: <title>`
  2. `## 오늘 한 일` — bullet list of what was accomplished
  3. `## 아키텍처 결정` — table of decisions with rationale
  4. `## 설계 포인트` — notable design choices
  5. `## 커맨드` — relevant commands used
  6. `## 다음 스텝` — what comes next

## Rules

- Ask before writing: "레슨 노트 작성할까요?"
- Only write when the user confirms.
- Keep it concise — this is for future reference, not a diary.
