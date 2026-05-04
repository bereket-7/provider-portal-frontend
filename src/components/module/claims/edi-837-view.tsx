"use client";

import { useState } from "react";
import {
	CheckCircle,
	FileCode,
	Send,
	ClipboardList,
	AlertCircle,
	ArrowUpRight,
	Calendar,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/custom/data-table";
import { ModuleHeader } from "@/components/ui/custom/module-header";
import { PremiumButton } from "@/components/ui/custom/premium-button";
import { useClaims } from "@/hooks/useClaims";
import { submitClaimsBatch } from "@/_service/actions/claim-actions";
import { toast } from "sonner";
import { format } from "date-fns";

import { useRouter } from "next/navigation";

export function EDI837View() {
	const router = useRouter();
	const [selectedIds, setSelectedIds] = useState<string[]>([]);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { data: claims, isLoading, refetch } = useClaims(undefined, "draft");

	const handleBatchSubmit = async () => {
		if (selectedIds.length === 0) {
			toast.error("Please select at least one claim to submit");
			return;
		}

		const loadingId = toast.loading(`Submitting ${selectedIds.length} claims to payer...`);
		setIsSubmitting(true);
		try {
			const res = await submitClaimsBatch(selectedIds);
			if (res.ok) {
				toast.success(res.data.submitClaimsBatch.message, { id: loadingId });
				setSelectedIds([]);
				refetch();
			} else {
				toast.error(res.message || "Batch submission failed", { id: loadingId });
			}
		} catch (error) {
			toast.error("An unexpected error occurred", { id: loadingId });
		} finally {
			setIsSubmitting(false);
		}
	};

	if (isLoading) {
		return (
			<div className="flex items-center justify-center min-h-[400px]">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
			</div>
		);
	}

	return (
		<div className="relative space-y-8 pb-12 max-w-[1500px] mx-auto px-4 sm:px-6">
			{/* background effects */}
			<div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />

			<ModuleHeader
				icon={FileCode}
				title="EDI 837 Submission Queue"
				subtitle="Electronic claim batching and transmission manager"
				pillColor="bg-sky-500"
				actions={
					<div className="flex items-center gap-3">
						<PremiumButton
							onClick={handleBatchSubmit}
							disabled={selectedIds.length === 0 || isSubmitting}
							icon={Send}
							className="h-10 px-6 bg-primary text-primary-foreground shadow-lg shadow-primary/20"
						>
							{isSubmitting ? "Processing..." : `Submit ${selectedIds.length} Claims`}
						</PremiumButton>
					</div>
				}
			/>

			{/* Queue Statistics */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
				{[
					{
						label: "Pending in Queue",
						value: claims?.length || 0,
						trend: "Ready to File",
						icon: ClipboardList,
						color: "sky",
						bg: "bg-sky-500/10",
					},
					{
						label: "Total Queue Value",
						value: `ETB ${(claims?.reduce((acc: number, curr: any) => acc + parseFloat(curr.totalCharges || "0"), 0) || 0).toLocaleString()}`,
						trend: "Pending Revenue",
						icon: Send,
						color: "emerald",
						bg: "bg-emerald-500/10",
					},
					{
						label: "Selected for Batch",
						value: selectedIds.length,
						trend: "Active Selection",
						icon: CheckCircle,
						color: "primary",
						bg: "bg-primary/10",
					},
				].map((stat, i) => (
					<div
						key={i}
						className="p-6 rounded-2xl border border-border/40 bg-card/60 backdrop-blur-md shadow-sm"
					>
						<div className="flex justify-between items-start">
							<div>
								<p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
									{stat.label}
								</p>
								<p className="text-2xl font-black text-foreground mt-1 tabular-nums">
									{stat.value}
								</p>
							</div>
							<div className={`p-2.5 ${stat.bg} rounded-xl`}>
								<stat.icon className={`w-4 h-4 text-${stat.color}-500`} />
							</div>
						</div>
						<div className="mt-4 flex items-center gap-2">
							<span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground opacity-60">
								{stat.trend}
							</span>
						</div>
					</div>
				))}
			</div>

			{/* Submission Queue Table */}
			<div className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
				<DataTable
					title="Claims Ready for Submission"
					subtitle="Select claims to generate and transmit 837 EDI files"
					data={claims || []}
					onRowClick={(claim: any) => router.push(`/claims/${claim.id}`)}
					columns={[
						{
							header: "Select",
							key: "select",
							render: (claim: any) => (
								<input
									type="checkbox"
									className="w-4 h-4 rounded border-border/40 accent-primary"
									checked={selectedIds.includes(claim.id)}
									onChange={(e) => {
										if (e.target.checked) {
											setSelectedIds([...selectedIds, claim.id]);
										} else {
											setSelectedIds(selectedIds.filter((id) => id !== claim.id));
										}
									}}
								/>
							),
						},
						{
							header: "Claim Detail",
							key: "id",
							render: (claim: any) => (
								<div className="flex items-center gap-4">
									<div className="p-2.5 bg-sky-500/10 rounded-lg border border-sky-500/20">
										<FileCode className="w-4 h-4 text-sky-600" />
									</div>
									<div>
										<p className="text-[13px] font-black text-foreground">
											{claim.claimNumber || `Draft-${claim.id.substring(0, 5)}`}
										</p>
										<div className="flex items-center gap-2 mt-0.5">
											<Calendar className="w-3 h-3 text-muted-foreground opacity-60" />
											<span className="text-[9px] font-bold text-muted-foreground uppercase">
												{claim.serviceFrom ? format(new Date(claim.serviceFrom), "MMM dd, yyyy") : "No Date"}
											</span>
										</div>
									</div>
								</div>
							),
						},
						{
							header: "Patient",
							key: "patient",
							className: "font-bold text-sm",
							render: (claim: any) =>
								`${claim.patient?.firstName} ${claim.patient?.lastName}`,
						},
						{
							header: "Amount",
							key: "totalCharges",
							className: "font-black text-foreground tabular-nums",
							render: (claim: any) =>
								`ETB ${parseFloat(claim.totalCharges).toLocaleString()}`,
						},
						{
							header: "Service Type",
							key: "type",
							render: (claim: any) => (
								<Badge
									variant="outline"
									className="rounded-lg px-2 py-0.5 text-[9px] font-black uppercase tracking-widest bg-muted/30"
								>
									{claim.type}
								</Badge>
							),
						},
						{
							header: "Status",
							key: "status",
							align: "center",
							render: (claim: any) => (
								<Badge className="bg-amber-500/10 text-amber-600 border-none rounded-xl px-3 py-1 text-[9px] font-black uppercase tracking-widest">
									{claim.status}
								</Badge>
							),
						},
						{
							header: "Action",
							key: "action",
							align: "right",
							render: (claim: any) => (
								<button 
									onClick={() => router.push(`/claims/${claim.id}`)}
									className="p-2 hover:bg-primary/5 rounded-lg transition-colors border border-transparent hover:border-border/40"
								>
									<ArrowUpRight className="w-4 h-4 text-muted-foreground" />
								</button>
							),
						},
					]}
				/>
			</div>
		</div>
	);
}
