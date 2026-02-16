"use client";

import { useEffect } from "react";

import { ThemeProvider as NextThemesProvider } from "next-themes";

import { useAppSelector } from "@/hooks/storehooks";

export function SettingsProvider({ children }: { children: React.ReactNode }) {
	const settings = useAppSelector((state) => state.settings);

	useEffect(() => {
		const root = document.documentElement;

		// Handle font size
		root.classList.remove("text-sm", "text-base", "text-lg");
		root.classList.add(`text-${settings.fontSize}`);

		const baseFontSize =
			settings.fontSize === "small"
				? 14
				: settings.fontSize === "medium"
					? 16
					: 18;

		root.style.setProperty(
			"--font-size-multiplier",
			settings.fontSize === "small"
				? "0.875"
				: settings.fontSize === "medium"
					? "1"
					: "1.125"
		);

		root.style.setProperty("--base-font-size", `${baseFontSize}px`);
		root.style.setProperty("--h1-size", `calc(${baseFontSize * 2}px)`);
		root.style.setProperty("--h2-size", `calc(${baseFontSize * 1.5}px)`);
		root.style.setProperty("--h3-size", `calc(${baseFontSize * 1.25}px)`);
		root.style.setProperty("--h4-size", `calc(${baseFontSize * 1.125}px)`);
		root.style.setProperty("--spacing-unit", `calc(${baseFontSize * 0.25}px)`);

		// Handle font family
		root.style.setProperty(
			"--font-primary",
			`var(--font-${settings.fontFamily})`
		);
	}, [settings]);

	return (
		<NextThemesProvider
			attribute="class"
			defaultTheme={settings.theme}
			enableSystem={settings.theme === "system"}
			disableTransitionOnChange
		>
			{children}
		</NextThemesProvider>
	);
}
