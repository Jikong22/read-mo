# Feature 05: Tag Filtering

## Description
메인 피드에서 태그(#심리학, #철학, #과학 등)를 선택하여 해당 카테고리의 지문만 필터링.

## Acceptance Criteria
- [ ] 피드 상단에 태그 칩 목록 표시
- [ ] 태그 클릭 → 해당 태그만 필터링
- [ ] 전체 보기 버튼 (필터 해제)
- [ ] URL query string에 필터 상태 반영 (공유 가능)
- [ ] 더미 데이터 → Supabase 전환 후에도 동작

## Tech Notes
- 필터 상태는 클라이언트에서 관리 (useState) 또는 URL 기반 (searchParams)
- CSR 필터링 (데이터가 적을 때) → 추후 Supabase 쿼리로 전환
