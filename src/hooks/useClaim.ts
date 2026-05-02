import { useQuery } from "@tanstack/react-query";
import { getClaim } from "@/_service/actions/claim-actions";

export function useClaim(id: string) {
	return useQuery({
		queryKey: ["claim", id],
		queryFn: async () => {
			const response = await getClaim(id);
			if (!response.ok) throw new Error(response.message || "Failed to fetch claim");
			return response.data.claim;
		},
		enabled: !!id,
	});
}
