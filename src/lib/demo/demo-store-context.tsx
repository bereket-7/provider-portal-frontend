"use client";

import React, {
	createContext,
	useCallback,
	useContext,
	useMemo,
	useState,
} from "react";

import { resetDemoState } from "./demo-api";
import { isDemoMode } from "./demo-mode";

interface DemoStoreContextValue {
	version: number;
	bumpVersion: () => void;
	reset: () => void;
	isDemo: boolean;
}

const DemoStoreContext = createContext<DemoStoreContextValue | undefined>(
	undefined
);

export function DemoStoreProvider({ children }: { children: React.ReactNode }) {
	const [version, setVersion] = useState(0);
	const isDemo = isDemoMode();

	const bumpVersion = useCallback(() => {
		setVersion((v) => v + 1);
	}, []);

	const reset = useCallback(() => {
		resetDemoState();
		setVersion((v) => v + 1);
	}, []);

	const value = useMemo(
		() => ({ version, bumpVersion, reset, isDemo }),
		[version, bumpVersion, reset, isDemo]
	);

	return (
		<DemoStoreContext.Provider value={value}>
			{children}
		</DemoStoreContext.Provider>
	);
}

export function useDemoStore() {
	const ctx = useContext(DemoStoreContext);
	if (!ctx) {
		return {
			version: 0,
			bumpVersion: () => {},
			reset: () => {},
			isDemo: isDemoMode(),
		};
	}
	return ctx;
}
