<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Read:Mo — 프로젝트 컨텍스트

수능/모의고사 영어 지문을 Brunch/Medium 스타일 웹진으로 제공하는 서비스.

## 기술 스택 (현재)

| 계층 | 도구 | 비고 |
|------|------|------|
| 프레임워크 | Next.js 16.2.9 (App Router) | 매우 최신 버전 |
| 스타일링 | Tailwind CSS v4 | `@tailwindcss/postcss` 사용, `@import "tailwindcss"` 구문 |
| 언어 | TypeScript 5 (strict) | |
| 정적 분석 | ESLint 9 (flat config) | `eslint.config.mjs`, not `.eslintrc` |
| 폰트 | `next/font` Geist (sans) + Noto Serif (serif) | 본문 `font-serif`로 적용 완료 |
| 경로 alias | `@/*` → `<project_root>/` | |

## 상태 (아직 미도입)

- Supabase (`@supabase/supabase-js` + `@supabase/ssr` 미설치)
- .env.local 미생성 (Supabase URL/KEY, Google OAuth)
- 구글 로그인, 스크랩, 태그 필터링 — 모두 미구현

## 커맨드

```bash
npm run dev      # 개발 서버 (localhost:3000)
npm run build    # 프로덕션 빌드
npm run start    # 빌드 결과 실행
npm run lint     # ESLint (flat config)
```

lint 순서: 빌드 전 `npm run lint` 실행. 테스트 프레임워크는 아직 도입되지 않음.

## 설계 규칙

- 디자인: 미니멀, 여백 넉넉, 배경 `#FAFAFA`, 제목 산세리프/본문 세리프
- 더미 데이터는 `@/data/posts.ts`에 두고 Supabase 연결 후 대체
- Nav: 로고, 구글 로그인, 내 스크랩
- 번역 토글: 문단 클릭 시 한국어 해석이 부드럽게 나타남 (CSR)
- 페이지: `/` (메인 피드), `/post/[id]` (지문 읽기)

## 주의사항

- Tailwind v4: `@tailwind` directives 대신 `@import "tailwindcss"` 사용. `@theme` 블록으로 커스텀 토큰 정의. config 파일 불필요.
- ESLint v9 flat config: `defineConfig()` 배열 기반. `eslint-config-next`는 `core-web-vitals` preset 사용.
- `.env*`는 `.gitignore`에 포함됨 — `.env.local` 직접 생성 필요. `.env.example`로 템플릿 제공.
- `next-env.d.ts`는 자동 생성되며 git에 커밋되지 않음.
- 프로젝트 루트에 `app/`, `data/`, `components/`, `features/`, `lib/`, `types/` 구조 권장.
- 기능 명세는 `features/*.md`에서 관리.

## 세션 종료 시 레슨 자동 기록

- 코딩 작업이 끝나면 `D:\JihObsidian\Read-Mo_YYYY-MM-DD.md` 포맷으로 레슨 노트 작성 (Obsidian vault)
- 내용: 오늘 작업 요약, 아키텍처 결정과 이유, 주요 설계 포인트, 실행한 커맨드, 다음 스텝
