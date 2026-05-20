import { useQuery } from "@tanstack/react-query";
import { getPriorAuthorizations } from "@/_service/actions/prior-auth-actions";
import { demoGetPriorAuthorizations } from "@/lib/demo/demo-api";
import { isDemoMode } from "@/lib/demo/demo-mode";
import { useDemoStore } from "@/lib/demo/demo-store-context";

export function usePriorAuthorizations(status?: string, memberId?: string) {
	const { version } = useDemoStore();
	return useQuery({
		queryKey: ["priorAuthorizations", status, memberId, isDemoMode() ? version : "api"],
		queryFn: async () => {
			if (isDemoMode()) return demoGetPriorAuthorizations(status, memberId);
			const response = await getPriorAuthorizations(status, memberId);
			if (!response.ok) throw new Error(response.message || "Failed to fetch prior authorizations");
			return response.data.priorAuthorizations;
		},
		enabled: true,
	});
}
