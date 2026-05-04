"use client";

import {
	Activity,
	AlertCircle,
	ArrowUpRight,
	CheckCircle2,
	Clock,
	FileText,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/custom/data-table";
import { ModuleHeader } from "@/components/ui/custom/module-header";
import { PremiumButton } from "@/components/ui/custom/premium-button";
import { useStatusInquiries } from "@/hooks/useStatusInquiries";
import { Skeleton } from "@/components/ui/skeleton";

type StatusResponse = any;

export function EDI277View() {
	const { data: inquiries, isLoading } = useStatusInquiries();
	return (
		<div className="relative space-y-8 pb-12 max-w-[1500px] mx-auto px-4 sm:px-6">
			<div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10" />

			<ModuleHeader
				icon={Activity}
				title="EDI 277 Claim Status Response"
				subtitle="Inbound status notifications and adjudication updates from payers"
				actions={
					<div className="flex items-center gap-3">
						<div className="flex items-center gap-1">
							<button className="px-4 py-1.5 text-primary text-[10px] font-black uppercase tracking-wider relative">
								Recent Responses
								<span className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary rounded-full" />
							</button>
							<button className="px-4 py-1.5 text-muted-foreground hover:text-foreground text-[10px] font-black uppercase tracking-wider transition-colors">
								Action Required
							</button>
						</div>
						<div className="h-4 w-px bg-border/40 hidden md:block mx-1" />
						<PremiumButton
							variant="outline"
							className="h-10 px-6 border-border/40 text-[9px] uppercase font-black tracking-widest rounded-xl"
						>
							Batch Acknowledgment
						</PremiumButton>
					</div>
				}
			/>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
				{[
					{
						title: "Total Responses",
						value: "1,248",
						trend: "+15% Volume",
						icon: FileText,
						color: "primary",
					},
					{
						title: "Adjudicated",
						value: "85%",
						trend: "Finalized",
						icon: CheckCircle2,
						color: "emerald",
					},
					{
						title: "Pending",
						value: "142",
						trend: "Reviewing",
						icon: Clock,
						color: "amber",
					},
					{
						title: "Rejected",
						value: "24",
						trend: "Action Needed",
						icon: AlertCircle,
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
							<div
								className={`p-2 ${stat.color === "primary" ? "bg-primary/10" : stat.color === "emerald" ? "bg-emerald-500/10" : stat.color === "amber" ? "bg-amber-500/10" : "bg-rose-500/10"} rounded-lg`}
							>
								<stat.icon
									className={`w-3.5 h-3.5 ${stat.color === "primary" ? "text-primary" : stat.color === "emerald" ? "text-emerald-500" : stat.color === "amber" ? "text-amber-500" : "text-rose-500"} group-hover:scale-110 transition-transform`}
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
										stat.color === "amber"
											? "bg-amber-500/10 text-amber-500"
											: stat.color === "rose"
												? "bg-rose-500/10 text-rose-500"
												: stat.color === "emerald"
													? "bg-emerald-500/10 text-emerald-500"
													: "bg-primary/10 text-primary"
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
						title="Status Response Log"
						subtitle="Real-time transaction history for HIPAA 277 responses"
						data={inquiries || []}
						columns={[
							{
								header: "Response ID",
								key: "id",
								render: (resp: any) => (
									<div className="flex items-center gap-4">
										<div className="p-2.5 bg-primary/5 rounded-lg">
											<Activity className="w-4 h-4 text-primary" />
										</div>
										<div>
											<p className="text-[13px] font-black text-foreground uppercase tracking-tight">
												{resp.id.split("-")[0]}
											</p>
											<p className="text-[9px] font-bold text-muted-foreground uppercase opacity-60">
												Ctrl #: {resp.ediControlNumber}
											</p>
										</div>
									</div>
								),
							},
							{
								header: "Dates",
								key: "requestDate",
								render: (resp: any) => (
									<div className="space-y-0.5">
										<p className="text-[10px] font-black text-foreground tracking-tight">
											REQ: {new Date(resp.requestDate).toLocaleDateString()}
										</p>
										{resp.responseDate && (
											<p className="text-[9px] font-bold text-emerald-600 uppercase opacity-80">
												RES: {new Date(resp.responseDate).toLocaleDateString()}
											</p>
										)}
									</div>
								),
							},
							{
								header: "Category",
								key: "responseStatusCategoryCode",
								className: "text-xs font-black text-muted-foreground",
								render: (resp: any) => (
									<span>{resp.responseStatusCategoryCode || "PENDING"}</span>
								),
							},
							{
								header: "Status Detail",
								key: "responseStatusCode",
								className: "text-[11px] font-medium text-muted-foreground max-w-[250px]",
								render: (resp: any) => (
									<span>{resp.responseStatusCode || "No details available"}</span>
								),
							},
							{
								header: "Current Status",
								key: "responseStatusCode",
								align: "right",
								render: (resp: any) => (
									<Badge
										className={`rounded-xl px-3 py-1 text-[9px] font-black uppercase tracking-widest border-none ${
											resp.responseStatusCode === "Approved" || resp.responseStatusCategoryCode === "A1"
												? "bg-emerald-500/10 text-emerald-600"
												: resp.responseStatusCode === "Rejected"
													? "bg-rose-500/10 text-rose-600"
													: "bg-amber-500/10 text-amber-600"
										}`}
									>
										{resp.responseStatusCode || "Pending"}
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
