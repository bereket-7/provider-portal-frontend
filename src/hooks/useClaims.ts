import { useQuery } from "@tanstack/react-query";
import { getClaims } from "@/_service/actions/claim-actions";
import { demoGetClaims } from "@/lib/demo/demo-api";
import { isDemoMode } from "@/lib/demo/demo-mode";
import { useDemoStore } from "@/lib/demo/demo-store-context";

export function useClaims(search?: string, status?: string) {
	const { version } = useDemoStore();
	return useQuery({
		queryKey: ["claims", search, status, isDemoMode() ? version : "api"],
		queryFn: async () => {
			if (isDemoMode()) return demoGetClaims(search, status);
			const response = await getClaims(search, status);
			if (!response.ok) throw new Error(response.message || "Failed to fetch claims");
			return response.data.claims;
		},
	});
}
