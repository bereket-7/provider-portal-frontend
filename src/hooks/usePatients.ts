import { useQuery } from "@tanstack/react-query";
import { getPatients } from "@/_service/actions/claim-actions";
import { demoGetPatients } from "@/lib/demo/demo-api";
import { isDemoMode } from "@/lib/demo/demo-mode";
import { useDemoStore } from "@/lib/demo/demo-store-context";

export function usePatients(search?: string) {
	const { version } = useDemoStore();
	return useQuery({
		queryKey: ["patients", search, isDemoMode() ? version : "api"],
		queryFn: async () => {
			if (isDemoMode()) return demoGetPatients(search);
			const response = await getPatients(search);
			if (!response.ok) throw new Error(response.message || "Failed to fetch patients");
			return response.data.patients;
		},
		enabled: true,
	});
}
