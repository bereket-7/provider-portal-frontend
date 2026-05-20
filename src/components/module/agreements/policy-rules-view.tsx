"use client";

import Link from "next/link";
import { Settings } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ModuleHeader } from "@/components/ui/custom/module-header";
import { useDemoPolicyVersions } from "@/hooks/useDemoEntities";

export function PolicyRulesView() {
	const { data: versions, isLoading } = useDemoPolicyVersions();
	const latest = versions?.[versions.length - 1];

	if (isLoading) {
		return (
			<div className="flex items-center justify-center min-h-[400px]">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
			</div>
		);
	}

	return (
		<div className="space-y-8 pb-12 max-w-[1200px] mx-auto px-4">
			<ModuleHeader
				icon={Settings}
				title="Policy Rules Configuration"
				subtitle={`Current version: ${latest?.version || "—"}`}
			/>
			{latest && (
				<div className="grid md:grid-cols-2 gap-6">
					<Card className="rounded-2xl border-border/40">
						<CardHeader>
							<CardTitle className="text-sm font-black uppercase">Covered Services</CardTitle>
						</CardHeader>
						<CardContent>
							<ul className="list-disc pl-4 text-sm font-bold space-y-1">
								{latest.coveredServices.map((s: string) => (
									<li key={s}>{s}</li>
								))}
							</ul>
						</CardContent>
					</Card>
					<Card className="rounded-2xl border-border/40">
						<CardHeader>
							<CardTitle className="text-sm font-black uppercase">Excluded Services</CardTitle>
						</CardHeader>
						<CardContent>
							<ul className="list-disc pl-4 text-sm font-bold space-y-1">
								{latest.excludedServices.map((s: string) => (
									<li key={s}>{s}</li>
								))}
							</ul>
						</CardContent>
					</Card>
					<Card className="rounded-2xl border-border/40">
						<CardHeader>
							<CardTitle className="text-sm font-black uppercase">Pre-Authorization Rules</CardTitle>
						</CardHeader>
						<CardContent>
							<ul className="list-disc pl-4 text-sm font-bold space-y-1">
								{latest.preAuthRules.map((s: string) => (
									<li key={s}>{s}</li>
								))}
							</ul>
						</CardContent>
					</Card>
					<Card className="rounded-2xl border-border/40">
						<CardHeader>
							<CardTitle className="text-sm font-black uppercase">Pricing Rules</CardTitle>
						</CardHeader>
						<CardContent className="space-y-2">
							{latest.pricingRules.map((p: { category: string; rule: string }) => (
								<p key={p.category} className="text-sm font-bold">
									<span className="text-primary">{p.category}:</span> {p.rule}
								</p>
							))}
						</CardContent>
					</Card>
				</div>
			)}
			<Link href="/policies/history" className="text-xs font-black uppercase text-primary">
				Compare policy versions →
			</Link>
		</div>
	);
}
