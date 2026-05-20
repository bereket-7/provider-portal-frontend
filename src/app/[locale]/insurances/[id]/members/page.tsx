import { InsuranceMembersListView } from "@/components/module/insurances/insurance-members-list-view";

export default async function InsuranceMembersPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	return <InsuranceMembersListView payerId={id} />;
}
