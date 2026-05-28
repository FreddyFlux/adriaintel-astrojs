/** Consent defaults + gtag stub — inlined in Layout.astro before the Google tag script. */
export function getGtagHeadInlineScript(): string {
	return `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  wait_for_update: 500
});
gtag('js', new Date());
`.trim();
}
