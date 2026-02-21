"use client";

import { useRouter } from "next/navigation";

import {
	Activity,
	ArrowUpRight,
	Clock,
	Filter,
	Hourglass,
	MoreHorizontal,
	Zap,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/custom/data-table";
import { ModuleHeader } from "@/components/ui/custom/module-header";

// Mock data for pending claims
const pendingClaims = [
	{
		id: "CLM-PEN-001",
		patient: "James Miller",
		date: "Feb 19, 2026",
		amount: "$1,450.00",
		status: "Pending",
		aging: "2 Days",
		priority: "Medium",
	},
	{
		id: "CLM-PEN-002",
		patient: "Susan Bone",
		date: "Feb 18, 2026",
		amount: "$3,800.00",
		status: "Pending",
		aging: "3 Days",
		priority: "High",
	},
	{
		id: "CLM-PEN-003",
		patient: "Edward Norton",
		date: "Feb 15, 2026",
		amount: "$750.00",
		status: "Pending",
		aging: "6 Days",
		priority: "Critical",
	},
	{
		id: "CLM-PEN-004",
		patient: "Alicia Keys",
		date: "Feb 20, 2026",
		amount: "$1,100.00",
		status: "In Process",
		aging: "1 Day",
		priority: "Low",
	},
];

type Claim = (typeof pendingClaims)[0];

export function PendingClaimsView() {
	const router = useRouter();

	return (
		<div className="relative space-y-6 pb-12 max-w-[1500px] mx-auto px-4 sm:px-6">
			{/* Sleek Background Elements */}
			<div className="absolute top-0 right-0 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />
			<div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

			<ModuleHeader
				icon={Clock}
				title="Pending Claims"
				subtitle="Processing Queue • Operational Intelligence"
				actions={
					<div className="flex items-center gap-3">
						<button className="p-2 border border-border/40 rounded-xl hover:bg-slate-50 transition-colors">
							<Filter className="w-4 h-4 text-muted-foreground" />
						</button>
						<div className="h-4 w-px bg-border/40" />
						<button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-lg shadow-black/10 hover:scale-[1.02] active:scale-[0.98] transition-all">
							<Zap className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
							Expedite Queue
						</button>
					</div>
				}
			/>

			{/* Stats Grid */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
				{[
					{
						title: "Active in Queue",
						value: "156",
						trend: "Normal Load",
						icon: Activity,
						color: "primary",
					},
					{
						title: "Avg Aging",
						value: "3.4 Days",
						trend: "-0.5 vs Last Week",
						icon: Hourglass,
						color: "emerald",
					},
					{
						title: "Critical Priority",
						value: "12",
						trend: "Action Required",
						icon: AlertCircle, // Note: Need to import AlertCircle if not available
						color: "rose",
					},
					{
						title: "Value in Process",
						value: "$248.5K",
						trend: "Projected 48h",
						icon: Clock,
						color: "amber",
					},
				].map((stat, i) => (
					<Card
						key={i}
						className="group relative overflow-hidden border-border/40 bg-card rounded-2xl transition-all duration-300 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05),0_10px_30px_-10px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)]"
					>
						<div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full -mr-12 -mt-12 blur-2xl transition-all" />
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 relative z-10">
							<CardTitle className="text-[10px] font-black uppercase tracking-[0.15em] text-muted-foreground/80">
								{stat.title}
							</CardTitle>
							<div className="p-2 bg-amber-500/10 rounded-lg">
								<stat.icon className="w-3.5 h-3.5 text-amber-600 group-hover:scale-110 transition-transform" />
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
											: stat.color === "rose"
												? "bg-rose-500/10 text-rose-500"
												: "bg-primary/10 text-primary"
									}`}
								>
									{stat.trend}
								</div>
								<ArrowUpRight className="w-4 h-4 text-muted-foreground/20 group-hover:text-amber-500 transition-colors" />
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			<div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
				<DataTable
					title="Processing Backlog"
					subtitle="Live queue of claims awaiting final adjudication"
					data={pendingClaims}
					onRowClick={(claim: Claim) => router.push(`/claims/${claim.id}`)}
					columns={[
						{
							header: "Claim ID",
							key: "id",
							className: "px-8 font-black text-amber-600 text-xs py-5",
						},
						{
							header: "Patient",
							key: "patient",
							className: "px-8 font-bold text-sm",
						},
						{
							header: "Priority",
							key: "priority",
							className: "px-8",
							render: (claim: Claim) => (
								<div className="flex items-center gap-2">
									<div
										className={`w-1.5 h-1.5 rounded-full ${
											claim.priority === "Critical"
												? "bg-rose-500 animate-pulse"
												: claim.priority === "High"
													? "bg-orange-500"
													: "bg-blue-500"
										}`}
									/>
									<span className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">
										{claim.priority}
									</span>
								</div>
							),
						},
						{
							header: "Aging",
							key: "aging",
							className: "px-8 text-xs font-bold text-muted-foreground",
						},
						{
							header: "Amount",
							key: "amount",
							className: "px-8 font-black tabular-nums",
						},
						{
							header: "Status",
							key: "status",
							className: "px-8",
							render: (claim: Claim) => (
								<Badge className="bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 border-none text-[9px] font-black uppercase tracking-widest px-2.5 py-1">
									{claim.status}
								</Badge>
							),
						},
						{
							header: "",
							key: "action",
							align: "right",
							className: "px-8",
							render: (claim: Claim) => (
								<button className="p-2 hover:bg-amber-500/5 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
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

// Internal helper for Missing alert circle
function AlertCircle({ className }: { className?: string }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}
		>
			<circle cx="12" cy="12" r="10" />
			<line x1="12" y1="8" x2="12" y2="12" />
			<line x1="12" y1="16" x2="12.01" y2="16" />
		</svg>
	);
}
