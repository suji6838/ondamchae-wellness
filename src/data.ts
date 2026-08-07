export type ConstitutionGroup = '태양인' | '태음인' | '소양인' | '소음인'
export type ConstitutionKey = '한태양' | '열태양' | '한태음' | '열태음' | '한소양' | '열소양' | '한소음' | '열소음'
export type AnswerOption = { label: string; type: ConstitutionGroup; thermal: '한' | '열' }
export type ConstitutionQuestion = { prompt: string; options: readonly AnswerOption[] }
const option = (label: string, type: ConstitutionGroup, thermal: '한' | '열'): AnswerOption => ({ label, type, thermal })
export const questions: readonly ConstitutionQuestion[] = [
  { prompt: '평소 체온과 땀의 양은 어떤 편인가요?', options: [option('땀이 적고 몸이 쉽게 차가워요', '소음인', '한'), option('땀이 나면 개운하고 열이 많은 편이에요', '태음인', '열'), option('상체에 열이 오르고 땀이 나요', '소양인', '열'), option('차분하고 체온 변화가 크지 않아요', '태양인', '한')] },
  { prompt: '소화 상태는 어떠신가요?', options: [option('조금만 먹어도 더부룩해요', '소음인', '한'), option('식욕이 좋고 소화가 잘돼요', '태음인', '열'), option('배고픔을 자주 느껴요', '소양인', '열'), option('천천히 먹어야 편안해요', '태양인', '한')] },
  { prompt: '스트레스를 받을 때 가장 먼저 나타나는 반응은?', options: [option('속이 답답하고 입맛이 줄어요', '태양인', '한'), option('먹는 양이 늘거나 몸이 무거워져요', '태음인', '한'), option('얼굴이 붉어지고 말이 많아져요', '소양인', '열'), option('생각이 많아지고 잠이 얕아져요', '소음인', '한')] },
  { prompt: '평소 선호하는 음식 온도는?', options: [option('따뜻한 국물과 차', '태양인', '한'), option('든든하고 진한 음식', '태음인', '한'), option('시원하고 가벼운 음식', '소양인', '열'), option('따뜻하고 부드러운 음식', '소음인', '한')] },
  { prompt: '운동 후 몸의 느낌은 어떤가요?', options: [option('가볍게 움직일 때 가장 좋아요', '태양인', '한'), option('땀을 충분히 내면 개운해요', '태음인', '열'), option('짧고 강한 운동이 잘 맞아요', '소양인', '열'), option('무리하면 쉽게 지쳐요', '소음인', '한')] },
  { prompt: '수면 습관에 가까운 설명은?', options: [option('잠들기까지 시간이 걸려요', '태양인', '열'), option('잠은 잘 자지만 코골이가 있어요', '태음인', '열'), option('잠이 짧아도 활동적인 편이에요', '소양인', '열'), option('예민해서 작은 소리에도 깨요', '소음인', '한')] },
  { prompt: '성격과 가장 가까운 모습은?', options: [option('독립적이고 결단이 빨라요', '태양인', '열'), option('인내심 있고 안정적이에요', '태음인', '한'), option('활발하고 표현이 분명해요', '소양인', '열'), option('신중하고 섬세해요', '소음인', '한')] },
  { prompt: '추위를 느끼는 정도는?', options: [option('손발이 자주 차요', '소음인', '한'), option('추위보다 더위가 힘들어요', '태음인', '열'), option('더위에 특히 예민해요', '소양인', '열'), option('찬 바람을 오래 맞으면 힘들어요', '태양인', '한')] },
  { prompt: '식사량은 대체로 어떤 편인가요?', options: [option('적은 양을 나눠 먹어요', '태양인', '한'), option('양이 많고 든든하게 먹어요', '태음인', '열'), option('끼니를 거르기도 해요', '소양인', '열'), option('규칙적인 소량 식사가 편해요', '소음인', '한')] },
  { prompt: '피부 고민은 주로 무엇인가요?', options: [option('건조함과 민감함', '태양인', '한'), option('유분과 탄력 저하', '태음인', '열'), option('열감과 트러블', '소양인', '열'), option('칙칙함과 건조함', '소음인', '한')] },
  { prompt: '피로가 쌓일 때 느끼는 곳은?', options: [option('어깨와 목이 뻐근해요', '태양인', '열'), option('다리와 몸이 무거워요', '태음인', '한'), option('눈과 머리가 피로해요', '소양인', '열'), option('배와 손발이 차가워요', '소음인', '한')] },
  { prompt: '음료 선택 시 더 가까운 것은?', options: [option('따뜻한 허브차', '태양인', '한'), option('곡물·발효 음료', '태음인', '한'), option('시원한 물과 과일차', '소양인', '열'), option('따뜻한 생강차', '소음인', '한')] },
  { prompt: '활동 패턴은 어떤 편인가요?', options: [option('혼자 집중하는 시간이 필요해요', '태양인', '한'), option('꾸준히 오래 하는 편이에요', '태음인', '한'), option('새로운 일을 빠르게 시작해요', '소양인', '열'), option('계획을 세워 차근차근 해요', '소음인', '한')] },
  { prompt: '식후 자주 느끼는 증상은?', options: [option('속이 더부룩해요', '태양인', '한'), option('졸리고 나른해요', '태음인', '한'), option('갈증이 나요', '소양인', '열'), option('배가 차가워져요', '소음인', '한')] },
  { prompt: '몸 관리에서 중요한 목표는?', options: [option('균형과 활력 회복', '태양인', '한'), option('체중과 순환 관리', '태음인', '열'), option('열감과 스트레스 관리', '소양인', '열'), option('소화력과 기초체력 관리', '소음인', '한')] },
  { prompt: '좋아하는 운동 방식은?', options: [option('요가·스트레칭', '태양인', '한'), option('걷기·근력운동', '태음인', '열'), option('러닝·인터벌', '소양인', '열'), option('필라테스·산책', '소음인', '한')] },
  { prompt: '식습관 중 개선하고 싶은 부분은?', options: [option('불규칙한 식사', '태양인', '열'), option('야식과 과식', '태음인', '열'), option('자극적인 음식', '소양인', '열'), option('찬 음식 섭취', '소음인', '한')] },
  { prompt: '대인 관계에서의 모습은?', options: [option('목표를 명확히 말해요', '태양인', '열'), option('편안하게 곁을 지켜요', '태음인', '한'), option('분위기를 이끌어요', '소양인', '열'), option('상대 이야기를 잘 들어요', '소음인', '한')] },
  { prompt: '건강을 위해 가장 필요한 것은?', options: [option('휴식과 리듬', '태양인', '한'), option('꾸준한 실천', '태음인', '한'), option('열 조절과 스트레스 해소', '소양인', '열'), option('따뜻한 식사와 수면', '소음인', '한')] },
  { prompt: '나에게 어울리는 하루는?', options: [option('여유 있게 집중하는 날', '태양인', '한'), option('규칙적으로 성취하는 날', '태음인', '열'), option('활기차게 움직이는 날', '소양인', '열'), option('편안하고 안정적인 날', '소음인', '한')] },
] as const
export const constitutionLabels: Record<ConstitutionKey, string> = {
  한태양: '태양인 · 한태양 (금음)', 열태양: '태양인 · 열태양 (금양)',
  한태음: '태음인 · 한태음 (목양)', 열태음: '태음인 · 열태음 (목음)',
  한소양: '소양인 · 한소양 (토양)', 열소양: '소양인 · 열소양 (토음)',
  한소음: '소음인 · 한소음 (수음)', 열소음: '소음인 · 열소음 (수양)',
}
export type ConstitutionReport = {
  summary: string
  description: string
  strengths: string[]
  cautions: string[]
  recommendedFoods: string[]
  avoidFoods: string[]
  recommendedActivities: string[]
  keywords: string[]
}
export const reports: Record<ConstitutionKey, ConstitutionReport> = {
  한태양: {
    summary: '진취적인 판단력에 서늘한 회복 습관이 필요한 금음 경향',
    description: '태양인 특유의 결단력과 리더십을 지녔지만, 간 기능이 상대적으로 약한 편으로 알려져 있어 과식이나 기름진 음식보다는 담백하고 서늘한 음식으로 몸을 돌보는 것이 좋다고 전해져요. 다리와 하체가 상대적으로 약할 수 있어 무리한 운동보다는 꾸준한 하체 강화가 도움이 됩니다.',
    strengths: ['빠르고 명확한 판단력', '리더십과 추진력', '새로운 도전을 두려워하지 않는 개척 정신'],
    cautions: ['간 기능 부담', '하체 근력 저하', '성급한 결정으로 인한 마찰'],
    recommendedFoods: ['메밀', '조개류·굴', '포도·다래·감', '배추·오이', '솔잎차'],
    avoidFoods: ['기름지고 매운 음식', '소고기·돼지고기 과다 섭취', '과음'],
    recommendedActivities: ['가벼운 걷기·산책', '하체 근력 운동(스쿼트 등)', '명상·호흡 이완'],
    keywords: ['결단력', '간 건강', '하체 강화'],
  },
  열태양: {
    summary: '빠른 실행력과 열감 관리가 함께 필요한 금양 경향',
    description: '태양인 중에서도 특히 열이 위로 뜨는 경향이 강해 상체 열감이나 눈의 피로, 두통이 잦을 수 있다고 알려져 있어요. 자극적이고 기름진 음식은 줄이고, 채소와 해산물 위주의 담백한 식사로 열을 가라앉히는 것이 도움이 됩니다.',
    strengths: ['빠른 실행력', '새로운 환경 적응력', '명확한 목표 의식'],
    cautions: ['상체 열감·눈 피로', '과로로 인한 소진', '성급함으로 인한 마찰'],
    recommendedFoods: ['메밀냉면', '새우·게·붕어', '포도·감·앵두', '채소 위주 식사'],
    avoidFoods: ['맵고 뜨거운 음식', '육류·기름진 음식 과다', '카페인 과다 섭취'],
    recommendedActivities: ['수영 등 열을 식히는 운동', '충분한 수면', '저녁 스트레칭'],
    keywords: ['열감 관리', '적응력', '휴식'],
  },
  한태음: {
    summary: '꾸준한 지구력에 순환 관리가 필요한 목양 경향',
    description: '태음인은 간 기능이 강하고 체격이 좋은 편으로 알려져 있어 육류나 뿌리채소가 비교적 잘 맞는다고 전해지지만, 활동량이 부족하면 순환과 체중 관리에 어려움을 겪을 수 있어요. 규칙적인 유산소 운동으로 땀을 내는 습관이 중요합니다.',
    strengths: ['강한 지구력과 인내심', '안정적이고 편안한 신뢰감', '꾸준한 실행력'],
    cautions: ['체중·순환 관리', '운동 부족으로 인한 무거움', '느린 반응으로 인한 답답함'],
    recommendedFoods: ['소고기', '콩류·두부', '무·도라지', '배·밤', '다시마·미역'],
    avoidFoods: ['과식·야식', '밀가루 음식 과다', '찬 음식 과다 섭취'],
    recommendedActivities: ['꾸준한 유산소 운동(걷기·조깅)', '충분한 땀 배출 활동', '규칙적인 스트레칭'],
    keywords: ['순환', '꾸준함', '체중 관리'],
  },
  열태음: {
    summary: '풍부한 에너지와 소화력 관리가 필요한 목음 경향',
    description: '목음 경향은 태음인의 지구력에 더해 소화 기능이 활발한 편으로 알려져 있어 식욕이 좋고 잘 먹지만, 그만큼 과식이나 기름진 음식에 취약할 수 있어요. 소화를 돕는 가벼운 활동과 규칙적인 식사 시간이 도움이 됩니다.',
    strengths: ['왕성한 활동 에너지', '좋은 소화력과 체력', '책임감 있는 성실함'],
    cautions: ['과식·소화 부담', '더위에 취약함', '체중 증가 경향'],
    recommendedFoods: ['콩류·견과류', '무·도라지', '배·자두', '미역국'],
    avoidFoods: ['기름지고 자극적인 음식', '과식·야식', '탄산음료'],
    recommendedActivities: ['식후 가벼운 산책', '근력 운동', '규칙적인 식사 루틴'],
    keywords: ['소화력', '활력', '식습관'],
  },
  한소양: {
    summary: '빠른 이해력과 속열 관리가 필요한 토양 경향',
    description: '소양인은 비위(소화기) 기능이 활발하고 판단이 빠른 편이지만, 몸에 열이 많아 위장이나 상체에 열감이 쌓이기 쉽다고 알려져 있어요. 맵고 뜨거운 음식보다는 서늘한 성질의 음식으로 속을 편안하게 다스리는 것이 좋습니다.',
    strengths: ['빠른 이해력과 순발력', '밝고 사교적인 성격', '정의감과 추진력'],
    cautions: ['위장·상체 열감', '불규칙한 식사 습관', '감정 기복'],
    recommendedFoods: ['보리·팥', '오이·배추', '참외·딸기', '돼지고기', '굴·게 등 해물'],
    avoidFoods: ['맵고 뜨거운 음식', '인삼·닭고기 등 열성 음식', '술'],
    recommendedActivities: ['규칙적인 식사 시간 지키기', '가벼운 냉수 샤워·마무리', '저녁 명상'],
    keywords: ['속열 관리', '순발력', '규칙적 식사'],
  },
  열소양: {
    summary: '생기 넘치는 에너지와 잦은 열감 해소가 필요한 토음 경향',
    description: '토음 경향은 소양인 중에서도 특히 열이 많고 예민한 편으로 알려져 있어, 자극적인 음식이나 급한 식사가 위장 트러블로 이어지기 쉬워요. 담백하고 서늘한 음식으로 속을 자주 다스려 주는 것이 도움이 됩니다.',
    strengths: ['밝은 에너지와 표현력', '빠른 판단력', '사교성과 친화력'],
    cautions: ['열감·피부 트러블', '급한 식사 습관', '스트레스에 예민한 반응'],
    recommendedFoods: ['보리밥', '채소 위주 식사', '참외·딸기', '알로에'],
    avoidFoods: ['급하고 자극적인 식사', '매운 음식', '카페인·술'],
    recommendedActivities: ['천천히 식사하는 습관', '가벼운 유산소 운동', '충분한 수분 섭취'],
    keywords: ['진정', '수분', '여유'],
  },
  한소음: {
    summary: '섬세한 배려심과 소화력 보강이 필요한 수음 경향',
    description: '소음인은 신장 기능이 강하지만 소화기가 예민한 편으로 알려져 있어, 찬 음식이나 과식이 쉽게 체하거나 속을 불편하게 만들 수 있어요. 따뜻하고 소화가 잘되는 음식을 소량씩 규칙적으로 먹는 습관이 특히 중요합니다.',
    strengths: ['섬세한 관찰력과 배려심', '신중하고 꼼꼼한 계획력', '깊은 공감 능력'],
    cautions: ['소화력 저하', '손발이 찬 냉증', '지나친 걱정과 긴장'],
    recommendedFoods: ['찹쌀·닭고기', '생강차·대추차', '명태', '시금치', '꿀'],
    avoidFoods: ['찬 음식·냉면', '밀가루 음식 과다', '돼지고기 과다'],
    recommendedActivities: ['가벼운 실내 운동', '규칙적인 소량 식사', '몸을 따뜻하게 유지하기'],
    keywords: ['소화력', '온기', '규칙적 식사'],
  },
  열소음: {
    summary: '세심한 관찰력과 컨디션 기복 관리가 필요한 수양 경향',
    description: '수양 경향은 소음인의 섬세함에 더해 예민한 신경계를 지닌 편으로 알려져 있어, 스트레스나 수면 부족에 컨디션이 쉽게 흔들릴 수 있어요. 규칙적인 수면과 식사 시간을 지키는 것이 몸의 리듬을 안정시키는 데 도움이 됩니다.',
    strengths: ['세심한 관찰력', '빠르고 정확한 반응', '깊이 있는 공감 능력'],
    cautions: ['예민한 수면', '컨디션 기복', '소화 리듬 변화'],
    recommendedFoods: ['생강차·대추차', '찹쌀', '닭고기', '꿀'],
    avoidFoods: ['찬 음료', '자극적인 야식', '과도한 카페인'],
    recommendedActivities: ['일정한 시간에 잠들기', '가벼운 스트레칭', '따뜻한 물로 반신욕'],
    keywords: ['수면 리듬', '안정', '규칙성'],
  },
}
export const coachHabitTips: Record<ConstitutionKey, string[]> = {
  한태양: ['중요한 결정 전, 3초만 멈춰서 생각해보기', '야식과 기름진 안주는 오늘 하루 건너뛰기', '다리를 살짝 올리고 10분 휴식하기'],
  열태양: ['화면 20분 볼 때마다 먼 곳 한 번 바라보기', '저녁엔 매운 음식 대신 시원한 채소로', '잠들기 30분 전 화면 끄고 눈 감기'],
  한태음: ['엘리베이터 대신 계단 한 층 걸어보기', '식사 후 10분은 앉아있지 않고 움직이기', '물 한 잔 더 마시기'],
  열태음: ['오늘 식사는 평소보다 한 숟갈 적게', '탄산음료 대신 물이나 차로', '식후 바로 눕지 않고 잠깐 걷기'],
  한소양: ['끼니 거르지 않고 제시간에 챙기기', '화가 날 땐 잠깐 자리를 벗어나 숨 고르기', '매운 음식 대신 담백한 메뉴로'],
  열소양: ['밥은 최소 15분 이상 천천히 먹기', '물을 평소보다 자주 마시기', '잠들기 전 오늘 감정을 짧게 적어보기'],
  한소음: ['찬 음료 대신 따뜻한 차로 시작하기', '양말 신고 손발 따뜻하게 유지하기', '걱정거리는 딱 5분만 생각하고 내려놓기'],
  열소음: ['잠자리에 드는 시간을 어제와 같게 맞추기', '카페인은 오후 2시 이전까지만', '자기 전 따뜻한 물로 반신욕 5분'],
}
export type CoachPlan = { key: string; icon: string; type: string; title: string; text: string }
function dayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0)
  return Math.floor((date.getTime() - start.getTime()) / 86400000)
}
export function getDailyCoachPlans(constitution: ConstitutionKey, date: Date = new Date()): CoachPlan[] {
  const report = reports[constitution]
  const idx = dayOfYear(date)
  const food = report.recommendedFoods[idx % report.recommendedFoods.length]
  const activity = report.recommendedActivities[idx % report.recommendedActivities.length]
  const habits = coachHabitTips[constitution]
  const habit = habits[idx % habits.length]
  return [
    { key: 'meal', icon: '◒', type: '식단', title: `${food} 챙기기`, text: `${constitutionLabels[constitution]} 체질에 맞는 음식으로 오늘 식사를 가볍게 챙겨보세요.` },
    { key: 'move', icon: '⌁', type: '운동', title: activity, text: '내 체질에 맞는 활동으로 몸을 가볍게 움직여보세요.' },
    { key: 'habit', icon: '☾', type: '습관', title: habit, text: '작은 실천이 쌓이면 몸의 균형에 도움이 돼요.' },
  ]
}
export const categories = [
  { image: '/recommendations/aerobic.png', name: '유산소 운동', color: 'mint', title: '산책 기반 유산소', text: '대화가 가능한 속도로 30분 걷기를 권해요.' },
  { image: '/recommendations/strength.png', name: '근력 운동', color: 'sage', title: '하체 중심 근력', text: '스쿼트와 브릿지로 기초 체력을 채워요.' },
  { image: '/recommendations/yoga.png', name: '요가 · 회복', color: 'cream', title: '저녁 릴랙싱 요가', text: '호흡과 목·어깨 이완에 집중해 보세요.' },
  { image: '/recommendations/skincare.png', name: '피부 관리', color: 'pink', title: '진정 보습 루틴', text: '세안 후 수분 장벽을 편안하게 지켜요.' },
  { image: '/recommendations/vitamin.png', name: '비타민', color: 'yellow', title: '기초 영양 케어', text: '식사와 함께 비타민 섭취를 검토해 보세요.' },
  { image: '/recommendations/omega3.png', name: '오메가3', color: 'blue', title: '순환 밸런스', text: '개인 건강 상태에 맞춰 전문가와 상담하세요.' },
  { image: '/recommendations/probiotics.png', name: '프로바이오틱스', color: 'purple', title: '장 건강 루틴', text: '매일 같은 시간에 꾸준한 습관을 만들어 봐요.' },
  { image: '/recommendations/beauty.png', name: '뷰티 제품', color: 'coral', title: '저자극 보습 케어', text: '향이 강하지 않은 보습 중심 제품을 추천해요.' },
]
