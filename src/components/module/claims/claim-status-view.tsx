"use client";

import Link from "next/link";
import { useMemo } from "react";

import {
	Activity,
	ArrowUpRight,
	CheckCircle2,
	Clock,
	FileText,
	XCircle,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ModuleHeader } from "@/components/ui/custom/module-header";
import { useClaims } from "@/hooks/useClaims";
import { useClaimStats } from "@/hooks/useClaimStats";

export function ClaimStatusView() {
	const { data: claims, isLoading: claimsLoading } = useClaims();
	const { data: stats, isLoading: statsLoading } = useClaimStats();

	const breakdown = useMemo(() => {
		const list = claims || [];
		return {
			pending: list.filter((c: any) =>
				["PENDING", "SUBMITTED"].includes(c.status?.toUpperCase?.() || c.status)
			).length,
			approved: list.filter((c: any) => c.status === "APPROVED").length,
			rejected: list.filter((c: any) => c.status === "REJECTED").length,
			underReview: list.filter((c: any) =>
				["837_SUBMITTED", "SUBMITTED"].includes(c.status)
			).length,
			paid: list.filter((c: any) => c.status === "PAID").length,
		};
	}, [claims]);

	if (claimsLoading || statsLoading) {
		return (
			<div className="flex items-center justify-center min-h-[400px]">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
			</div>
		);
	}

	const cards = [
		{ title: "Pending", value: breakdown.pending, icon: Clock, color: "amber" },
		{ title: "Under Review", value: breakdown.underReview, icon: Activity, color: "sky" },
		{ title: "Approved", value: breakdown.approved, icon: CheckCircle2, color: "emerald" },
		{ title: "Rejected", value: breakdown.rejected, icon: XCircle, color: "rose" },
		{ title: "Paid", value: breakdown.paid, icon: FileText, color: "primary" },
	];

	return (
		<div className="relative space-y-8 pb-12 max-w-[1500px] mx-auto px-4 sm:px-6">
			<ModuleHeader
				icon={Activity}
				title="Claim Status Dashboard"
				subtitle="Overview and analytics for all submitted claims"
			/>

			<div className="grid grid-cols-2 md:grid-cols-5 gap-4">
				{cards.map((c) => (
					<Card key={c.title} className="rounded-2xl border-border/40">
						<CardHeader className="pb-2">
							<CardTitle className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
								{c.title}
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-3xl font-black">{c.value}</p>
						</CardContent>
					</Card>
				))}
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<Card className="rounded-2xl border-border/40 p-6">
					<p className="text-[10px] font-black uppercase text-muted-foreground">
						Total Submitted
					</p>
					<p className="text-4xl font-black mt-2">{stats?.totalSubmitted ?? 0}</p>
				</Card>
				<Card className="rounded-2xl border-border/40 p-6">
					<p className="text-[10px] font-black uppercase text-muted-foreground">
						Approval Rate
					</p>
					<p className="text-4xl font-black mt-2 text-emerald-600">
						{stats?.approvalRate ?? 0}%
					</p>
				</Card>
				<Card className="rounded-2xl border-border/40 p-6">
					<p className="text-[10px] font-black uppercase text-muted-foreground">
						Avg Processing Time
					</p>
					<p className="text-4xl font-black mt-2">
						{stats?.avgProcessingDays ?? 4.2} days
					</p>
				</Card>
			</div>

			<Link
				href="/claims"
				className="inline-flex items-center gap-2 text-xs font-black uppercase text-primary"
			>
				View all claims <ArrowUpRight className="w-4 h-4" />
			</Link>
		</div>
	);
}
