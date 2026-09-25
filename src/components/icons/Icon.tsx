import { icons, type IconName } from "./icons";

export function Icon({ name, className }: { name: IconName; className?: string }) {
	return (
		<svg
			className={className ? `icon ${className}` : "icon"}
			viewBox="0 -960 960 960"
			aria-hidden="true"
			focusable="false"
		>
			<path d={icons[name]} />
		</svg>
	);
}
