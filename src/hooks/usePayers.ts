import { useQuery } from "@tanstack/react-query";
import { getPayers } from "@/_service/actions/claim-actions";

export function usePayers(search?: string) {
	return useQuery({
		queryKey: ["payers", search],
		queryFn: async () => {
			const response = await getPayers(search);
			if (!response.ok) throw new Error(response.message || "Failed to fetch payers");
			return response.data.payers;
		},
		enabled: true,
	});
}
