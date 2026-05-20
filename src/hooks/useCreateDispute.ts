import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDispute, getDisputeStatuses } from "@/_service/actions/dispute-actions";
import { getMembers } from "@/_service/actions/claim-actions";
import { demoCreateDispute } from "@/lib/demo/demo-api";
import { isDemoMode } from "@/lib/demo/demo-mode";
import { useDemoStore } from "@/lib/demo/demo-store-context";

export function useCreateDispute() {
	const queryClient = useQueryClient();
	const { bumpVersion } = useDemoStore();

	return useMutation({
		mutationFn: async (formData: any) => {
			if (isDemoMode()) {
				return demoCreateDispute({
					description: formData.dispute_description,
					claimNumber: formData.claim_number,
					memberName: formData.member_name,
				});
			}

			const membersRes = await getMembers(formData.member_id);
			let memberId = "";
			if (membersRes.ok && membersRes.data?.members?.length > 0) {
				memberId = membersRes.data.members[0].id;
			} else {
				const fallbackRes = await getMembers();
				if (fallbackRes.ok && fallbackRes.data?.members?.length > 0) {
					memberId = fallbackRes.data.members[0].id;
				} else {
					throw new Error("Unable to resolve member UUID for submission.");
				}
			}

			const statusRes = await getDisputeStatuses();
			let statusId = "";
			if (statusRes.success && statusRes.data?.length > 0) {
				const newStatus = statusRes.data.find(
					(s: any) =>
						s.code === "NEW" || s.code === "UNDER_REVIEW" || s.code === "PENDING"
				);
				statusId = newStatus ? newStatus.id : statusRes.data[0].id;
			} else {
				throw new Error("Unable to resolve Dispute Status UUID.");
			}

			const input = {
				claimNumber: formData.claim_number || null,
				dateOfService: formData.date_of_service,
				description: formData.dispute_description,
				resolutionSought: formData.resolution_sought,
				signature: formData.signature,
				signedAt: formData.signature_date,
			};

			const res = await createDispute({ memberId, statusId, input });
			if (res.success) return res.data;
			throw new Error(res.message);
		},
		onSuccess: () => {
			if (isDemoMode()) bumpVersion();
			queryClient.invalidateQueries({ queryKey: ["disputes"] });
		},
	});
}
