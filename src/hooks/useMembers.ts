import { useQuery } from "@tanstack/react-query";
import { getMembers } from "@/_service/actions/claim-actions";
import { demoGetMembers } from "@/lib/demo/demo-api";
import { isDemoMode } from "@/lib/demo/demo-mode";
import { useDemoStore } from "@/lib/demo/demo-store-context";

export function useMembers(search?: string, payerId?: string) {
	const { version } = useDemoStore();
	return useQuery({
		queryKey: ["members", search, payerId, isDemoMode() ? version : "api"],
		queryFn: async () => {
			if (isDemoMode()) return demoGetMembers(search, payerId);
			const response = await getMembers(search);
			if (!response.ok) throw new Error(response.message || "Failed to fetch members");
			return response.data.members;
		},
		enabled: true,
	});
}
