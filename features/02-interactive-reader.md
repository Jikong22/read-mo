# Feature 02: Interactive Reader (Translation Toggle)

## Description
지문 상세 페이지. 영어 원문과 한국어 해석을 토글할 수 있다.

## Acceptance Criteria
- [x] `/post/[id]` 동적 라우트
- [x] 존재하지 않는 id → 404
- [x] 본문 Noto Serif 폰트 적용
- [x] "해석 보기" / "해석 닫기" 버튼 (번역 있을 때만 표시)
- [x] 부드러운 애니메이션으로 해석 노출/숨김
- [x] 뒤로가기 버튼 (useRouter.back)
- [x] 시험 정보 뱃지 (고3 · 2025년 06월)

## UX Flow
1. 사용자 `/post/[id]` 진입
2. 시험 정보 + 태그 + 한국어 제목 표시
3. 영어 원문 렌더링
4. 문단 아래 `▼ 해석 보기` 버튼
5. 클릭 → 한국어 해석이 부드럽게 펼쳐짐 (한 덩어리)
6. 다시 클릭 → 접힘

## Tech Notes
- 서버 컴포넌트: `app/post/[id]/page.tsx`
- 클라이언트 컴포넌트: `components/translation-toggle.tsx`, `components/back-button.tsx`
- 애니메이션: `max-h` + `opacity` CSS transition
