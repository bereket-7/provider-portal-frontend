import { InsuranceMemberDetailView } from "@/components/module/insurances/insurance-member-detail-view";

export default async function InsuranceMemberDetailPage({
	params,
}: {
	params: Promise<{ id: string; memberId: string }>;
}) {
	const { id, memberId } = await params;
	return <InsuranceMemberDetailView payerId={id} memberId={memberId} />;
}
