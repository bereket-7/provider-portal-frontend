import { ReconciliationDetailView } from "@/components/module/claims/reconciliation-detail-view";

export default function ReconciliationPage({ params }: { params: { id: string } }) {
	return <ReconciliationDetailView id={params.id} />;
}
