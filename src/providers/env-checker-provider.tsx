"use client";

import { useEffect } from "react";

import { checkRequiredEnvVars } from "@/lib/utils/env-checker";

export function EnvCheckerProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	useEffect(() => {
		if (process.env.NODE_ENV !== "production") {
			checkRequiredEnvVars();
		}
	}, []);

	return <>{children}</>;
}
