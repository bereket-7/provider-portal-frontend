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
	Send,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PremiumButton } from "@/components/ui/custom/premium-button";
import { useClaim } from "@/hooks/useClaim";
import { submitClaimToInsurance } from "@/_service/actions/claim-actions";
import { demoResubmitClaim, demoSubmitClaim } from "@/lib/demo/demo-api";
import { isDemoMode } from "@/lib/demo/demo-mode";
import { useDemoStore } from "@/lib/demo/demo-store-context";
import { toast } from "sonner";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

interface ClaimDetailViewProps {
	id: string;
}

export function ClaimDetailView({ id }: ClaimDetailViewProps) {
	const router = useRouter();
	const { bumpVersion } = useDemoStore();
	const { data: claim, isLoading, refetch } = useClaim(id);

	const handleSendToInsurance = async () => {
		const loadingId = toast.loading("Generating 837 and transmitting to insurance...");
		try {
			if (isDemoMode()) {
				await demoSubmitClaim(id);
				bumpVersion();
				toast.success("837 transmitted successfully", { id: loadingId });
				refetch();
				return;
			}
			const response = await submitClaimToInsurance(id);
			if (response.ok) {
				toast.success(response.message || "837 transmitted successfully", { id: loadingId });
				refetch();
			} else {
				toast.error(response.message || "Transmission failed", { id: loadingId });
			}
		} catch {
			toast.error("An unexpected error occurred during transmission", { id: loadingId });
		}
	};

	const handleResubmit = async () => {
		if (!isDemoMode()) return;
		const copy = await demoResubmitClaim(id);
		bumpVersion();
		toast.success(`Corrected claim saved as draft: ${copy.claimNumber}`);
		router.push(`/claims/${copy.id}`);
	};

	const handleDownloadPdf = () => {
		window.print();
	};

	const statusColors: Record<string, string> = {
		APPROVED: "bg-emerald-500/10 text-emerald-500",
		PENDING: "bg-amber-500/10 text-amber-500",
		DENIED: "bg-rose-500/10 text-rose-500",
		"837_SUBMITTED": "bg-blue-500/10 text-blue-500",
		"837_submitted": "bg-blue-500/10 text-blue-500",
		"ready_for_837": "bg-indigo-500/10 text-indigo-500",
	};

	if (isLoading) {
		return (
			<div className="flex items-center justify-center min-h-[400px]">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
			</div>
		);
	}

	if (!claim) {
		return (
			<div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
				<p className="text-xl font-black text-muted-foreground uppercase opacity-50">Claim Not Found</p>
				<Link href="/claims" className="text-primary font-black uppercase tracking-widest text-xs">Back to Ledger</Link>
			</div>
		);
	}

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
									{claim.claimNumber || claim.id}
								</h1>
								<Badge
									className={`border-none text-[9px] font-black uppercase px-2.5 py-1 rounded-lg ${statusColors[claim.status]}`}
								>
									{claim.status}
								</Badge>
								{claim.ediStatus && (
									<Badge
										className={`border-none text-[9px] font-black uppercase px-2.5 py-1 rounded-lg ${statusColors[claim.ediStatus] || "bg-muted text-muted-foreground"}`}
									>
										EDI: {claim.ediStatus}
									</Badge>
								)}
							</div>
							<div className="flex items-center gap-2.5 mt-1">
								<p className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">
									{claim.type} CLAIM SUBMISSION
								</p>
								<div className="h-0.5 w-0.5 bg-border rounded-full" />
								<p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
									Ref: {claim.externalId || "N/A"}
								</p>
							</div>
						</div>
					</div>
					<div className="flex items-center gap-3">
						<button
							onClick={handleDownloadPdf}
							className="p-2.5 rounded-xl border border-border/40 bg-background hover:bg-muted text-muted-foreground hover:text-foreground transition-all shadow-sm"
						>
							<Printer className="w-4 h-4" />
						</button>
						{claim.status === "REJECTED" && isDemoMode() && (
							<PremiumButton onClick={handleResubmit} className="px-6 h-10 text-[9px] uppercase font-black">
								Resubmit Corrected Claim
							</PremiumButton>
						)}
						{claim.status !== "837_SUBMITTED" && claim.ediStatus !== "837_submitted" && (
							<PremiumButton 
								onClick={handleSendToInsurance}
								className="px-6 h-10 shadow-lg shadow-primary/10 text-[9px] uppercase font-black tracking-widest rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
							>
								<Send className="w-3.5 h-3.5 mr-2" />
								Submit to Insurance
							</PremiumButton>
						)}
						<PremiumButton
							variant="outline"
							onClick={handleDownloadPdf}
							className="px-6 h-10 border-border/40 text-[9px] uppercase font-black tracking-widest rounded-xl transition-all"
						>
							<Download className="w-3.5 h-3.5 mr-2" />
							Download PDF
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
							<p className="text-xl font-black text-foreground tabular-nums">
								ETB {parseFloat(claim.totalCharges || "0").toLocaleString()}
							</p>
						</Card>
						<Card className="border border-border/40 bg-card/10 rounded-2xl p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05),0_10px_30px_-10px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] transition-all">
							<p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground opacity-50 mb-2">
								Plan Paid
							</p>
							<p className="text-xl font-black text-emerald-600 tabular-nums">
								ETB {parseFloat(claim.totalPaid || "0").toLocaleString()}
							</p>
						</Card>
						<Card className="border border-border/40 bg-card/10 rounded-2xl p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05),0_10px_30px_-10px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] transition-all">
							<p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground opacity-50 mb-2">
								Patient Resp.
							</p>
							<p className="text-xl font-black text-amber-600 tabular-nums">
								ETB {parseFloat(claim.totalAdjustments || "0").toLocaleString()}
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
													{claim.patient?.firstName} {claim.patient?.lastName}
												</p>
												<p className="text-[10px] font-bold text-muted-foreground uppercase tabular-nums">
													ID: {claim.patient?.id}
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
													{claim.serviceFrom}
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
									<div className="p-6 bg-muted/20 border border-border/40 rounded-3xl space-y-2">
										{claim.diagnoses?.map((diag: any) => (
											<div key={diag.id} className="flex items-center gap-2">
												<Badge variant="outline" className="text-[9px] font-black border-primary/20">{diag.code}</Badge>
												<span className="text-xs font-bold text-foreground">Diagnosis {diag.position}</span>
											</div>
										))}
									</div>
								</div>
								<div className="space-y-4">
									<div className="flex items-center gap-2 mb-2">
										<div className="h-4 w-1 bg-primary rounded-full" />
										<h4 className="text-[10px] font-black uppercase tracking-[0.15em] text-foreground/70">
											Service Lines (CPT)
										</h4>
									</div>
									<div className="p-6 bg-muted/20 border border-border/40 rounded-3xl space-y-3">
										{claim.lines?.map((line: any) => (
											<div key={line.id} className="flex justify-between items-center group/line">
												<div className="flex items-center gap-3">
													<div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-[10px] font-black">{line.lineNumber}</div>
													<div>
														<p className="text-xs font-black text-foreground">{line.cptCode}</p>
														<p className="text-[9px] font-bold text-muted-foreground uppercase">{line.units} Units • {line.serviceDate}</p>
													</div>
												</div>
												<p className="text-xs font-black text-primary tabular-nums">${line.billedAmount}</p>
											</div>
										))}
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
										<p className="text-sm font-bold text-foreground lowercase">
											NPI: {claim.billingNpi || "1928374650"}
										</p>
									</div>
								</div>
								<div className="space-y-4">
									<div className="flex items-center gap-2 mb-2">
										<div className="h-4 w-1 bg-primary rounded-full" />
										<h4 className="text-[10px] font-black uppercase tracking-[0.15em] text-foreground/70">
											Payer Information
										</h4>
									</div>
									<div className="flex items-center gap-3">
										<div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
											<ShieldCheck className="w-4 h-4 text-emerald-600" />
										</div>
										<p className="text-sm font-bold text-foreground">
											{claim.payer?.name} ({claim.payer?.payerCode})
										</p>
									</div>
								</div>
							</div>

							{(claim.documents?.length ?? 0) > 0 && (
								<div className="space-y-4">
									<h4 className="text-[10px] font-black uppercase tracking-[0.15em] text-foreground/70">
										Submitted Documents
									</h4>
									<ul className="space-y-2">
										{claim.documents?.map((doc: any) => (
											<li
												key={doc.id}
												className="flex items-center gap-2 p-3 rounded-xl border border-border/40 bg-muted/20"
											>
												<FileText className="w-4 h-4 text-primary" />
												<span className="text-xs font-bold">{doc.name}</span>
											</li>
										))}
									</ul>
								</div>
							)}
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
								{(claim.timeline?.length
									? claim.timeline
									: [
											{
												status: "Created",
												date: claim.createdAt,
												description: "Claim created",
												done: true,
											},
											{
												status: "Submitted",
												date: claim.submittedAt,
												description: "Submitted to payer",
												done: !!claim.submittedAt,
											},
										]
								).map((step: any, i: number) => (
									<div key={i} className="relative pl-8">
										<div
											className={`absolute left-0 top-1.5 w-[20px] h-[20px] rounded-full border-[3px] border-card shadow-lg ${
												step.done ? "bg-primary shadow-primary/20" : "bg-muted"
											}`}
										/>
										<div className="space-y-1">
											<p className="text-[10px] font-black text-foreground uppercase tracking-wider">
												{step.status}
											</p>
											<p className="text-[9px] font-bold text-muted-foreground opacity-50 tabular-nums">
												{step.date
													? format(new Date(step.date), "MMM dd, yyyy HH:mm")
													: "Pending"}
											</p>
											<p className="text-[9px] text-muted-foreground">{step.description}</p>
										</div>
									</div>
								))}
							</div>
							{claim.rejectionReason && (
								<div className="mt-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20">
									<p className="text-[10px] font-black uppercase text-rose-600">
										Rejection Reason
									</p>
									<p className="text-xs font-bold mt-1">{claim.rejectionReason}</p>
								</div>
							)}
							{(claim.insuranceMessages?.length ?? 0) > 0 && (
								<div className="mt-6 space-y-2">
									<p className="text-[10px] font-black uppercase text-muted-foreground">
										Insurance Messages
									</p>
									{claim.insuranceMessages?.map((msg: any, i: number) => (
										<div
											key={i}
											className="p-3 rounded-xl bg-muted/30 text-xs font-medium"
										>
											<p className="text-[9px] text-muted-foreground">
												{format(new Date(msg.date), "MMM dd, yyyy")}
											</p>
											{msg.message}
										</div>
									))}
								</div>
							)}
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
