import axios from "axios";

export interface SubscriptionResponse {
	features: string[];
	limits: Record<string, number>;
	tier: string;
	isActive: boolean;
}

export const subscriptionApi = {
	async getUserFeatures(): Promise<SubscriptionResponse> {
		const response = await axios.get("/api/subscription/features");
		return response.data;
	},

	async checkFeature(featureKey: string): Promise<boolean> {
		const response = await axios.get(
			`/api/subscription/check-feature/${featureKey}`
		);
		return response.data.hasAccess;
	},
};
