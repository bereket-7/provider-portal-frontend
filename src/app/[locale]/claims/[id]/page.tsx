import { ClaimDetailView } from "@/components/module/claims/claim-detail-view";

interface ClaimDetailPageProps {
	params: Promise<{
		id: string;
	}>;
}

export default async function ClaimDetailPage({
	params,
}: ClaimDetailPageProps) {
	const resolvedParams = await params;
	return <ClaimDetailView id={resolvedParams.id} />;
}
