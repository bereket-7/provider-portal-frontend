import { graphqlRequest } from "../graphql-request";

export async function checkEligibility(input: {
	providerId: string;
	payerId: string;
	patientId: string;
	serviceTypeCode?: string;
	dateOfService?: string;
}) {
	const mutation = `
    mutation CheckEligibility($input: CheckEligibilityInput!) {
      checkEligibility(input: $input) {
        id
        eligibilityStatus
        planStatus
        details
        rawEdiContent
        createdAt
      }
    }
  `;

	const res = await graphqlRequest(mutation, { input });
	if (res.ok) {
		return { success: true, data: res.data.checkEligibility };
	}
	return { success: false, message: res.message || "Failed to check eligibility" };
}
