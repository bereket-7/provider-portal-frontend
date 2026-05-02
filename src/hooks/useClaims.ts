import { useQuery } from "@tanstack/react-query";
import { getClaims } from "@/_service/actions/claim-actions";

export function useClaims(search?: string, status?: string) {
	return useQuery({
		queryKey: ["claims", search, status],
		queryFn: async () => {
			const response = await getClaims(search, status);
			if (!response.ok) throw new Error(response.message || "Failed to fetch claims");
			return response.data.claims;
		},
	});
}
