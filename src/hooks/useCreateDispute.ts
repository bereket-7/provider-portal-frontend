import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDispute, getDisputeStatuses } from "@/_service/actions/dispute-actions";
import { getMembers } from "@/_service/actions/claim-actions";

export function useCreateDispute() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (formData: any) => {
			// 1. Resolve Member UUID
			const membersRes = await getMembers(formData.member_id);
			let memberId = "";
			if (membersRes.ok && membersRes.data?.members?.length > 0) {
				memberId = membersRes.data.members[0].id;
			} else {
				// Fallback to first member if search fails (for simulation purposes)
				const fallbackRes = await getMembers();
				if (fallbackRes.ok && fallbackRes.data?.members?.length > 0) {
					memberId = fallbackRes.data.members[0].id;
				} else {
					throw new Error("Unable to resolve member UUID for submission.");
				}
			}

			// 2. Resolve 'NEW' Status UUID
			const statusRes = await getDisputeStatuses();
			let statusId = "";
			if (statusRes.success && statusRes.data?.length > 0) {
				const newStatus = statusRes.data.find((s: any) => s.code === "NEW" || s.code === "UNDER_REVIEW" || s.code === "PENDING");
				statusId = newStatus ? newStatus.id : statusRes.data[0].id;
			} else {
				throw new Error("Unable to resolve Dispute Status UUID.");
			}

			// 3. Format Input for Backend
			const input = {
				claimNumber: formData.claim_number || null,
				dateOfService: formData.date_of_service,
				description: formData.dispute_description,
				resolutionSought: formData.resolution_sought,
				signature: formData.signature,
				signedAt: formData.signature_date,
			};

			// 4. Submit Mutation
			const res = await createDispute({ memberId, statusId, input });
			if (res.success) {
				return res.data;
			}
			throw new Error(res.message);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["disputes"] });
		},
	});
}
