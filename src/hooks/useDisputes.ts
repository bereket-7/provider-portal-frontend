import { useQuery } from "@tanstack/react-query";
import { getDisputes } from "@/_service/actions/dispute-actions";

export function useDisputes() {
	return useQuery({
		queryKey: ["disputes"],
		queryFn: async () => {
			const res = await getDisputes();
			if (res.success) {
				return res.data;
			}
			throw new Error(res.message);
		},
	});
}
