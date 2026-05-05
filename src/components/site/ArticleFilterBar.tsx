import * as React from "react";

const ALL_LABEL = "All Insights";

const listingSelector = "[data-article-listing-item]";
const FILTER_ANIMATION_MS = 220;

function applyCategoryFilter(active: string, animate: boolean) {
	const items = document.querySelectorAll<HTMLElement>(listingSelector);
	const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	items.forEach((el) => {
		const cat = el.getAttribute("data-category") ?? "";
		const matches = active === ALL_LABEL || cat === active;
		const pendingTimer = el.dataset.filterTimer;

		if (pendingTimer) {
			window.clearTimeout(Number(pendingTimer));
			delete el.dataset.filterTimer;
		}

		el.classList.remove("is-filtering-in", "is-filtering-out");

		if (!animate || reduceMotion) {
			el.hidden = !matches;
			return;
		}

		if (matches) {
			el.hidden = false;
			el.classList.add("is-filtering-in");
			const timer = window.setTimeout(() => {
				el.classList.remove("is-filtering-in");
				delete el.dataset.filterTimer;
			}, FILTER_ANIMATION_MS);
			el.dataset.filterTimer = String(timer);
		} else {
			el.classList.add("is-filtering-out");
			const timer = window.setTimeout(() => {
				el.hidden = true;
				el.classList.remove("is-filtering-out");
				delete el.dataset.filterTimer;
			}, FILTER_ANIMATION_MS);
			el.dataset.filterTimer = String(timer);
		}
	});
}

export type ArticleFilterBarProps = {
	/** Distinct category values from Sanity (build-time), sorted for stable UI */
	categories: string[];
};

export function ArticleFilterBar({ categories }: ArticleFilterBarProps) {
	const [active, setActive] = React.useState<string>(ALL_LABEL);
	const hasMounted = React.useRef(false);

	React.useEffect(() => {
		applyCategoryFilter(active, hasMounted.current);
		hasMounted.current = true;
	}, [active]);

	const filters = React.useMemo(() => [ALL_LABEL, ...categories], [categories]);

	return (
		<div className="mb-16 flex flex-wrap items-center gap-4 border-b border-outline-variant/15 pb-8">
			{filters.map((label) => {
				const isActive = active === label;
				return (
					<button
						key={label}
						type="button"
						onClick={() => setActive(label)}
						className={`rounded-full px-6 py-2 text-sm font-semibold transition-colors ${
							isActive
								? "bg-primary text-on-primary"
								: "bg-surface-container text-primary hover:bg-surface-container-high"
						}`}
					>
						{label}
					</button>
				);
			})}
			<div className="ml-auto hidden items-center gap-2 text-sm text-secondary lg:flex">
				<span className="material-symbols-outlined text-sm">sort</span>
				<span>Sort by: Latest</span>
			</div>
		</div>
	);
}
