import { useQuery } from "@tanstack/react-query";
import { getClaimStatusInquiries } from "@/_service/actions/status-inquiry-actions";
import { demoGetStatusInquiries } from "@/lib/demo/demo-api";
import { isDemoMode } from "@/lib/demo/demo-mode";
import { useDemoStore } from "@/lib/demo/demo-store-context";

export function useStatusInquiries() {
	const { version } = useDemoStore();
	return useQuery({
		queryKey: ["claim-status-inquiries", isDemoMode() ? version : "api"],
		queryFn: async () => {
			if (isDemoMode()) return demoGetStatusInquiries();
			const response = await getClaimStatusInquiries();
			if (!response.success) throw new Error(response.message || "Failed to fetch claim status inquiries");
			return response.data;
		},
	});
}
