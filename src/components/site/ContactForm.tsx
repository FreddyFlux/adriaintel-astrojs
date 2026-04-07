import * as React from "react";

type Variant = "dark" | "light";

export function ContactForm({
	variant = "light",
	className = "",
}: {
	variant?: Variant;
	className?: string;
}) {
	const [status, setStatus] = React.useState<"idle" | "sent">("idle");

	function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setStatus("sent");
	}

	const isDark = variant === "dark";

	const label = isDark
		? "font-label text-[10px] uppercase tracking-widest text-surface/60"
		: "font-label text-xs uppercase tracking-wider text-secondary";

	const field =
		isDark
			? "w-full border-0 border-b border-white/10 bg-transparent py-3 text-lg text-surface placeholder:text-white/20 focus:border-tertiary focus:ring-0"
			: "w-full border-0 border-b border-outline-variant bg-transparent py-2 text-primary placeholder:text-outline-variant/60 transition-all duration-300 focus:border-primary focus:ring-0";

	if (variant === "dark") {
		return (
			<form
				className={`grid grid-cols-1 gap-12 md:grid-cols-2 ${className}`}
				onSubmit={onSubmit}
			>
				<div className="space-y-12">
					<div>
						<label className={`${label} mb-2 block`}>Full Name</label>
						<input
							name="name"
							className={field}
							type="text"
							placeholder="Alexander Maritime"
							autoComplete="name"
							required
						/>
					</div>
					<div>
						<label className={`${label} mb-2 block`}>Corporate Email</label>
						<input
							name="email"
							className={field}
							type="email"
							placeholder="strategy@company.com"
							autoComplete="email"
							required
						/>
					</div>
				</div>
				<div className="space-y-12">
					<div>
						<label className={`${label} mb-2 block`}>Inquiry Type</label>
						<select name="topic" className={`${field} text-surface`} defaultValue="consulting">
							<option className="text-on-surface">Data Intelligence Consulting</option>
							<option className="text-on-surface">Supply Chain Optimization</option>
							<option className="text-on-surface">Market Analysis</option>
							<option className="text-on-surface">Partnership</option>
						</select>
					</div>
					<div>
						<label className={`${label} mb-2 block`}>Brief Message</label>
						<textarea
							name="message"
							className={`${field} h-24 resize-none`}
							placeholder="How can we assist your maritime vision?"
							rows={4}
						/>
					</div>
				</div>
				<div className="mt-12 flex flex-col items-center gap-4 md:col-span-2">
					<button
						type="submit"
						className="rounded-full bg-tertiary px-16 py-6 font-headline text-xl font-bold text-on-tertiary-fixed transition-transform hover:scale-105"
					>
						{status === "sent" ? "Received" : "Send Inquiry"}
					</button>
					{status === "sent" ? (
						<p className="text-sm text-surface/70" role="status">
							Thank you — we will respond shortly.
						</p>
					) : null}
				</div>
			</form>
		);
	}

	return (
		<form className={`relative z-10 space-y-8 ${className}`} onSubmit={onSubmit}>
			<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
				<div className="group">
					<label className={`${label} mb-2 block`}>Name</label>
					<input
						name="name"
						className={field}
						type="text"
						placeholder="Your full name"
						autoComplete="name"
						required
					/>
				</div>
				<div className="group">
					<label className={`${label} mb-2 block`}>Email</label>
					<input
						name="email"
						className={field}
						type="email"
						placeholder="your@email.com"
						autoComplete="email"
						required
					/>
				</div>
			</div>
			<div className="group">
				<label className={`${label} mb-2 block`}>Subject</label>
				<input name="subject" className={field} type="text" placeholder="How can we help?" />
			</div>
			<div className="group">
				<label className={`${label} mb-2 block`}>Message</label>
				<textarea
					name="message"
					className={`${field} resize-none`}
					placeholder="Share your maritime vision or inquiry..."
					rows={4}
				/>
			</div>
			<div className="pt-4">
				<button
					type="submit"
					className="group flex items-center gap-3 rounded-xl bg-primary px-10 py-4 font-headline font-bold text-on-primary transition-all hover:gap-5"
				>
					{status === "sent" ? "Sent" : "Send Inquiry"}
					<span className="material-symbols-outlined text-lg">arrow_forward</span>
				</button>
			</div>
		</form>
	);
}
