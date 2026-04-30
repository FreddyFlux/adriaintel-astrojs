import * as React from "react";

const ALL_LABEL = "All Insights";

const listingSelector = "[data-article-listing-item]";

function applyCategoryFilter(active: string) {
	const items = document.querySelectorAll<HTMLElement>(listingSelector);
	items.forEach((el) => {
		const cat = el.getAttribute("data-category") ?? "";
		if (active === ALL_LABEL) {
			el.hidden = false;
		} else {
			el.hidden = cat !== active;
		}
	});
}

export type ArticleFilterBarProps = {
	/** Distinct category values from Sanity (build-time), sorted for stable UI */
	categories: string[];
};

export function ArticleFilterBar({ categories }: ArticleFilterBarProps) {
	const [active, setActive] = React.useState<string>(ALL_LABEL);

	React.useEffect(() => {
		applyCategoryFilter(active);
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
