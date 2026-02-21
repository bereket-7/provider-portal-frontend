"use client";

import Link from "next/link";

import {
	ArrowLeft,
	Calendar,
	Clock,
	Download,
	FileText,
	Info,
	Printer,
	ShieldCheck,
	User,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PremiumButton } from "@/components/ui/custom/premium-button";

interface ClaimDetailViewProps {
	id: string;
}

export function ClaimDetailView({ id }: ClaimDetailViewProps) {
	// Mock data for the specific claim
	const claim = {
		id: id,
		patientName: "Sarah Johnson",
		patientId: "PAT-93821",
		serviceDate: "Feb 15, 2026",
		status: "Approved" as const,
		type: "Clinical",
		amount: "1,200.00",
		planPaid: "960.00",
		patientResp: "240.00",
		provider: "Dr. Abraham Bekele",
		facility: "General Medical Center",
		diagnosis: "J34.2 • Deviated nasal septum",
		procedure: "30520 • Septoplasty or submucous resection",
		submittedAt: "Feb 15, 2026 09:12 AM",
		adjudicatedAt: "Feb 15, 2026 04:30 PM",
		referenceId: "CLM-ADJ-88219",
	};

	const statusColors = {
		Approved: "bg-emerald-500/10 text-emerald-500",
		Pending: "bg-amber-500/10 text-amber-500",
		Denied: "bg-rose-500/10 text-rose-500",
	};

	return (
		<div className="relative space-y-8 pb-12 max-w-[1500px] mx-auto px-4 sm:px-6 animate-in fade-in duration-700">
			{/* Aesthetic Backgrounds */}
			<div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
			<div className="absolute bottom-10 left-0 w-[400px] h-[400px] bg-sky-500/5 rounded-full blur-[100px] pointer-events-none" />

			{/* Navigation & Header */}
			<div className="flex flex-col gap-5 relative z-10">
				<Link
					href="/claims"
					className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors group w-fit"
				>
					<div className="p-1.5 rounded-lg bg-muted group-hover:bg-primary/10 transition-colors">
						<ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
					</div>
					Back to Ledger
				</Link>

				<div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-border/40 pb-5">
					<div className="flex items-center gap-4">
						<div className="p-3 bg-primary text-primary-foreground rounded-xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] transform -rotate-1 hover:rotate-0 transition-transform duration-500">
							<FileText className="w-6 h-6" />
						</div>
						<div>
							<div className="flex items-center gap-3">
								<h1 className="text-2xl font-black tracking-tight text-foreground uppercase">
									{claim.id}
								</h1>
								<Badge
									className={`border-none text-[9px] font-black uppercase px-2.5 py-1 rounded-lg ${statusColors[claim.status]}`}
								>
									{claim.status}
								</Badge>
							</div>
							<div className="flex items-center gap-2.5 mt-1">
								<p className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">
									{claim.type} CLAIM SUBMISSION
								</p>
								<div className="h-0.5 w-0.5 bg-border rounded-full" />
								<p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
									Ref: {claim.referenceId}
								</p>
							</div>
						</div>
					</div>
					<div className="flex items-center gap-3">
						<button className="p-2.5 rounded-xl border border-border/40 bg-background hover:bg-muted text-muted-foreground hover:text-foreground transition-all shadow-sm">
							<Printer className="w-4 h-4" />
						</button>
						<PremiumButton className="px-6 h-10 shadow-lg shadow-primary/10 text-[9px] uppercase font-black tracking-widest rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]">
							<Download className="w-3.5 h-3.5 mr-2" />
							Export Details
						</PremiumButton>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
				{/* Left Column: Details */}
				<div className="lg:col-span-8 space-y-8">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<Card className="border border-border/40 bg-card/10 rounded-2xl p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05),0_10px_30px_-10px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] transition-all">
							<p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground opacity-50 mb-2">
								Total Amount
							</p>
							<p className="text-xl font-black text-foreground">
								${claim.amount}
							</p>
						</Card>
						<Card className="border border-border/40 bg-card/10 rounded-2xl p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05),0_10px_30px_-10px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] transition-all">
							<p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground opacity-50 mb-2">
								Plan Paid
							</p>
							<p className="text-xl font-black text-emerald-600">
								${claim.planPaid}
							</p>
						</Card>
						<Card className="border border-border/40 bg-card/10 rounded-2xl p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05),0_10px_30px_-10px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] transition-all">
							<p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground opacity-50 mb-2">
								Patient Resp.
							</p>
							<p className="text-xl font-black text-amber-600">
								${claim.patientResp}
							</p>
						</Card>
					</div>

					<Card className="border border-border/40 bg-card/50 backdrop-blur-sm rounded-[2.5rem] overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05),0_10px_30px_-10px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] transition-all">
						<CardHeader className="p-8 border-b border-border/40 bg-primary/[0.01]">
							<CardTitle className="text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2">
								<Info className="w-4 h-4 text-primary" />
								Claim Specification
							</CardTitle>
						</CardHeader>
						<CardContent className="p-8 space-y-12">
							{/* Patient & Service Details */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-10">
								<div className="space-y-6">
									<div className="flex items-center gap-2 mb-4">
										<div className="h-4 w-1 bg-primary rounded-full" />
										<h4 className="text-[10px] font-black uppercase tracking-[0.15em] text-foreground/70">
											Recipient Details
										</h4>
									</div>
									<div className="space-y-4">
										<div className="flex items-center gap-4">
											<div className="h-12 w-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
												<User className="w-6 h-6" />
											</div>
											<div>
												<p className="text-sm font-black text-foreground">
													{claim.patientName}
												</p>
												<p className="text-[10px] font-bold text-muted-foreground uppercase tabular-nums">
													ID: {claim.patientId}
												</p>
											</div>
										</div>
									</div>
								</div>

								<div className="space-y-6">
									<div className="flex items-center gap-2 mb-4">
										<div className="h-4 w-1 bg-primary rounded-full" />
										<h4 className="text-[10px] font-black uppercase tracking-[0.15em] text-foreground/70">
											Clinical Context
										</h4>
									</div>
									<div className="space-y-4">
										<div className="flex items-center gap-4">
											<div className="h-12 w-12 rounded-xl bg-amber-500/5 flex items-center justify-center text-amber-600">
												<Calendar className="w-6 h-6" />
											</div>
											<div>
												<p className="text-sm font-black text-foreground">
													{claim.serviceDate}
												</p>
												<p className="text-[10px] font-bold text-muted-foreground uppercase">
													Professional Service Date
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>

							{/* Medical Coding */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-10">
								<div className="space-y-4">
									<div className="flex items-center gap-2 mb-2">
										<div className="h-4 w-1 bg-primary rounded-full" />
										<h4 className="text-[10px] font-black uppercase tracking-[0.15em] text-foreground/70">
											Diagnosis Codes (ICD-10)
										</h4>
									</div>
									<div className="p-6 bg-muted/20 border border-border/40 rounded-3xl">
										<p className="text-sm font-bold text-foreground">
											{claim.diagnosis}
										</p>
									</div>
								</div>
								<div className="space-y-4">
									<div className="flex items-center gap-2 mb-2">
										<div className="h-4 w-1 bg-primary rounded-full" />
										<h4 className="text-[10px] font-black uppercase tracking-[0.15em] text-foreground/70">
											Service Codes (CPT/HCPCS)
										</h4>
									</div>
									<div className="p-6 bg-muted/20 border border-border/40 rounded-3xl">
										<p className="text-sm font-bold text-foreground">
											{claim.procedure}
										</p>
									</div>
								</div>
							</div>

							{/* Provider & Facility */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-10">
								<div className="space-y-4">
									<div className="flex items-center gap-2 mb-2">
										<div className="h-4 w-1 bg-primary rounded-full" />
										<h4 className="text-[10px] font-black uppercase tracking-[0.15em] text-foreground/70">
											Rendering Provider
										</h4>
									</div>
									<div className="flex items-center gap-3">
										<div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
											<User className="w-4 h-4 text-primary" />
										</div>
										<p className="text-sm font-bold text-foreground">
											{claim.provider}
										</p>
									</div>
								</div>
								<div className="space-y-4">
									<div className="flex items-center gap-2 mb-2">
										<div className="h-4 w-1 bg-primary rounded-full" />
										<h4 className="text-[10px] font-black uppercase tracking-[0.15em] text-foreground/70">
											Service Facility
										</h4>
									</div>
									<div className="flex items-center gap-3">
										<div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
											<ShieldCheck className="w-4 h-4 text-emerald-600" />
										</div>
										<p className="text-sm font-bold text-foreground">
											{claim.facility}
										</p>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Right Column: Audit Trail */}
				<div className="lg:col-span-4 space-y-8">
					<Card className="border border-border/40 bg-card/50 backdrop-blur-sm rounded-[2.5rem] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05),0_10px_30_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] transition-all">
						<CardHeader className="p-6 border-b border-border/40">
							<CardTitle className="text-sm font-black uppercase tracking-[0.15em] flex items-center gap-2 text-primary/80">
								<Clock className="w-4 h-4" />
								Adjudication Path
							</CardTitle>
						</CardHeader>
						<CardContent className="p-8">
							<div className="space-y-8 relative">
								<div className="absolute left-[9px] top-2 bottom-6 w-[1.5px] bg-gradient-to-b from-primary/30 to-border/20" />

								<div className="relative pl-8">
									<div className="absolute left-0 top-1.5 w-[20px] h-[20px] rounded-full border-[3px] border-card bg-primary shadow-lg shadow-primary/20" />
									<div className="space-y-1">
										<p className="text-[10px] font-black text-foreground uppercase tracking-wider">
											Claim Submitted
										</p>
										<p className="text-[9px] font-bold text-muted-foreground opacity-50 tabular-nums">
											{claim.submittedAt}
										</p>
									</div>
								</div>

								<div className="relative pl-8">
									<div className="absolute left-0 top-1.5 w-[20px] h-[20px] rounded-full border-[3px] border-card bg-emerald-500 shadow-lg shadow-emerald-500/20" />
									<div className="space-y-1">
										<p className="text-[10px] font-black text-foreground uppercase tracking-wider">
											Adjudication Complete
										</p>
										<p className="text-[9px] font-bold text-muted-foreground opacity-50 tabular-nums">
											{claim.adjudicatedAt}
										</p>
										<p className="text-[10px] font-black text-emerald-600 uppercase mt-2">
											Status: APPROVED
										</p>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>

					<div className="p-8 rounded-[2.5rem] bg-slate-950 text-white relative overflow-hidden shadow-[0_20px_40px_-12px_rgba(0,0,0,0.15)] transition-all">
						<div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full -mr-16 -mt-16 blur-3xl opacity-50" />
						<div className="relative z-10 space-y-6">
							<div className="flex items-center gap-3">
								<div className="p-2 bg-white/5 rounded-xl border border-white/10">
									<ShieldCheck className="w-5 h-5 text-primary" />
								</div>
								<h3 className="text-base font-black tracking-tight">
									Clinical Integrity
								</h3>
							</div>
							<p className="text-xs font-bold text-slate-300 leading-relaxed">
								This claim has been verified against the Tena&apos;adam medical
								policy database. Adjudication reflects compliance with standard
								clinical throughput protocols.
							</p>
							<div className="pt-2 border-t border-white/10 flex items-center justify-between">
								<p className="text-[8px] font-black uppercase tracking-widest text-slate-500">
									Audit Node
								</p>
								<p className="text-[10px] font-black text-primary uppercase text-right">
									TEN-SYS-442
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
