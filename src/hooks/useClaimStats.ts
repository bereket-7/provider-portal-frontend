import { useQuery } from "@tanstack/react-query";
import { getClaimStats } from "@/_service/actions/claim-actions";
import { demoGetClaimStats } from "@/lib/demo/demo-api";
import { isDemoMode } from "@/lib/demo/demo-mode";
import { useDemoStore } from "@/lib/demo/demo-store-context";

export function useClaimStats() {
	const { version } = useDemoStore();
	return useQuery({
		queryKey: ["claim-stats", isDemoMode() ? version : "api"],
		queryFn: async () => {
			if (isDemoMode()) return demoGetClaimStats();
			const response = await getClaimStats();
			if (!response.ok) throw new Error(response.message || "Failed to fetch claim stats");
			return response.data.claimStats;
		},
	});
}
