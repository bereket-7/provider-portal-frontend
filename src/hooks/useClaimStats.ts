import { useQuery } from "@tanstack/react-query";
import { getClaimStats } from "@/_service/actions/claim-actions";

export function useClaimStats() {
	return useQuery({
		queryKey: ["claim-stats"],
		queryFn: async () => {
			const response = await getClaimStats();
			if (!response.ok) throw new Error(response.message || "Failed to fetch claim stats");
			return response.data.claimStats;
		},
	});
}
