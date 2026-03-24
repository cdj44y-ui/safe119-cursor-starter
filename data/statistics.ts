// 중대재해처벌법 관련 통계 데이터
// 출처: 고용노동부, KDI, 정책브리핑

export const statistics = {
  prosecution: {
    total: 121,
    label: '검찰 기소',
    description: '중처법 시행 이후 누적 기소 건수',
  },
  convictionRate: {
    value: 89.3,
    label: '유죄율',
    description: '기소 건 중 유죄 판결 비율',
  },
  deaths: {
    total: 457,
    label: '사고사망자',
    description: '2025년 3분기 누적 사고사망자',
    yoyChange: '+3.2%',
  },
  probation: {
    value: 85.7,
    label: '집행유예',
    description: '유죄 판결 중 집행유예 비율',
  },
};

export const industryDeaths = [
  { industry: '건설업', deaths: 198, percentage: 43.3 },
  { industry: '제조업', deaths: 127, percentage: 27.8 },
  { industry: '서비스업', deaths: 68, percentage: 14.9 },
  { industry: '운수·창고업', deaths: 34, percentage: 7.4 },
  { industry: '기타', deaths: 30, percentage: 6.6 },
];

export const presidentQuote = {
  text: '산재가 거듭되면 회생이 어려울 만큼의 엄벌을 받아야 합니다.',
  author: '이재명 대통령',
  date: '2025.7.29',
  policies: ['징벌적 손해배상', '공공입찰 제한', '반복 사고 영업정지', '과태료 현실화'],
};

export const nineElements = [
  { code: '가', name: '안전·보건 목표와 경영방침', article: '제4조 제1호', icon: '🎯' },
  { code: '나', name: '전담 조직 구성', article: '제4조 제2호', icon: '🏢' },
  { code: '다', name: '유해·위험요인 확인·개선', article: '제4조 제3호', icon: '🔍' },
  { code: '라', name: '인력·시설·장비·예산', article: '제4조 제4호', icon: '💰' },
  { code: '마', name: '권한·예산·평가 기준', article: '제4조 제5호', icon: '📋' },
  { code: '바', name: '안전관리자 배치·시간보장', article: '제4조 제6호', icon: '👷' },
  { code: '사', name: '종사자 의견 청취', article: '제4조 제7호', icon: '🗣️' },
  { code: '아', name: '중대산업재해 대비 매뉴얼', article: '제4조 제8호', icon: '📖' },
  { code: '자', name: '도급·용역·위탁 기준', article: '제4조 제9호', icon: '🤝' },
];
