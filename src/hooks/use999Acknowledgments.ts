import { useQuery } from "@tanstack/react-query";
import { getFunctionalAcknowledgments999 } from "@/_service/actions/status-inquiry-actions";
import { demoGet999Acknowledgments } from "@/lib/demo/demo-api";
import { isDemoMode } from "@/lib/demo/demo-mode";
import { useDemoStore } from "@/lib/demo/demo-store-context";

export function use999Acknowledgments() {
	const { version } = useDemoStore();
	return useQuery({
		queryKey: ["functionalAcknowledgments999", isDemoMode() ? version : "api"],
		queryFn: async () => {
			if (isDemoMode()) return demoGet999Acknowledgments();
			const res = await getFunctionalAcknowledgments999();
			if (res.success) return res.data;
			throw new Error(res.message);
		},
	});
}
