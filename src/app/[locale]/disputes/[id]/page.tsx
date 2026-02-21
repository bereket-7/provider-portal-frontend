import { DisputeDetailView } from "@/components/module/disputes/dispute-detail-view";

export default async function DisputeDetailPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const resolvedParams = await params;
	return <DisputeDetailView id={resolvedParams.id} />;
}
