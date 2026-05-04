import { graphqlRequest } from "../graphql-request";

export async function getPriorAuthorizations(status?: string, memberId?: string) {
	const query = `
    query GetPriorAuthorizations($status: String, $memberId: Int) {
      priorAuthorizations(status: $status, memberId: $memberId) {
        id
        authorizationNumber
        status
        member {
          id
          firstName
          lastName
        }
      }
    }
  `;
	return await graphqlRequest(query, { status, memberId });
}
