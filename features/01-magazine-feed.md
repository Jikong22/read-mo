# Feature 01: Magazine Feed

## Description
메인 페이지. 지문 데이터 기반의 매거진 카드 피드를 제공한다.

## Acceptance Criteria
- [x] Nav 바 (로고)
- [x] 491개 포스트 전체 표시
- [x] 각 카드: 시험 정보 뱃지, 태그, 제목(한국어), 설명, 읽기 시간
- [x] 카드 클릭 → `/post/[id]`로 이동
- [ ] 태그 필터링 UI 추가 (Feature 05)

## Tech Notes
- 서버 컴포넌트 (`app/page.tsx`)
- 데이터 출처: `@/data/generated-posts.ts` (EBSi PDF 추출)
- Nav는 `components/nav.tsx` → `layout.tsx`에서 렌더링
