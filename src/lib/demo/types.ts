export type ClaimStatus =
	| "DRAFT"
	| "draft"
	| "SUBMITTED"
	| "PENDING"
	| "APPROVED"
	| "REJECTED"
	| "PAID"
	| "837_SUBMITTED";

export interface DemoPatient {
	id: string;
	firstName: string;
	lastName: string;
	birthDate: string;
	mrn: string;
}

export interface DemoMember {
	id: string;
	firstName: string;
	lastName: string;
	payerMemberId: string;
	payerId: string;
	status: "active" | "inactive" | "expired";
	coverageType: string;
	coverageLimit: string;
	deductible: string;
	policyExpiration: string;
	phone?: string;
	email?: string;
}

export interface DemoPayer {
	id: string;
	name: string;
	payerCode: string;
	type: string;
	country: string;
	region: string;
	status: "active" | "inactive";
	contactEmail: string;
	contactPhone: string;
	tier: string;
	network: string;
	logoUrl?: string;
}

export interface DemoClaimLine {
	id: string;
	lineNumber: number;
	serviceDate: string;
	cptCode: string;
	billedAmount: string;
	units: string;
	modifiers?: string;
}

export interface DemoDiagnosis {
	id: string;
	position: number;
	code: string;
	codeType: string;
}

export interface DemoClaim {
	id: string;
	claimNumber: string;
	status: ClaimStatus;
	type: string;
	serviceFrom: string;
	serviceTo: string;
	totalCharges: string;
	totalPaid?: string;
	totalAdjustments?: string;
	submittedAt?: string;
	adjudicatedAt?: string;
	createdAt: string;
	externalId?: string;
	ediStatus?: string;
	billingNpi?: string;
	batchId?: string;
	patientId: string;
	payerId: string;
	patient?: DemoPatient;
	payer?: DemoPayer;
	lines?: DemoClaimLine[];
	diagnoses?: DemoDiagnosis[];
	documents?: { id: string; name: string; type: string }[];
	timeline?: {
		status: string;
		date: string;
		description: string;
		done: boolean;
	}[];
	insuranceMessages?: { date: string; message: string; type: string }[];
	rejectionReason?: string;
	mrn?: string;
}

export interface DemoPriorAuth {
	id: string;
	authorizationNumber: string;
	status: string;
	memberId: string;
	patient: string;
	provider: string;
	type: string;
	service: string;
	startDate: string;
	endDate: string;
	priority: string;
	payerId: string;
	clinicalJustification?: string;
	diagnosisDescription?: string;
	decisionNotes?: string;
	allowedServices?: string;
	limitations?: string;
}

export interface DemoDispute {
	id: string;
	claimNumber?: string;
	claim?: { claimNumber: string };
	member?: { firstName: string; lastName: string };
	description: string;
	createdAt: string;
	status: { code: string; label: string };
	resolution?: string;
	evidence?: { name: string; type: string }[];
	thread?: { author: string; date: string; message: string }[];
}

export interface DemoComplaint {
	id: string;
	type: string;
	claimReference?: string;
	status: string;
	submittedAt: string;
	description: string;
	updates: { date: string; status: string; note: string }[];
	resolution?: string;
}

export interface DemoAgreement {
	id: string;
	payerId: string;
	payerName: string;
	status: "active" | "expired";
	effectiveDate: string;
	expirationDate: string;
	renewalStatus: string;
	coverageRules: string;
	paymentTerms: string;
	reimbursementRules: string;
}

export interface DemoPolicyVersion {
	id: string;
	agreementId: string;
	version: string;
	effectiveDate: string;
	changes: string;
	coveredServices: string[];
	excludedServices: string[];
	preAuthRules: string[];
	pricingRules: { category: string; rule: string }[];
}

export interface DemoReconciliation {
	id: string;
	claimNumber: string;
	patientName: string;
	paidAmount: string;
	status: string;
	paymentDate: string;
}

export interface DemoStatusInquiry {
	id: string;
	claimId: string;
	claimNumber: string;
	responseStatusCode?: string;
	responseStatusCategoryCode?: string;
	createdAt: string;
}

export interface DemoEligibilityResponse {
	id: string;
	eligibilityStatus: string;
	planStatus: string;
	patientName: string;
	createdAt: string;
}

export interface DemoAcknowledgment {
	id: string;
	claimNumber: string;
	status: string;
	createdAt: string;
}

export interface DemoState {
	claims: DemoClaim[];
	patients: DemoPatient[];
	members: DemoMember[];
	payers: DemoPayer[];
	priorAuths: DemoPriorAuth[];
	disputes: DemoDispute[];
	complaints: DemoComplaint[];
	agreements: DemoAgreement[];
	policyVersions: DemoPolicyVersion[];
	reconciliations: DemoReconciliation[];
	statusInquiries: DemoStatusInquiry[];
	eligibilityResponses: DemoEligibilityResponse[];
	acknowledgments: DemoAcknowledgment[];
	ack999: DemoAcknowledgment[];
}
