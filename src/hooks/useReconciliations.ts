import { useQuery } from "@tanstack/react-query";
import { getReconciliations, getReconciliation, getReconciliationSummary } from "@/_service/actions/reconciliation-actions";
import { startOfMonth, endOfMonth, format } from "date-fns";

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

export function useReconciliationSummary(dateFrom?: string, dateTo?: string) {
	const start = dateFrom || format(startOfMonth(new Date()), "yyyy-MM-dd");
	const end = dateTo || format(endOfMonth(new Date()), "yyyy-MM-dd");

	return useQuery({
		queryKey: ["reconciliation-summary", start, end],
		queryFn: async () => {
			const response = await getReconciliationSummary(start, end);
			if (!response.ok)
				throw new Error(response.message || "Failed to fetch reconciliation summary");
			return response.data.reconciliationSummary;
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
