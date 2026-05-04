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

export async function getClaimAcknowledgments() {
	const query = `
    query GetClaimAcknowledgments {
      claimAcknowledgments {
        id
        acknowledgmentStatus
        statusCategoryCode
        statusCode
        payerClaimNumber
        clearinghouseTraceNumber
        rawEdiContent
        acknowledgedAt
        submissionId
        submissionEdiControlNumber
        submissionClaimNumber
        claimId
        patientName
        payerName
      }
    }
  `;

	const res = await graphqlRequest(query);
	if (res.ok) {
		return { success: true, data: res.data.claimAcknowledgments };
	}
	return { success: false, message: res.message || "Failed to fetch claim acknowledgments" };
}

export async function getFunctionalAcknowledgments999() {
	const query = `
    query GetFunctionalAcknowledgments999 {
      functionalAcknowledgments999 {
        id
        functionalGroupAckCode
        functionalIdentifierCode
        functionalGroupSyntaxErrorCode
        transactionSetsIncluded
        transactionSetsReceived
        transactionSetsAccepted
        interchangeControlNumber
        functionalGroupControlNumber
        errors
        rawEdiContent
        receivedAt
        senderId
        receiverId
        isAccepted
        isRejected
        hasErrors
        errorCount
      }
    }
  `;

	const res = await graphqlRequest(query);
	if (res.ok) {
		return { success: true, data: res.data.functionalAcknowledgments999 };
	}
	return { success: false, message: res.message || "Failed to fetch 999 functional acknowledgments" };
}
