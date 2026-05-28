import 'vanilla-cookieconsent/dist/cookieconsent.css';
import '../styles/cookie-consent-overrides.css';
import * as CookieConsent from 'vanilla-cookieconsent';
import { getCookieConsentConfig } from './cookieConsentConfig';
import { setupAnalyticsPageViews } from './googleAnalytics';

declare global {
	interface Window {
		showCookiePreferences?: () => void;
	}
}

window.showCookiePreferences = () => {
	CookieConsent.showPreferences();
};

function bindCookieSettingsTriggers() {
	document.querySelectorAll('[data-open-cookie-settings]').forEach((el) => {
		el.addEventListener('click', (e) => {
			e.preventDefault();
			CookieConsent.showPreferences();
		});
	});
}

void CookieConsent.run(getCookieConsentConfig()).then(() => {
	setupAnalyticsPageViews();
	bindCookieSettingsTriggers();
	document.addEventListener('astro:page-load', bindCookieSettingsTriggers);
});
