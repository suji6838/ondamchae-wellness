-- 같은 날 재진단으로 체질이 바뀌어도 이전 체질의 "완료" 체크가 새 체질에 남지 않도록,
-- 오늘의 실천 체크를 (사용자, 날짜, 체질) 단위로 저장하도록 변경
alter table public.coach_checks add column if not exists constitution text not null default '';
alter table public.coach_checks drop constraint if exists coach_checks_pkey;
alter table public.coach_checks add primary key (user_id, day, constitution);
