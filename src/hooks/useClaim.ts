import { useQuery } from "@tanstack/react-query";
import { getClaim } from "@/_service/actions/claim-actions";
import { demoGetClaim } from "@/lib/demo/demo-api";
import { isDemoMode } from "@/lib/demo/demo-mode";
import { useDemoStore } from "@/lib/demo/demo-store-context";

export function useClaim(id: string) {
	const { version } = useDemoStore();
	return useQuery({
		queryKey: ["claim", id, isDemoMode() ? version : "api"],
		queryFn: async () => {
			if (isDemoMode()) {
				const claim = await demoGetClaim(id);
				if (!claim) throw new Error("Claim not found");
				return claim;
			}
			const response = await getClaim(id);
			if (!response.ok) throw new Error(response.message || "Failed to fetch claim");
			return response.data.claim;
		},
		enabled: !!id,
	});
}
