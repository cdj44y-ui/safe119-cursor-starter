// Tally 문의 폼 연동 헬퍼
// 폼: https://tally.so/forms/GxZyzz (노무 상담 문의 · 조대진 노무사)
// RISK119(labor-inspection-app)와 동일한 폼을 공유합니다.
// 폼의 "어떤 도움이 필요하세요?" 항목에 "안전보건 컨설팅"이 이미 있어 SAFE119 문의에도 그대로 맞습니다.
export const TALLY_FORM_ID = 'GxZyzz';

type Prefill = Record<string, string | number | undefined>;

function buildParams(prefill: Prefill = {}) {
  const params = new URLSearchParams();
  Object.entries(prefill).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return;
    params.set(key, String(value));
  });
  return params;
}

/** 새 탭에서 여는 Tally 응답 URL (score/grade 값을 hidden field로 전달) */
export function buildTallyUrl(prefill: Prefill = {}) {
  const params = buildParams(prefill);
  const qs = params.toString();
  return `https://tally.so/r/${TALLY_FORM_ID}${qs ? `?${qs}` : ''}`;
}

/** 페이지에 인라인으로 삽입할 Tally 임베드 URL */
export function buildTallyEmbedUrl(prefill: Prefill = {}) {
  const params = buildParams({
    alignLeft: 1,
    hideTitle: 1,
    transparentBackground: 1,
    dynamicHeight: 1,
    ...prefill,
  });
  return `https://tally.so/embed/${TALLY_FORM_ID}?${params.toString()}`;
}
