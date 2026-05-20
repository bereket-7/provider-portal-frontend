"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDemoAgreement } from "@/hooks/useDemoEntities";

export function AgreementDetailView({ id }: { id: string }) {
	const { data: agreement, isLoading } = useDemoAgreement(id);

	if (isLoading || !agreement) {
		return (
			<div className="flex items-center justify-center min-h-[400px]">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
			</div>
		);
	}

	return (
		<div className="space-y-8 pb-12 max-w-[1000px] mx-auto px-4">
			<Link href="/agreements" className="flex items-center gap-2 text-xs font-black uppercase text-muted-foreground">
				<ArrowLeft className="w-4 h-4" /> Agreements
			</Link>
			<h1 className="text-2xl font-black">{agreement.payerName}</h1>
			<div className="grid gap-6">
				{[
					{ title: "Coverage Rules", body: agreement.coverageRules },
					{ title: "Payment Terms", body: agreement.paymentTerms },
					{ title: "Reimbursement Rules", body: agreement.reimbursementRules },
				].map((s) => (
					<Card key={s.title} className="rounded-2xl border-border/40">
						<CardHeader>
							<CardTitle className="text-sm font-black uppercase">{s.title}</CardTitle>
						</CardHeader>
						<CardContent className="text-sm font-bold">{s.body}</CardContent>
					</Card>
				))}
				<Card className="rounded-2xl border-border/40">
					<CardHeader>
						<CardTitle className="text-sm font-black uppercase">Contract Dates</CardTitle>
					</CardHeader>
					<CardContent className="text-sm font-bold space-y-1">
						<p>Effective: {agreement.effectiveDate}</p>
						<p>Expiration: {agreement.expirationDate}</p>
						<p>Renewal: {agreement.renewalStatus}</p>
					</CardContent>
				</Card>
			</div>
			<Link href="/policies/history" className="text-xs font-black uppercase text-primary">
				View policy version history →
			</Link>
		</div>
	);
}
