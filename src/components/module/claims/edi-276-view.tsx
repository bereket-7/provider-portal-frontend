"use client";

import { useState } from "react";

import { ArrowRight, ClipboardList, Search, Activity, CheckCircle2, AlertCircle } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ModuleHeader } from "@/components/ui/custom/module-header";
import { PremiumButton } from "@/components/ui/custom/premium-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useClaims } from "@/hooks/useClaims";
import { useStatusInquiries } from "@/hooks/useStatusInquiries";
import { checkClaimStatus } from "@/_service/actions/status-inquiry-actions";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Clock, FileText } from "lucide-react";

export function EDI276View() {
	const { data: inquiries } = useStatusInquiries();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [selectedClaimId, setSelectedClaimId] = useState("");
	const [result, setResult] = useState<any>(null);

	const { data: claims } = useClaims();

	const stats = [
		{
			title: "Inquiries Sent",
			value: inquiries?.length || 0,
			trend: "All Time",
			icon: Search,
			color: "primary",
		},
		{
			title: "Adjudicated/Final",
			value: inquiries?.filter((inq: any) => inq.responseStatusCode === "Completed" || inq.responseStatusCategoryCode === "A1").length || 0,
			trend: "Finalized",
			icon: CheckCircle2,
			color: "emerald",
		},
		{
			title: "Pending Payer",
			value: inquiries?.filter((inq: any) => !inq.responseStatusCode || inq.responseStatusCategoryCode === "A0").length || 0,
			trend: "In Review",
			icon: Clock,
			color: "amber",
		},
		{
			title: "Rejections",
			value: inquiries?.filter((inq: any) => inq.responseStatusCode === "Rejected").length || 0,
			trend: "Action Needed",
			icon: AlertCircle,
			color: "rose",
		},
	];

	const handleStatusInquiry = async () => {
		if (!selectedClaimId) {
			toast.error("Please select a claim to inquire status");
			return;
		}

		setIsSubmitting(true);
		const res = await checkClaimStatus(selectedClaimId, "e039cf14-05ef-4d49-b054-af407d4bd579");
		
		if (res.success) {
			setResult(res.data);
			toast.success("Claim status inquiry completed");
		} else {
			toast.error(res.message || "Failed to fetch claim status");
		}
		setIsSubmitting(false);
	};

	return (
		<div className="relative space-y-8 pb-12 max-w-[1200px] mx-auto px-4 sm:px-6">
			<div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10" />

			<ModuleHeader
				icon={Search}
				title="EDI 276 Claim Status Inquiry"
				subtitle="Request real-time processing status for submitted healthcare claims"
				actions={
					<div className="flex items-center gap-3">
						<div className="flex items-center gap-1">
							<button className="px-4 py-1.5 text-primary text-[10px] font-black uppercase tracking-wider relative">
								Single Inquiry
								<span className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary rounded-full" />
							</button>
							<button className="px-4 py-1.5 text-muted-foreground hover:text-foreground text-[10px] font-black uppercase tracking-wider transition-colors">
								Batch Registry
							</button>
						</div>
					</div>
				}
			/>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
				{stats.map((stat, i) => (
					<Card
						key={i}
						className="group relative overflow-hidden border-border/40 bg-card rounded-2xl transition-all duration-300 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05),0_10px_30px_-10px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)]"
					>
						<div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12 blur-2xl transition-all" />
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 relative z-10">
							<CardTitle className="text-[10px] font-black uppercase tracking-[0.15em] text-muted-foreground/80">
								{stat.title}
							</CardTitle>
							<div
								className={`p-2 ${stat.color === "primary" ? "bg-primary/10" : stat.color === "emerald" ? "bg-emerald-500/10" : stat.color === "amber" ? "bg-amber-500/10" : "bg-rose-500/10"} rounded-lg`}
							>
								<stat.icon
									className={`w-3.5 h-3.5 ${stat.color === "primary" ? "text-primary" : stat.color === "emerald" ? "text-emerald-500" : stat.color === "amber" ? "text-amber-500" : "text-rose-500"} group-hover:scale-110 transition-transform`}
								/>
							</div>
						</CardHeader>
						<CardContent className="relative z-10">
							<div className="text-2xl font-black text-foreground tabular-nums">
								{stat.value}
							</div>
							<div className="mt-2 flex items-center justify-between">
								<div
									className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
										stat.color === "amber"
											? "bg-amber-500/10 text-amber-500"
											: stat.color === "rose"
												? "bg-rose-500/10 text-rose-500"
												: stat.color === "emerald"
													? "bg-emerald-500/10 text-emerald-500"
													: "bg-primary/10 text-primary"
									}`}
								>
									{stat.trend}
								</div>
								<ArrowUpRight className="w-4 h-4 text-muted-foreground/20 group-hover:text-primary transition-colors" />
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
				<Card className="lg:col-span-8 border-border/40 bg-card/50 backdrop-blur-sm rounded-[2.5rem] overflow-hidden shadow-2xl">
					<CardHeader className="p-8 border-b border-border/40 bg-primary/[0.01]">
						<CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2 text-primary/80">
							<ClipboardList className="w-4 h-4" />
							Inquiry Parameters
						</CardTitle>
					</CardHeader>
					<CardContent className="p-8">
						<form className="space-y-8" onSubmit={(e) => { e.preventDefault(); handleStatusInquiry(); }}>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
								<div className="space-y-2">
									<Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/70 ml-1">
										Select Claim for Inquiry
									</Label>
									<Select onValueChange={setSelectedClaimId} value={selectedClaimId}>
										<SelectTrigger className="h-12 bg-primary/5 border-border/40 rounded-xl">
											<SelectValue placeholder="Select a claim" />
										</SelectTrigger>
										<SelectContent>
											{claims?.map((c: any) => (
												<SelectItem key={c.id} value={c.id}>
													{c.claimNumber} - ETB {parseFloat(c.totalCharges).toLocaleString()}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>
								<div className="space-y-2">
									<Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/70 ml-1">
										Provider ID (Assigned)
									</Label>
									<Input
										value="e039cf14-05ef-4d49-b054-af407d4bd579"
										disabled
										className="h-12 bg-primary/5 border-border/40 rounded-xl opacity-50"
									/>
								</div>
							</div>

							<div className="flex justify-end pt-4">
								<PremiumButton
									type="submit"
									className="px-12 h-12 rounded-xl text-[10px] font-black uppercase tracking-widest"
									disabled={isSubmitting}
								>
									{isSubmitting ? (
										<>
											<Activity className="w-4 h-4 mr-2 animate-spin" />
											Processing...
										</>
									) : (
										<>
											Submit Status Inquiry
											<ArrowRight className="w-4 h-4 ml-2" />
										</>
									)}
								</PremiumButton>
							</div>
						</form>
					</CardContent>
				</Card>

				<div className="lg:col-span-4 space-y-6">
					{result && (
						<Card className="border-border/40 bg-emerald-500/5 rounded-[2.5rem] overflow-hidden shadow-lg animate-in fade-in slide-in-from-right-4 duration-500">
							<CardHeader className="p-6 border-b border-emerald-500/10">
								<CardTitle className="text-xs font-black uppercase tracking-widest flex items-center gap-2 text-emerald-600">
									<CheckCircle2 className="w-4 h-4" />
									Status Response
								</CardTitle>
							</CardHeader>
							<CardContent className="p-6 space-y-6">
								<div className="space-y-1">
									<p className="text-[8px] font-black text-muted-foreground uppercase opacity-60">Category Code</p>
									<Badge className="bg-emerald-500/10 text-emerald-600 border-none font-black">{result.responseStatusCategoryCode}</Badge>
								</div>
								<div className="space-y-1">
									<p className="text-[8px] font-black text-muted-foreground uppercase opacity-60">Status Code</p>
									<p className="text-sm font-black text-foreground">{result.responseStatusCode}</p>
								</div>
								<div className="pt-4 border-t border-border/40">
									<p className="text-[8px] font-black text-muted-foreground uppercase opacity-60 mb-2">Request EDI Log</p>
									<div className="p-3 bg-slate-950 rounded-xl text-[8px] text-slate-400 font-mono break-all leading-relaxed">
										{result.rawEdiContent}
									</div>
								</div>
							</CardContent>
						</Card>
					)}

					<Card className="border-border/40 bg-primary/10 rounded-[2.5rem] overflow-hidden">
						<CardHeader className="p-6">
							<CardTitle className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
								Quick Tips
							</CardTitle>
						</CardHeader>
						<CardContent className="p-6 pt-0 space-y-4">
							{[
								{
									label: "Real-time",
									text: "276 transactions receive responses within seconds from most major payers.",
								},
								{
									label: "Accuracy",
									text: "Ensure the Claim ID match exactly as submitted in the 837 transaction.",
								},
							].map((tip, i) => (
								<div key={i} className="space-y-1">
									<p className="text-[10px] font-black text-primary uppercase">
										{tip.label}
									</p>
									<p className="text-[11px] font-bold text-muted-foreground leading-relaxed">
										{tip.text}
									</p>
								</div>
							))}
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
