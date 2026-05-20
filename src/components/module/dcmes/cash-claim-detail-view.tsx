"use client";

import Link from "next/link";

import {
	ArrowLeft,
	Calendar,
	Download,
	FileText,
	Info,
	Printer,
	Receipt,
	ShieldCheck,
	User,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PremiumButton } from "@/components/ui/custom/premium-button";

interface CashClaimDetailViewProps {
	id: string;
}

export function CashClaimDetailView({ id }: CashClaimDetailViewProps) {
	// Mock data for the specific claim
	const claim = {
		id: id,
		patientName: "Selam Tesfaye",
		patientId: "PAT-93821",
		serviceType: "Annual Physical Exam",
		serviceDate: "Feb 17, 2026",
		amount: "120.00",
		payeeStatus: "Self-Pay",
		paymentMethod: "Cash",
		status: "Paid",
		processedBy: "Dr. Abraham Bekele",
		processedAt: "Feb 17, 2026 02:45 PM",
		referenceId: "RC-39281-X",
		notes:
			"Patient paid in full at the time of service. Standard physical including blood work panel.",
	};

	return (
		<div className="relative space-y-8 pb-12 max-w-[1500px] mx-auto px-4 sm:px-6 animate-in fade-in duration-700">
			{/* Aesthetic Backgrounds */}
			<div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
			<div className="absolute bottom-10 left-0 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

			{/* Navigation & Header */}
			<div className="flex flex-col gap-5 relative z-10">
				<Link
					href="/dcmes"
					className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors group w-fit"
				>
					<div className="p-1.5 rounded-lg bg-muted group-hover:bg-primary/10 transition-colors">
						<ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
					</div>
					Back to Registry
				</Link>

				<div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-border/40 pb-5">
					<div className="flex items-center gap-4">
						<div className="p-3 bg-primary text-primary-foreground rounded-xl shadow-xl shadow-primary/10 transform -rotate-1 hover:rotate-0 transition-transform duration-500">
							<Receipt className="w-6 h-6" />
						</div>
						<div>
							<div className="flex items-center gap-3">
								<h1 className="text-2xl font-black tracking-tight text-foreground uppercase">
									{claim.id}
								</h1>
								<Badge className="bg-emerald-500/10 text-emerald-600 border-none text-[9px] font-black uppercase px-2.5 py-1 rounded-lg">
									{claim.status}
								</Badge>
							</div>
							<div className="flex items-center gap-2.5 mt-1">
								<p className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">
									Cash Reimbursement
								</p>
								<div className="h-0.5 w-0.5 bg-border rounded-full" />
								<p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
									Ref: {claim.referenceId}
								</p>
							</div>
						</div>
					</div>
					<div className="flex items-center gap-3">
						<button className="p-2.5 rounded-xl border border-border/40 bg-background hover:bg-muted text-muted-foreground hover:text-foreground transition-all">
							<Printer className="w-4 h-4" />
						</button>
						<PremiumButton className="px-6 h-10 shadow-lg shadow-primary/10 text-[9px] uppercase font-black tracking-widest rounded-xl">
							<Download className="w-3.5 h-3.5 mr-2" />
							Export Receipt
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
								Claim Amount
							</p>
							<p className="text-xl font-black text-foreground">
								${claim.amount}
							</p>
						</Card>
						<Card className="border border-border/40 bg-card/10 rounded-2xl p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05),0_10px_30px_-10px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] transition-all">
							<p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground opacity-50 mb-2">
								Service Date
							</p>
							<p className="text-xl font-black text-foreground uppercase">
								{claim.serviceDate}
							</p>
						</Card>
						<Card className="border border-border/40 bg-card/10 rounded-2xl p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05),0_10px_30px_-10px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] transition-all">
							<p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground opacity-50 mb-2">
								Payment Method
							</p>
							<p className="text-xl font-black text-primary uppercase">
								{claim.paymentMethod}
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
											Patient Information
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
												<p className="text-[10px] font-bold text-muted-foreground uppercase">
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
											Service Details
										</h4>
									</div>
									<div className="space-y-4">
										<div className="flex items-center gap-4">
											<div className="h-12 w-12 rounded-xl bg-amber-500/5 flex items-center justify-center text-amber-600">
												<Calendar className="w-6 h-6" />
											</div>
											<div>
												<p className="text-sm font-black text-foreground">
													{claim.serviceType}
												</p>
												<p className="text-[10px] font-bold text-muted-foreground uppercase">
													Performed: {claim.serviceDate}
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>

							{/* Notes Section */}
							<div className="space-y-4">
								<div className="flex items-center gap-2 mb-2">
									<div className="h-4 w-1 bg-primary rounded-full" />
									<h4 className="text-[10px] font-black uppercase tracking-[0.15em] text-foreground/70">
										Internal Notes & Ledger Info
									</h4>
								</div>
								<div className="p-6 bg-muted/20 border border-border/40 rounded-3xl">
									<p className="text-xs font-bold leading-relaxed text-muted-foreground italic">
										&quot;{claim.notes}&quot;
									</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Right Column: Sidebar / Logs */}
				<div className="lg:col-span-4 space-y-8">
					<Card className="border border-border/40 bg-card/50 backdrop-blur-sm rounded-[2.5rem] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05),0_10px_30px_-10px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] transition-all">
						<CardHeader className="p-6 border-b border-border/40">
							<CardTitle className="text-sm font-black uppercase tracking-[0.15em] flex items-center gap-2 text-primary/80">
								<ShieldCheck className="w-4 h-4" />
								Audit Trail
							</CardTitle>
						</CardHeader>
						<CardContent className="p-8">
							<div className="space-y-8 relative">
								<div className="absolute left-[9px] top-2 bottom-6 w-[1.5px] bg-gradient-to-b from-primary/30 to-border/20" />

								<div className="relative pl-8">
									<div className="absolute left-0 top-1.5 w-[20px] h-[20px] rounded-full border-[3px] border-card bg-primary shadow-lg shadow-primary/20" />
									<div className="space-y-1">
										<p className="text-[10px] font-black text-foreground uppercase tracking-wider">
											Claim Processed
										</p>
										<p className="text-[9px] font-bold text-muted-foreground opacity-50">
											{claim.processedAt}
										</p>
										<div className="flex items-center gap-2 mt-2">
											<div className="h-5 w-5 rounded bg-muted flex items-center justify-center">
												<User className="w-3 h-3 text-muted-foreground" />
											</div>
											<p className="text-[9px] font-black uppercase text-foreground/70">
												{claim.processedBy}
											</p>
										</div>
									</div>
								</div>

								<div className="relative pl-8">
									<div className="absolute left-0 top-1.5 w-[20px] h-[20px] rounded-full border-[3px] border-card bg-emerald-500 shadow-lg shadow-emerald-500/20" />
									<div className="space-y-1">
										<p className="text-[10px] font-black text-foreground uppercase tracking-wider">
											Payment Verified
										</p>
										<p className="text-[9px] font-bold text-muted-foreground opacity-50">
											Instant Verification
										</p>
										<p className="text-[10px] font-bold text-emerald-600 uppercase mt-2">
											Settled: {claim.paymentMethod}
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
									<FileText className="w-5 h-5 text-primary" />
								</div>
								<h3 className="text-base font-black tracking-tight">
									Legal Receipt
								</h3>
							</div>
							<p className="text-xs font-bold text-slate-300 leading-relaxed">
								This claim serves as a primary financial record for DCMES
								auditing. All manual entries must be matched with clinical
								service audits within 24 hours.
							</p>
							<div className="pt-2 border-t border-white/10 flex items-center justify-between">
								<p className="text-[8px] font-black uppercase tracking-widest text-slate-500">
									Status Code
								</p>
								<p className="text-[10px] font-black text-primary uppercase">
									DCMES-SEC-2
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
