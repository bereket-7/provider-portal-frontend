import { ComplaintDetailView } from "@/components/module/complaints/complaint-detail-view";

export default async function ComplaintDetailPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	return <ComplaintDetailView id={id} />;
}
