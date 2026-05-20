import { useQuery } from "@tanstack/react-query";
import {
	demoGetAgreement,
	demoGetAgreements,
	demoGetComplaint,
	demoGetComplaints,
	demoGetMember,
	demoGetPayer,
	demoGetPriorAuth,
	demoGetPolicyVersions,
} from "@/lib/demo/demo-api";
import { isDemoMode } from "@/lib/demo/demo-mode";
import { useDemoStore } from "@/lib/demo/demo-store-context";

export function useDemoAgreements(status?: string) {
	const { version } = useDemoStore();
	return useQuery({
		queryKey: ["agreements", status, version],
		queryFn: () => demoGetAgreements(status),
		enabled: isDemoMode(),
	});
}

export function useDemoAgreement(id: string) {
	const { version } = useDemoStore();
	return useQuery({
		queryKey: ["agreement", id, version],
		queryFn: () => demoGetAgreement(id),
		enabled: isDemoMode() && !!id,
	});
}

export function useDemoPolicyVersions(agreementId?: string) {
	const { version } = useDemoStore();
	return useQuery({
		queryKey: ["policyVersions", agreementId, version],
		queryFn: () => demoGetPolicyVersions(agreementId),
		enabled: isDemoMode(),
	});
}

export function useDemoComplaints() {
	const { version } = useDemoStore();
	return useQuery({
		queryKey: ["complaints", version],
		queryFn: () => demoGetComplaints(),
		enabled: isDemoMode(),
	});
}

export function useDemoComplaint(id: string) {
	const { version } = useDemoStore();
	return useQuery({
		queryKey: ["complaint", id, version],
		queryFn: () => demoGetComplaint(id),
		enabled: isDemoMode() && !!id,
	});
}

export function useDemoMember(id: string) {
	const { version } = useDemoStore();
	return useQuery({
		queryKey: ["member", id, version],
		queryFn: () => demoGetMember(id),
		enabled: isDemoMode() && !!id,
	});
}

export function useDemoPayer(id: string) {
	const { version } = useDemoStore();
	return useQuery({
		queryKey: ["payer", id, version],
		queryFn: () => demoGetPayer(id),
		enabled: isDemoMode() && !!id,
	});
}

export function useDemoPriorAuth(id: string) {
	const { version } = useDemoStore();
	return useQuery({
		queryKey: ["priorAuth", id, version],
		queryFn: () => demoGetPriorAuth(id),
		enabled: isDemoMode() && !!id,
	});
}

export function useDemoDispute(id: string) {
	const { version } = useDemoStore();
	return useQuery({
		queryKey: ["dispute", id, version],
		queryFn: async () => {
			const { demoGetDispute } = await import("@/lib/demo/demo-api");
			return demoGetDispute(id);
		},
		enabled: isDemoMode() && !!id,
	});
}
