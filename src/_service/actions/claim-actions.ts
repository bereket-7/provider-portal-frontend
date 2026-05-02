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

export async function getPatients(search?: string) {
	const query = `
    query GetPatients($search: String) {
      patients(search: $search) {
        id
        firstName
        lastName
        birthDate
        gender
      }
    }
  `;
	return await graphqlRequest(query, { search });
}

export async function getMembers(search?: string) {
	const query = `
    query GetMembers($search: String) {
      members(search: $search) {
        id
        firstName
        lastName
        payerMemberId
      }
    }
  `;
	return await graphqlRequest(query, { search });
}

export async function getPayers(search?: string) {
	const query = `
    query GetPayers($search: String) {
      payers(search: $search) {
        id
        name
        payerCode
      }
    }
  `;
	return await graphqlRequest(query, { search });
}

export async function getClaims(search?: string, status?: string) {
	const query = `
    query GetClaims($search: String, $status: String) {
      claims(search: $search, status: $status) {
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

	return await graphqlRequest(query, { search, status });
}

export async function getClaim(id: string) {
	const query = `
    query GetClaim($id: String!) {
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
        ediStatus
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
    mutation SubmitClaimToInsurance($id: String!) {
      submitClaimToInsurance(id: $id) {
        success
        message
      }
    }
  `;

	return await graphqlRequest(mutation, { id });
}
