"use client";

import { createContext, useContext } from "react";

import { useAppSelector } from "@/hooks/storehooks";
import { useABAC } from "@/permissions/access/useABAC";

interface PermissionContextType {
	checkAccess: (
		resourceType: string,
		action: string,
		resource?: unknown
	) => boolean;
	hasComponentAccess: (componentName: string) => boolean;
	hasApiAccess: (endpoint: string, method: string) => boolean;
}

const PermissionContext = createContext<PermissionContextType | undefined>(
	undefined
);

export function PermissionProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const { checkAccess } = useABAC();
	const _user = useAppSelector((state) => state.currentUser.currentUser.user);

	const hasComponentAccess = (componentName: string) => {
		return checkAccess("component", "view", { name: componentName });
	};

	const hasApiAccess = (endpoint: string, method: string) => {
		return checkAccess("api", method.toLowerCase(), { endpoint });
	};

	return (
		<PermissionContext.Provider
			value={{ checkAccess, hasComponentAccess, hasApiAccess }}
		>
			{children}
		</PermissionContext.Provider>
	);
}

export const usePermissions = () => {
	const context = useContext(PermissionContext);
	if (!context) {
		throw new Error("usePermissions must be used within a PermissionProvider");
	}
	return context;
};
