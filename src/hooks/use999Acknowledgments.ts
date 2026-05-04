import { useQuery } from "@tanstack/react-query";
import { getFunctionalAcknowledgments999 } from "@/_service/actions/status-inquiry-actions";

export function use999Acknowledgments() {
	return useQuery({
		queryKey: ["functionalAcknowledgments999"],
		queryFn: async () => {
			const res = await getFunctionalAcknowledgments999();
			if (res.success) {
				return res.data;
			}
			throw new Error(res.message);
		},
	});
}
