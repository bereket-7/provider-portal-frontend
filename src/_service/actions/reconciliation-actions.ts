import { graphqlRequest } from "../graphql-request";

export async function getReconciliations(filter?: any) {
	const query = `
    query GetReconciliations($filter: PaymentReconciliationFilterInput) {
      paymentReconciliations(filter: $filter) {
        id
        amount
        reconciliationStatus
        payment835 {
          id
          checkNumber
          payer {
            name
          }
        }
        claimPayment835 {
          id
          claim {
            claimNumber
          }
        }
      }
    }
  `;

	return await graphqlRequest(query, { filter });
}

export async function getReconciliation(id: string) {
	const query = `
    query GetReconciliation($id: ID!) {
      paymentReconciliation(id: $id) {
        id
        amount
        reconciliationStatus
        payment835 {
          id
          checkNumber
          payer {
            name
          }
        }
        claimPayment835 {
          id
          claim {
            id
            claimNumber
          }
        }
        remarks {
          id
          remarkCode
          message
        }
        adjustments {
          id
          adjustmentGroupCode
          adjustmentReasonCode
          adjustmentAmount
        }
      }
    }
  `;

	return await graphqlRequest(query, { id });
}

export async function updateReconciliation(input: any) {
	const mutation = `
    mutation UpdateReconciliation($input: UpdateReconciliationInput!) {
      updateReconciliation(input: $input) {
        id
        reconciliationStatus
      }
    }
  `;

	return await graphqlRequest(mutation, { input });
}
