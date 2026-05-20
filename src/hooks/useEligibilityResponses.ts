import { useQuery } from "@tanstack/react-query";
import { getEligibilityResponses } from "@/_service/actions/eligibility-actions";
import { demoGetEligibilityResponses } from "@/lib/demo/demo-api";
import { isDemoMode } from "@/lib/demo/demo-mode";
import { useDemoStore } from "@/lib/demo/demo-store-context";

export function useEligibilityResponses() {
	const { version } = useDemoStore();
	return useQuery({
		queryKey: ["eligibility-responses", isDemoMode() ? version : "api"],
		queryFn: async () => {
			if (isDemoMode()) return demoGetEligibilityResponses();
			const response = await getEligibilityResponses();
			if (!response.success) throw new Error(response.message || "Failed to fetch eligibility responses");
			return response.data;
		},
	});
}
