import { useQuery } from "@tanstack/react-query";
import { getPriorAuthorizations } from "@/_service/actions/prior-auth-actions";

export function usePriorAuthorizations(status?: string, memberId?: string) {
	return useQuery({
		queryKey: ["priorAuthorizations", status, memberId],
		queryFn: async () => {
			const response = await getPriorAuthorizations(status, memberId);
			if (!response.ok) throw new Error(response.message || "Failed to fetch prior authorizations");
			return response.data.priorAuthorizations;
		},
		enabled: true,
	});
}
