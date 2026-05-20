"use client";

import Link from "next/link";
import { History } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ModuleHeader } from "@/components/ui/custom/module-header";
import { useDemoPolicyVersions } from "@/hooks/useDemoEntities";

export function PolicyHistoryView() {
	const { data: versions, isLoading } = useDemoPolicyVersions();

	if (isLoading) {
		return (
			<div className="flex items-center justify-center min-h-[400px]">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
			</div>
		);
	}

	const sorted = [...(versions || [])].sort(
		(a: any, b: any) =>
			new Date(b.effectiveDate).getTime() - new Date(a.effectiveDate).getTime()
	);

	return (
		<div className="space-y-8 pb-12 max-w-[1200px] mx-auto px-4">
			<ModuleHeader icon={History} title="Policy Version History" subtitle="Compare agreement changes over time" />
			<div className="space-y-4">
				{sorted.map((v: any) => (
					<Card key={v.id} className="rounded-2xl border-border/40">
						<CardHeader>
							<CardTitle className="text-sm font-black">
								Version {v.version} — effective {v.effectiveDate}
							</CardTitle>
						</CardHeader>
						<CardContent className="text-sm font-bold">
							<p className="mb-2">{v.changes}</p>
							<p className="text-[10px] text-muted-foreground uppercase">
								Covered: {v.coveredServices.join(", ")}
							</p>
						</CardContent>
					</Card>
				))}
			</div>
			<Link href="/policies/rules" className="text-xs font-black uppercase text-primary">
				← Back to rules
			</Link>
		</div>
	);
}
