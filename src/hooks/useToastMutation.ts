import { type UseMutationResult, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export type APIResponseType = {
	ok: boolean;
	message: string;
	data?: object;
};

type MutationFunctionType<TParams> = (
	_params: TParams
) => Promise<APIResponseType>;

type UseToastMutationOptions<TParams> = {
	// eslint-disable-next-line no-unused-vars
	onSuccess?: (data: APIResponseType, variables: TParams) => void;

	// eslint-disable-next-line no-unused-vars
	onError?: (error: any) => void;
};

export default function useToastMutation<TParams>(
	mutationKey: unknown,
	mutationFn: MutationFunctionType<TParams>,
	loadingMessage?: string,
	options?: UseToastMutationOptions<TParams>
): UseMutationResult<APIResponseType, unknown, TParams, unknown> {
	return useMutation({
		mutationKey: [mutationKey],
		mutationFn: async (params: TParams) => {
			const response = await mutationFn(params);
			if (!response.ok) throw response;
			return response;
		},
		onMutate: () => {
			toast.dismiss();
			toast.loading(loadingMessage || "Loading...");
		},
		onSuccess: (data, variables) => {
			toast.dismiss();
			toast.success(data.message);
			options?.onSuccess?.(data, variables); // Call provided onSuccess if exists
		},
		onError: (error: any) => {
			toast.dismiss();

			const errorData = error?.message;
			console.log("new Error", errorData);

			if (errorData && typeof errorData === "object") {
				Object.entries(errorData).forEach(([field, messages]) => {
					if (Array.isArray(messages)) {
						messages.forEach((message) => {
							console.log("message error ", `${field}: ${message}`);
							toast.error(`${field}: ${message}`);
						});
					} else {
						toast.error(`${field}: ${messages}`);
					}
				});
			} else {
				// Default error message fallback
				const errorMessage = error?.message || "An unexpected error occurred.";
				toast.error(errorMessage);
			}

			options?.onError?.(error);
		},
	});
}
