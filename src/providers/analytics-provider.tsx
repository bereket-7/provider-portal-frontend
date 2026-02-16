"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { Analytics } from "@vercel/analytics/react";

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	useEffect(() => {
		// Custom analytics tracking logic
		const url = `${pathname}${searchParams?.toString() ? `?${searchParams.toString()}` : ""}`;
		// Track page view
	}, [pathname, searchParams]);

	return (
		<>
			{children}
			<Analytics />
		</>
	);
}
