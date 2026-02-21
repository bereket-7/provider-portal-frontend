import { InsuranceDetailView } from "@/components/module/insurances/insurance-detail-view";

export default async function InsuranceDetailPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const resolvedParams = await params;
	return <InsuranceDetailView id={resolvedParams.id} />;
}
