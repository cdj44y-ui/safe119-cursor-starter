/**
 * 이벤트 트래킹 유틸리티
 *
 * Cursor에서 Google Analytics 4 또는 Vercel Analytics를 연결하세요.
 */

export function trackEvent(eventName: string, params?: Record<string, string | number>) {
  // GA4
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, params);
  }

  // Console log for development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics]', eventName, params);
  }
}

// 주요 이벤트
export const EVENTS = {
  DIAGNOSIS_START: 'diagnosis_start',
  DIAGNOSIS_COMPLETE: 'diagnosis_complete',
  STEP_COMPLETE: 'step_complete',
  RESULT_VIEW: 'result_view',
  PDF_DOWNLOAD: 'pdf_download',
  CONSULT_CLICK: 'consult_click',
  FREE119_CLICK: 'free119_click',
} as const;
