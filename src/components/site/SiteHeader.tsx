import * as React from "react";

const links = [
	{ href: "/", label: "Home" },
	{ href: "/about", label: "About" },
	{ href: "/articles", label: "Articles" },
	{ href: "/contact", label: "Contact" },
] as const;

export function SiteHeader({ currentPath }: { currentPath: string }) {
	const [open, setOpen] = React.useState(false);

	return (
		<nav className="fixed top-0 z-50 flex w-full max-w-full items-center justify-between border-b border-white/5 bg-[#e6fff4]/80 px-6 py-5 backdrop-blur-xl md:px-8">
			<div className="mx-auto flex w-full max-w-7xl items-center justify-between">
				<a
					href="/"
					className="font-headline text-2xl font-bold tracking-tighter text-primary"
				>
					AdriaIntel
				</a>
				<div className="hidden items-center gap-10 md:flex">
					{links.map(({ href, label }) => {
						const active =
							href === "/"
								? currentPath === "/"
								: currentPath.startsWith(href);
						return (
							<a
								key={href}
								href={href}
								className={`font-headline text-sm font-semibold uppercase tracking-tight transition-colors duration-300 ${
									active
										? "border-b-2 border-primary pb-1 text-primary"
										: "text-secondary hover:text-primary"
								}`}
							>
								{label}
							</a>
						);
					})}
				</div>
				<div className="flex items-center gap-3">
					<a
						href="/contact"
						className="hidden rounded-xl bg-primary px-6 py-2.5 font-headline text-sm font-bold uppercase tracking-wider text-on-primary transition-transform hover:scale-105 md:inline-flex"
					>
						Consultation
					</a>
					<button
						type="button"
						className="text-primary md:hidden"
						aria-expanded={open}
						aria-label={open ? "Close menu" : "Open menu"}
						onClick={() => setOpen((v) => !v)}
					>
						<span className="material-symbols-outlined text-3xl">
							{open ? "close" : "menu"}
						</span>
					</button>
				</div>
			</div>
			{open ? (
				<div className="absolute left-0 right-0 top-full border-b border-outline-variant/20 bg-[#e6fff4]/95 px-6 py-6 shadow-lg backdrop-blur-xl md:hidden">
					<div className="mx-auto flex max-w-7xl flex-col gap-4">
						{links.map(({ href, label }) => (
							<a
								key={href}
								href={href}
								className="font-headline text-sm font-semibold uppercase text-primary"
								onClick={() => setOpen(false)}
							>
								{label}
							</a>
						))}
						<a
							href="/contact"
							className="mt-2 rounded-xl bg-primary px-6 py-3 text-center font-headline text-sm font-bold text-on-primary"
							onClick={() => setOpen(false)}
						>
							Consultation
						</a>
					</div>
				</div>
			) : null}
		</nav>
	);
}
