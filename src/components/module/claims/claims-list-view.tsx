"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
	ArrowUpRight,
	CheckCircle2,
	Clock,
	FileText,
	MoreHorizontal,
	Plus,
	XCircle,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/custom/data-table";
import { ModuleHeader } from "@/components/ui/custom/module-header";
import { useClaims } from "@/hooks/useClaims";
import { useClaimStats } from "@/hooks/useClaimStats";
import { usePayers } from "@/hooks/usePayers";
import { syncRemittances } from "@/_service/actions/claim-actions";
import { demoSyncRemittances } from "@/lib/demo/demo-api";
import { isDemoMode } from "@/lib/demo/demo-mode";
import { useDemoStore } from "@/lib/demo/demo-store-context";
import { toast } from "sonner";
import { useMemo, useState } from "react";

export function ClaimsListView() {
	const router = useRouter();
	const { bumpVersion } = useDemoStore();
	const { data: claims, isLoading: isClaimsLoading, refetch } = useClaims();
	const { data: payers } = usePayers();
	const { data: stats, isLoading: isStatsLoading } = useClaimStats();
	const [isSyncing, setIsSyncing] = useState(false);
	const [statusFilter, setStatusFilter] = useState<string>("all");
	const [payerFilter, setPayerFilter] = useState<string>("all");
	const [dateFrom, setDateFrom] = useState("");
	const [dateTo, setDateTo] = useState("");

	const filteredClaims = useMemo(() => {
		let list = (claims || []).filter(
			(c: any) => !["DRAFT", "draft"].includes(c.status)
		);
		if (statusFilter !== "all") {
			list = list.filter(
				(c: any) => c.status?.toUpperCase() === statusFilter.toUpperCase()
			);
		}
		if (payerFilter !== "all") {
			list = list.filter((c: any) => c.payerId === payerFilter);
		}
		if (dateFrom) list = list.filter((c: any) => c.serviceFrom >= dateFrom);
		if (dateTo) list = list.filter((c: any) => c.serviceTo <= dateTo);
		return list;
	}, [claims, statusFilter, payerFilter, dateFrom, dateTo]);

	const isLoading = isClaimsLoading || isStatsLoading;

	if (isLoading) {
		return (
			<div className="flex items-center justify-center min-h-[400px]">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
			</div>
		);
	}

	const handleSync = async () => {
		setIsSyncing(true);
		try {
			const res = isDemoMode()
				? await demoSyncRemittances()
				: await syncRemittances();
			if (res.success) {
				toast.success(res.message);
				if (isDemoMode()) bumpVersion();
				refetch();
			} else {
				toast.error((res as { message?: string }).message);
			}
		} catch {
			toast.error("Failed to sync remittances");
		} finally {
			setIsSyncing(false);
		}
	};

	const statItems = [
		{
			title: "Total Submitted",
			value: stats?.totalSubmitted?.toLocaleString() || "0",
			trend: stats?.submittedTrend || "Live Data",
			icon: FileText,
			color: "primary",
		},
		{
			title: "Pending Review",
			value: stats?.pendingReview?.toLocaleString() || "0",
			trend: stats?.pendingTrend || "High Priority",
			icon: Clock,
			color: "amber",
		},
		{
			title: "Approved",
			value: stats?.approved?.toLocaleString() || "0",
			trend: stats?.approvedTrend || "94% Rate",
			icon: CheckCircle2,
			color: "emerald",
		},
		{
			title: "Denied",
			value: stats?.denied?.toLocaleString() || "0",
			trend: stats?.deniedTrend || "Avoided",
			icon: XCircle,
			color: "rose",
		},
	];

	return (
		<div className="relative space-y-6 pb-12 max-w-[1500px] mx-auto px-4 sm:px-6">
			{/* Sleek Background Elements */}
			<div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
			<div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sky-500/5 rounded-full blur-[100px] pointer-events-none" />

			{/* Refined White Header */}
			<ModuleHeader
				icon={FileText}
				title="Claims Management"
				subtitle="Live Processing • Provider Network Team"
				actions={
					<div className="flex items-center gap-3">
						<div className="flex items-center gap-2">
							<button 
								onClick={handleSync}
								disabled={isSyncing}
								className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-xs font-black uppercase tracking-wider shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
							>
								{isSyncing ? (
									<div className="h-3 w-3 animate-spin rounded-full border-b-2 border-current" />
								) : (
									<ArrowUpRight className="w-4 h-4" />
								)}
								Sync
							</button>
							<div className="h-4 w-px bg-border/40 hidden md:block mx-1" />
							<button className="px-4 py-1.5 text-primary text-[10px] font-black uppercase tracking-wider relative">
								All Claims
								<span className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary rounded-full" />
							</button>
							<button className="px-4 py-1.5 text-muted-foreground hover:text-foreground text-[10px] font-black uppercase tracking-wider transition-colors">
								Flagged
							</button>
							<button className="px-4 py-1.5 text-muted-foreground hover:text-foreground text-[10px] font-black uppercase tracking-wider transition-colors">
								Archived
							</button>
						</div>
						<div className="h-4 w-px bg-border/40 hidden md:block mx-1" />
						<Link
							href="/new-claim"
							className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-xs font-black uppercase tracking-wider shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
						>
							<Plus className="w-4 h-4" />
							New Claim
						</Link>
					</div>
				}
			/>

			{/* Stats Grid */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
				{statItems.map((stat, i) => (
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

			<div className="flex flex-wrap gap-3 p-4 rounded-2xl border border-border/40 bg-card/50">
				<select
					value={statusFilter}
					onChange={(e) => setStatusFilter(e.target.value)}
					className="h-10 px-3 rounded-xl border border-border/40 text-sm font-bold"
				>
					<option value="all">All Statuses</option>
					<option value="SUBMITTED">Submitted</option>
					<option value="PENDING">Pending</option>
					<option value="APPROVED">Approved</option>
					<option value="REJECTED">Rejected</option>
					<option value="PAID">Paid</option>
				</select>
				<select
					value={payerFilter}
					onChange={(e) => setPayerFilter(e.target.value)}
					className="h-10 px-3 rounded-xl border border-border/40 text-sm font-bold min-w-[180px]"
				>
					<option value="all">All Insurers</option>
					{(payers || []).map((p: any) => (
						<option key={p.id} value={p.id}>
							{p.name}
						</option>
					))}
				</select>
				<input
					type="date"
					value={dateFrom}
					onChange={(e) => setDateFrom(e.target.value)}
					className="h-10 px-3 rounded-xl border border-border/40 text-sm"
				/>
				<input
					type="date"
					value={dateTo}
					onChange={(e) => setDateTo(e.target.value)}
					className="h-10 px-3 rounded-xl border border-border/40 text-sm"
				/>
			</div>

			<div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
				<DataTable
					title="Claims Ledger"
					subtitle="Live processing registry • Professional & Institutional"
					data={filteredClaims}
					onRowClick={(claim: any) => router.push(`/claims/${claim.id}`)}
					onExport={() => console.log("Exporting claims...")}
					columns={[
						{
							header: "Claim ID",
							key: "claimNumber",
							className: "px-8 font-black text-primary text-xs py-5",
							render: (claim: any) => claim.claimNumber || `CLM-${claim.id.substring(0, 4)}`,
						},
						{
							header: "Patient Name",
							key: "patient",
							className: "px-8 font-bold text-sm",
							render: (claim: any) => `${claim.patient?.firstName} ${claim.patient?.lastName}`,
						},
						{
							header: "Payer",
							key: "payer",
							className: "px-8 text-[10px] font-black uppercase tracking-wider text-muted-foreground",
							render: (claim: any) => claim.payer?.name || "N/A",
						},
						{
							header: "DoS",
							key: "serviceFrom",
							className: "px-8 text-xs text-muted-foreground whitespace-nowrap",
						},
						{
							header: "Amount",
							key: "totalCharges",
							className: "px-8 font-black tabular-nums",
							render: (claim: any) => `$${parseFloat(claim.totalCharges || "0").toFixed(2)}`,
						},
						{
							header: "Status",
							key: "status",
							className: "px-8",
							render: (claim: any) => (
								<Badge
									variant="outline"
									className={`text-[9px] font-black uppercase tracking-wider border-none ${
										claim.status === "APPROVED"
											? "bg-emerald-500/10 text-emerald-500"
											: claim.status === "PENDING"
												? "bg-amber-500/10 text-amber-500"
												: claim.status === "837_SUBMITTED"
													? "bg-blue-500/10 text-blue-500"
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
							render: (claim: any) => (
								<Link href={`/claims/${claim.id}`}>
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
