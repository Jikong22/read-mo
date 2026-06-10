# Feature 01: Magazine Feed

## Description
메인 페이지. 더미 데이터 기반의 매거진 카드 피드를 제공한다.

## Acceptance Criteria
- [x] Nav 바 (로고, 로그인 버튼, 내 스크랩 버튼)
- [x] 더미 데이터 3개 이상 표시
- [x] 각 카드: 태그, 제목, 설명, 읽기 시간
- [x] 카드 클릭 → `/post/[id]`로 이동
- [ ] Supabase 연결 후 실제 데이터로 교체
- [ ] 태그 필터링 UI 추가

## Tech Notes
- 서버 컴포넌트 (`app/page.tsx`)
- 데이터 출처: `@/data/posts.ts` (Supabase 전환 후 대체)
- Nav는 `components/nav.tsx` → `layout.tsx`에서 렌더링
