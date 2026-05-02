import { useQuery } from "@tanstack/react-query";
import { getPatients } from "@/_service/actions/claim-actions";

export function usePatients(search?: string) {
	return useQuery({
		queryKey: ["patients", search],
		queryFn: async () => {
			const response = await getPatients(search);
			if (!response.ok) throw new Error(response.message || "Failed to fetch patients");
			return response.data.patients;
		},
		enabled: true, // We might want to enable search only after 3 chars later
	});
}
