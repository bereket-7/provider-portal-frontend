"use client";

import Link from "next/link";
import { useState } from "react";

import {
	AlertCircle,
	Archive,
	ArrowUpRight,
	CheckCircle2,
	Download,
	Eye,
	MessageSquare,
	MoreHorizontal,
	Plus,
	XCircle,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/custom/data-table";
import { ModuleHeader } from "@/components/ui/custom/module-header";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Dispute = (typeof disputes)[0];

// Mock data for disputes with categories
const disputes = [
	{
		id: "DSP-001",
		claimId: "CLM-1042",
		patient: "Sarah Johnson",
		reason: "Incomplete Documentation",
		date: "Feb 17, 2026",
		amount: "$1,200.00",
		status: "Pending",
		category: "Active",
	},
	{
		id: "DSP-002",
		claimId: "CLM-0985",
		patient: "Michael Chen",
		reason: "Incorrect Coding",
		date: "Feb 16, 2026",
		amount: "$850.00",
		status: "Resolved",
		category: "Resolved",
	},
	{
		id: "DSP-003",
		claimId: "CLM-1123",
		patient: "Emma Wilson",
		reason: "Duplicate Submission",
		date: "Feb 16, 2026",
		amount: "$2,400.00",
		status: "Under Review",
		category: "Active",
	},
	{
		id: "DSP-004",
		claimId: "CLM-1056",
		patient: "James Rodriguez",
		reason: "Medical Necessity",
		date: "Feb 15, 2026",
		amount: "$450.00",
		status: "Denied",
		category: "Archived",
	},
	{
		id: "DSP-005",
		claimId: "CLM-0992",
		patient: "Olivia Taylor",
		reason: "Service Non-Covered",
		date: "Feb 14, 2026",
		amount: "$1,100.00",
		status: "Resolved",
		category: "Resolved",
	},
	{
		id: "DSP-006",
		claimId: "CLM-1088",
		patient: "Robert Davis",
		reason: "Authorization Missing",
		date: "Feb 14, 2026",
		amount: "$3,200.00",
		status: "Pending",
		category: "Active",
	},
];

export function DisputesListView() {
	const [activeTab, setActiveTab] = useState<
		"Active" | "Resolved" | "Archived"
	>("Active");

	const filteredDisputes = disputes.filter((d) => d.category === activeTab);

	return (
		<div className="relative space-y-6 pb-12 max-w-[1500px] mx-auto px-4 sm:px-6">
			{/* Sleek Background Elements */}
			<div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
			<div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-red-500/5 rounded-full blur-[100px] pointer-events-none" />

			{/* Refined White Header */}
			<ModuleHeader
				icon={AlertCircle}
				title="Dispute Center"
				subtitle="Resolution Queue • Internal Audit"
				actions={
					<div className="flex items-center gap-3">
						<div className="flex items-center gap-1">
							{["Active", "Resolved", "Archived"].map((tab) => (
								<button
									key={tab}
									onClick={() => setActiveTab(tab as any)}
									className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-wider transition-all relative ${
										activeTab === tab
											? "text-primary"
											: "text-muted-foreground hover:text-foreground"
									}`}
								>
									{tab}
									{activeTab === tab && (
										<span className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary rounded-full animate-in fade-in zoom-in duration-300" />
									)}
								</button>
							))}
						</div>
						<div className="h-4 w-px bg-border/40 hidden md:block mx-1" />
						<Link
							href="/disputes/new"
							className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-xs font-black uppercase tracking-wider shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
						>
							<Plus className="w-4 h-4" />
							New Dispute
						</Link>
					</div>
				}
			/>

			{/* Stats Grid */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
				{[
					{
						title: "Open Disputes",
						value: "24",
						trend: "High Volume",
						icon: AlertCircle,
						color: "primary",
					},
					{
						title: "Pending Payer",
						value: "12",
						trend: "Avg 4.2 Days",
						icon: MessageSquare,
						color: "amber",
					},
					{
						title: "Resolved (MTD)",
						value: "156",
						trend: "84% Success",
						icon: CheckCircle2,
						color: "emerald",
					},
					{
						title: "Final Denials",
						value: "8",
						trend: "-15% YoY",
						icon: XCircle,
						color: "rose",
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
										stat.color === "amber"
											? "bg-amber-500/10 text-amber-500"
											: stat.color === "rose"
												? "bg-rose-500/10 text-rose-500"
												: "bg-emerald-500/10 text-emerald-500"
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

			<div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
				<DataTable
					title="Disputes Register"
					subtitle={`${activeTab} management queue • Adjudication support`}
					data={filteredDisputes}
					onExport={() => console.log("Exporting disputes...")}
					columns={[
						{
							header: "Dispute ID",
							key: "id",
							className: "px-8 font-black text-primary text-xs py-5",
						},
						{
							header: "Claim ID",
							key: "claimId",
							className: "px-8 font-bold text-xs text-muted-foreground",
						},
						{
							header: "Patient",
							key: "patient",
							className: "px-8 font-bold text-sm",
						},
						{
							header: "Reason",
							key: "reason",
							className: "px-8",
							render: (dispute: Dispute) => (
								<span className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">
									{dispute.reason}
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
							render: (dispute: Dispute) => (
								<Badge
									variant="outline"
									className={`text-[9px] font-black uppercase tracking-wider border-none ${
										dispute.status === "Resolved"
											? "bg-emerald-500/10 text-emerald-500"
											: dispute.status === "Pending" ||
												  dispute.status === "Under Review"
												? "bg-amber-500/10 text-amber-500"
												: "bg-rose-500/10 text-rose-500"
									}`}
								>
									{dispute.status}
								</Badge>
							),
						},
						{
							header: "",
							key: "action",
							align: "right",
							className: "px-8",
							render: (dispute: Dispute) => (
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<button className="p-2 hover:bg-primary/5 rounded-lg transition-colors group/btn">
											<MoreHorizontal className="w-4 h-4 text-muted-foreground group-hover/btn:text-primary" />
										</button>
									</DropdownMenuTrigger>
									<DropdownMenuContent
										align="end"
										className="w-48 rounded-xl z-[100]"
									>
										<DropdownMenuLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
											Actions
										</DropdownMenuLabel>
										<DropdownMenuSeparator />
										<DropdownMenuItem asChild>
											<Link
												href={`/disputes/${dispute.id}`}
												className="flex items-center gap-2 cursor-pointer font-bold text-[11px] p-2.5"
											>
												<Eye className="w-3.5 h-3.5" />
												View Details
											</Link>
										</DropdownMenuItem>
										<DropdownMenuItem className="flex items-center gap-2 cursor-pointer font-bold text-[11px] p-2.5">
											<Download className="w-3.5 h-3.5 text-primary" />
											Download Report
										</DropdownMenuItem>
										<DropdownMenuSeparator />
										<DropdownMenuItem className="flex items-center gap-2 cursor-pointer font-bold text-[11px] p-2.5 text-rose-500 hover:text-rose-600">
											<Archive className="w-3.5 h-3.5" />
											Archive Dispute
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							),
						},
					]}
				/>
			</div>
		</div>
	);
}
