"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDemoComplaint } from "@/hooks/useDemoEntities";

export function ComplaintDetailView({ id }: { id: string }) {
	const { data: complaint, isLoading } = useDemoComplaint(id);

	if (isLoading || !complaint) {
		return (
			<div className="flex items-center justify-center min-h-[400px]">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
			</div>
		);
	}

	return (
		<div className="space-y-8 pb-12 max-w-[1000px] mx-auto px-4">
			<Link href="/complaints" className="flex items-center gap-2 text-xs font-black uppercase text-muted-foreground">
				<ArrowLeft className="w-4 h-4" /> Back
			</Link>
			<h1 className="text-2xl font-black">{complaint.type}</h1>
			<p className="text-sm text-muted-foreground">{complaint.description}</p>
			{complaint.resolution && (
				<Card className="rounded-2xl border-emerald-500/20 bg-emerald-500/5">
					<CardHeader>
						<CardTitle className="text-sm font-black uppercase">Resolution</CardTitle>
					</CardHeader>
					<CardContent className="text-sm font-bold">{complaint.resolution}</CardContent>
				</Card>
			)}
			<Card className="rounded-2xl border-border/40">
				<CardHeader>
					<CardTitle className="text-sm font-black uppercase">Status Updates</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					{complaint.updates.map((u: any, i: number) => (
						<div key={i} className="border-l-2 border-primary pl-4">
							<p className="text-[10px] font-black uppercase text-primary">{u.status}</p>
							<p className="text-[9px] text-muted-foreground">{new Date(u.date).toLocaleString()}</p>
							<p className="text-sm font-medium mt-1">{u.note}</p>
						</div>
					))}
				</CardContent>
			</Card>
		</div>
	);
}
