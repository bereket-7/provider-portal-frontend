import { PolicyEngine } from "../abac/engine";

export const useABAC = () => {
	// Mock user data (replace with actual user data from your auth system)
	const user = {
		id: "123",
		roles: ["editor"],
		attributes: {
			department: "engineering",
		},
	};

	const checkAccess = (
		resourceType: string,
		action: string,
		resource?: any
	) => {
		const environment = {
			time: new Date().toLocaleTimeString("en-US"),
			ip: "192.168.1.1", // Example IP
			location: "New York", // Example location
		};

		// Create the AttributeContext object
		const context = {
			action,
			user,
			resource: {
				type: resourceType,
				attributes: resource || {}, // Use provided resource attributes or an empty object
			},
			environment,
		};

		// Evaluate the policies
		return PolicyEngine.evaluate(context);
	};

	return { checkAccess };
};
