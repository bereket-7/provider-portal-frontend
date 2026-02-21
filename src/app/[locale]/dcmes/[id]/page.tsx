import { CashClaimDetailView } from "@/components/module/dcmes/cash-claim-detail-view";

interface CashClaimDetailPageProps {
	params: Promise<{
		id: string;
	}>;
}

export default async function CashClaimDetailPage({
	params,
}: CashClaimDetailPageProps) {
	const resolvedParams = await params;
	return <CashClaimDetailView id={resolvedParams.id} />;
}
