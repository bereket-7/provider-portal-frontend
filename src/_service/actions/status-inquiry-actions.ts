import { graphqlRequest } from "../graphql-request";

export async function checkClaimStatus(claimId: string, providerId: string) {
	const mutation = `
    mutation CheckClaimStatus($claimId: ID!, $providerId: ID!) {
      checkClaimStatus(claimId: $claimId, providerId: $providerId) {
        id
        ediControlNumber
        inquiryLevelCode
        requestDate
        responseDate
        responseStatusCategoryCode
        responseStatusCode
        rawEdiContent
      }
    }
  `;

	const res = await graphqlRequest(mutation, { claimId, providerId });
	if (res.ok) {
		return { success: true, data: res.data.checkClaimStatus };
	}
	return { success: false, message: res.message || "Failed to check claim status" };
}

export async function getClaimStatusInquiries() {
	const query = `
    query GetClaimStatusInquiries {
      claimStatusInquiries {
        id
        ediControlNumber
        inquiryLevelCode
        requestDate
        responseDate
        responseStatusCategoryCode
        responseStatusCode
        rawEdiContent
      }
    }
  `;

	const res = await graphqlRequest(query);
	if (res.ok) {
		return { success: true, data: res.data.claimStatusInquiries };
	}
	return { success: false, message: res.message || "Failed to fetch claim status inquiries" };
}
