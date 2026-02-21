import { AuthRequestDetailView } from "@/components/module/authorizations/auth-request-detail-view";

interface AuthDetailProps {
	params: Promise<{
		id: string;
	}>;
}

export default async function AuthDetailPage({ params }: AuthDetailProps) {
	const { id } = await params;
	return <AuthRequestDetailView id={id} />;
}
