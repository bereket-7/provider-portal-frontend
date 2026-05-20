"use client";

import { useEffect } from "react";

import { isDemoMode } from "@/lib/demo/demo-mode";
import { checkRequiredEnvVars } from "@/lib/utils/env-checker";

export function EnvCheckerProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	useEffect(() => {
		if (isDemoMode()) return;
		if (process.env.NODE_ENV !== "production") {
			checkRequiredEnvVars();
		}
	}, []);

	return <>{children}</>;
}
