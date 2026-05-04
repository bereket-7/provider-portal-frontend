import { useQuery } from "@tanstack/react-query";
import { getClaimAcknowledgments } from "@/_service/actions/status-inquiry-actions";

export function useAcknowledgments() {
	return useQuery({
		queryKey: ["claimAcknowledgments"],
		queryFn: async () => {
			const res = await getClaimAcknowledgments();
			if (res.success) {
				return res.data;
			}
			throw new Error(res.message);
		},
	});
}
