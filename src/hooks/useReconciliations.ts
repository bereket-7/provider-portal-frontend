import { useQuery } from "@tanstack/react-query";
import { getReconciliations, getReconciliation, getReconciliationSummary } from "@/_service/actions/reconciliation-actions";
import {
	demoGetReconciliation,
	demoGetReconciliationSummary,
	demoGetReconciliations,
} from "@/lib/demo/demo-api";
import { isDemoMode } from "@/lib/demo/demo-mode";
import { useDemoStore } from "@/lib/demo/demo-store-context";
import { startOfMonth, endOfMonth, format } from "date-fns";

export function useReconciliations(filter?: any) {
	const { version } = useDemoStore();
	return useQuery({
		queryKey: ["reconciliations", filter, isDemoMode() ? version : "api"],
		queryFn: async () => {
			if (isDemoMode()) return demoGetReconciliations();
			const response = await getReconciliations(filter);
			if (!response.ok) throw new Error(response.message || "Failed to fetch reconciliations");
			return response.data.paymentReconciliations;
		},
	});
}

export function useReconciliationSummary(dateFrom?: string, dateTo?: string) {
	const { version } = useDemoStore();
	const start = dateFrom || format(startOfMonth(new Date()), "yyyy-MM-dd");
	const end = dateTo || format(endOfMonth(new Date()), "yyyy-MM-dd");

	return useQuery({
		queryKey: ["reconciliation-summary", start, end, isDemoMode() ? version : "api"],
		queryFn: async () => {
			if (isDemoMode()) return demoGetReconciliationSummary();
			const response = await getReconciliationSummary(start, end);
			if (!response.ok)
				throw new Error(response.message || "Failed to fetch reconciliation summary");
			return response.data.reconciliationSummary;
		},
	});
}

export function useReconciliation(id: string) {
	const { version } = useDemoStore();
	return useQuery({
		queryKey: ["reconciliation", id, isDemoMode() ? version : "api"],
		queryFn: async () => {
			if (isDemoMode()) {
				const rec = await demoGetReconciliation(id);
				if (!rec) throw new Error("Reconciliation not found");
				return rec;
			}
			const response = await getReconciliation(id);
			if (!response.ok) throw new Error(response.message || "Failed to fetch reconciliation");
			return response.data.paymentReconciliation;
		},
		enabled: !!id,
	});
}
