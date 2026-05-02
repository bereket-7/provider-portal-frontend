"use client";

import {
	AlertCircle,
	ArrowUpRight,
	Calendar,
	Clock,
	DollarSign,
	Receipt,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/custom/data-table";
import { ModuleHeader } from "@/components/ui/custom/module-header";
import { PremiumButton } from "@/components/ui/custom/premium-button";
import { useReconciliations } from "@/hooks/useReconciliations";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

export function EDI835View() {
	const router = useRouter();
	const { data: reconciliations, isLoading } = useReconciliations();

	if (isLoading) {
		return (
			<div className="flex items-center justify-center min-h-[400px]">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
			</div>
		);
	}
	return (
		<div className="relative space-y-8 pb-12 max-w-[1500px] mx-auto px-4 sm:px-6">
			<div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10" />

			<ModuleHeader
				icon={Receipt}
				title="EDI 835 Remittance Advice"
				subtitle="Electronic Remittance Advice (ERA) • Payment & Adjustment Registry"
				actions={
					<div className="flex items-center gap-3">
						<div className="flex items-center gap-1">
							<button className="px-4 py-1.5 text-primary text-[10px] font-black uppercase tracking-wider relative">
								Recent ERAs
								<span className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary rounded-full" />
							</button>
							<button className="px-4 py-1.5 text-muted-foreground hover:text-foreground text-[10px] font-black uppercase tracking-wider transition-colors">
								Unposted
							</button>
						</div>
						<div className="h-4 w-px bg-border/40 hidden md:block mx-1" />
						<PremiumButton
							variant="outline"
							className="h-10 px-6 border-border/40 text-[9px] uppercase font-black tracking-widest rounded-xl"
						>
							Post Payments
						</PremiumButton>
					</div>
				}
			/>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
				{[
					{
						label: "Total Paid",
						value: "$48,450.00",
						trend: "+12% Growth",
						icon: DollarSign,
						color: "emerald",
						bg: "bg-emerald-500/10",
					},
					{
						label: "Pending ERA",
						value: "12",
						trend: "High Priority",
						icon: Clock,
						color: "amber",
						bg: "bg-amber-500/10",
					},
					{
						label: "Avg Reduction",
						value: "14%",
						trend: "-2% Efficiency",
						icon: AlertCircle,
						color: "rose",
						bg: "bg-rose-500/10",
					},
				].map((stat, i) => (
					<Card
						key={i}
						className="group relative overflow-hidden border-border/40 bg-card rounded-2xl transition-all duration-300 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05),0_10px_30px_-10px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)]"
					>
						<div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12 blur-2xl transition-all" />
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 relative z-10">
							<CardTitle className="text-[10px] font-black uppercase tracking-[0.15em] text-muted-foreground/80">
								{stat.label}
							</CardTitle>
							<div className={`p-2 ${stat.bg} rounded-lg`}>
								<stat.icon
									className={`w-3.5 h-3.5 ${stat.color === "emerald" ? "text-emerald-500" : stat.color === "amber" ? "text-amber-500" : "text-rose-500"} group-hover:scale-110 transition-transform`}
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

			<div className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
				<DataTable
					title="Remittance Ledger"
					subtitle="Real-time payment advice from clinical payers"
					data={reconciliations || []}
					onRowClick={(rec: any) => router.push(`/edi-835/${rec.id}`)}
					columns={[
						{
							header: "Remittance Detail",
							key: "id",
							render: (rec: any) => (
								<div className="flex items-center gap-4">
									<div className="p-2.5 bg-primary/5 rounded-lg border border-primary/10">
										<Receipt className="w-4 h-4 text-primary" />
									</div>
									<div>
										<p className="text-[13px] font-black text-foreground">
											REC-{rec.id.substring(0, 8)}
										</p>
										<div className="flex items-center gap-2 mt-0.5">
											<Calendar className="w-3 h-3 text-muted-foreground opacity-60" />
											<span className="text-[9px] font-bold text-muted-foreground uppercase">
												{rec.payment835?.checkNumber || "N/A"}
											</span>
										</div>
									</div>
								</div>
							),
						},
						{
							header: "Payer",
							key: "payer",
							className: "font-bold text-sm uppercase tracking-tight",
							render: (rec: any) => rec.payment835?.payer?.name || "Unknown Payer",
						},
						{
							header: "Claim ID",
							key: "claim",
							className: "text-center font-black",
							render: (rec: any) => (
								<Badge
									variant="outline"
									className="rounded-lg px-2 py-0.5 text-[10px] bg-muted/30"
								>
									{rec.claimPayment835?.claim?.claimNumber || "Multiple"}
								</Badge>
							),
						},
						{
							header: "Amount",
							key: "amount",
							className: "font-black text-foreground tabular-nums",
							render: (rec: any) => `$${parseFloat(rec.amount).toLocaleString()}`,
						},
						{
							header: "Status",
							key: "status",
							align: "center",
							render: (rec: any) => (
								<Badge
									className={`rounded-xl px-3 py-1 text-[9px] font-black uppercase tracking-widest border-none ${
										rec.reconciliationStatus === "MATCHED"
											? "bg-emerald-500/10 text-emerald-600"
											: "bg-amber-500/10 text-amber-600"
									}`}
								>
									{rec.reconciliationStatus}
								</Badge>
							),
						},
						{
							header: "Action",
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
			</div>
		</div>
	);
}
