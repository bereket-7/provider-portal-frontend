"use client";

import {
	Activity,
	ArrowUpRight,
	Building2,
	CreditCard,
	DollarSign,
	FileText,
	Globe,
	MoreHorizontal,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/custom/data-table";
import { ModuleHeader } from "@/components/ui/custom/module-header";

// Mock data for payouts
const payouts = [
	{
		id: "PAY-001",
		entity: "Aetna Health",
		date: "Feb 20, 2026",
		amount: "$12,450.00",
		status: "Completed",
		method: "Wire Transfer",
		claims: 12,
	},
	{
		id: "PAY-002",
		entity: "Medicare Part B",
		date: "Feb 19, 2026",
		amount: "$8,920.50",
		status: "Pending",
		method: "ACH",
		claims: 45,
	},
	{
		id: "PAY-003",
		entity: "UnitedHealth Group",
		date: "Feb 18, 2026",
		amount: "$24,100.00",
		status: "Completed",
		method: "Real-Time Pay",
		claims: 82,
	},
	{
		id: "PAY-004",
		entity: "Cigna Medical",
		date: "Feb 17, 2026",
		amount: "$5,140.00",
		status: "Processing",
		method: "Check",
		claims: 8,
	},
];

type Payout = (typeof payouts)[0];

export function PayoutsView() {
	return (
		<div className="relative space-y-6 pb-12 max-w-[1500px] mx-auto px-4 sm:px-6">
			{/* Sleek Background Elements */}
			<div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />
			<div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

			<ModuleHeader
				icon={DollarSign}
				title="Payouts & Treasury"
				subtitle="Financial Settlement • Payer Reconciliation"
				actions={
					<div className="flex items-center gap-3">
						<button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-lg shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
							<CreditCard className="w-3.5 h-3.5" />
							Initiate Payout
						</button>
					</div>
				}
			/>

			{/* Stats Grid */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
				{[
					{
						title: "Total Paid YTD",
						value: "$1.42M",
						trend: "+12.4% vs 2025",
						icon: Building2,
						color: "emerald",
					},
					{
						title: "Avg Payout Cycle",
						value: "14.2 Days",
						trend: "-2 days optimized",
						icon: Activity,
						color: "primary",
					},
					{
						title: "Pending Treasury",
						value: "$248,930",
						trend: "Net 15 forecast",
						icon: Globe,
						color: "amber",
					},
					{
						title: "Active Batch",
						value: "84 Claims",
						trend: "Processing now",
						icon: FileText,
						color: "blue",
					},
				].map((stat, i) => (
					<Card
						key={i}
						className="group relative overflow-hidden border-border/40 bg-card rounded-2xl transition-all duration-300 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05),0_10px_30px_-10px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)]"
					>
						<div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full -mr-12 -mt-12 blur-2xl transition-all" />
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 relative z-10">
							<CardTitle className="text-[10px] font-black uppercase tracking-[0.15em] text-muted-foreground/80">
								{stat.title}
							</CardTitle>
							<div className="p-2 bg-emerald-500/10 rounded-lg">
								<stat.icon className="w-3.5 h-3.5 text-emerald-600 group-hover:scale-110 transition-transform" />
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
											: "bg-primary/10 text-primary"
									}`}
								>
									{stat.trend}
								</div>
								<ArrowUpRight className="w-4 h-4 text-muted-foreground/20 group-hover:text-emerald-500 transition-colors" />
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			<div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
				<DataTable
					title="Payout Ledger"
					subtitle="Comprehensive history of payer-to-provider settlements"
					data={payouts}
					columns={[
						{
							header: "Transaction ID",
							key: "id",
							className: "px-8 font-black text-emerald-600 text-xs py-5",
						},
						{
							header: "Payer Entity",
							key: "entity",
							className: "px-8 font-bold text-sm",
						},
						{
							header: "Method",
							key: "method",
							className:
								"px-8 text-[10px] font-black uppercase tracking-wider text-muted-foreground",
						},
						{
							header: "Batch Size",
							key: "claims",
							className: "px-8",
							render: (payout: Payout) => (
								<span className="text-xs font-bold">
									{payout.claims} Claims
								</span>
							),
						},
						{
							header: "Amount",
							key: "amount",
							className: "px-8 font-black tabular-nums text-emerald-700",
						},
						{
							header: "Status",
							key: "status",
							className: "px-8",
							render: (payout: Payout) => (
								<Badge
									variant="outline"
									className={`text-[9px] font-black uppercase tracking-wider border-none ${
										payout.status === "Completed"
											? "bg-emerald-500/10 text-emerald-500"
											: payout.status === "Processing"
												? "bg-amber-500/10 text-amber-500"
												: "bg-blue-500/10 text-blue-500"
									}`}
								>
									{payout.status}
								</Badge>
							),
						},
						{
							header: "",
							key: "action",
							align: "right",
							className: "px-8",
							render: (payout: Payout) => (
								<button className="p-2 hover:bg-emerald-500/5 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
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
