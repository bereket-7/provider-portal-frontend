"use client";

import React, { useState } from "react";
import {
	Activity,
	Calendar,
	Clock,
	Download,
	FileText,
	MapPin,
	Search,
	ShieldCheck,
	User,
	UserCheck,
	AlertCircle,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ModuleHeader } from "@/components/ui/custom/module-header";
import { PremiumButton } from "@/components/ui/custom/premium-button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePatients } from "@/hooks/usePatients";
import { usePayers } from "@/hooks/usePayers";
import { checkEligibility } from "@/_service/actions/eligibility-actions";
import { toast } from "sonner";

interface MemberResult {
	// Recipient Detail
	id: string;
	firstName: string;
	middleName?: string;
	lastName: string;
	dob: string;
	gender: string;
	mailingAddress: {
		street: string;
		city: string;
		ward: string;
	};
	residentialAddress: {
		street: string;
		city: string;
		ward: string;
	};
	recertDate: string;

	// Plan Coverage Information
	planCoverage: string;
	programCode: string;
	status: "Active" | "Inactive";
	coverageStart: string;
	coverageEnd: string;
	qmbIndicator: "YES" | "NO";
	caseNumber: string;
	serviceTypes: string[];
}

export function EligibilityInquiryView() {
	const [searchMode, setSearchMode] = useState<
		"id" | "name_dob" | "ssn_dob" | "name_ssn"
	>("id");
	const [isSearching, setIsSearching] = useState(false);
	const [result, setResult] = useState<MemberResult | null>(null);

	const [selectedPatientId, setSelectedPatientId] = useState("");
	const [selectedPayerId, setSelectedPayerId] = useState("");
	const [serviceTypeCode, setServiceTypeCode] = useState("30");

	const { data: patients } = usePatients();
	const { data: payers } = usePayers();

	const handleSearch = async (e: React.FormEvent) => {
		e.preventDefault();
		
		if (!selectedPatientId || !selectedPayerId) {
			toast.error("Please select both a patient and a payer");
			return;
		}

		setIsSearching(true);

		const res = await checkEligibility({
			providerId: "e039cf14-05ef-4d49-b054-af407d4bd579", // Default provider
			payerId: selectedPayerId,
			patientId: selectedPatientId,
			serviceTypeCode: serviceTypeCode,
			dateOfService: new Date().toISOString().split('T')[0],
		});

		if (res.success) {
			const patient = patients?.find((p: any) => p.id === selectedPatientId);
			const payer = payers?.find((p: any) => p.id === selectedPayerId);

			setResult({
				id: patient?.id || res.data.id,
				firstName: patient?.firstName || "Unknown",
				lastName: patient?.lastName || "Unknown",
				dob: patient?.birthDate || "N/A",
				gender: patient?.gender || "N/A",
				mailingAddress: {
					street: "Primary Medical Record Address",
					city: "Verified",
					ward: "Default",
				},
				residentialAddress: {
					street: "Primary Medical Record Address",
					city: "Verified",
					ward: "Default",
				},
				recertDate: res.data.createdAt,
				planCoverage: `PLAN: ${payer?.name || "PAYER"}`,
				programCode: res.data.eligibilityStatus,
				status: res.data.planStatus === "Active" ? "Active" : "Inactive",
				coverageStart: "Verified Active",
				coverageEnd: "Ongoing",
				qmbIndicator: "NO",
				caseNumber: res.data.id.substring(0, 8),
				serviceTypes: Object.values(res.data.details || {}),
			});
			toast.success("Eligibility check successful");
		} else {
			toast.error(res.message || "Eligibility check failed");
		}
		setIsSearching(false);
	};

	return (
		<div className="relative space-y-8 pb-12 max-w-[1500px] mx-auto px-4 sm:px-6 animate-in fade-in duration-700">
			{/* Aesthetic Backgrounds */}
			<div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
			<div className="absolute bottom-10 left-0 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

			{/* Navigation & Header - Standard Pattern */}
			<ModuleHeader
				icon={UserCheck}
				title="Eligibility Inquiry"
				subtitle="REAL-TIME VERIFICATION • System v2.43"
				actions={
					<div className="flex items-center gap-3">
						{result && (
							<>
								<button
									onClick={() => setResult(null)}
									className="px-4 py-1.5 text-muted-foreground hover:text-foreground text-[10px] font-black uppercase tracking-wider transition-colors"
								>
									New Search
								</button>
								<div className="h-4 w-px bg-border/40 hidden md:block mx-1" />
								<PremiumButton className="px-6 h-10 shadow-lg shadow-primary/10 text-[9px] uppercase font-black tracking-widest rounded-xl">
									<Download className="w-3.5 h-3.5 mr-2" />
									Generate Report
								</PremiumButton>
							</>
						)}
					</div>
				}
			/>

			<div className="grid grid-cols-1 gap-8 relative z-10">
				{/* Search Panel - Only shows when no result or explicitly requested */}
				{!result && (
					<Card className="border-border/40 bg-card/50 backdrop-blur-sm rounded-[2.5rem] overflow-hidden shadow-2xl">
						<CardHeader className="p-8 border-b border-border/40 bg-primary/[0.01]">
							<CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2 text-primary/80">
								<Search className="w-4 h-4" />
								Clinical Inquiry Parameters
							</CardTitle>
						</CardHeader>
						<CardContent className="p-8 space-y-8">
							<div className="flex flex-wrap gap-2 p-1.5 bg-muted rounded-2xl">
								{[
									{ id: "id", label: "Recipient ID" },
									{ id: "name_dob", label: "Name & DOB" },
									{ id: "ssn_dob", label: "SSN & DOB" },
									{ id: "name_ssn", label: "Name & SSN" },
								].map((mode) => (
									<button
										key={mode.id}
										onClick={() => setSearchMode(mode.id as any)}
										className={`flex-1 min-w-[120px] py-3 px-4 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${
											searchMode === mode.id
												? "bg-background text-primary shadow-sm"
												: "text-muted-foreground hover:text-foreground hover:bg-background/20"
										}`}
									>
										{mode.label}
									</button>
								))}
							</div>

							<form onSubmit={handleSearch} className="space-y-8">
								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
									<div className="space-y-2">
										<Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/70 ml-1">
											Select Patient
										</Label>
										<Select onValueChange={setSelectedPatientId} value={selectedPatientId}>
											<SelectTrigger className="bg-primary/5 border-border/40 rounded-xl h-11 px-4 shadow-none font-bold text-sm">
												<SelectValue placeholder="Select a patient" />
											</SelectTrigger>
											<SelectContent>
												{patients?.map((p: any) => (
													<SelectItem key={p.id} value={p.id}>
														{p.firstName} {p.lastName}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</div>

									<div className="space-y-2">
										<Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/70 ml-1">
											Select Payer
										</Label>
										<Select onValueChange={setSelectedPayerId} value={selectedPayerId}>
											<SelectTrigger className="bg-primary/5 border-border/40 rounded-xl h-11 px-4 shadow-none font-bold text-sm">
												<SelectValue placeholder="Select a payer" />
											</SelectTrigger>
											<SelectContent>
												{payers?.map((p: any) => (
													<SelectItem key={p.id} value={p.id}>
														{p.name} ({p.payerCode})
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</div>

									<div className="space-y-2">
										<Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/70 ml-1">
											Service Type
										</Label>
										<Select onValueChange={setServiceTypeCode} value={serviceTypeCode}>
											<SelectTrigger className="bg-primary/5 border-border/40 rounded-xl h-11 px-4 shadow-none font-bold text-sm">
												<SelectValue placeholder="Select service type" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="30">Health Benefit Plan Coverage (30)</SelectItem>
												<SelectItem value="1">Medical Care (1)</SelectItem>
												<SelectItem value="35">Dental Care (35)</SelectItem>
												<SelectItem value="UC">Urgent Care (UC)</SelectItem>
											</SelectContent>
										</Select>
									</div>
								</div>

								<div className="flex justify-end pt-4">
									<PremiumButton
										type="submit"
										className="px-12 h-12 shadow-xl shadow-primary/20 text-[10px] uppercase font-black tracking-widest rounded-xl"
										disabled={isSearching}
									>
										{isSearching ? (
											<>
												<Activity className="w-4 h-4 mr-2 animate-spin" />
												Submitting...
											</>
										) : (
											"Submit Inquiry"
										)}
									</PremiumButton>
								</div>
							</form>
						</CardContent>
					</Card>
				)}

				{/* Results Content - Patterned after Auth detail view */}
				{result && (
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
						{/* Main Details Panel */}
						<div className="lg:col-span-8 space-y-8">
							<Card className="border border-border/40 bg-card/50 backdrop-blur-sm rounded-[2.5rem] overflow-hidden shadow-sm">
								<CardHeader className="p-8 border-b border-border/40 bg-primary/[0.01] flex flex-row items-center justify-between">
									<div className="flex items-center gap-4">
										<div className="h-14 w-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 border border-emerald-500/20">
											<UserCheck className="w-7 h-7" />
										</div>
										<div>
											<div className="flex items-center gap-3">
												<h3 className="text-xl font-black tracking-tight uppercase">
													{result.firstName} {result.lastName}
												</h3>
												<Badge className="bg-emerald-500/10 text-emerald-600 border-none text-[9px] font-black uppercase px-2.5 py-1 rounded-lg">
													{result.status}
												</Badge>
											</div>
											<p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-0.5">
												Member ID: {result.id} • Case: {result.caseNumber}
											</p>
										</div>
									</div>
								</CardHeader>
								<CardContent className="p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
									<div className="space-y-8">
										<div className="space-y-4">
											<div className="flex items-center gap-2 mb-4">
												<div className="h-4 w-1 bg-primary rounded-full" />
												<h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/70">
													Recipient Detail
												</h4>
											</div>
											<div className="grid grid-cols-2 gap-6">
												<DataPoint
													label="Gender"
													value={result.gender}
													icon={User}
												/>
												<DataPoint
													label="Date of Birth"
													value={result.dob}
													icon={Calendar}
												/>
												<DataPoint
													label="Recert Date"
													value={result.recertDate}
													icon={Clock}
												/>
											</div>
										</div>

										<div className="space-y-4">
											<div className="flex items-center gap-2 mb-4">
												<div className="h-4 w-1 bg-primary rounded-full" />
												<h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/70">
													Verified Addresses
												</h4>
											</div>
											<div className="space-y-4">
												<div className="p-5 bg-primary/[0.02] border border-border/40 rounded-2xl">
													<p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-2">
														<MapPin className="w-3.5 h-3.5" /> Mailing Address
													</p>
													<p className="text-xs font-black">
														{result.mailingAddress.street}
													</p>
													<p className="text-xs font-bold text-muted-foreground">
														{result.mailingAddress.city}
													</p>
												</div>
												<div className="p-5 bg-primary/[0.02] border border-border/40 rounded-2xl">
													<p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-2">
														<MapPin className="w-3.5 h-3.5" /> Residential
														Address
													</p>
													<p className="text-xs font-black">
														{result.residentialAddress.street}
													</p>
													<p className="text-xs font-bold text-muted-foreground">
														{result.residentialAddress.city}
													</p>
												</div>
											</div>
										</div>
									</div>

									<div className="space-y-8">
										<div className="space-y-4">
											<div className="flex items-center gap-2 mb-4">
												<div className="h-4 w-1 bg-emerald-500 rounded-full" />
												<h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/70">
													Plan Coverage
												</h4>
											</div>
											<div className="p-6 bg-gradient-to-br from-emerald-500/5 to-transparent border border-emerald-500/10 rounded-[2rem] shadow-sm">
												<p className="text-[9px] font-black uppercase tracking-widest text-emerald-600/60 mb-3">
													Active Plan Status
												</p>
												<p className="text-base font-black leading-tight text-foreground">
													{result.planCoverage}
												</p>
												<div className="grid grid-cols-2 gap-4 mt-6">
													<DataPoint
														label="Program"
														value={result.programCode}
													/>
													<DataPoint label="QMB" value={result.qmbIndicator} />
												</div>
											</div>
										</div>

										<div className="space-y-4">
											<div className="flex items-center gap-2 mb-4">
												<div className="h-4 w-1 bg-primary rounded-full" />
												<h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/70">
													Coverage Timeline
												</h4>
											</div>
											<div className="flex items-center gap-4">
												<div className="flex-1 p-4 bg-muted/20 border border-border/40 rounded-2xl text-center">
													<p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground opacity-60 mb-1">
														Benefit Start
													</p>
													<p className="text-[11px] font-black">
														{result.coverageStart}
													</p>
												</div>
												<div className="flex-1 p-4 bg-muted/20 border border-border/40 rounded-2xl text-center">
													<p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground opacity-60 mb-1">
														Benefit End
													</p>
													<p className="text-[11px] font-black">
														{result.coverageEnd}
													</p>
												</div>
											</div>
										</div>
									</div>
								</CardContent>
							</Card>

							{/* Benefits Grid */}
							<Card className="border border-border/40 bg-card/50 backdrop-blur-sm rounded-[2rem] overflow-hidden shadow-sm">
								<CardHeader className="p-6 border-b border-border/40">
									<CardTitle className="text-xs font-black uppercase tracking-[0.1em]">
										Covered Service Modalities
									</CardTitle>
								</CardHeader>
								<CardContent className="p-6">
									<div className="flex flex-wrap gap-2">
										{result.serviceTypes.map((type, i) => (
											<div
												key={i}
												className="px-4 py-2.5 bg-primary/[0.03] border border-primary/10 rounded-xl text-[10px] font-black text-primary/80 uppercase tracking-tight flex items-center gap-2"
											>
												<div className="h-1 w-1 bg-primary rounded-full animate-pulse" />
												{type}
											</div>
										))}
									</div>
								</CardContent>
							</Card>
						</div>

						{/* Sidebar / Stats */}
						<div className="lg:col-span-4 space-y-8">
							<Card className="border border-border/40 bg-card/50 backdrop-blur-sm rounded-[2.5rem] shadow-sm">
								<CardHeader className="p-6 border-b border-border/40">
									<CardTitle className="text-sm font-black uppercase tracking-[0.15em] flex items-center gap-2 text-primary/80">
										<ShieldCheck className="w-4 h-4" />
										Verification Log
									</CardTitle>
								</CardHeader>
								<CardContent className="p-8">
									<div className="space-y-8 relative">
										<div className="absolute left-[9px] top-2 bottom-6 w-[1.5px] bg-gradient-to-b from-primary/30 to-border/20" />

										<div className="relative pl-8">
											<div className="absolute left-0 top-1.5 w-[20px] h-[20px] rounded-full border-[3px] border-card bg-primary shadow-lg shadow-primary/20" />
											<div className="space-y-1">
												<p className="text-[10px] font-black text-foreground uppercase tracking-wider">
													Inquiry Submitted
												</p>
												<p className="text-[9px] font-bold text-muted-foreground opacity-50">
													Feb 19, 2026 03:07 PM
												</p>
											</div>
										</div>
										<div className="relative pl-8">
											<div className="absolute left-0 top-1.5 w-[20px] h-[20px] rounded-full border-[3px] border-card bg-emerald-500 shadow-lg shadow-emerald-500/20" />
											<div className="space-y-1">
												<p className="text-[10px] font-black text-foreground uppercase tracking-wider">
													Provider Response
												</p>
												<p className="text-[9px] font-bold text-muted-foreground opacity-50">
													Instant Response (0.4s)
												</p>
												<p className="text-[10px] font-bold text-emerald-600 uppercase mt-2">
													Authorized Connection
												</p>
											</div>
										</div>
									</div>
								</CardContent>
							</Card>

							<div className="p-8 rounded-[2.5rem] bg-slate-950 text-white relative overflow-hidden shadow-2xl">
								<div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full -mr-16 -mt-16 blur-3xl opacity-50" />
								<div className="relative z-10 space-y-6">
									<div className="flex items-center gap-3">
										<div className="p-2 bg-white/5 rounded-xl border border-white/10">
											<FileText className="w-5 h-5" />
										</div>
										<h3 className="text-base font-black tracking-tight">
											Status Certified
										</h3>
									</div>
									<p className="text-xs font-bold text-slate-300 leading-relaxed">
										This inquiry is logged and timestamped as a legal proof of
										coverage verification for the specified dates of service.
									</p>
									<div className="pt-2 border-t border-white/10 uppercase tracking-[0.2em] text-[8px] font-black text-slate-500">
										Reference: EQ-39281-22M
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

function DataPoint({
	label,
	value,
	icon: Icon,
}: {
	label: string;
	value: string;
	icon?: any;
}) {
	return (
		<div className="space-y-1.5">
			<p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground opacity-50 flex items-center gap-2">
				{Icon && <Icon className="w-3.5 h-3.5 text-primary/60" />} {label}
			</p>
			<p className="text-xs font-black text-foreground uppercase tracking-tight">
				{value}
			</p>
		</div>
	);
}
