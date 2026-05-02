import { useQuery } from "@tanstack/react-query";
import { getMembers } from "@/_service/actions/claim-actions";

export function useMembers(search?: string) {
	return useQuery({
		queryKey: ["members", search],
		queryFn: async () => {
			const response = await getMembers(search);
			if (!response.ok) throw new Error(response.message || "Failed to fetch members");
			return response.data.members;
		},
		enabled: true,
	});
}
