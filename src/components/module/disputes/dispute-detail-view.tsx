"use client";

import Link from "next/link";

import {
	AlertCircle,
	ArrowLeft,
	CheckCircle2,
	Clock,
	FileText,
	ShieldCheck,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDemoDispute } from "@/hooks/useDemoEntities";

interface DisputeDetailViewProps {
	id: string;
}

export function DisputeDetailView({ id }: DisputeDetailViewProps) {
	const { data: dispute, isLoading } = useDemoDispute(id);

	if (isLoading || !dispute) {
		return (
			<div className="flex items-center justify-center min-h-[400px]">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
			</div>
		);
	}

	const timeline = dispute.thread || [
		{
			author: "System",
			date: dispute.createdAt,
			message: dispute.description,
		},
	];

	return (
		<div className="relative space-y-8 pb-12 max-w-[1500px] mx-auto px-4 sm:px-6">
			<Link
				href="/disputes"
				className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary"
			>
				<ArrowLeft className="w-3.5 h-3.5" />
				Back to Disputes
			</Link>

			<div className="flex items-center gap-4">
				<h1 className="text-2xl font-black">Dispute #{id.split("-").pop()}</h1>
				<Badge className="text-[9px] font-black uppercase border-none">
					{dispute.status?.label}
				</Badge>
			</div>

			<div className="grid lg:grid-cols-3 gap-8">
				<div className="lg:col-span-2 space-y-6">
					<Card className="rounded-2xl border-border/40">
						<CardHeader>
							<CardTitle className="text-sm font-black uppercase">Description</CardTitle>
						</CardHeader>
						<CardContent className="text-sm font-bold">{dispute.description}</CardContent>
					</Card>

					{dispute.evidence && dispute.evidence.length > 0 && (
						<Card className="rounded-2xl border-border/40">
							<CardHeader>
								<CardTitle className="text-sm font-black uppercase">Evidence</CardTitle>
							</CardHeader>
							<CardContent className="space-y-2">
								{dispute.evidence.map((e: { name: string }) => (
									<div key={e.name} className="flex items-center gap-2 p-3 rounded-xl bg-muted/20">
										<FileText className="w-4 h-4 text-primary" />
										<span className="text-xs font-bold">{e.name}</span>
									</div>
								))}
							</CardContent>
						</Card>
					)}

					{dispute.resolution && (
						<Card className="rounded-2xl border-emerald-500/20 bg-emerald-500/5">
							<CardHeader>
								<CardTitle className="text-sm font-black uppercase text-emerald-600">
									Resolution Outcome
								</CardTitle>
							</CardHeader>
							<CardContent className="text-sm font-bold">{dispute.resolution}</CardContent>
						</Card>
					)}
				</div>

				<div className="space-y-6">
					<Card className="rounded-2xl border-border/40">
						<CardHeader>
							<CardTitle className="text-sm font-black uppercase flex items-center gap-2">
								<Clock className="w-4 h-4" />
								Response Thread
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							{timeline.map((t: any, i: number) => (
								<div key={i} className="border-l-2 border-primary pl-3">
									<p className="text-[10px] font-black uppercase">{t.author}</p>
									<p className="text-[9px] text-muted-foreground">
										{new Date(t.date).toLocaleString()}
									</p>
									<p className="text-xs font-medium mt-1">{t.message}</p>
								</div>
							))}
						</CardContent>
					</Card>

					<Card className="rounded-2xl border-border/40 p-4 space-y-2 text-sm font-bold">
						<p>Claim: {dispute.claimNumber || dispute.claim?.claimNumber || "—"}</p>
						<p>
							Member:{" "}
							{dispute.member
								? `${dispute.member.firstName} ${dispute.member.lastName}`
								: "—"}
						</p>
					</Card>
				</div>
			</div>
		</div>
	);
}
