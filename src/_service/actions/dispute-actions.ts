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
