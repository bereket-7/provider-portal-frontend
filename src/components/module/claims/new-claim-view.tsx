"use client";

import { useState } from "react";

import {
	Calendar,
	CheckCircle,
	ChevronRight,
	Clipboard,
	FilePlus,
	Info,
	Save,
	Send,
	User,
	Plus,
	X,
	AlertCircle,
} from "lucide-react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ModuleHeader } from "@/components/ui/custom/module-header";
import { PremiumButton } from "@/components/ui/custom/premium-button";
import { createComprehensiveClaim } from "@/_service/actions/claim-actions";
import { demoCreateClaim } from "@/lib/demo/demo-api";
import { isDemoMode } from "@/lib/demo/demo-mode";
import { useDemoStore } from "@/lib/demo/demo-store-context";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { usePatients } from "@/hooks/usePatients";
import { useMembers } from "@/hooks/useMembers";
import { usePayers } from "@/hooks/usePayers";
import { SearchableSelect } from "@/components/ui/custom/searchable-select";

const claimSchema = z.object({
	patientName: z.string().min(1, "Patient name is required"),
	mrn: z.string().min(1, "MRN is required"),
	memberId: z.string().min(1, "Member ID is required"),
	dob: z.string().min(1, "Date of birth is required"),
	subscriberId: z.string().min(1, "Subscriber ID/Policy number is required"),
	payerId: z.string().min(1, "Payer is required"),
	serviceFrom: z.string().min(1, "Start date is required"),
	serviceTo: z.string().min(1, "End date is required"),
	billingNpi: z.string().min(10, "NPI must be 10 digits").max(10),
	lines: z
		.array(
			z.object({
				lineNumber: z.number(),
				serviceDate: z.string().min(1, "Required"),
				cptCode: z.string().min(1, "Required"),
				modifiers: z.string().optional(),
				pos: z.string().min(1, "POS is required"),
				pointer1: z.number().min(1, "At least one pointer required"),
				pointer2: z.number().optional(),
				units: z.string().min(1, "Required"),
				billedAmount: z.string().min(1, "Required"),
			})
		)
		.min(1, "At least one service line is required"),
	diagnoses: z
		.array(
			z.object({
				position: z.number(),
				code: z.string().min(1, "Required"),
				codeType: z.enum(["ICD10", "ICD9"]),
			})
		)
		.min(1, "At least one diagnosis is required"),
});

type ClaimFormValues = z.infer<typeof claimSchema>;

export function NewClaimView() {
	const [step, setStep] = useState(1);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [attachedFiles, setAttachedFiles] = useState<string[]>([]);
	const router = useRouter();
	const { bumpVersion } = useDemoStore();
	const [patientSearch, setPatientSearch] = useState("");
	const [memberSearch, setMemberSearch] = useState("");
	const [payerSearch, setPayerSearch] = useState("");

	const { data: patients } = usePatients(patientSearch);
	const { data: members } = useMembers(memberSearch);
	const { data: payers } = usePayers(payerSearch);

	const form = useForm<ClaimFormValues>({
		resolver: zodResolver(claimSchema),
		defaultValues: {
			patientName: "",
			mrn: "",
			memberId: "",
			dob: "",
			subscriberId: "",
			payerId: "",
			serviceFrom: new Date().toISOString().split("T")[0],
			serviceTo: new Date().toISOString().split("T")[0],
			billingNpi: "",
			lines: [
				{
					lineNumber: 1,
					serviceDate: "",
					cptCode: "",
					modifiers: "",
					pos: "11",
					pointer1: 1,
					units: "1",
					billedAmount: "",
				},
			],
			diagnoses: [{ position: 1, code: "", codeType: "ICD10" }],
		},
	});

	const {
		fields: lineFields,
		append: appendLine,
		remove: removeLine,
	} = useFieldArray({
		control: form.control,
		name: "lines",
	});

	const {
		fields: diagFields,
		append: appendDiag,
		remove: removeDiag,
	} = useFieldArray({
		control: form.control,
		name: "diagnoses",
	});

	const buildClaimPayload = (values: ClaimFormValues, status: string) => {
		const totalCharges = values.lines
			.reduce((acc, curr) => acc + parseFloat(curr.billedAmount || "0"), 0)
			.toFixed(2);
		return {
			claimData: {
				serviceFrom: values.serviceFrom,
				serviceTo: values.serviceTo,
				billingNpi: values.billingNpi,
				totalCharges,
				status: status as "DRAFT" | "SUBMITTED",
				type: "PROFESSIONAL",
			},
			patientId: values.memberId,
			payerId: values.payerId,
			lines: values.lines.map((l, i) => ({
				id: `ln-new-${i}`,
				lineNumber: l.lineNumber,
				serviceDate: l.serviceDate,
				cptCode: l.cptCode,
				billedAmount: l.billedAmount,
				units: l.units,
				modifiers: l.modifiers,
			})),
			diagnoses: values.diagnoses.map((d, i) => ({
				id: `dx-new-${i}`,
				position: d.position,
				code: d.code,
				codeType: d.codeType,
			})),
			documents: attachedFiles.map((name, i) => ({
				id: `doc-new-${i}`,
				name,
				type: "attachment",
			})),
			status: status as "DRAFT" | "SUBMITTED",
		};
	};

	const saveDraft = async () => {
		const valid = await form.trigger();
		if (!valid) {
			toast.error("Please fix validation errors before saving");
			return;
		}
		const values = form.getValues();
		const loadingId = toast.loading("Saving draft...");
		setIsSubmitting(true);
		try {
			if (isDemoMode()) {
				const claim = await demoCreateClaim(buildClaimPayload(values, "DRAFT"));
				bumpVersion();
				toast.success(`Draft saved: ${claim.claimNumber}`, { id: loadingId });
				router.push("/claims/drafts");
			} else {
				await onSubmit(values);
			}
		} catch {
			toast.error("Failed to save draft", { id: loadingId });
		} finally {
			setIsSubmitting(false);
		}
	};

	const onSubmit = async (values: ClaimFormValues) => {
		const loadingId = toast.loading("Creating comprehensive claim...");
		setIsSubmitting(true);
		try {
			if (isDemoMode()) {
				const claim = await demoCreateClaim(buildClaimPayload(values, "SUBMITTED"));
				bumpVersion();
				toast.success(`Claim submitted: ${claim.claimNumber}`, { id: loadingId });
				router.push("/claims");
				return;
			}

			const totalCharges = values.lines
				.reduce((acc, curr) => acc + parseFloat(curr.billedAmount || "0"), 0)
				.toFixed(2);

			const input = {
				claimData: {
					serviceFrom: values.serviceFrom,
					serviceTo: values.serviceTo,
					billingNpi: values.billingNpi,
					totalCharges: totalCharges,
					status: "DRAFT",
					type: "PROFESSIONAL",
				},
				providerId: "e039cf14-05ef-4d49-b054-af407d4bd579",
				patientId: values.memberId,
				subscriberId: values.subscriberId,
				payerId: values.payerId,
				claimLines: values.lines.map((l) => ({
					lineData: {
						lineNumber: l.lineNumber,
						serviceDate: l.serviceDate,
						cptCode: l.cptCode,
						cptModifiers: l.modifiers,
						placeOfService: l.pos,
						diagnosisPointer1: l.pointer1,
						diagnosisPointer2: l.pointer2 || null,
						units: l.units,
						billedAmount: l.billedAmount,
					},
				})),
				diagnoses: values.diagnoses.map((d) => ({
					position: d.position,
					code: d.code,
					codeType: d.codeType,
				})),
			};

			const response = await createComprehensiveClaim(input);
			if (response.ok) {
				toast.success("Claim created successfully", { id: loadingId });
				router.push("/claims");
			} else {
				toast.error(response.message || "Failed to create claim", { id: loadingId });
			}
		} catch {
			toast.error("An unexpected error occurred", { id: loadingId });
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleAttachFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
		const names = Array.from(e.target.files || []).map((f) => f.name);
		setAttachedFiles((prev) => [...prev, ...names]);
	};

	const steps = [
		{ id: 1, title: "Patient Info", icon: User },
		{ id: 2, title: "Claim Details", icon: Clipboard },
		{ id: 3, title: "Clinical Info", icon: Info },
		{ id: 4, title: "Review", icon: CheckCircle },
	];

	return (
		<div className="relative space-y-6 pb-12 max-w-[1200px] mx-auto px-4 sm:px-6">
			{/* Sleek Background Elements */}
			<div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
			<div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sky-500/5 rounded-full blur-[100px] pointer-events-none" />

			{/* Refined White Header */}
			<ModuleHeader
				icon={FilePlus}
				title="Submit New Claim"
				subtitle="Portal ID: PRV-2026-001 • Provider Network Team"
				pillColor="bg-emerald-500"
				actions={
					<div className="flex items-center gap-3">
						<Button
							type="button"
							variant="outline"
							disabled={isSubmitting}
							onClick={saveDraft}
							className="rounded-xl px-6 border-border/40 text-xs font-black uppercase tracking-wider hover:bg-primary/5 transition-all"
						>
							<Save className="w-4 h-4 mr-2" />
							Save Draft
						</Button>
						<Button
							type="button"
							disabled={isSubmitting}
							onClick={form.handleSubmit(onSubmit as any)}
							className="rounded-xl px-6 bg-primary text-primary-foreground text-xs font-black uppercase tracking-wider shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
						>
							<Send className="w-4 h-4 mr-2" />
							Submit Claim
						</Button>
					</div>
				}
			/>

			{/* Step Progress */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
				{steps.map((s) => (
					<div
						key={s.id}
						className={`relative group flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 ${
							step === s.id
								? "bg-card border-primary/20 shadow-lg shadow-primary/5"
								: step > s.id
									? "bg-emerald-500/10 border-emerald-500/20 opacity-80"
									: "bg-card/50 border-border/40 opacity-60"
						}`}
						onClick={() => setStep(s.id)}
						role="button"
						tabIndex={0}
					>
						<div
							className={`p-4 rounded-2xl transition-all duration-500 ${
								step === s.id
									? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
									: step > s.id
										? "bg-emerald-500 text-white"
										: "bg-muted text-muted-foreground"
							}`}
						>
							<s.icon className="w-4 h-4" />
						</div>
						<div className="flex flex-col">
							<span
								className={`text-[9px] font-black uppercase tracking-widest ${
									step === s.id ? "text-primary" : "text-muted-foreground"
								}`}
							>
								Step 0{s.id}
							</span>
							<span className="text-sm font-bold text-foreground">
								{s.title}
							</span>
						</div>
						{step > s.id && (
							<CheckCircle className="absolute top-4 right-4 w-4 h-4 text-emerald-500" />
						)}
					</div>
				))}
			</div>

			{/* Main Form Content */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
				<Card className="lg:col-span-2 border-border/40 bg-card rounded-2xl overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
					<CardHeader className="border-b border-border/40 bg-primary/[0.01] p-6">
						<CardTitle className="text-lg font-black tracking-tight">
							{steps.find((s) => s.id === step)?.title}
						</CardTitle>
						<p className="text-xs text-muted-foreground font-medium">
							Please provide accurate information for faster processing.
						</p>
					</CardHeader>
					<CardContent className="p-8 space-y-6">
						{step === 1 && (
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div className="space-y-2">
									<label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
										Select Patient
									</label>
									<SearchableSelect
										options={(patients || []).map((p: any) => ({
											value: p.id,
											label: `${p.firstName} ${p.lastName}`,
										}))}
										value={form.watch("memberId")}
										onSearchChange={setPatientSearch}
										onSelect={(val) => {
											const patient = patients?.find((p: any) => p.id === val);
											if (patient) {
												form.setValue("memberId", patient.id);
												form.setValue("patientName", `${patient.firstName} ${patient.lastName}`);
												form.setValue("mrn", patient.mrn || "");
												if (patient.birthDate) {
													form.setValue("dob", patient.birthDate);
												}
											}
										}}
										placeholder="Search by name or ID..."
									/>
									{form.formState.errors.memberId && (
										<p className="text-[10px] font-bold text-rose-500 mt-1 uppercase tracking-wider">
											Patient is required
										</p>
									)}
								</div>
								<div className="space-y-2">
									<label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
										Policy Number (Subscriber)
									</label>
									<SearchableSelect
										options={(members || []).map((m: any) => ({
											value: m.id,
											label: `${m.firstName} ${m.lastName} (${m.payerMemberId})`,
										}))}
										value={form.watch("subscriberId")}
										onSearchChange={setMemberSearch}
										onSelect={(val) => {
											form.setValue("subscriberId", val);
										}}
										placeholder="Search by name or policy #..."
									/>
									{form.formState.errors.subscriberId && (
										<p className="text-[10px] font-bold text-rose-500 mt-1 uppercase tracking-wider">
											Subscriber is required
										</p>
									)}
								</div>
								<div className="space-y-2">
									<label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
										MRN
									</label>
									<input
										{...form.register("mrn")}
										placeholder="MRN-10001"
										className="w-full px-4 py-2.5 bg-primary/5 border border-border/40 rounded-xl text-xs font-bold"
									/>
								</div>
								<div className="space-y-1.5 opacity-50 grayscale pointer-events-none">
									<label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Patient DOB (Auto-filled)</label>
									<input
										{...form.register("dob")}
										readOnly
										className="w-full px-4 py-2.5 bg-primary/5 border border-border/40 rounded-xl text-xs font-bold"
									/>
								</div>
								<div className="space-y-1.5 opacity-50 grayscale pointer-events-none">
									<label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Patient Name (Auto-filled)</label>
									<input
										{...form.register("patientName")}
										readOnly
										className="w-full px-4 py-2.5 bg-primary/5 border border-border/40 rounded-xl text-xs font-bold"
									/>
								</div>
							</div>
						)}

						{step === 2 && (
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-right-4 duration-500">
								<div className="space-y-2">
									<label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
										Payer (Insurance Company)
									</label>
									<SearchableSelect
										options={(payers || []).map((p: any) => ({
											value: p.id,
											label: `${p.name} (${p.payerCode})`,
										}))}
										value={form.watch("payerId")}
										onSearchChange={setPayerSearch}
										onSelect={(val) => {
											form.setValue("payerId", val);
										}}
										placeholder="Search Ethiopian Insurances..."
									/>
									{form.formState.errors.payerId && (
										<p className="text-[10px] font-bold text-rose-500 mt-1 uppercase tracking-wider">
											Payer is required
										</p>
									)}
								</div>
								<div className="space-y-2">
									<label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
										Billing Provider NPI
									</label>
									<input
										{...form.register("billingNpi")}
										type="text"
										placeholder="e.g. 1928374650"
										className="w-full px-4 py-3 bg-primary/5 border border-border/40 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all font-bold"
									/>
									{form.formState.errors.billingNpi && (
										<p className="text-[10px] font-bold text-rose-500 mt-1 uppercase tracking-wider">
											{form.formState.errors.billingNpi.message}
										</p>
									)}
								</div>
								<div className="space-y-2">
									<label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
										Service From Date
									</label>
									<input
										{...form.register("serviceFrom")}
										type="date"
										className="w-full px-4 py-3 bg-primary/5 border border-border/40 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all font-bold"
									/>
									{form.formState.errors.serviceFrom && (
										<p className="text-[10px] font-bold text-rose-500 mt-1 uppercase tracking-wider">
											{form.formState.errors.serviceFrom.message}
										</p>
									)}
								</div>
								<div className="space-y-2">
									<label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
										Service To Date
									</label>
									<input
										{...form.register("serviceTo")}
										type="date"
										className="w-full px-4 py-3 bg-primary/5 border border-border/40 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all font-bold"
									/>
									{form.formState.errors.serviceTo && (
										<p className="text-[10px] font-bold text-rose-500 mt-1 uppercase tracking-wider">
											{form.formState.errors.serviceTo.message}
										</p>
									)}
								</div>
							</div>
						)}

						{step === 3 && (
							<div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
								{/* Service Lines Section */}
								<div className="space-y-4">
									<div className="flex justify-between items-center group/section">
										<h4 className="text-xs font-black uppercase tracking-[0.2em] text-primary/80">
											Service Lines
										</h4>
										<Button
											type="button"
											variant="outline"
											size="sm"
											onClick={() =>
												appendLine({
													lineNumber: lineFields.length + 1,
													serviceDate: "",
													cptCode: "",
													modifiers: "",
													pos: "11",
													pointer1: 1,
													units: "1",
													billedAmount: "",
												})
											}
											className="h-8 rounded-lg border-primary/20 text-[10px] font-black uppercase tracking-wider hover:bg-primary hover:text-white transition-all shadow-sm"
										>
											<Plus className="w-3 h-3 mr-1.5" />
											Add Line
										</Button>
									</div>
									<div className="space-y-4">
										{lineFields.map((field, index) => (
											<div
												key={field.id}
												className="p-6 rounded-2xl border border-border/40 bg-primary/[0.02] relative group/item hover:border-primary/20 transition-colors"
											>
												<div className="grid grid-cols-1 md:grid-cols-5 gap-4">
													<div className="space-y-2">
														<label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">
															Line #
														</label>
														<input
															{...form.register(`lines.${index}.lineNumber` as const, {
																valueAsNumber: true,
															})}
															className="w-full px-3 py-2 bg-background border border-border/40 rounded-lg text-xs font-black text-primary"
															disabled
														/>
													</div>
													<div className="space-y-2 col-span-2 md:col-span-1">
														<label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">
															Service Date
														</label>
														<input
															{...form.register(`lines.${index}.serviceDate` as const)}
															type="date"
															className="w-full px-3 py-2 bg-background border border-border/40 rounded-lg text-xs font-bold"
														/>
													</div>
													<div className="space-y-2">
														<label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">
															CPT Code
														</label>
														<input
															{...form.register(`lines.${index}.cptCode` as const)}
															placeholder="e.g. 99213"
															className="w-full px-3 py-2 bg-background border border-border/40 rounded-lg text-xs font-bold"
														/>
													</div>
													<div className="space-y-2">
														<label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">
															Units
														</label>
														<input
															{...form.register(`lines.${index}.units` as const)}
															type="number"
															className="w-full px-3 py-2 bg-background border border-border/40 rounded-lg text-xs font-bold"
														/>
													</div>
													<div className="space-y-2">
														<label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">
															Billed Amount
														</label>
														<div className="relative">
															<span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-muted-foreground">
																$
															</span>
															<input
																{...form.register(`lines.${index}.billedAmount` as const)}
																placeholder="0.00"
																className="w-full pl-6 pr-3 py-2 bg-background border border-border/40 rounded-lg text-xs font-black tabular-nums"
															/>
														</div>
													</div>
												</div>

												{/* Clinical Extras Row */}
												<div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 pt-4 border-t border-border/10">
													<div className="space-y-2">
														<label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">
															POS (Place of Service)
														</label>
														<select
															{...form.register(`lines.${index}.pos` as const)}
															className="w-full px-3 py-2 bg-background border border-border/40 rounded-lg text-xs font-bold"
														>
															<option value="11">11 - Office</option>
															<option value="12">12 - Home</option>
															<option value="21">21 - Inpatient Hospital</option>
															<option value="22">22 - Outpatient Hospital</option>
															<option value="23">23 - ER - Hospital</option>
														</select>
													</div>
													<div className="space-y-2">
														<label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">
															Modifiers (e.g. 25)
														</label>
														<input
															{...form.register(`lines.${index}.modifiers` as const)}
															placeholder="e.g. 25, 59"
															className="w-full px-3 py-2 bg-background border border-border/40 rounded-lg text-xs font-bold"
														/>
													</div>
													<div className="space-y-2">
														<label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">
															Diag Pointer 1
														</label>
														<select
															{...form.register(`lines.${index}.pointer1` as const, { valueAsNumber: true })}
															className="w-full px-3 py-2 bg-background border border-border/40 rounded-lg text-xs font-black text-emerald-600"
														>
															{diagFields.map((_, i) => (
																<option key={i} value={i + 1}>
																	{i + 1}
																</option>
															))}
														</select>
													</div>
													<div className="space-y-2">
														<label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">
															Diag Pointer 2
														</label>
														<select
															{...form.register(`lines.${index}.pointer2` as const, { valueAsNumber: true })}
															className="w-full px-3 py-2 bg-background border border-border/40 rounded-lg text-xs font-bold"
														>
															<option value="">None</option>
															{diagFields.map((_, i) => (
																<option key={i} value={i + 1}>
																	{i + 1}
																</option>
															))}
														</select>
													</div>
												</div>
												{index > 0 && (
													<button
														type="button"
														onClick={() => removeLine(index)}
														className="absolute -top-2 -right-2 p-1.5 bg-background border border-border/40 rounded-lg text-rose-500 hover:bg-rose-500 hover:text-white transition-all shadow-sm opacity-0 group-hover/item:opacity-100"
													>
														<X className="w-3 h-3" />
													</button>
												)}
											</div>
										))}
									</div>
									{form.formState.errors.lines && (
										<p className="text-[10px] font-bold text-rose-500 uppercase tracking-wider">
											{form.formState.errors.lines.message}
										</p>
									)}
								</div>

								{/* Diagnoses Section */}
								<div className="space-y-4 pt-4 border-t border-border/40">
									<div className="flex justify-between items-center group/section">
										<h4 className="text-xs font-black uppercase tracking-[0.2em] text-primary/80">
											Diagnoses (ICD-10)
										</h4>
										<Button
											type="button"
											variant="outline"
											size="sm"
											onClick={() =>
												appendDiag({
													position: diagFields.length + 1,
													code: "",
													codeType: "ICD10",
												})
											}
											className="h-8 rounded-lg border-primary/20 text-[10px] font-black uppercase tracking-wider hover:bg-emerald-500 hover:text-white transition-all shadow-sm"
										>
											<Plus className="w-3 h-3 mr-1.5" />
											Add Diagnosis
										</Button>
									</div>
									<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
										{diagFields.map((field, index) => (
											<div
												key={field.id}
												className="p-4 rounded-xl border border-border/40 bg-background relative group/item hover:border-emerald-500/20 transition-all"
											>
												<div className="flex items-center gap-3">
													<div className="w-6 h-6 rounded-lg bg-emerald-500/10 flex items-center justify-center text-[10px] font-black text-emerald-600">
														{index + 1}
													</div>
													<input
														{...form.register(`diagnoses.${index}.code` as const)}
														placeholder="ICD-10 Code"
														className="flex-1 px-3 py-2 bg-primary/5 border border-transparent rounded-lg text-xs font-bold focus:bg-background focus:border-border/40 transition-all"
													/>
												</div>
												{index > 0 && (
													<button
														type="button"
														onClick={() => removeDiag(index)}
														className="absolute top-1/2 -translate-y-1/2 -right-2 p-1.5 bg-background border border-border/40 rounded-lg text-rose-500 hover:bg-rose-500 hover:text-white transition-all shadow-sm opacity-0 group-hover/item:opacity-100"
													>
														<X className="w-3 h-3" />
													</button>
												)}
											</div>
										))}
									</div>
									{form.formState.errors.diagnoses && (
										<p className="text-[10px] font-bold text-rose-500 uppercase tracking-wider">
											{form.formState.errors.diagnoses.message}
										</p>
									)}
								</div>
							</div>
						)}

						{step === 4 && (
							<div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
								<div className="p-8 rounded-2xl bg-primary/[0.02] border-2 border-dashed border-primary/20 flex flex-col items-center text-center space-y-4">
									<div className="p-4 bg-emerald-500/10 rounded-full">
										<CheckCircle className="w-10 h-10 text-emerald-500" />
									</div>
									<div className="space-y-1">
										<h3 className="text-xl font-black tracking-tight italic uppercase">Final Review</h3>
										<p className="text-xs text-muted-foreground font-bold max-w-sm mx-auto uppercase tracking-wider opacity-60">
											Verify all clinical and patient details before generation.
										</p>
									</div>
								</div>

								<div className="p-6 rounded-2xl border border-border/40 bg-muted/20 space-y-4">
									<label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
										Attach Documents (lab, Rx, invoices)
									</label>
									<input
										type="file"
										multiple
										accept=".pdf,.jpg,.jpeg,.png"
										onChange={handleAttachFiles}
										className="text-xs"
									/>
									{attachedFiles.length > 0 && (
										<ul className="space-y-1">
											{attachedFiles.map((f) => (
												<li key={f} className="text-xs font-bold text-foreground">
													{f}
												</li>
											))}
										</ul>
									)}
								</div>

								{/* Structured Review Grid */}
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div className="space-y-4">
										<h4 className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
											<User className="w-3 h-3" />
											Patient & Subscriber
										</h4>
										<div className="p-4 rounded-xl border border-border/40 bg-card space-y-3">
											<div className="flex justify-between">
												<span className="text-[10px] font-bold text-muted-foreground uppercase">Patient</span>
												<span className="text-xs font-black">{form.watch("patientName") || "N/A"}</span>
											</div>
											<div className="flex justify-between">
												<span className="text-[10px] font-bold text-muted-foreground uppercase">DOB</span>
												<span className="text-xs font-black">{form.watch("dob") || "N/A"}</span>
											</div>
											<div className="flex justify-between">
												<span className="text-[10px] font-bold text-muted-foreground uppercase">Member ID</span>
												<span className="text-xs font-black">{form.watch("subscriberId") || "N/A"}</span>
											</div>
										</div>
									</div>

									<div className="space-y-4">
										<h4 className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
											<Clipboard className="w-3 h-3" />
											Insurance Details
										</h4>
										<div className="p-4 rounded-xl border border-border/40 bg-card space-y-3">
											<div className="flex justify-between">
												<span className="text-[10px] font-bold text-muted-foreground uppercase">Payer ID</span>
												<span className="text-xs font-black uppercase">{form.watch("payerId") || "N/A"}</span>
											</div>
											<div className="flex justify-between">
												<span className="text-[10px] font-bold text-muted-foreground uppercase">Billing NPI</span>
												<span className="text-xs font-black">{form.watch("billingNpi") || "N/A"}</span>
											</div>
											<div className="flex justify-between border-t border-border/40 pt-2 mt-2">
												<span className="text-[10px] font-bold text-muted-foreground uppercase">Service Period</span>
												<span className="text-[11px] font-black">{form.watch("serviceFrom")} - {form.watch("serviceTo")}</span>
											</div>
										</div>
									</div>
								</div>

								<div className="p-4 rounded-xl bg-slate-950 text-white flex justify-between items-center px-8 border border-white/10">
									<div className="flex flex-col">
										<span className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em]">Total Claim Value</span>
										<span className="text-2xl font-black tabular-nums tracking-tight">
											ETB {form.watch("lines").reduce((acc, curr) => acc + parseFloat(curr.billedAmount || "0"), 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
										</span>
									</div>
									<div className="text-right">
										<span className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em] block">Volume</span>
										<span className="text-lg font-black">{form.watch("lines").length} Units</span>
									</div>
								</div>
							</div>
						)}

						<div className="pt-6 border-t border-border/40 flex justify-between">
							<PremiumButton
								type="button"
								variant="ghost"
								disabled={step === 1}
								onClick={() => setStep(step - 1)}
								className="px-6"
							>
								<ChevronRight className="w-4 h-4 mr-2 rotate-180" />
								Back
							</PremiumButton>
							
							{step < 4 ? (
								<PremiumButton
									type="button"
									onClick={async () => {
										// Optional: Validate current step fields before proceeding
										const fieldsToValidate = 
											step === 1 ? ["patientName", "memberId", "dob", "subscriberId"] :
											step === 2 ? ["payerId", "billingNpi", "serviceFrom", "serviceTo"] :
											["lines", "diagnoses"];
										
										const isValid = await form.trigger(fieldsToValidate as any);
										if (isValid) setStep(step + 1);
									}}
									icon={ChevronRight}
									iconPosition="right"
									className="w-48"
								>
									Continue
								</PremiumButton>
							) : (
								<PremiumButton
									type="button"
									onClick={form.handleSubmit(onSubmit as any)}
									icon={Send}
									disabled={isSubmitting}
									className={`w-48 bg-primary text-primary-foreground shadow-lg shadow-primary/20 ${isSubmitting ? "opacity-70" : ""}`}
								>
									{isSubmitting ? "Processing..." : "Create Claim"}
								</PremiumButton>
							)}
						</div>
					</CardContent>
				</Card>

				{/* Sidebar/Summary Info */}
				<div className="space-y-6">
					<Card className="border-border/40 bg-card rounded-2xl p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
						<CardTitle className="text-sm font-black uppercase tracking-widest mb-6 border-b border-border/40 pb-4">
							Claim Summary
						</CardTitle>
						<div className="space-y-4">
							{[
								{ label: "Patient", value: form.watch("patientName") || "Un-selected" },
								{ label: "Facility", value: "Tena-Adam Medical Center" },
								{ label: "Total Amount", value: `ETB ${form.watch("lines").reduce((acc, curr) => acc + parseFloat(curr.billedAmount || "0"), 0).toFixed(2)}` },
								{ label: "Currency", value: "ETB" },
							].map((item, i) => (
								<div
									key={i}
									className="flex justify-between items-center group"
								>
									<span className="text-[10px] font-black text-muted-foreground uppercase tracking-wider">
										{item.label}
									</span>
									<span className="text-xs font-bold text-foreground truncate max-w-[150px]">
										{item.value}
									</span>
								</div>
							))}
						</div>
					</Card>

					<Card className="border-none bg-gradient-to-br from-slate-950 to-slate-900 rounded-2xl p-6 relative overflow-hidden">
						<div className="relative z-10 space-y-4 text-slate-50">
							<div className="p-2.5 bg-white/5 rounded-xl w-fit">
								<Info className="w-5 h-5" />
							</div>
							<h3 className="text-lg font-black leading-tight">
								Processing <br /> Guidelines
							</h3>
							<p className="text-[10px] font-bold opacity-60 leading-relaxed">
								Ensure all clinical documentation is attached to avoid delays in
								payout processing. Standard review time is 24-48 hours.
							</p>
							<button className="text-[10px] font-black uppercase tracking-widest text-primary hover:text-primary/80 transition-colors">
								Learn more
							</button>
						</div>
						<div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
					</Card>
				</div>
			</div>
		</div>
	);
}
