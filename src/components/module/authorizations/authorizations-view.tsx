"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import {
	Activity,
	ArrowUpRight,
	Calendar,
	CheckCircle2,
	FileSearch,
	Plus,
	ShieldCheck,
	Stethoscope,
	Timer,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/custom/data-table";
import { ModuleHeader } from "@/components/ui/custom/module-header";
import { usePriorAuthorizations } from "@/hooks/usePriorAuthorizations";
import { usePayers } from "@/hooks/usePayers";

export function AuthorizationsView() {
	const [statusFilter, setStatusFilter] = useState("all");
	const { data: auths, isLoading } = usePriorAuthorizations(
		statusFilter === "all" ? undefined : statusFilter
	);
	const { data: payers } = usePayers();

	const tableData = useMemo(
		() =>
			(auths || []).map((a: any) => ({
				id: a.id,
				authId: a.authorizationNumber || a.id,
				patient: a.patient || (a.member ? `${a.member.firstName} ${a.member.lastName}` : "Unknown"),
				provider: a.provider || "Dr. Yonatan Girma",
				type: a.type || "Prior Authorization",
				service: a.service || a.requested_service || "—",
				startDate: a.startDate,
				endDate: a.endDate,
				status: a.status,
				priority: a.priority || "Routine",
				payerId: a.payerId,
			})),
		[auths]
	);

	if (isLoading) {
		return (
			<div className="flex items-center justify-center min-h-[400px]">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
			</div>
		);
	}

	return (
		<div className="relative space-y-8 pb-12 max-w-[1500px] mx-auto px-4 sm:px-6">
			{/* Aesthetic Background Elements */}
			<div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />
			<div className="absolute bottom-20 left-0 w-[500px] h-[500px] bg-sky-500/5 rounded-full blur-[120px] pointer-events-none" />

			<ModuleHeader
				icon={CheckCircle2}
				title="Care Authorizations"
				subtitle="Medical Necessity • Referral Management • Real-time Approvals"
				actions={
					<Link href="/authorizations/new">
						<button className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-xl text-xs font-black uppercase tracking-wider shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
							<Plus className="w-4 h-4" />
							New Request
						</button>
					</Link>
				}
			/>

			{/* Operational Insights */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
				{[
					{
						title: "Active Requests",
						value: "2,842",
						trend: "+5.2% volume",
						icon: Activity,
						color: "primary",
					},
					{
						title: "Approved Rate",
						value: "94.2%",
						trend: "High clinical alignment",
						icon: ShieldCheck,
						color: "emerald",
					},
					{
						title: "Avg. Resolution",
						value: "1.8 Days",
						trend: "-12% cycle time",
						icon: Timer,
						color: "sky",
					},
					{
						title: "Flagged for Review",
						value: "14",
						trend: "Clinical intervention",
						icon: FileSearch,
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
												: stat.color === "sky"
													? "text-sky-500"
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

			<div className="flex flex-wrap gap-2 p-4 rounded-2xl border border-border/40 bg-card/50">
				{["all", "PENDING", "APPROVED", "DENIED", "NEW"].map((s) => (
					<button
						key={s}
						onClick={() => setStatusFilter(s)}
						className={`px-4 py-1.5 text-[10px] font-black uppercase rounded-lg ${
							statusFilter === s ? "bg-primary text-primary-foreground" : "text-muted-foreground"
						}`}
					>
						{s === "all" ? "All" : s}
					</button>
				))}
			</div>

			<div className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
				<DataTable
					title="Authorization Registry"
					subtitle="Management and tracking of care authorizations"
					data={tableData}
					onExport={() => console.log("Exporting authorizations...")}
					columns={[
						{
							header: "Authorization ID",
							key: "id",
							render: (auth: any) => (
								<div className="flex items-center gap-4">
									<div className="p-2.5 bg-primary/5 rounded-lg border border-primary/10">
										<ShieldCheck className="w-4 h-4 text-primary" />
									</div>
									<div>
										<p className="text-[13px] font-black text-foreground">
											{auth.id}
										</p>
										<div className="flex items-center gap-2 mt-0.5">
											<Badge
												className={`text-[8px] font-black px-1.5 py-0 border-none rounded-md shadow-none ${
													auth.priority === "Emergency"
														? "bg-rose-500 text-white"
														: auth.priority === "Urgent"
															? "bg-amber-500 text-white"
															: "bg-primary/10 text-primary"
												}`}
											>
												{auth.priority}
											</Badge>
										</div>
									</div>
								</div>
							),
						},
						{
							header: "Patient",
							key: "patient",
							render: (auth: any) => (
								<div className="space-y-0.5">
									<p className="text-[11px] font-black text-foreground tracking-tight uppercase">
										{auth.patient}
									</p>
									<p className="text-[9px] font-bold text-muted-foreground opacity-60 uppercase flex items-center gap-1">
										<Stethoscope className="w-2.5 h-2.5" />
										{auth.provider}
									</p>
								</div>
							),
						},
						{
							header: "Service Details",
							key: "service",
							render: (auth: any) => (
								<div className="space-y-0.5">
									<p className="text-[11px] font-black text-foreground tracking-tight uppercase">
										{auth.service}
									</p>
									<p className="text-[9px] font-bold text-muted-foreground opacity-60 uppercase">
										{auth.type}
									</p>
								</div>
							),
						},
						{
							header: "Validity Period",
							key: "startDate",
							render: (auth: any) => (
								<div className="flex items-center gap-2">
									<Calendar className="w-3 h-3 text-muted-foreground opacity-60" />
									<span className="text-[10px] font-bold text-foreground/80 whitespace-nowrap">
										{auth.startDate} - {auth.endDate}
									</span>
								</div>
							),
						},
						{
							header: "Status",
							key: "status",
							align: "center",
							render: (auth: any) => (
								<Badge
									className={`rounded-xl px-3 py-1 text-[9px] font-black uppercase tracking-widest border-none ${
										["APPROVED", "Approved"].includes(auth.status)
											? "bg-emerald-500/10 text-emerald-600"
											: ["DENIED", "Denied"].includes(auth.status)
												? "bg-rose-500/10 text-rose-600"
												: ["PENDING", "Pending", "NEW"].includes(auth.status)
													? "bg-amber-500/10 text-amber-600"
													: "bg-slate-500/10 text-slate-600"
									}`}
								>
									{auth.status}
								</Badge>
							),
						},
						{
							header: "",
							key: "action",
							align: "right",
							render: (auth: any) => (
								<Link
									href={`/authorizations/${auth.id}`}
									className="p-2 hover:bg-primary/5 rounded-lg transition-colors border border-transparent hover:border-border/40 inline-block"
								>
									<ArrowUpRight className="w-4 h-4 text-muted-foreground" />
								</Link>
							),
						},
					]}
				/>
			</div>
		</div>
	);
}
