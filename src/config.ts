// Google OAuth Client ID (공개 식별자, 비밀값 아님).
// https://console.cloud.google.com/apis/credentials 에서 발급.
export const GOOGLE_CLIENT_ID = '596866410099-ms2blh1bddoipt6pbgdup09tjgdc1q27.apps.googleusercontent.com'

// Supabase 프로젝트 URL + anon(public) 키 (RLS로 보호되는 공개 식별자, 비밀값 아님).
// https://supabase.com/dashboard/project/_/settings/api 에서 확인.
export const SUPABASE_URL = 'https://pwdvpwauzsawzbuwmfez.supabase.co'
export const SUPABASE_ANON_KEY = 'sb_publishable_wsKas--DLE6c9IGmIaX51w_WInOeFBb'

// Kakao JavaScript 키 (공개 식별자, 비밀값 아님).
// https://developers.kakao.com 앱 설정 > 일반 에서 확인.
export const KAKAO_JS_KEY = '05a62001c7155aff2bf1b94ec8c60bed'

// 관리자 통계(가입자 수 등)를 볼 수 있는 계정. 실제 접근 제어는 api/admin-stats.js가
// 서버 측에서 다시 검증하므로, 이 값은 UI 노출 여부만 결정한다.
export const ADMIN_EMAIL = 'joan6838@gmail.com'

// 구글 애널리틱스(GA4) 측정 ID (공개 식별자, 비밀값 아님).
// https://analytics.google.com 데이터 스트림에서 확인.
export const GA_MEASUREMENT_ID = 'G-07NVRX9NSB'
