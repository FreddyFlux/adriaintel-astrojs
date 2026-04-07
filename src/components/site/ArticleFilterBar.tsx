import * as React from "react";

const FILTERS = [
	"All Insights",
	"Market Analysis",
	"Maritime Data",
	"Supply Chain",
	"Sustainability",
] as const;

export function ArticleFilterBar() {
	const [active, setActive] = React.useState<(typeof FILTERS)[number]>("All Insights");

	return (
		<div className="mb-16 flex flex-wrap items-center gap-4 border-b border-outline-variant/15 pb-8">
			{FILTERS.map((label) => {
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
