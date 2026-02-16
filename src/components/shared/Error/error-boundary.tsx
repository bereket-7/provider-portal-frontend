"use client";

import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";

import { ErrorFallback } from "./error-fallback";

export function ErrorBoundaryWrapper({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ReactErrorBoundary FallbackComponent={ErrorFallback}>
			{children}
		</ReactErrorBoundary>
	);
}
