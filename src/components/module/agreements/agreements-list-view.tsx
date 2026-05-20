"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FileSignature } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/custom/data-table";
import { ModuleHeader } from "@/components/ui/custom/module-header";
import { useDemoAgreements } from "@/hooks/useDemoEntities";

export function AgreementsListView() {
	const router = useRouter();
	const [status, setStatus] = useState("all");
	const { data: agreements, isLoading } = useDemoAgreements(status);

	if (isLoading) {
		return (
			<div className="flex items-center justify-center min-h-[400px]">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
			</div>
		);
	}

	return (
		<div className="space-y-6 pb-12 max-w-[1500px] mx-auto px-4">
			<ModuleHeader icon={FileSignature} title="Insurance Agreements" subtitle="Active and expired contracts" />
			<div className="flex gap-2">
				{["all", "active", "expired"].map((s) => (
					<button
						key={s}
						onClick={() => setStatus(s)}
						className={`px-4 py-1.5 text-[10px] font-black uppercase rounded-lg ${
							status === s ? "bg-primary text-primary-foreground" : ""
						}`}
					>
						{s}
					</button>
				))}
			</div>
			<DataTable
				title="Agreement Registry"
				data={agreements || []}
				onRowClick={(a: any) => router.push(`/agreements/${a.id}`)}
				columns={[
					{ header: "Payer", key: "payerName" },
					{
						header: "Status",
						key: "status",
						render: (a: any) => (
							<Badge className="text-[9px] font-black uppercase border-none">{a.status}</Badge>
						),
					},
					{ header: "Effective", key: "effectiveDate" },
					{ header: "Expires", key: "expirationDate" },
					{ header: "Renewal", key: "renewalStatus" },
				]}
			/>
			<Link href="/policies/rules" className="text-xs font-black uppercase text-primary">
				View policy rules →
			</Link>
		</div>
	);
}
