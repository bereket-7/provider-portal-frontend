"use client";

import { useSubscription } from "@/hooks/useSubscription";
import { type SubscriptionFeatures } from "@/lib/subscription/types";

interface FeatureGateProps {
	feature: keyof SubscriptionFeatures;
	children: React.ReactNode;
	fallback?: React.ReactNode;
}

export function FeatureGate({ feature, children, fallback }: FeatureGateProps) {
	const { hasFeature } = useSubscription();

	if (!hasFeature(feature)) {
		return fallback || null;
	}

	return <>{children}</>;
}

// * this is the subscription checking without api based
{
	/* <FeatureGate feature="customTheme">
  <ThemeCustomizer />
</FeatureGate>

<FeatureGate 
  feature="canAccessAnalytics"
  fallback={<UpgradePlanCard />}
>
  <AnalyticsDashboard />
</FeatureGate> */
}

// * this is the subscription checking for api based
// <FeatureGate
//   feature="analytics"
//   fallback={<UpgradePrompt />}
//   loadingFallback={<LoadingSpinner />}
// >
//   <AnalyticsDashboard />
// </FeatureGate>

// TODO => this is the api subscription checking
// "use client";

// import { useEffect, useState } from "react";
// import { useSubscription } from "@/hooks/useSubscription";
// import { Skeleton } from "@/components/ui/skeleton";

// interface FeatureGateProps {
//   feature: string;
//   children: React.ReactNode;
//   fallback?: React.ReactNode;
//   loadingFallback?: React.ReactNode;
// }

// export function FeatureGate({
//   feature,
//   children,
//   fallback,
//   loadingFallback
// }: FeatureGateProps) {
//   const { hasFeature, isLoading } = useSubscription();
//   const [hasAccess, setHasAccess] = useState(false);

//   useEffect(() => {
//     const checkAccess = async () => {
//       const access = await hasFeature(feature);
//       setHasAccess(access);
//     };

//     checkAccess();
//   }, [feature, hasFeature]);

//   if (isLoading) {
//     return loadingFallback || <Skeleton className="w-full h-[100px]" />;
//   }

//   if (!hasAccess) {
//     return fallback || null;
//   }

//   return <>{children}</>;
// }
