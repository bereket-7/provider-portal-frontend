import { useQuery } from "@tanstack/react-query";
import { getPayers } from "@/_service/actions/claim-actions";
import { demoGetPayers } from "@/lib/demo/demo-api";
import { isDemoMode } from "@/lib/demo/demo-mode";
import { useDemoStore } from "@/lib/demo/demo-store-context";

export function usePayers(search?: string) {
	const { version } = useDemoStore();
	return useQuery({
		queryKey: ["payers", search, isDemoMode() ? version : "api"],
		queryFn: async () => {
			if (isDemoMode()) return demoGetPayers(search);
			const response = await getPayers(search);
			if (!response.ok) throw new Error(response.message || "Failed to fetch payers");
			return response.data.payers;
		},
		enabled: true,
	});
}
