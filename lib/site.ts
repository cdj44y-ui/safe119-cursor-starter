/**
 * 사이트 절대 URL (OG·사이트맵·metadataBase)
 * - Vercel 프로덕션: Project → Environment Variables에 NEXT_PUBLIC_SITE_URL 설정 권장
 * - 미설정 시: VERCEL_URL(프리뷰/배포 호스트) 또는 기본 www.safe119.site
 */
export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, '');
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL.replace(/\/$/, '')}`;
  return 'https://www.safe119.site';
}
