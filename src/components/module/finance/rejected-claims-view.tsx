"use client";

import { useRouter } from "next/navigation";

import {
	AlertCircle,
	ArrowUpRight,
	FileX,
	History,
	MoreHorizontal,
	RefreshCw,
	ShieldAlert,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/custom/data-table";
import { ModuleHeader } from "@/components/ui/custom/module-header";

// Mock data for rejected claims
const rejectedClaims = [
	{
		id: "CLM-REJ-001",
		patient: "Daniel Alemu",
		date: "Feb 18, 2026",
		amount: "ETB 2,100.00",
		status: "Rejected",
		reason: "Missing Modifier",
		payer: "Nyala Insurance",
	},
	{
		id: "CLM-REJ-002",
		patient: "Tigist Assefa",
		date: "Feb 17, 2026",
		amount: "ETB 980.00",
		status: "Rejected",
		reason: "Duplicate Submission",
		payer: "Awash Insurance",
	},
	{
		id: "CLM-REJ-003",
		patient: "Abiy Kebede",
		date: "Feb 16, 2026",
		amount: "ETB 3,250.00",
		status: "Rejected",
		reason: "Invalid NPI",
		payer: "Ethiopian Insurance Corporation",
	},
	{
		id: "CLM-REJ-004",
		patient: "Hanna Bekele",
		date: "Feb 15, 2026",
		amount: "ETB 620.00",
		status: "Rejected",
		reason: "Patient Not Eligible",
		payer: "United Insurance Company of Ethiopia",
	},
];

type Claim = (typeof rejectedClaims)[0];

export function RejectedClaimsView() {
	const router = useRouter();

	return (
		<div className="relative space-y-6 pb-12 max-w-[1500px] mx-auto px-4 sm:px-6">
			{/* Sleek Background Elements */}
			<div className="absolute top-0 right-0 w-[400px] h-[400px] bg-rose-500/5 rounded-full blur-[100px] pointer-events-none" />
			<div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

			<ModuleHeader
				icon={FileX}
				title="Rejected Claims"
				subtitle="Denial Management • Financial Recovery"
				actions={
					<div className="flex items-center gap-3">
						<div className="flex items-center gap-1">
							<button className="px-4 py-1.5 text-primary text-[10px] font-black uppercase tracking-wider relative">
								Critical
								<span className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary rounded-full" />
							</button>
							<button className="px-4 py-1.5 text-muted-foreground hover:text-foreground text-[10px] font-black uppercase tracking-wider transition-colors">
								Resolved
							</button>
						</div>
						<div className="h-4 w-px bg-border/40 hidden md:block mx-1" />
						<button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-xs font-black uppercase tracking-wider shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
							<RefreshCw className="w-3.5 h-3.5" />
							Sync Gateway
						</button>
					</div>
				}
			/>

			{/* Stats Grid */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
				{[
					{
						title: "Total Rejected",
						value: "42",
						trend: "+4 Today",
						icon: ShieldAlert,
						color: "rose",
					},
					{
						title: "At Risk Amount",
						value: "$12,450.20",
						trend: "High Priority",
						icon: FileX,
						color: "rose",
					},
					{
						title: "Avg Denial Rate",
						value: "3.2%",
						trend: "Below Benchmark",
						icon: AlertCircle,
						color: "amber",
					},
					{
						title: "Recovery Progress",
						value: "68%",
						trend: "Resubmitted",
						icon: History,
						color: "emerald",
					},
				].map((stat, i) => (
					<Card
						key={i}
						className="group relative overflow-hidden border-border/40 bg-card rounded-2xl transition-all duration-300 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05),0_10px_30px_-10px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)]"
					>
						<div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/5 rounded-full -mr-12 -mt-12 blur-2xl transition-all" />
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 relative z-10">
							<CardTitle className="text-[10px] font-black uppercase tracking-[0.15em] text-muted-foreground/80">
								{stat.title}
							</CardTitle>
							<div className="p-2 bg-rose-500/10 rounded-lg">
								<stat.icon className="w-3.5 h-3.5 text-rose-500 group-hover:scale-110 transition-transform" />
							</div>
						</CardHeader>
						<CardContent className="relative z-10">
							<div className="text-2xl font-black text-foreground tabular-nums">
								{stat.value}
							</div>
							<div className="mt-2 flex items-center justify-between">
								<div
									className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
										stat.color === "emerald"
											? "bg-emerald-500/10 text-emerald-500"
											: "bg-rose-500/10 text-rose-500"
									}`}
								>
									{stat.trend}
								</div>
								<ArrowUpRight className="w-4 h-4 text-muted-foreground/20 group-hover:text-rose-500 transition-colors" />
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			<div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
				<DataTable
					title="Denial Ledger"
					subtitle="Rejected submissions requiring financial intervention"
					data={rejectedClaims}
					onRowClick={(claim: Claim) => router.push(`/claims/${claim.id}`)}
					columns={[
						{
							header: "Claim ID",
							key: "id",
							className: "px-8 font-black text-rose-500 text-xs py-5",
						},
						{
							header: "Patient",
							key: "patient",
							className: "px-8 font-bold text-sm",
						},
						{
							header: "Payer",
							key: "payer",
							className: "px-8 text-xs font-bold",
						},
						{
							header: "Denial Reason",
							key: "reason",
							className: "px-8",
							render: (claim: Claim) => (
								<span className="text-[10px] font-black uppercase tracking-wider text-rose-600/70 border border-rose-500/20 px-2 py-1 rounded-md bg-rose-500/5">
									{claim.reason}
								</span>
							),
						},
						{
							header: "Amount",
							key: "amount",
							className: "px-8 font-black tabular-nums",
						},
						{
							header: "Action",
							key: "id",
							className: "px-8",
							render: () => (
								<button className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 text-white rounded-lg text-[10px] font-black uppercase tracking-wider hover:bg-black transition-colors">
									Resubmit
								</button>
							),
						},
						{
							header: "",
							key: "action",
							align: "right",
							className: "px-8",
							render: (claim: Claim) => (
								<button className="p-2 hover:bg-slate-100 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
									<MoreHorizontal className="w-4 h-4 text-muted-foreground" />
								</button>
							),
						},
					]}
				/>
			</div>
		</div>
	);
}
