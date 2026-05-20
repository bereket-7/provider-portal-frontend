"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/custom/data-table";
import { ModuleHeader } from "@/components/ui/custom/module-header";
import { useMembers } from "@/hooks/useMembers";
import { useDemoPayer } from "@/hooks/useDemoEntities";

export function InsuranceMembersListView({ payerId }: { payerId: string }) {
	const [search, setSearch] = useState("");
	const { data: payer } = useDemoPayer(payerId);
	const { data: members, isLoading } = useMembers(search, payerId);

	if (isLoading) {
		return (
			<div className="flex items-center justify-center min-h-[400px]">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
			</div>
		);
	}

	return (
		<div className="space-y-6 pb-12 max-w-[1500px] mx-auto px-4">
			<ModuleHeader
				icon={Users}
				title={`Members — ${payer?.name || "Insurance"}`}
				subtitle="Search by member ID, name, or status"
			/>
			<div className="relative max-w-md">
				<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
				<input
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					placeholder="Member ID or name..."
					className="w-full h-10 pl-10 rounded-xl border border-border/40"
				/>
			</div>
			<DataTable
				title="Member Directory"
				data={members || []}
				columns={[
					{
						header: "Member ID",
						key: "payerMemberId",
						render: (m: any) => (
							<Link href={`/insurances/${payerId}/members/${m.id}`} className="font-black text-primary text-xs">
								{m.payerMemberId}
							</Link>
						),
					},
					{ header: "Name", key: "name", render: (m: any) => `${m.firstName} ${m.lastName}` },
					{ header: "Coverage", key: "coverageType" },
					{
						header: "Status",
						key: "status",
						render: (m: any) => (
							<Badge className="text-[9px] font-black uppercase border-none">
								{m.status}
							</Badge>
						),
					},
					{ header: "Expires", key: "policyExpiration" },
				]}
			/>
		</div>
	);
}
