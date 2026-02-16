import { subscriptionPlans } from "@/lib/subscription/plans";
import { type SubscriptionFeatures } from "@/lib/subscription/types";

export const useSubscription = () => {
	//   const userSubscription = useAppSelector((state) => state.currentUser.currentUser.user?.subscription);
	const userSubscription = {
		tier: "free",
		name: "Free Plan",
		price: 0,
		features: {
			canAccessAnalytics: false,
			maxProjects: 1,
			maxStorage: 100, // MB
			supportPriority: "normal",
			customTheme: false,
			apiAccess: false,
		},
	};
	const currentPlan = subscriptionPlans[userSubscription?.tier || "free"];

	// TODO => this is the api subscription checking

	//     const { data: subscription, isLoading } = useQuery({
	//     queryKey: ["subscription-features"],
	//     queryFn: () => subscriptionApi.getUserFeatures(),
	//   });
	// const hasFeature = async (feature: string): Promise<boolean> => {
	//     try {
	//       return await subscriptionApi.checkFeature(feature);
	//     } catch {
	//       return false;
	//     }
	//   };

	const hasFeature = (feature: keyof SubscriptionFeatures): boolean => {
		return !!currentPlan.features[feature];
	};

	const isFeatureAvailable = (
		feature: keyof SubscriptionFeatures,
		value: number
	): boolean => {
		const limit = currentPlan.features[feature];
		return typeof limit === "number" ? value <= limit : !!limit;
	};

	return {
		currentPlan,
		hasFeature,
		isFeatureAvailable,
	};
};
