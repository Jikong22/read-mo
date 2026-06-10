# Feature 03: Google Login (Supabase Auth)

## Description
Supabase Auth + Google OAuth를 통한 소셜 로그인.

## Prerequisites
- [ ] Supabase 프로젝트 생성 ([console.supabase.com](https://console.supabase.com))
- [ ] Google OAuth Client ID 발급 (GCP Console)
- [ ] `.env.local`에 `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` 설정
- [ ] Supabase Dashboard > Auth Settings > Google OAuth 설정 완료

## Acceptance Criteria
- [ ] `npm install @supabase/supabase-js @supabase/ssr`
- [ ] `lib/supabase-client.ts` (브라우저 클라이언트)
- [ ] `lib/supabase-server.ts` (서버 클라이언트)
- [ ] Google 로그인 버튼 → OAuth 팝업
- [ ] 로그인 성공 → Nav에 프로필 이미지/닉네임 표시
- [ ] 로그아웃 기능
- [ ] Auth 상태에 따른 UI 분기 (비로그인: 로그인 버튼 / 로그인: 프로필 + 내 스크랩)

## Tech Notes
- Supabase SSR 패키지 사용 (`@supabase/ssr`)
- 미들웨어에서 세션 리프레시 처리
