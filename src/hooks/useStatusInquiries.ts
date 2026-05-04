import { useQuery } from "@tanstack/react-query";
import { getClaimStatusInquiries } from "@/_service/actions/status-inquiry-actions";

export function useStatusInquiries() {
	return useQuery({
		queryKey: ["claim-status-inquiries"],
		queryFn: async () => {
			const response = await getClaimStatusInquiries();
			if (!response.success) throw new Error(response.message || "Failed to fetch claim status inquiries");
			return response.data;
		},
	});
}
