"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { FileText, Plus, Search, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/custom/data-table";
import { ModuleHeader } from "@/components/ui/custom/module-header";
import { useClaims } from "@/hooks/useClaims";
import { demoDeleteClaim } from "@/lib/demo/demo-api";
import { isDemoMode } from "@/lib/demo/demo-mode";
import { useDemoStore } from "@/lib/demo/demo-store-context";

export function ClaimsDraftListView() {
	const router = useRouter();
	const { bumpVersion } = useDemoStore();
	const [search, setSearch] = useState("");
	const [dateFrom, setDateFrom] = useState("");
	const [dateTo, setDateTo] = useState("");

	const { data: claims, isLoading, refetch } = useClaims(search, "draft");

	const filtered = useMemo(() => {
		let list = claims || [];
		if (dateFrom) list = list.filter((c: any) => c.serviceFrom >= dateFrom);
		if (dateTo) list = list.filter((c: any) => c.serviceTo <= dateTo);
		return list;
	}, [claims, dateFrom, dateTo]);

	const handleDelete = async (id: string) => {
		if (!isDemoMode()) return;
		await demoDeleteClaim(id);
		bumpVersion();
		refetch();
		toast.success("Draft claim deleted");
	};

	if (isLoading) {
		return (
			<div className="flex items-center justify-center min-h-[400px]">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
			</div>
		);
	}

	return (
		<div className="relative space-y-6 pb-12 max-w-[1500px] mx-auto px-4 sm:px-6">
			<ModuleHeader
				icon={FileText}
				title="Draft Claims"
				subtitle="Saved claims not yet submitted to insurance"
				actions={
					<Link
						href="/new-claim"
						className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-xs font-black uppercase tracking-wider"
					>
						<Plus className="w-4 h-4" />
						New Claim
					</Link>
				}
			/>

			<div className="flex flex-wrap gap-3 p-4 rounded-2xl border border-border/40 bg-card/50">
				<div className="relative flex-1 min-w-[200px]">
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
					<input
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						placeholder="Patient name or MRN..."
						className="w-full h-10 pl-10 pr-4 rounded-xl border border-border/40 bg-background text-sm"
					/>
				</div>
				<input
					type="date"
					value={dateFrom}
					onChange={(e) => setDateFrom(e.target.value)}
					className="h-10 px-3 rounded-xl border border-border/40 text-sm"
				/>
				<input
					type="date"
					value={dateTo}
					onChange={(e) => setDateTo(e.target.value)}
					className="h-10 px-3 rounded-xl border border-border/40 text-sm"
				/>
			</div>

			<DataTable
				title="Draft Registry"
				subtitle={`${filtered.length} draft(s) ready for review or batch submission`}
				data={filtered}
				onRowClick={(claim: any) => router.push(`/claims/${claim.id}`)}
				columns={[
					{
						header: "Claim ID",
						key: "claimNumber",
						render: (c: any) => (
							<span className="font-black text-primary text-xs">{c.claimNumber}</span>
						),
					},
					{
						header: "Patient",
						key: "patient",
						render: (c: any) =>
							`${c.patient?.firstName || ""} ${c.patient?.lastName || ""}`,
					},
					{
						header: "MRN",
						key: "mrn",
						render: (c: any) => c.mrn || c.patient?.mrn || "—",
					},
					{
						header: "DoS",
						key: "serviceFrom",
					},
					{
						header: "Amount",
						key: "totalCharges",
						render: (c: any) => `ETB ${parseFloat(c.totalCharges || "0").toLocaleString()}`,
					},
					{
						header: "Status",
						key: "status",
						render: () => (
							<Badge className="bg-amber-500/10 text-amber-600 border-none text-[9px] font-black uppercase">
								Draft
							</Badge>
						),
					},
					{
						header: "Actions",
						key: "actions",
						align: "right",
						render: (c: any) => (
							<div className="flex items-center gap-2 justify-end">
								<button
									onClick={(e) => {
										e.stopPropagation();
										router.push(`/new-claim?edit=${c.id}`);
									}}
									className="text-[10px] font-black uppercase text-primary hover:underline"
								>
									Edit
								</button>
								<button
									onClick={(e) => {
										e.stopPropagation();
										handleDelete(c.id);
									}}
									className="p-1.5 hover:bg-rose-500/10 rounded-lg"
								>
									<Trash2 className="w-3.5 h-3.5 text-rose-500" />
								</button>
							</div>
						),
					},
				]}
			/>
		</div>
	);
}
