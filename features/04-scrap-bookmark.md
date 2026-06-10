# Feature 04: Scrap / Bookmark (내 서재)

## Description
사용자가 마음에 드는 지문을 스크랩(북마크)하여 '내 서재'에서 모아볼 수 있는 기능.

## Prerequisites
- [ ] Feature 03 (Google Login) 완료
- [ ] Supabase `scraps` 테이블 생성

### Supabase SQL (실행 필요)
```sql
CREATE TABLE scraps (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  post_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, post_id)
);
```

## Acceptance Criteria
- [ ] 읽기 페이지에 스크랩 버튼 (토글)
- [ ] 스크랩 시 하트/북마크 아이콘 채워짐
- [ ] `/scraps` (내 서재) 페이지 — 저장한 지문 리스트
- [ ] 스크랩 해제 가능

## Tech Notes
- 스크랩 상태는 서버에서 관리 (Supabase Row Level Security)
- 실시간 UI 업데이트를 위해 낙관적 업데이트(Optimistic UI) 고려
