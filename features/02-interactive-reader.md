# Feature 02: Interactive Reader (Translation Toggle)

## Description
지문 상세 페이지. 영어 원문을 문단별로 보고, 각 문단의 한국어 해석을 토글할 수 있다.

## Acceptance Criteria
- [x] `/post/[id]` 동적 라우트
- [x] 존재하지 않는 id → 404
- [x] 본문 Noto Serif 폰트 적용
- [x] 문단별 "해석 보기" / "해석 닫기" 버튼
- [x] 부드러운 애니메이션으로 해석 노출/숨김
- [ ] 뒤로가기 버튼 동작 확인
- [ ] 실제 지문 로딩 (Supabase)

## UX Flow
1. 사용자 `/post/[id]` 진입
2. 영어 원문 문단 순서대로 렌더링
3. 각 문단 아래 `▼ 해석 보기` 버튼
4. 클릭 → 해당 문단 한국어 해석이 부드럽게 펼쳐짐
5. 다시 클릭 → 접힘

## Tech Notes
- 서버 컴포넌트: `app/post/[id]/page.tsx`
- 클라이언트 컴포넌트: `components/translation-toggle.tsx`
- 애니메이션: `max-h` + `opacity` CSS transition
