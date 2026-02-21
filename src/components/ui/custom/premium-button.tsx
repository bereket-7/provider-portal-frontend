"use client";

import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PremiumButtonProps extends ButtonProps {
	icon?: React.ElementType;
	iconPosition?: "left" | "right";
	animateHover?: boolean;
}

export function PremiumButton({
	className,
	variant = "default",
	icon: Icon,
	iconPosition = "left",
	animateHover = true,
	children,
	...props
}: PremiumButtonProps) {
	const isDefault = variant === "default";
	const isSecondary = variant === "secondary";
	const isOutline = variant === "outline";
	const isGhost = variant === "ghost";

	return (
		<Button
			className={cn(
				"h-14 px-10 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all duration-500",
				animateHover && "hover:scale-[1.02] active:scale-[0.98]",
				isDefault &&
					"bg-primary text-primary-foreground shadow-lg shadow-primary/20",
				isOutline && "border-2 border-border/40 hover:bg-primary/5",
				isGhost && "hover:bg-primary/5",
				className
			)}
			variant={variant}
			{...props}
		>
			{Icon && iconPosition === "left" && (
				<Icon
					className={cn(
						"w-4 h-4 mr-3",
						animateHover &&
							"group-hover:translate-x-[-2px] transition-transform"
					)}
				/>
			)}
			{children}
			{Icon && iconPosition === "right" && (
				<Icon
					className={cn(
						"w-4 h-4 ml-3",
						animateHover && "group-hover:translate-x-[2px] transition-transform"
					)}
				/>
			)}
		</Button>
	);
}
