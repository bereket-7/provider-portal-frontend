import axiosInstance from "./actions/axiosInstance";

export async function graphqlRequest<T = any>(
	query: string,
	variables: Record<string, any> = {}
): Promise<{ ok: boolean; data?: T; message?: string; errors?: any[] }> {
	try {
		const response = await axiosInstance.post("/graphql/", {
			query,
			variables,
		});

		if (response.data.errors) {
			return {
				ok: false,
				errors: response.data.errors,
				message: response.data.errors[0]?.message || "GraphQL Error",
			};
		}

		return {
			ok: true,
			data: response.data.data,
			message: "Success",
		};
	} catch (error: any) {
		const message =
			error.response?.data?.errors?.[0]?.message ||
			error.message ||
			"Network Error";
		return {
			ok: false,
			message,
			errors: error.response?.data?.errors,
		};
	}
}
