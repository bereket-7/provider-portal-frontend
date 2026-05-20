"use client";

import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/custom/data-table";
import { useClaims } from "@/hooks/useClaims";
import { useDemoMember, useDemoPayer } from "@/hooks/useDemoEntities";

export function InsuranceMemberDetailView({
	payerId,
	memberId,
}: {
	payerId: string;
	memberId: string;
}) {
	const { data: member, isLoading } = useDemoMember(memberId);
	const { data: payer } = useDemoPayer(payerId);
	const { data: allClaims } = useClaims();

	const claimHistory = (allClaims || []).filter(
		(c: any) => c.patientId === memberId || c.patient?.id === memberId
	);

	if (isLoading || !member) {
		return (
			<div className="flex items-center justify-center min-h-[400px]">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
			</div>
		);
	}

	return (
		<div className="space-y-8 pb-12 max-w-[1200px] mx-auto px-4">
			<Link href={`/insurances/${payerId}/members`} className="flex items-center gap-2 text-xs font-black uppercase text-muted-foreground">
				<ArrowLeft className="w-4 h-4" /> Back to members
			</Link>
			<h1 className="text-2xl font-black">
				{member.firstName} {member.lastName}
			</h1>
			<p className="text-sm text-muted-foreground">{payer?.name} • {member.payerMemberId}</p>

			<div className="grid md:grid-cols-2 gap-6">
				<Card className="rounded-2xl border-border/40">
					<CardHeader>
						<CardTitle className="text-sm font-black uppercase">Coverage Details</CardTitle>
					</CardHeader>
					<CardContent className="space-y-2 text-sm font-bold">
						<p>Type: {member.coverageType}</p>
						<p>Limit: {member.coverageLimit}</p>
						<p>Deductible: {member.deductible}</p>
						<p>Policy expires: {member.policyExpiration}</p>
						<p>Status: {member.status}</p>
					</CardContent>
				</Card>
				<Card className="rounded-2xl border-border/40">
					<CardHeader>
						<CardTitle className="text-sm font-black uppercase">Contact</CardTitle>
					</CardHeader>
					<CardContent className="space-y-2 text-sm font-bold">
						<p>{member.phone || "—"}</p>
						<p>{member.email || "—"}</p>
					</CardContent>
				</Card>
			</div>

			<DataTable
				title="Claim History"
				subtitle="Claims for this member"
				data={claimHistory}
				columns={[
					{ header: "Claim #", key: "claimNumber" },
					{ header: "DoS", key: "serviceFrom" },
					{ header: "Amount", key: "totalCharges", render: (c: any) => `ETB ${c.totalCharges}` },
					{ header: "Status", key: "status" },
				]}
			/>
		</div>
	);
}
