declare global {
	interface Window {
		dataLayer?: unknown[];
		gtag?: (...args: unknown[]) => void;
	}
}

const measurementId = import.meta.env.PUBLIC_GA_MEASUREMENT_ID?.trim();

let trackingEnabled = false;
let configured = false;

function warnMissingId() {
	if (import.meta.env.DEV) {
		console.warn('[AdriaIntel] PUBLIC_GA_MEASUREMENT_ID is not set; Google Analytics is disabled.');
	}
}

/** Must match Google's snippet: push `arguments`, not a rest-parameter array. */
export function ensureGtag(): typeof window.gtag {
	window.dataLayer = window.dataLayer ?? [];
	if (!window.gtag) {
		window.gtag = function gtag() {
			window.dataLayer?.push(arguments);
		};
	}
	return window.gtag;
}

const consentDenied = {
	ad_storage: 'denied',
	ad_user_data: 'denied',
	ad_personalization: 'denied',
	analytics_storage: 'denied',
} as const;

const analyticsGranted = {
	analytics_storage: 'granted',
} as const;

function waitForGtagScript(): Promise<void> {
	return new Promise((resolve) => {
		const script = document.querySelector('script[src*="googletagmanager.com/gtag/js"]');
		if (!script) {
			resolve();
			return;
		}
		if (script.getAttribute('data-adriaintel-gtag-ready') === 'true') {
			resolve();
			return;
		}
		const markReady = () => {
			script.setAttribute('data-adriaintel-gtag-ready', 'true');
			resolve();
		};
		script.addEventListener('load', markReady, { once: true });
		if ((script as HTMLScriptElement).complete) {
			markReady();
			return;
		}
		setTimeout(markReady, 2000);
	});
}

export function sendPageView() {
	if (!trackingEnabled || !measurementId || !configured) return;
	const gtag = ensureGtag();
	gtag('event', 'page_view', {
		page_location: window.location.href,
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
	const gtag = ensureGtag();
	await waitForGtagScript();

	gtag('consent', 'update', analyticsGranted);

	if (!configured) {
		gtag('config', measurementId, {
			anonymize_ip: true,
			send_page_view: false,
		});
		configured = true;
	}
	sendPageView();
}

export function disableGoogleAnalytics() {
	if (!measurementId) return;
	trackingEnabled = false;
	const gtag = ensureGtag();
	gtag('consent', 'update', consentDenied);
}

export function isGoogleAnalyticsEnabled() {
	return trackingEnabled;
}

export function setupAnalyticsPageViews() {
	document.addEventListener('astro:page-load', () => {
		sendPageView();
	});
}
