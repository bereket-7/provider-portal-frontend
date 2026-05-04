import { useQuery } from "@tanstack/react-query";
import { getEligibilityResponses } from "@/_service/actions/eligibility-actions";

export function useEligibilityResponses() {
	return useQuery({
		queryKey: ["eligibility-responses"],
		queryFn: async () => {
			const response = await getEligibilityResponses();
			if (!response.success) throw new Error(response.message || "Failed to fetch eligibility responses");
			return response.data;
		},
	});
}
