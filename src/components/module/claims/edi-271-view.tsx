"use client";

import {
	Activity,
	ArrowUpRight,
	Calendar,
	ShieldCheck,
	UserCheck,
	Zap,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/custom/data-table";
import { ModuleHeader } from "@/components/ui/custom/module-header";
import { PremiumButton } from "@/components/ui/custom/premium-button";
import { useEligibilityResponses } from "@/hooks/useEligibilityResponses";
import { Skeleton } from "@/components/ui/skeleton";

type EligibilityResponse = any;

export function EDI271View() {
	const { data: responses, isLoading } = useEligibilityResponses();
	const stats = [
		{
			label: "Total Confirmed",
			value: responses?.length || 0,
			trend: "All Time",
			icon: UserCheck,
			color: "emerald",
			bg: "bg-emerald-500/10",
		},
		{
			label: "Active Coverage",
			value: responses?.filter((r: any) => r.eligibilityStatus === "1").length || 0,
			trend: "Verified Active",
			icon: Zap,
			color: "amber",
			bg: "bg-amber-500/10",
		},
		{
			label: "Success Rate",
			value: responses?.length ? `${((responses.filter((r: any) => r.eligibilityStatus === "1").length / responses.length) * 100).toFixed(1)}%` : "0%",
			trend: "X12 Validation",
			icon: Activity,
			color: "primary",
			bg: "bg-primary/10",
		},
	];

	return (
		<div className="relative space-y-8 pb-12 max-w-[1500px] mx-auto px-4 sm:px-6">
			<div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />

			<ModuleHeader
				icon={ShieldCheck}
				title="EDI 271 Eligibility Response"
				subtitle="Inbound member coverage confirmations and benefit availability"
				actions={
					<div className="flex items-center gap-3">
						<div className="flex items-center gap-1">
							<button className="px-4 py-1.5 text-primary text-[10px] font-black uppercase tracking-wider relative">
								All Responses
								<span className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary rounded-full" />
							</button>
							<button className="px-4 py-1.5 text-muted-foreground hover:text-foreground text-[10px] font-black uppercase tracking-wider transition-colors">
								Flagged
							</button>
						</div>
						<div className="h-4 w-px bg-border/40 hidden md:block mx-1" />
						<PremiumButton
							variant="outline"
							className="h-10 px-6 border-border/40 text-[9px] uppercase font-black tracking-widest rounded-xl"
						>
							Verification Settings
						</PremiumButton>
					</div>
				}
			/>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
				{stats.map((stat, i) => (
					<Card
						key={i}
						className="group relative overflow-hidden border-border/40 bg-card rounded-2xl transition-all duration-300 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05),0_10px_30px_-10px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40_rgba(0,0,0,0.08)]"
					>
						<div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12 blur-2xl transition-all" />
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 relative z-10">
							<CardTitle className="text-[10px] font-black uppercase tracking-[0.15em] text-muted-foreground/80">
								{stat.label}
							</CardTitle>
							<div className={`p-2 ${stat.bg} rounded-lg`}>
								<stat.icon
									className={`w-3.5 h-3.5 ${stat.color === "emerald" ? "text-emerald-500" : stat.color === "amber" ? "text-amber-500" : "text-primary"} group-hover:scale-110 transition-transform`}
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
										stat.color === "primary"
											? "bg-primary/10 text-primary"
											: stat.color === "emerald"
												? "bg-emerald-500/10 text-emerald-500"
												: "bg-amber-500/10 text-amber-500"
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

			<div className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
				{isLoading ? (
					<div className="grid grid-cols-1 gap-4">
						<Skeleton className="h-20 w-full rounded-2xl" />
						<Skeleton className="h-60 w-full rounded-2xl" />
					</div>
				) : (
					<DataTable
						title="Eligibility Audit Trail"
						subtitle="Real-time registry of received EDI 271 benefit responses"
						data={responses || []}
						columns={[
							{
								header: "Audit Reference",
								key: "id",
								render: (resp: any) => (
									<div className="flex items-center gap-4">
										<div className="p-2.5 bg-emerald-500/5 rounded-lg border border-emerald-500/10">
											<ShieldCheck className="w-4 h-4 text-emerald-600" />
										</div>
										<div>
											<p className="text-[13px] font-black text-foreground">
												{resp.id.split("-")[0]}...
											</p>
											<div className="flex items-center gap-2 mt-0.5">
												<Calendar className="w-3 h-3 text-muted-foreground opacity-60" />
												<span className="text-[9px] font-bold text-muted-foreground uppercase">
													{new Date(resp.createdAt).toLocaleDateString()}
												</span>
											</div>
										</div>
									</div>
								),
							},
							{
								header: "Plan Details",
								key: "planStatus",
								render: (resp: any) => (
									<div className="space-y-0.5">
										<p className="text-[11px] font-black text-foreground tracking-tight uppercase">
											{resp.planStatus || "Unknown Plan"}
										</p>
										<p className="text-[9px] font-bold text-muted-foreground opacity-60 uppercase">
											X12 Status: {resp.eligibilityStatus}
										</p>
									</div>
								),
							},
							{
								header: "Control Number",
								key: "id",
								className: "font-bold text-xs uppercase",
								render: (resp: any) => (
									<span className="text-[10px] font-mono text-muted-foreground">
										{resp.id.slice(-8).toUpperCase()}
									</span>
								),
							},
							{
								header: "EDI Trace",
								key: "rawEdiContent",
								render: (resp: any) => (
									<span className="text-[9px] font-black uppercase text-muted-foreground tracking-widest truncate max-w-[150px] inline-block">
										{resp.rawEdiContent?.slice(0, 30)}...
									</span>
								),
							},
							{
								header: "Status",
								key: "eligibilityStatus",
								align: "right",
								render: (resp: any) => (
									<Badge
										className={`rounded-xl px-3 py-1 text-[9px] font-black uppercase tracking-widest border-none ${
											resp.eligibilityStatus === "1"
												? "bg-emerald-500/10 text-emerald-600"
												: "bg-rose-500/10 text-rose-600"
										}`}
									>
										{resp.eligibilityStatus === "1" ? "Active" : "Rejected"}
									</Badge>
								),
							},
							{
								header: "",
								key: "action",
								align: "right",
								render: () => (
									<button className="p-2 hover:bg-primary/5 rounded-lg transition-colors border border-transparent hover:border-border/40">
										<ArrowUpRight className="w-4 h-4 text-muted-foreground" />
									</button>
								),
							},
						]}
					/>
				)}
			</div>
		</div>
	);
}
