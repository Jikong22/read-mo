---
name: nextjs-16-caveats
description: Use ONLY when editing Next.js code, Tailwind styles, ESLint config, or TS config. Do NOT use for project planning or feature specs.
---

# Next.js 16 — Breaking Changes

This project uses a very recent version. APIs differ from older training data.

## Tailwind CSS v4

- Use `@import "tailwindcss"` in CSS, NOT `@tailwind base/components/utilities`.
- Use `@theme inline { ... }` for custom tokens (fonts, colors).
- Use `@tailwindcss/postcss` PostCSS plugin (not `tailwindcss` v3).
- No `tailwind.config.*` file needed.

## ESLint v9 (flat config)

- Config file: `eslint.config.mjs` (not `.eslintrc*`).
- Use `defineConfig()` from `eslint/config`.
- Preset: `eslint-config-next/core-web-vitals` + `eslint-config-next/typescript`.
- No `.eslintignore` — use `globalIgnores()` instead.

## App Router patterns

- Dynamic params use `params: Promise<{ id: string }>` with `await params`.
- Route: `app/post/[id]/page.tsx`.
- `notFound()` from `next/navigation` for 404.

## Font loading

- `next/font/google` — use variable fonts when available.
- Register CSS variable: `variable: "--font-name"`.
- Reference in `globals.css` `@theme inline { --font-name: var(--...) }`.
