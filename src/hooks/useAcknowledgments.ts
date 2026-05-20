import { useQuery } from "@tanstack/react-query";
import { getClaimAcknowledgments } from "@/_service/actions/status-inquiry-actions";
import { demoGetAcknowledgments } from "@/lib/demo/demo-api";
import { isDemoMode } from "@/lib/demo/demo-mode";
import { useDemoStore } from "@/lib/demo/demo-store-context";

export function useAcknowledgments() {
	const { version } = useDemoStore();
	return useQuery({
		queryKey: ["claimAcknowledgments", isDemoMode() ? version : "api"],
		queryFn: async () => {
			if (isDemoMode()) return demoGetAcknowledgments();
			const res = await getClaimAcknowledgments();
			if (res.success) return res.data;
			throw new Error(res.message);
		},
	});
}
