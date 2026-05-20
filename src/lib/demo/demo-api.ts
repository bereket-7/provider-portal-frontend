import { initialDemoState } from "./fixtures";
import { demoDelay } from "./demo-delay";
import type {
	DemoClaim,
	DemoComplaint,
	DemoDispute,
	DemoPriorAuth,
	DemoState,
} from "./types";

let state: DemoState = JSON.parse(JSON.stringify(initialDemoState));

function uid(prefix: string) {
	return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export function resetDemoState() {
	state = JSON.parse(JSON.stringify(initialDemoState));
}

export function getDemoStateSnapshot(): DemoState {
	return state;
}

function isDraftStatus(status: string) {
	const s = status.toUpperCase();
	return s === "DRAFT" || s === "draft";
}

export async function demoGetClaims(search?: string, status?: string) {
	await demoDelay();
	let list = [...state.claims];
	if (status) {
		const s = status.toLowerCase();
		list = list.filter((c) => c.status.toLowerCase() === s);
	}
	if (search) {
		const q = search.toLowerCase();
		list = list.filter(
			(c) =>
				c.claimNumber?.toLowerCase().includes(q) ||
				c.patient?.firstName?.toLowerCase().includes(q) ||
				c.patient?.lastName?.toLowerCase().includes(q) ||
				c.mrn?.toLowerCase().includes(q)
		);
	}
	return list;
}

export async function demoGetClaim(id: string) {
	await demoDelay();
	return state.claims.find((c) => c.id === id) ?? null;
}

export async function demoGetClaimStats() {
	await demoDelay();
	const submitted = state.claims.filter(
		(c) => !isDraftStatus(c.status)
	).length;
	const pending = state.claims.filter(
		(c) => c.status === "PENDING" || c.status === "SUBMITTED"
	).length;
	const approved = state.claims.filter((c) => c.status === "APPROVED").length;
	const denied = state.claims.filter((c) => c.status === "REJECTED").length;
	const totalDraft = state.claims.filter((c) => isDraftStatus(c.status)).length;
	const approvalRate =
		submitted > 0 ? Math.round((approved / submitted) * 100) : 0;
	return {
		totalSubmitted: submitted,
		pendingReview: pending,
		approved,
		denied,
		totalDraft,
		submittedTrend: "Live Demo",
		pendingTrend: "High Priority",
		approvedTrend: `${approvalRate}% Rate`,
		deniedTrend: "Avoided",
		approvalRate,
		avgProcessingDays: 4.2,
	};
}

export async function demoGetPatients(search?: string) {
	await demoDelay();
	let list = [...state.patients];
	if (search) {
		const q = search.toLowerCase();
		list = list.filter(
			(p) =>
				p.firstName.toLowerCase().includes(q) ||
				p.lastName.toLowerCase().includes(q) ||
				p.mrn.toLowerCase().includes(q)
		);
	}
	return list;
}

export async function demoGetMembers(search?: string, payerId?: string) {
	await demoDelay();
	let list = [...state.members];
	if (payerId) list = list.filter((m) => m.payerId === payerId);
	if (search) {
		const q = search.toLowerCase();
		list = list.filter(
			(m) =>
				m.firstName.toLowerCase().includes(q) ||
				m.lastName.toLowerCase().includes(q) ||
				m.payerMemberId.toLowerCase().includes(q)
		);
	}
	return list;
}

export async function demoGetMember(id: string) {
	await demoDelay();
	return state.members.find((m) => m.id === id) ?? null;
}

export async function demoGetPayers(search?: string) {
	await demoDelay();
	let list = [...state.payers];
	if (search) {
		const q = search.toLowerCase();
		list = list.filter(
			(p) =>
				p.name.toLowerCase().includes(q) ||
				p.payerCode.toLowerCase().includes(q)
		);
	}
	return list;
}

export async function demoGetPayer(id: string) {
	await demoDelay();
	return state.payers.find((p) => p.id === id) ?? null;
}

export async function demoGetPriorAuthorizations(
	status?: string,
	memberId?: string
) {
	await demoDelay();
	let list = [...state.priorAuths];
	if (status) list = list.filter((a) => a.status === status);
	if (memberId) list = list.filter((a) => a.memberId === memberId);
	return list;
}

export async function demoGetPriorAuth(id: string) {
	await demoDelay();
	return state.priorAuths.find((a) => a.id === id) ?? null;
}

export async function demoGetDisputes() {
	await demoDelay();
	return [...state.disputes];
}

export async function demoGetDispute(id: string) {
	await demoDelay();
	return state.disputes.find((d) => d.id === id) ?? null;
}

export async function demoGetComplaints() {
	await demoDelay();
	return [...state.complaints];
}

export async function demoGetComplaint(id: string) {
	await demoDelay();
	return state.complaints.find((c) => c.id === id) ?? null;
}

export async function demoGetAgreements(status?: string) {
	await demoDelay();
	let list = [...state.agreements];
	if (status && status !== "all")
		list = list.filter((a) => a.status === status);
	return list;
}

export async function demoGetAgreement(id: string) {
	await demoDelay();
	return state.agreements.find((a) => a.id === id) ?? null;
}

export async function demoGetPolicyVersions(agreementId?: string) {
	await demoDelay();
	let list = [...state.policyVersions];
	if (agreementId) list = list.filter((p) => p.agreementId === agreementId);
	return list;
}

export async function demoGetReconciliations() {
	await demoDelay();
	return [...state.reconciliations];
}

export async function demoGetReconciliation(id: string) {
	await demoDelay();
	const rec = state.reconciliations.find((r) => r.id === id);
	if (!rec) return null;
	return {
		...rec,
		id,
		claim: { claimNumber: rec.claimNumber },
		patient: { firstName: rec.patientName.split(" ")[0], lastName: rec.patientName.split(" ").slice(1).join(" ") },
	};
}

export async function demoGetReconciliationSummary() {
	await demoDelay();
	const total = state.reconciliations.reduce(
		(acc, r) => acc + parseFloat(r.paidAmount || "0"),
		0
	);
	return {
		totalPaid: total.toFixed(2),
		claimCount: state.reconciliations.length,
		pendingCount: state.reconciliations.filter((r) => r.status === "Pending")
			.length,
	};
}

export async function demoGetStatusInquiries() {
	await demoDelay();
	return [...state.statusInquiries];
}

export async function demoGetEligibilityResponses() {
	await demoDelay();
	return [...state.eligibilityResponses];
}

export async function demoGetAcknowledgments() {
	await demoDelay();
	return [...state.acknowledgments];
}

export async function demoGet999Acknowledgments() {
	await demoDelay();
	return [...state.ack999];
}

export async function demoCreateClaim(input: {
	claimData: Partial<DemoClaim>;
	patientId: string;
	payerId: string;
	lines?: DemoClaim["lines"];
	diagnoses?: DemoClaim["diagnoses"];
	documents?: DemoClaim["documents"];
	status?: string;
}) {
	await demoDelay();
	const patient = state.patients.find((p) => p.id === input.patientId);
	const payer = state.payers.find((p) => p.id === input.payerId);
	const id = uid("clm");
	const claim: DemoClaim = {
		id,
		claimNumber: `CLM-2026-${String(state.claims.length + 1).padStart(3, "0")}`,
		status: (input.status as DemoClaim["status"]) || "DRAFT",
		type: input.claimData.type || "PROFESSIONAL",
		serviceFrom: input.claimData.serviceFrom || new Date().toISOString().split("T")[0],
		serviceTo: input.claimData.serviceTo || new Date().toISOString().split("T")[0],
		totalCharges: input.claimData.totalCharges || "0",
		createdAt: new Date().toISOString(),
		patientId: input.patientId,
		payerId: input.payerId,
		billingNpi: input.claimData.billingNpi || "1234567890",
		patient,
		payer,
		mrn: patient?.mrn,
		lines: input.lines || [],
		diagnoses: input.diagnoses || [],
		documents: input.documents || [],
		timeline: [
			{
				status: "Created",
				date: new Date().toISOString(),
				description: "Claim drafted by provider",
				done: true,
			},
		],
	};
	state.claims.unshift(claim);
	return claim;
}

export async function demoUpdateClaim(id: string, patch: Partial<DemoClaim>) {
	await demoDelay();
	const idx = state.claims.findIndex((c) => c.id === id);
	if (idx === -1) throw new Error("Claim not found");
	state.claims[idx] = { ...state.claims[idx], ...patch };
	return state.claims[idx];
}

export async function demoDeleteClaim(id: string) {
	await demoDelay();
	state.claims = state.claims.filter((c) => c.id !== id);
}

export async function demoSubmitClaim(id: string) {
	await demoDelay();
	const claim = state.claims.find((c) => c.id === id);
	if (!claim) throw new Error("Claim not found");
	claim.status = "837_SUBMITTED";
	claim.ediStatus = "837_submitted";
	claim.submittedAt = new Date().toISOString();
	claim.timeline = [
		...(claim.timeline || []),
		{
			status: "Submitted",
			date: new Date().toISOString(),
			description: "837 transmitted to insurance",
			done: true,
		},
	];
	return { success: true, message: "837 transmitted successfully" };
}

export async function demoSubmitBatch(ids: string[]) {
	await demoDelay();
	const batchId = `BATCH-2026-${String(Math.floor(Math.random() * 9000) + 1000)}`;
	let total = 0;
	const errors: string[] = [];
	for (const id of ids) {
		const claim = state.claims.find((c) => c.id === id);
		if (!claim) {
			errors.push(`Claim ${id} not found`);
			continue;
		}
		if (!isDraftStatus(claim.status)) {
			errors.push(`${claim.claimNumber} is not in draft status`);
			continue;
		}
		claim.status = "SUBMITTED";
		claim.submittedAt = new Date().toISOString();
		claim.batchId = batchId;
		claim.ediStatus = "837_submitted";
		total += parseFloat(claim.totalCharges || "0");
		claim.timeline = [
			...(claim.timeline || []),
			{
				status: "Submitted",
				date: new Date().toISOString(),
				description: `Batch ${batchId} transmitted`,
				done: true,
			},
		];
	}
	return {
		success: errors.length === 0,
		message: `Batch ${batchId}: ${ids.length - errors.length} claims submitted`,
		batchId,
		count: ids.length - errors.length,
		totalAmount: total,
		errors,
	};
}

export async function demoResubmitClaim(id: string) {
	await demoDelay();
	const original = state.claims.find((c) => c.id === id);
	if (!original) throw new Error("Claim not found");
	const copy = await demoCreateClaim({
		claimData: {
			...original,
			status: "DRAFT",
		},
		patientId: original.patientId,
		payerId: original.payerId,
		lines: original.lines,
		diagnoses: original.diagnoses,
		documents: original.documents,
		status: "DRAFT",
	});
	copy.claimNumber = `${original.claimNumber}-R`;
	return copy;
}

export async function demoCreatePriorAuth(
	data: Partial<DemoPriorAuth> & { requested_service?: string; reason_for_request?: string; date_of_service?: string }
) {
	await demoDelay();
	const auth: DemoPriorAuth = {
		id: uid("auth"),
		authorizationNumber: `AUTH-${Math.floor(Math.random() * 9000) + 1000}`,
		status: "PENDING",
		memberId: data.memberId || "mem-001",
		patient: data.patient || "Unknown Patient",
		provider: data.provider || "Dr. Yonatan Girma",
		type: data.type || "Prior Authorization",
		service: data.service || data.requested_service || "Service",
		startDate: data.startDate || data.date_of_service || new Date().toISOString().split("T")[0],
		endDate: data.endDate || new Date().toISOString().split("T")[0],
		priority: data.priority || "Routine",
		payerId: data.payerId || "payer-001",
		clinicalJustification: data.clinicalJustification || data.reason_for_request,
	};
	state.priorAuths.unshift(auth);
	return auth;
}

export async function demoCreateDispute(data: {
	description: string;
	claimNumber?: string;
	memberName?: string;
}) {
	await demoDelay();
	const dispute: DemoDispute = {
		id: uid("disp"),
		claimNumber: data.claimNumber,
		claim: data.claimNumber ? { claimNumber: data.claimNumber } : undefined,
		member: data.memberName
			? {
					firstName: data.memberName.split(" ")[0],
					lastName: data.memberName.split(" ").slice(1).join(" "),
				}
			: { firstName: "Unknown", lastName: "Member" },
		description: data.description,
		createdAt: new Date().toISOString(),
		status: { code: "OPEN", label: "Open" },
		thread: [
			{
				author: "Provider",
				date: new Date().toISOString(),
				message: data.description,
			},
		],
	};
	state.disputes.unshift(dispute);
	return dispute;
}

export async function demoCreateComplaint(data: {
	type: string;
	description: string;
	claimReference?: string;
}) {
	await demoDelay();
	const complaint: DemoComplaint = {
		id: uid("comp"),
		type: data.type,
		claimReference: data.claimReference,
		status: "Open",
		submittedAt: new Date().toISOString(),
		description: data.description,
		updates: [
			{
				date: new Date().toISOString(),
				status: "Submitted",
				note: "Complaint received",
			},
		],
	};
	state.complaints.unshift(complaint);
	return complaint;
}

export async function demoSyncRemittances() {
	await demoDelay();
	return {
		success: true,
		message: "Remittances synced (demo): 2 files processed",
		processedFiles: 2,
	};
}

export async function demoCheckClaimStatus(claimId: string) {
	await demoDelay();
	const claim = state.claims.find((c) => c.id === claimId);
	return {
		success: true,
		data: {
			claimNumber: claim?.claimNumber,
			status: claim?.status,
			ediStatus: claim?.ediStatus,
			message: `Status for ${claim?.claimNumber}: ${claim?.status}`,
		},
	};
}

export async function demoCheckEligibility() {
	await demoDelay();
	return {
		success: true,
		data: {
			id: uid("elig"),
			eligibilityStatus: "1",
			planStatus: "Active",
			details: "Member eligible for date of service",
			createdAt: new Date().toISOString(),
		},
	};
}

export function demoGetOpenDisputeCount() {
	return state.disputes.filter(
		(d) => d.status.code === "OPEN" || d.status.code === "UNDER_REVIEW"
	).length;
}
