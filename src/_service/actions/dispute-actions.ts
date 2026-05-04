import { graphqlRequest } from "../graphql-request";

export async function getDisputes() {
	const query = `
    query GetDisputes {
      disputes {
        id
        claimNumber
        dateOfService
        description
        resolutionSought
        createdAt
        status {
          code
          label
        }
        member {
          id
          firstName
          lastName
        }
        claim {
          id
          claimNumber
        }
        provider {
          id
          name
        }
      }
    }
  `;

	const res = await graphqlRequest(query);
	if (res.ok) {
		return { success: true, data: res.data.disputes };
	}
	return { success: false, message: res.message || "Failed to fetch disputes" };
}

export async function createDispute(payload: {
	memberId: string;
	statusId: string;
	input: any;
}) {
	const mutation = `
    mutation CreateDispute($memberId: UUID!, $statusId: UUID!, $input: DisputeInput!) {
      createDispute(memberId: $memberId, statusId: $statusId, input: $input) {
        id
        claimNumber
      }
    }
  `;

	const res = await graphqlRequest(mutation, payload);
	if (res.ok) {
		return { success: true, data: res.data.createDispute };
	}
	return { success: false, message: res.message || "Failed to create dispute" };
}

export async function getDisputeStatuses() {
	const query = `
    query GetDisputeStatuses {
      disputeStatuses {
        id
        code
        label
      }
    }
  `;

	const res = await graphqlRequest(query);
	if (res.ok) {
		return { success: true, data: res.data.disputeStatuses };
	}
	return { success: false, message: res.message || "Failed to fetch statuses" };
}
