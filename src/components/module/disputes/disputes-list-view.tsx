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
import { useDisputes } from "@/hooks/useDisputes";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const getCategory = (statusCode: string) => {
	const code = (statusCode || "").toUpperCase();
	if (["NEW", "UNDER_REVIEW", "PENDING"].includes(code)) return "Active";
	if (["RESOLVED"].includes(code)) return "Resolved";
	if (["DENIED", "CLOSED", "ARCHIVED"].includes(code)) return "Archived";
	return "Active";
};

export function DisputesListView() {
	const { data: disputes, isLoading } = useDisputes();

	const [activeTab, setActiveTab] = useState<
		"Active" | "Resolved" | "Archived"
	>("Active");

	if (isLoading) {
		return (
			<div className="space-y-8 p-8 max-w-[1500px] mx-auto">
				<Skeleton className="h-20 w-full rounded-2xl" />
				<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
					<Skeleton className="h-32 rounded-2xl" />
					<Skeleton className="h-32 rounded-2xl" />
					<Skeleton className="h-32 rounded-2xl" />
					<Skeleton className="h-32 rounded-2xl" />
				</div>
				<Skeleton className="h-[400px] w-full rounded-3xl" />
			</div>
		);
	}

	const safeDisputes = disputes || [];
	const filteredDisputes = safeDisputes.filter(
		(d: any) => getCategory(d.status?.code) === activeTab
	);

	const activeDisputesCount = safeDisputes.filter((d: any) => getCategory(d.status?.code) === "Active").length;
	const resolvedDisputesCount = safeDisputes.filter((d: any) => getCategory(d.status?.code) === "Resolved").length;
	const deniedDisputesCount = safeDisputes.filter((d: any) => d.status?.code?.toUpperCase() === "DENIED").length;

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
						value: activeDisputesCount.toString(),
						trend: "High Priority",
						icon: AlertCircle,
						color: "primary",
					},
					{
						title: "Total Disputes",
						value: safeDisputes.length.toString(),
						trend: "All Queue",
						icon: MessageSquare,
						color: "amber",
					},
					{
						title: "Resolved",
						value: resolvedDisputesCount.toString(),
						trend: "Archived & Solved",
						icon: CheckCircle2,
						color: "emerald",
					},
					{
						title: "Final Denials",
						value: deniedDisputesCount.toString(),
						trend: "Need Review",
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
							render: (dispute: any) => `#${dispute.id.split("-").pop()?.substring(0, 8) || "N/A"}`
						},
						{
							header: "Claim ID",
							key: "claimId",
							className: "px-8 font-bold text-xs text-muted-foreground",
							render: (dispute: any) => dispute.claim?.claimNumber || dispute.claimNumber || "N/A"
						},
						{
							header: "Patient",
							key: "patient",
							className: "px-8 font-bold text-sm",
							render: (dispute: any) => dispute.member ? `${dispute.member.firstName} ${dispute.member.lastName}` : "Unknown"
						},
						{
							header: "Reason",
							key: "reason",
							className: "px-8",
							render: (dispute: any) => (
								<span className="text-[10px] font-black uppercase tracking-wider text-muted-foreground line-clamp-1 max-w-[200px]">
									{dispute.description || "N/A"}
								</span>
							),
						},
						{
							header: "Date",
							key: "date",
							className: "px-8 text-xs text-muted-foreground whitespace-nowrap",
							render: (dispute: any) => dispute.createdAt ? format(new Date(dispute.createdAt), "MMM dd, yyyy") : "N/A"
						},
						{
							header: "Status",
							key: "status",
							className: "px-8",
							render: (dispute: any) => {
								const cat = getCategory(dispute.status?.code);
								return (
									<Badge
										variant="outline"
										className={`text-[9px] font-black uppercase tracking-wider border-none ${
											cat === "Resolved"
												? "bg-emerald-500/10 text-emerald-500"
												: cat === "Archived" 
													? "bg-rose-500/10 text-rose-500"
													: "bg-amber-500/10 text-amber-500"
										}`}
									>
										{dispute.status?.label || "Unknown"}
									</Badge>
								);
							},
						},
						{
							header: "",
							key: "action",
							align: "right",
							className: "px-8",
							render: (dispute: any) => (
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
