"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { MessageSquare } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/custom/data-table";
import { ModuleHeader } from "@/components/ui/custom/module-header";
import { useDemoComplaints } from "@/hooks/useDemoEntities";

export function ComplaintsListView() {
	const router = useRouter();
	const { data: complaints, isLoading } = useDemoComplaints();

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
				icon={MessageSquare}
				title="Complaint Tracking"
				subtitle="Lifecycle updates from insurance partners"
			/>
			<DataTable
				title="Complaints Register"
				data={complaints || []}
				onRowClick={(c: any) => router.push(`/complaints/${c.id}`)}
				columns={[
					{ header: "ID", key: "id", render: (c: any) => c.id },
					{ header: "Type", key: "type" },
					{ header: "Reference", key: "claimReference" },
					{
						header: "Status",
						key: "status",
						render: (c: any) => (
							<Badge className="text-[9px] font-black uppercase border-none">{c.status}</Badge>
						),
					},
					{
						header: "Submitted",
						key: "submittedAt",
						render: (c: any) => new Date(c.submittedAt).toLocaleDateString(),
					},
				]}
			/>
		</div>
	);
}
