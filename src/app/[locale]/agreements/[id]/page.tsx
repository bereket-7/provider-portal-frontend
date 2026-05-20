import { AgreementDetailView } from "@/components/module/agreements/agreement-detail-view";

export default async function AgreementDetailPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	return <AgreementDetailView id={id} />;
}
