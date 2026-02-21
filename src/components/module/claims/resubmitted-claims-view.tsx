"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
	AlertCircle,
	ArrowUpRight,
	Clock,
	History,
	RefreshCcw,
	TrendingUp,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/custom/data-table";
import { ModuleHeader } from "@/components/ui/custom/module-header";

const mockResubmittedClaims = [
	{
		id: "RESUB-101",
		originalId: "CLM-882",
		patient: "John Doe",
		payer: "Aetna Healthcare",
		date: "Feb 17, 2026",
		status: "In Review",
		type: "Institutional",
		amount: "$2,450.00",
		revision: 2,
	},
	{
		id: "RESUB-102",
		originalId: "CLM-901",
		patient: "Sarah Smith",
		payer: "BlueCross BlueShield",
		date: "Feb 17, 2026",
		status: "Accepted",
		type: "Professional",
		amount: "$1,200.00",
		revision: 1,
	},
	{
		id: "RESUB-103",
		originalId: "CLM-774",
		patient: "Robert Johnson",
		payer: "UnitedHealth Group",
		date: "Feb 16, 2026",
		status: "Pending",
		type: "Dental",
		amount: "$450.00",
		revision: 3,
	},
	{
		id: "RESUB-104",
		originalId: "CLM-661",
		patient: "Emily White",
		payer: "Cigna Health",
		date: "Feb 16, 2026",
		status: "Rejected",
		type: "Pharmacy",
		amount: "$120.00",
		revision: 1,
	},
	{
		id: "RESUB-105",
		originalId: "CLM-552",
		patient: "Michael Brown",
		payer: "Humana Inc.",
		date: "Feb 15, 2026",
		status: "Accepted",
		type: "Institutional",
		amount: "$8,900.00",
		revision: 2,
	},
];

type ResubmittedClaim = (typeof mockResubmittedClaims)[0];

export function ResubmittedClaimsView() {
	const router = useRouter();
	return (
		<div className="relative space-y-8 pb-12 max-w-[1500px] mx-auto px-4 sm:px-6">
			{/* Dynamic Background Elements */}
			<div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
			<div className="absolute bottom-10 left-0 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

			<ModuleHeader
				icon={RefreshCcw}
				title="Resubmitted Claims"
				subtitle="Revision Tracking • Processing Oversight"
			/>

			{/* High-Impact Stats */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
				{[
					{
						title: "Total Resubmissions",
						value: "142",
						trend: "+8% this month",
						icon: History,
						color: "primary",
					},
					{
						title: "Success Rate",
						value: "88.5%",
						trend: "High fulfillment",
						icon: TrendingUp,
						color: "emerald",
					},
					{
						title: "Avg. Turnaround",
						value: "4.2 Days",
						trend: "Improving velocity",
						icon: Clock,
						color: "amber",
					},
					{
						title: "Active Revisions",
						value: "28",
						trend: "Requires attention",
						icon: AlertCircle,
						color: "rose",
					},
				].map((stat, i) => (
					<Card
						key={i}
						className="group relative overflow-hidden border-border/40 bg-card rounded-2xl transition-all duration-300 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05),0_10px_30px_-10px_rgba(0,0,0,0.03)] hover:shadow-xl"
					>
						<div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12 blur-2xl group-hover:bg-primary/10 transition-all" />
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
							<CardTitle className="text-[10px] font-black uppercase tracking-[0.15em] text-muted-foreground/80">
								{stat.title}
							</CardTitle>
							<div className="p-2 bg-primary/10 rounded-lg">
								<stat.icon className="w-3.5 h-3.5 text-primary" />
							</div>
						</CardHeader>
						<CardContent className="relative z-10">
							<div className="text-2xl font-black text-foreground tabular-nums">
								{stat.value}
							</div>
							<div className="mt-2 flex items-center justify-between">
								<span
									className={`text-[9px] font-black uppercase tracking-wider ${
										stat.color === "emerald"
											? "text-emerald-500"
											: stat.color === "rose"
												? "text-rose-500"
												: stat.color === "amber"
													? "text-amber-500"
													: "text-primary"
									}`}
								>
									{stat.trend}
								</span>
								<ArrowUpRight className="w-3 h-3 text-muted-foreground/30 opacity-0 group-hover:opacity-100 transition-all" />
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			<div className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
				<DataTable
					title="Resubmission Registry"
					subtitle="Revision history and status tracking"
					data={mockResubmittedClaims}
					onRowClick={(claim: ResubmittedClaim) =>
						router.push(`/claims/${claim.id}`)
					}
					onExport={() => console.log("Exporting resubmitted...")}
					columns={[
						{
							header: "Resubmission ID",
							key: "id",
							render: (claim: ResubmittedClaim) => (
								<div className="flex items-center gap-4">
									<div className="p-2.5 bg-primary/5 rounded-lg border border-primary/10">
										<RefreshCcw className="w-4 h-4 text-primary" />
									</div>
									<div>
										<p className="text-[13px] font-black text-foreground">
											{claim.id}
										</p>
										<div className="flex items-center gap-2 mt-0.5">
											<History className="w-3 h-3 text-muted-foreground opacity-60" />
											<span className="text-[9px] font-bold text-muted-foreground uppercase">
												Org: {claim.originalId} • Rev {claim.revision}
											</span>
										</div>
									</div>
								</div>
							),
						},
						{
							header: "Patient & Payer",
							key: "patient",
							render: (claim: ResubmittedClaim) => (
								<div className="space-y-0.5">
									<p className="text-[11px] font-black text-foreground tracking-tight uppercase">
										{claim.patient}
									</p>
									<p className="text-[9px] font-bold text-muted-foreground opacity-60 uppercase">
										{claim.payer}
									</p>
								</div>
							),
						},
						{
							header: "Date",
							key: "date",
							className: "text-xs text-muted-foreground whitespace-nowrap",
						},
						{
							header: "Amount",
							key: "amount",
							className: "font-black tabular-nums",
						},
						{
							header: "Status",
							key: "status",
							align: "center",
							render: (claim: ResubmittedClaim) => (
								<Badge
									className={`rounded-xl px-3 py-1 text-[9px] font-black uppercase tracking-widest border-none ${
										claim.status === "Accepted"
											? "bg-emerald-500/10 text-emerald-600"
											: claim.status === "Rejected"
												? "bg-rose-500/10 text-rose-600"
												: claim.status === "In Review"
													? "bg-amber-500/10 text-amber-600"
													: "bg-blue-500/10 text-blue-600"
									}`}
								>
									{claim.status}
								</Badge>
							),
						},
						{
							header: "",
							key: "action",
							align: "right",
							render: (claim: ResubmittedClaim) => (
								<Link href={`/claims/${claim.id}`}>
									<button className="p-2 hover:bg-primary/5 rounded-lg transition-colors border border-transparent hover:border-border/40">
										<ArrowUpRight className="w-4 h-4 text-muted-foreground" />
									</button>
								</Link>
							),
						},
					]}
				/>
			</div>
		</div>
	);
}
