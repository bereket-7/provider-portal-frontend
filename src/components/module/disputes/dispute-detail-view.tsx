"use client";

import Link from "next/link";

import {
	Activity,
	AlertCircle,
	ArrowLeft,
	CheckCircle2,
	Clock,
	Download,
	ExternalLink,
	FileText,
	ShieldCheck,
	User,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PremiumButton } from "@/components/ui/custom/premium-button";

interface DisputeDetailViewProps {
	id: string;
}

export function DisputeDetailView({ id }: DisputeDetailViewProps) {
	// Mock detailed data
	const dispute = {
		id,
		claimId: "CLM-1042",
		patient: "Sarah Johnson",
		dob: "Jan 15, 1978",
		memberId: "TEN-882-004",
		reason: "Incomplete Documentation",
		clinicalSummary:
			"Claim rejected due to missing clinical justification for MRI of the lumbar spine. Provider has submitted additional progress notes for reconsideration.",
		date: "Feb 17, 2026",
		amount: "$1,200.00",
		status: "Pending",
		priority: "Urgent",
		facility: "Northside Medical Center",
		provider: "Dr. Elena Gilbert",
		category: "Active",
	};

	const timeline = [
		{
			status: "Dispute Initiated",
			date: "Feb 17, 2026 10:45 AM",
			description: "Provider initiated a dispute for rejected claim CLM-1042.",
			done: true,
		},
		{
			status: "Documentation Received",
			date: "Feb 17, 2026 02:20 PM",
			description: "Secondary clinical documentation uploaded by facility.",
			done: true,
		},
		{
			status: "Awaiting Payer Review",
			date: "Feb 18, 2026 09:00 AM",
			description: "Sent to insurance carrier for final adjudication.",
			done: false,
		},
	];

	return (
		<div className="relative space-y-8 pb-12 max-w-[1500px] mx-auto px-4 sm:px-6 animate-in fade-in duration-700">
			{/* Aesthetic Backgrounds */}
			<div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
			<div className="absolute bottom-10 left-0 w-[400px] h-[400px] bg-red-500/5 rounded-full blur-[100px] pointer-events-none" />

			{/* Navigation & Header */}
			<div className="flex flex-col gap-5 relative z-10">
				<Link
					href="/disputes"
					className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors group w-fit"
				>
					<div className="p-1.5 rounded-lg bg-muted group-hover:bg-primary/10 transition-colors">
						<ArrowLeft className="w-3.5 h-4 group-hover:-translate-x-1 transition-transform" />
					</div>
					Back to Dispute Center
				</Link>

				<div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-border/40 pb-5">
					<div className="flex items-center gap-4">
						<div className="p-3 bg-red-500 text-white rounded-xl shadow-xl shadow-red-500/10 transform -rotate-1 hover:rotate-0 transition-transform duration-500">
							<AlertCircle className="w-6 h-6" />
						</div>
						<div>
							<div className="flex items-center gap-3">
								<h1 className="text-2xl font-black tracking-tight text-foreground">
									{dispute.id}
								</h1>
								<Badge className="rounded-lg px-3 py-0.5 text-[9px] font-black uppercase tracking-widest border-none bg-amber-500/10 text-amber-600">
									{dispute.status}
								</Badge>
							</div>
							<div className="flex items-center gap-2.5 mt-0.5">
								<p className="text-[9px] font-black text-primary uppercase tracking-[0.2em]">
									CLAIM: {dispute.claimId}
								</p>
								<div className="h-0.5 w-0.5 bg-border rounded-full" />
								<p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
									Reason: {dispute.reason}
								</p>
							</div>
						</div>
					</div>
					<div className="flex items-center gap-3">
						<button className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
							<Download className="w-3.5 h-3.5 mr-2 inline-block" />
							Export
						</button>
						<PremiumButton className="px-6 h-10 shadow-lg shadow-primary/10 text-[9px] uppercase font-black tracking-widest rounded-xl">
							Submit Evidence
						</PremiumButton>
					</div>
				</div>
			</div>

			{/* Content Grid */}
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
				{/* Left Column: Details */}
				<div className="lg:col-span-8 space-y-8">
					<Card className="border border-border/40 bg-card/50 backdrop-blur-sm rounded-3xl overflow-hidden shadow-sm">
						<CardHeader className="p-6 border-b border-border/40 bg-primary/[0.01]">
							<CardTitle className="text-base font-black uppercase tracking-[0.1em]">
								Clinical Dispute Summary
							</CardTitle>
						</CardHeader>
						<CardContent className="p-8 space-y-8">
							<div className="p-6 bg-primary/5 rounded-2xl border border-primary/10">
								<p className="text-sm font-bold text-muted-foreground leading-relaxed italic">
									&quot;{dispute.clinicalSummary}&quot;
								</p>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-10">
								<div className="space-y-3">
									<p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground opacity-60">
										Patient Identification
									</p>
									<div className="flex items-center gap-4">
										<div className="p-2.5 bg-primary/5 rounded-xl border border-primary/10">
											<User className="w-4 h-4 text-primary" />
										</div>
										<div>
											<p className="text-sm font-black text-foreground">
												{dispute.patient}
											</p>
											<p className="text-[10px] font-bold text-muted-foreground uppercase mt-0.5">
												ID: {dispute.memberId} • DOB: {dispute.dob}
											</p>
										</div>
									</div>
								</div>

								<div className="space-y-3">
									<p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground opacity-60">
										Medical Facility
									</p>
									<div className="flex items-center gap-4">
										<div className="p-2.5 bg-primary/5 rounded-xl border border-primary/10">
											<Activity className="w-4 h-4 text-primary" />
										</div>
										<div>
											<p className="text-sm font-black text-foreground">
												{dispute.facility}
											</p>
											<p className="text-[10px] font-bold text-muted-foreground uppercase mt-0.5">
												Provider: {dispute.provider}
											</p>
										</div>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card className="border border-border/40 bg-card/50 backdrop-blur-sm rounded-3xl overflow-hidden shadow-sm">
						<CardHeader className="p-6 border-b border-border/40">
							<CardTitle className="text-base font-black uppercase tracking-[0.1em]">
								Supporting Evidence
							</CardTitle>
						</CardHeader>
						<CardContent className="p-6 space-y-3">
							{[
								"Appeal Letter - Facility Head.pdf",
								"Radiology Report (Revised).pdf",
								"Clinical Justification Memo.docx",
							].map((doc, i) => (
								<div
									key={i}
									className="flex items-center justify-between p-3.5 bg-primary/[0.01] border border-border/30 rounded-xl hover:bg-primary/[0.03] hover:border-primary/20 transition-all group cursor-pointer"
								>
									<div className="flex items-center gap-3.5">
										<div className="p-2 bg-background rounded-lg border border-border/40 group-hover:border-primary/20 transition-all shadow-sm">
											<FileText className="w-3.5 h-3.5 text-primary" />
										</div>
										<div>
											<p className="text-[11px] font-black text-foreground tracking-tight">
												{doc}
											</p>
											<p className="text-[9px] font-bold text-muted-foreground uppercase mt-0.5 opacity-60">
												Uploaded Feb 17, 2026
											</p>
										</div>
									</div>
									<button className="p-1.5 hover:bg-background rounded-md transition-all text-muted-foreground hover:text-primary">
										<ExternalLink className="w-3.5 h-3.5" />
									</button>
								</div>
							))}
						</CardContent>
					</Card>
				</div>

				{/* Right Column */}
				<div className="lg:col-span-4 space-y-8">
					<Card className="border border-border/40 bg-card/50 backdrop-blur-sm rounded-3xl shadow-sm">
						<CardHeader className="p-6 border-b border-border/40">
							<CardTitle className="text-sm font-black uppercase tracking-[0.15em] flex items-center gap-2 text-primary/80">
								<Clock className="w-4 h-4" />
								Timeline
							</CardTitle>
						</CardHeader>
						<CardContent className="p-6">
							<div className="space-y-8 relative">
								<div className="absolute left-[9px] top-2 bottom-6 w-[1.5px] bg-gradient-to-b from-primary/30 to-border/20" />
								{timeline.map((step, i) => (
									<div key={i} className="relative pl-8">
										<div
											className={`absolute left-0 top-1.5 w-[20px] h-[20px] rounded-full border-[3px] border-card flex items-center justify-center transition-all ${
												step.done
													? "bg-primary scale-110 shadow-lg shadow-primary/20"
													: "bg-muted scale-90"
											}`}
										>
											{step.done && (
												<CheckCircle2 className="w-2.5 h-2.5 text-white" />
											)}
										</div>
										<div className="space-y-0.5">
											<p className="text-[10px] font-black text-foreground uppercase tracking-wider">
												{step.status}
											</p>
											<p className="text-[9px] font-bold text-muted-foreground opacity-50">
												{step.date}
											</p>
											<p className="text-[10px] font-bold text-muted-foreground/80 leading-relaxed mt-1">
												{step.description}
											</p>
										</div>
									</div>
								))}
							</div>
						</CardContent>
					</Card>

					<Card className="border-none bg-gradient-to-br from-slate-950 to-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
						<div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full -mr-16 -mt-16 blur-3xl opacity-50" />
						<div className="relative z-10 space-y-6">
							<div className="flex items-center gap-3">
								<div className="p-2 bg-white/5 rounded-xl border border-white/10 text-primary">
									<ShieldCheck className="w-5 h-5" />
								</div>
								<h3 className="text-base font-black tracking-tight">
									Internal Audit
								</h3>
							</div>
							<p className="text-xs font-bold text-slate-300 leading-relaxed">
								This dispute is under review by the Tena&apos;adam Resolution
								Engine. All actions are logged and audit-ready.
							</p>
							<div className="pt-2 border-t border-white/10 uppercase tracking-[0.2em] text-[8px] font-black text-slate-500">
								Last update: 2 hours ago
							</div>
						</div>
					</Card>
				</div>
			</div>
		</div>
	);
}
