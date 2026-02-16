"use client";

import { usePermissions } from "@/providers/permission-provider";

export function withPermission<P extends object>(
	WrappedComponent: React.ComponentType<P>,
	componentName: string
) {
	return function PermissionWrapper(props: P) {
		const { hasComponentAccess } = usePermissions();

		if (!hasComponentAccess(componentName)) {
			return null; // Or return an unauthorized component
		}

		return <WrappedComponent {...props} />;
	};
}
