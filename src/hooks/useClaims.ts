import { useQuery } from "@tanstack/react-query";
import { getClaims } from "@/_service/actions/claim-actions";

export function useClaims(filter?: any) {
	return useQuery({
		queryKey: ["claims", filter],
		queryFn: async () => {
			const response = await getClaims();
			if (!response.ok) throw new Error(response.message || "Failed to fetch claims");
			return response.data.claims;
		},
	});
}
