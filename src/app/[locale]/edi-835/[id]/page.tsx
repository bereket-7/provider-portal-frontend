import { ReconciliationDetailView } from "@/components/module/claims/reconciliation-detail-view";

export default async function ReconciliationPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	return <ReconciliationDetailView id={id} />;
}
