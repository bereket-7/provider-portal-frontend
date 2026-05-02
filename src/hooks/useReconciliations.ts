import { useQuery } from "@tanstack/react-query";
import { getReconciliations, getReconciliation } from "@/_service/actions/reconciliation-actions";

export function useReconciliations(filter?: any) {
	return useQuery({
		queryKey: ["reconciliations", filter],
		queryFn: async () => {
			const response = await getReconciliations(filter);
			if (!response.ok) throw new Error(response.message || "Failed to fetch reconciliations");
			return response.data.paymentReconciliations;
		},
	});
}

export function useReconciliation(id: string) {
	return useQuery({
		queryKey: ["reconciliation", id],
		queryFn: async () => {
			const response = await getReconciliation(id);
			if (!response.ok) throw new Error(response.message || "Failed to fetch reconciliation");
			return response.data.paymentReconciliation;
		},
		enabled: !!id,
	});
}
