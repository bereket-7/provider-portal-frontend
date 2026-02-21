"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
	Banknote,
	CheckCircle2,
	Clock,
	DollarSign,
	MoreHorizontal,
	Plus,
	Receipt,
	TrendingUp,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/custom/data-table";
import { ModuleHeader } from "@/components/ui/custom/module-header";

type CashClaim = (typeof cashClaims)[0];

// Mock data for cash payer claims
const cashClaims = [
	{
		id: "CSH-001",
		service: "Annual Physical Exam",
		patient: "Sarah Johnson",
		payee: "Self-Pay",
		date: "Feb 17, 2026",
		amount: "$120.00",
		status: "Paid",
	},
	{
		id: "CSH-002",
		service: "Blood Work Panel",
		patient: "Michael Chen",
		payee: "Direct Billing",
		date: "Feb 16, 2026",
		amount: "$85.00",
		status: "Pending",
	},
	{
		id: "CSH-003",
		service: "Chest X-Ray",
		patient: "Emma Wilson",
		payee: "Self-Pay",
		date: "Feb 16, 2026",
		amount: "$240.00",
		status: "Refunded",
	},
	{
		id: "CSH-004",
		service: "Dental Cleaning",
		patient: "James Rodriguez",
		payee: "Direct Billing",
		date: "Feb 15, 2026",
		amount: "$150.00",
		status: "Paid",
	},
	{
		id: "CSH-005",
		service: "Flu Vaccination",
		patient: "Olivia Taylor",
		payee: "Self-Pay",
		date: "Feb 14, 2026",
		amount: "$35.00",
		status: "Paid",
	},
	{
		id: "CSH-006",
		service: "Consultation Fee",
		patient: "Robert Davis",
		payee: "Direct Billing",
		date: "Feb 14, 2026",
		amount: "$100.00",
		status: "Pending",
	},
];

export function CashPayerClaimsView() {
	const router = useRouter();
	return (
		<div className="relative space-y-6 pb-12 max-w-[1500px] mx-auto px-4 sm:px-6">
			{/* Sleek Background Elements */}
			<div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
			<div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

			{/* Refined White Header */}
			<ModuleHeader
				icon={Receipt}
				title="Cash Payer Claims"
				subtitle="DCMES • Direct Reimbursement"
				actions={
					<div className="flex items-center gap-3">
						<div className="flex items-center gap-1">
							<button className="px-4 py-1.5 text-primary text-[10px] font-black uppercase tracking-wider relative">
								Registry
								<span className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary rounded-full" />
							</button>
							<button className="px-4 py-1.5 text-muted-foreground hover:text-foreground text-[10px] font-black uppercase tracking-wider transition-colors">
								Daily Report
							</button>
							<button className="px-4 py-1.5 text-muted-foreground hover:text-foreground text-[10px] font-black uppercase tracking-wider transition-colors">
								Audits
							</button>
						</div>
						<div className="h-4 w-px bg-border/40 hidden md:block mx-1" />
						<Link href="/dcmes/new">
							<button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-xs font-black uppercase tracking-wider shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
								<Plus className="w-4 h-4" />
								Manual Entry
							</button>
						</Link>
					</div>
				}
			/>

			{/* Stats Grid */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
				{[
					{
						title: "Total Cash Claims",
						value: "1,124",
						trend: "+12.5%",
						icon: Banknote,
						color: "primary",
					},
					{
						title: "Processed (MTD)",
						value: "842",
						trend: "High Volume",
						icon: CheckCircle2,
						color: "emerald",
					},
					{
						title: "Total Value",
						value: "$42.5k",
						trend: "Revenue Up",
						icon: DollarSign,
						color: "emerald",
					},
					{
						title: "Direct Pay Rate",
						value: "72%",
						trend: "+4% Efficiency",
						icon: TrendingUp,
						color: "primary",
					},
				].map((stat, i) => (
					<Card
						key={i}
						className="group relative overflow-hidden border-border/40 bg-card rounded-2xl transition-all duration-300 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05),0_10px_30px_-10px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)]"
					>
						<div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12 blur-2xl transition-all" />
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 relative z-10">
							<CardTitle className="text-[10px] font-black uppercase tracking-[0.15em] text-muted-foreground/80">
								{stat.title}
							</CardTitle>
							<div className="p-2 bg-primary/10 rounded-lg">
								<stat.icon className="w-3.5 h-3.5 text-primary group-hover:scale-110 transition-transform" />
							</div>
						</CardHeader>
						<CardContent className="relative z-10">
							<div className="text-2xl font-black text-foreground tabular-nums">
								{stat.value}
							</div>
							<div className="mt-2 flex items-center justify-between">
								<div
									className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
										stat.color === "rose"
											? "bg-rose-500/10 text-rose-500"
											: "bg-emerald-500/10 text-emerald-500"
									}`}
								>
									{stat.trend}
								</div>
								<Clock className="w-4 h-4 text-muted-foreground/20 group-hover:text-primary transition-colors" />
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			<div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
				<DataTable
					title="Reimbursement Ledger"
					subtitle="DCMES Registry • Cash Payment Records"
					data={cashClaims}
					onRowClick={(claim: CashClaim) => router.push(`/dcmes/${claim.id}`)}
					onExport={() => console.log("Exporting cash claims...")}
					columns={[
						{
							header: "ID",
							key: "id",
							className: "px-8 font-black text-primary text-xs py-5",
						},
						{
							header: "Service",
							key: "service",
							className: "px-8 font-bold text-sm",
						},
						{
							header: "Patient",
							key: "patient",
							className: "px-8 font-bold text-xs text-muted-foreground",
						},
						{
							header: "Payee",
							key: "payee",
							className: "px-8",
							render: (claim: CashClaim) => (
								<span className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">
									{claim.payee}
								</span>
							),
						},
						{
							header: "Date",
							key: "date",
							className: "px-8 text-xs text-muted-foreground whitespace-nowrap",
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
							render: (claim: CashClaim) => (
								<Badge
									variant="outline"
									className={`text-[9px] font-black uppercase tracking-wider border-none ${
										claim.status === "Paid"
											? "bg-emerald-500/10 text-emerald-500"
											: claim.status === "Pending"
												? "bg-amber-500/10 text-amber-500"
												: "bg-rose-500/10 text-rose-500"
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
							className: "px-8",
							render: (claim: CashClaim) => (
								<Link href={`/dcmes/${claim.id}`}>
									<button className="p-2 hover:bg-primary/5 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
										<MoreHorizontal className="w-4 h-4 text-muted-foreground" />
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
