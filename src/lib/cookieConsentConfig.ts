import * as CookieConsent from 'vanilla-cookieconsent';

type CookieConsentConfig = Parameters<typeof CookieConsent.run>[0];
import { disableGoogleAnalytics, enableGoogleAnalytics } from './googleAnalytics';

function syncAnalyticsFromConsent() {
	if (CookieConsent.acceptedCategory('analytics')) {
		void enableGoogleAnalytics();
	} else {
		disableGoogleAnalytics();
	}
}

export function getCookieConsentConfig(): CookieConsentConfig {
	return {
		mode: 'opt-in',
		autoShow: true,
		hideFromBots: true,
		disablePageInteraction: false,
		guiOptions: {
			consentModal: {
				layout: 'box',
				position: 'bottom right',
				equalWeightButtons: true,
				flipButtons: false,
			},
			preferencesModal: {
				layout: 'box',
				position: 'right',
				equalWeightButtons: true,
			},
		},
		categories: {
			necessary: {
				enabled: true,
				readOnly: true,
			},
			analytics: {
				enabled: false,
				autoClear: {
					cookies: [{ name: /^_ga/ }, { name: '_gid' }],
				},
			},
		},
		onFirstConsent: () => {
			syncAnalyticsFromConsent();
		},
		onConsent: () => {
			syncAnalyticsFromConsent();
		},
		onChange: () => {
			syncAnalyticsFromConsent();
		},
		language: {
			default: 'en',
			translations: {
				en: {
					consentModal: {
						title: 'We value your privacy',
						description:
							'We use essential cookies to remember your choices. With your permission, we use Google Analytics to understand how visitors use our site. Read more in our <a href="/privacy#cookies">privacy policy</a>.',
						acceptAllBtn: 'Accept all',
						acceptNecessaryBtn: 'Reject all',
						showPreferencesBtn: 'Manage preferences',
						footer:
							'<a href="/privacy">Privacy Policy</a><a href="/terms">Terms of Service</a>',
					},
					preferencesModal: {
						title: 'Cookie preferences',
						acceptAllBtn: 'Accept all',
						acceptNecessaryBtn: 'Reject all',
						savePreferencesBtn: 'Save preferences',
						closeIconLabel: 'Close',
						sections: [
							{
								title: 'Strictly necessary',
								description:
									'Required to store your consent and keep the site working. These cannot be turned off.',
								linkedCategory: 'necessary',
							},
							{
								title: 'Analytics',
								description:
									'Google Analytics helps us see aggregated, anonymous usage (pages visited, general location, device type). Data is processed by Google as described in our <a href="/privacy#cookies">privacy policy</a>.',
								linkedCategory: 'analytics',
								cookieTable: {
									caption: 'Cookies set when you allow analytics',
									headers: {
										name: 'Cookie',
										domain: 'Domain',
										description: 'Description',
										expiration: 'Expiry',
									},
									body: [
										{
											name: '_ga',
											domain: typeof location !== 'undefined' ? location.hostname : '',
											description: 'Distinguishes users (Google Analytics)',
											expiration: '2 years',
										},
										{
											name: '_ga_*',
											domain: typeof location !== 'undefined' ? location.hostname : '',
											description: 'Session state for GA4',
											expiration: '2 years',
										},
									],
								},
							},
						],
					},
				},
			},
		},
	};
}
