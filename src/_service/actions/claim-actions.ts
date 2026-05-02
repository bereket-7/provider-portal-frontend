import { graphqlRequest } from "../graphql-request";

export async function createComprehensiveClaim(input: any) {
	const mutation = `
    mutation CreateComprehensiveClaim($input: ComprehensiveClaimInput!) {
      createComprehensiveClaim(input: $input) {
        id
        claimNumber
        status
      }
    }
  `;

	return await graphqlRequest(mutation, { input });
}

export async function getClaims(filter?: any) {
	const query = `
    query GetClaims($filter: ClaimFilterInput) {
      claims(filter: $filter) {
        id
        claimNumber
        patient {
          id
          firstName
          lastName
        }
        status
        totalCharges
        serviceFrom
        type
      }
    }
  `;

	return await graphqlRequest(query, { filter });
}

export async function getClaim(id: string) {
	const query = `
    query GetClaim($id: ID!) {
      claim(id: $id) {
        id
        claimNumber
        status
        type
        serviceFrom
        serviceTo
        totalCharges
        totalPaid
        totalAdjustments
        patient {
          id
          firstName
          lastName
          birthDate
        }
        payer {
          id
          name
          payerCode
        }
        lines {
          id
          lineNumber
          serviceDate
          cptCode
          billedAmount
          units
        }
        diagnoses {
          id
          position
          code
        }
      }
    }
  `;

	return await graphqlRequest(query, { id });
}

export async function submitClaimToInsurance(id: string) {
	const mutation = `
    mutation SubmitClaimToInsurance($claimId: ID!) {
      submitClaimToInsurance(claimId: $claimId) {
        success
        message
      }
    }
  `;

	return await graphqlRequest(mutation, { claimId: id });
}
