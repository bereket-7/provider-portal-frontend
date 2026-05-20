import { useQuery } from "@tanstack/react-query";
import { getDisputes } from "@/_service/actions/dispute-actions";
import { demoGetDisputes } from "@/lib/demo/demo-api";
import { isDemoMode } from "@/lib/demo/demo-mode";
import { useDemoStore } from "@/lib/demo/demo-store-context";

export function useDisputes() {
	const { version } = useDemoStore();
	return useQuery({
		queryKey: ["disputes", isDemoMode() ? version : "api"],
		queryFn: async () => {
			if (isDemoMode()) return demoGetDisputes();
			const res = await getDisputes();
			if (res.success) return res.data;
			throw new Error(res.message);
		},
	});
}
