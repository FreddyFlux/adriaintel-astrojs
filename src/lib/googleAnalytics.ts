declare global {
	interface Window {
		dataLayer?: unknown[];
		gtag?: (...args: unknown[]) => void;
	}
}

const measurementId = import.meta.env.PUBLIC_GA_MEASUREMENT_ID?.trim();

let scriptLoaded = false;
let trackingEnabled = false;

function warnMissingId() {
	if (import.meta.env.DEV) {
		console.warn('[AdriaIntel] PUBLIC_GA_MEASUREMENT_ID is not set; Google Analytics is disabled.');
	}
}

function ensureGtag(): typeof window.gtag | undefined {
	window.dataLayer = window.dataLayer ?? [];
	if (!window.gtag) {
		window.gtag = function gtag(...args: unknown[]) {
			window.dataLayer?.push(args);
		};
	}
	return window.gtag;
}

function loadGtagScript(): Promise<void> {
	if (!measurementId) {
		warnMissingId();
		return Promise.resolve();
	}
	if (scriptLoaded) return Promise.resolve();

	return new Promise((resolve, reject) => {
		const existing = document.querySelector(`script[src*="googletagmanager.com/gtag/js"]`);
		if (existing) {
			scriptLoaded = true;
			resolve();
			return;
		}
		const script = document.createElement('script');
		script.async = true;
		script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
		script.onload = () => {
			scriptLoaded = true;
			resolve();
		};
		script.onerror = () => reject(new Error('Failed to load Google Analytics'));
		document.head.appendChild(script);
	});
}

export function sendPageView() {
	if (!trackingEnabled || !measurementId) return;
	const gtag = ensureGtag();
	if (!gtag) return;
	gtag('event', 'page_view', {
		page_path: window.location.pathname + window.location.search,
		page_title: document.title,
	});
}

export async function enableGoogleAnalytics() {
	if (!measurementId) {
		warnMissingId();
		return;
	}
	trackingEnabled = true;
	try {
		await loadGtagScript();
		const gtag = ensureGtag();
		if (!gtag) return;
		gtag('js', new Date());
		gtag('config', measurementId, {
			anonymize_ip: true,
			send_page_view: false,
		});
		sendPageView();
	} catch {
		trackingEnabled = false;
	}
}

export function disableGoogleAnalytics() {
	trackingEnabled = false;
}

export function isGoogleAnalyticsEnabled() {
	return trackingEnabled;
}

export function setupAnalyticsPageViews() {
	document.addEventListener('astro:page-load', () => {
		sendPageView();
	});
}
