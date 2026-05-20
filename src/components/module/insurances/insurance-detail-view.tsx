"use client";

import Link from "next/link";

import {
	Activity,
	ArrowLeft,
	Building2,
	CheckCircle2,
	Clock,
	Download,
	ExternalLink,
	Globe,
	MapPin,
	Phone,
	ShieldCheck,
	Star,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PremiumButton } from "@/components/ui/custom/premium-button";
import { useDemoAgreements, useDemoPayer } from "@/hooks/useDemoEntities";

interface InsuranceDetailViewProps {
	id: string;
}

export function InsuranceDetailView({ id }: InsuranceDetailViewProps) {
	const { data: payer, isLoading } = useDemoPayer(id);
	const { data: agreements } = useDemoAgreements();
	const agreement = agreements?.find((a: any) => a.payerId === id);

	if (isLoading || !payer) {
		return (
			<div className="flex items-center justify-center min-h-[400px]">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
			</div>
		);
	}

	const insurance = {
		id: payer.id,
		name: payer.name,
		type: payer.type,
		tier: payer.tier,
		network: payer.network,
		status: payer.status === "active" ? "Active" : "Inactive",
		phone: payer.contactPhone,
		email: payer.contactEmail,
		headquarters: `${payer.region}, ${payer.country}`,
		description: `Provider agreement with ${payer.name} for ${payer.network} network services.`,
		coverageRules: agreement?.coverageRules || "Per network agreement Schedule A",
		paymentTerms: agreement?.paymentTerms || "Net 30",
		reimbursementRules: agreement?.reimbursementRules || "Fee schedule applies",
		verifiedDate: "Feb 10, 2026",
		rating: 4.8,
		planVolume: "50+ Active Plans",
		website: payer.contactEmail?.split("@")[1] || "insurance.et",
		since: "Jan 2020",
	};

	const stats = [
		{ label: "Claims Processed", value: "45.2k", icon: Activity },
		{ label: "Partner Satisfaction", value: "98%", icon: Star },
		{ label: "Reimbursement Cycle", value: "5.2 days", icon: Clock },
		{ label: "Network Coverage", value: "Exc.", icon: ShieldCheck },
	];

	const planCategories = [
		{
			name: "Executive Corporate Plan",
			head: "Benefit Admin",
			members: "12,000+",
		},
		{
			name: "Global Individual Select",
			head: "Direct Sales",
			members: "4,500+",
		},
		{ name: "Local Primary Network", head: "Public Aff.", members: "25,000+" },
	];

	const cardShadow =
		"shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05),0_10px_30px_-10px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] transition-all duration-500";

	return (
		<div className="relative space-y-8 pb-12 max-w-[1500px] mx-auto px-4 sm:px-6 animate-in fade-in duration-700">
			{/* Aesthetic Backgrounds */}
			<div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
			<div className="absolute bottom-10 left-0 w-[400px] h-[400px] bg-red-500/5 rounded-full blur-[100px] pointer-events-none" />

			{/* Navigation & Header */}
			<div className="flex flex-col gap-5 relative z-10">
				<Link
					href="/insurances"
					className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors group w-fit"
				>
					<div className="p-1.5 rounded-lg bg-muted group-hover:bg-primary/10 transition-colors">
						<ArrowLeft className="w-3.5 h-4 group-hover:-translate-x-1 transition-transform" />
					</div>
					Back to Carriers
				</Link>

				<div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-border/40 pb-5">
					<div className="flex items-center gap-4">
						<div className="p-3 bg-primary text-primary-foreground rounded-xl shadow-xl shadow-primary/10 transform -rotate-1 hover:rotate-0 transition-transform duration-500">
							<Building2 className="w-6 h-6" />
						</div>
						<div>
							<div className="flex items-center gap-3">
								<h1 className="text-2xl font-black tracking-tight text-foreground">
									{insurance.name}
								</h1>
								<Badge className="rounded-lg px-3 py-0.5 text-[9px] font-black uppercase tracking-widest border-none bg-emerald-500/10 text-emerald-600">
									{insurance.status}
								</Badge>
							</div>
							<div className="flex items-center gap-2.5 mt-0.5">
								<p className="text-[9px] font-black text-primary uppercase tracking-[0.2em]">
									Carrier ID: {insurance.id}
								</p>
								<div className="h-0.5 w-0.5 bg-border rounded-full" />
								<p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
									{insurance.type} • {insurance.tier}
								</p>
							</div>
						</div>
					</div>
					<div className="flex items-center gap-3">
						<button className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
							<Download className="w-3.5 h-3.5 mr-2 inline-block" />
							Agreement PDF
						</button>
						<Link href={`/insurances/${id}/members`}>
							<PremiumButton className="px-6 h-10 shadow-lg shadow-primary/10 text-[9px] uppercase font-black tracking-widest rounded-xl">
								View Members
							</PremiumButton>
						</Link>
						<PremiumButton className="px-6 h-10 border-border/40 text-[9px] uppercase font-black tracking-widest rounded-xl" variant="outline">
							Contact Carrier
						</PremiumButton>
					</div>
				</div>
			</div>

			{/* Stats Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
				{stats.map((stat, i) => (
					<Card
						key={i}
						className={`border-border/30 bg-card/40 backdrop-blur-sm rounded-2xl ${cardShadow}`}
					>
						<CardContent className="p-6 flex items-center justify-between">
							<div>
								<p className="text-[10px] font-black uppercase tracking-[0.1em] text-muted-foreground">
									{stat.label}
								</p>
								<p className="text-xl font-black text-foreground mt-1 tabular-nums">
									{stat.value}
								</p>
							</div>
							<div className="p-3 bg-primary/10 rounded-xl">
								<stat.icon className="w-5 h-5 text-primary" />
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			{/* Content Grid */}
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
				{/* Left Column */}
				<div className="lg:col-span-8 space-y-8">
					<Card
						className={`border-border/40 bg-card/50 backdrop-blur-sm rounded-3xl overflow-hidden ${cardShadow}`}
					>
						<CardHeader className="p-8 border-b border-border/40 bg-primary/[0.01]">
							<CardTitle className="text-base font-black uppercase tracking-[0.1em]">
								Carrier Overview
							</CardTitle>
						</CardHeader>
						<CardContent className="p-8 space-y-8">
							<div className="p-6 bg-primary/5 rounded-2xl border border-primary/10">
								<p className="text-sm font-bold text-muted-foreground leading-relaxed italic">
									&quot;{insurance.description}&quot;
								</p>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-10">
								<div className="space-y-6">
									<div className="space-y-2.5">
										<p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground opacity-60 flex items-center gap-2">
											<MapPin className="w-3.5 h-3.5" /> Headquarters
										</p>
										<p className="text-sm font-black text-foreground">
											{insurance.headquarters}
										</p>
									</div>
									<div className="space-y-2.5">
										<p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground opacity-60 flex items-center gap-2">
											<Globe className="w-3.5 h-3.5" /> Digital Access
										</p>
										<div className="space-y-1">
											<p className="text-sm font-black text-primary hover:underline cursor-pointer">
												{insurance.website}
											</p>
											<p className="text-sm font-black text-primary hover:underline cursor-pointer">
												{insurance.email}
											</p>
										</div>
									</div>
								</div>

								<div className="space-y-6">
									<div className="space-y-2.5">
										<p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground opacity-60 flex items-center gap-2">
											<Phone className="w-3.5 h-3.5" /> Partner Support
										</p>
										<p className="text-sm font-black text-foreground">
											{insurance.phone}
										</p>
									</div>
									<div className="space-y-2.5">
										<p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground opacity-60 flex items-center gap-2">
											<ShieldCheck className="w-3.5 h-3.5" /> Network Agreement
										</p>
										<div>
											<p className="text-sm font-black text-foreground">
												{insurance.network}
											</p>
											<p className="text-[10px] font-bold text-muted-foreground uppercase mt-0.5">
												Partnership Since: {insurance.since}
											</p>
										</div>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card
						className={`border-border/40 bg-card/50 backdrop-blur-sm rounded-3xl overflow-hidden ${cardShadow}`}
					>
						<CardHeader className="p-8 border-b border-border/40">
							<CardTitle className="text-base font-black uppercase tracking-[0.1em]">
								Active Plan Categories
							</CardTitle>
						</CardHeader>
						<CardContent className="p-0">
							<div className="divide-y divide-border/40">
								{planCategories.map((plan, i) => (
									<div
										key={i}
										className="p-6 flex items-center justify-between hover:bg-primary/[0.02] transition-colors group cursor-pointer"
									>
										<div>
											<p className="text-sm font-black text-foreground group-hover:text-primary transition-colors">
												{plan.name}
											</p>
											<p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mt-0.5 opacity-60">
												Primary Contact: {plan.head}
											</p>
										</div>
										<div className="flex items-center gap-4">
											<div className="text-right">
												<p className="text-[9px] font-black uppercase text-muted-foreground opacity-40">
													Coverage
												</p>
												<p className="text-xs font-black text-foreground">
													{plan.members} Members
												</p>
											</div>
											<div className="p-2 bg-muted rounded-lg group-hover:bg-primary/10 group-hover:text-primary transition-all">
												<ExternalLink className="w-4 h-4" />
											</div>
										</div>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Right Column */}
				<div className="lg:col-span-4 space-y-8">
					<Card
						className={`border-border/40 bg-card/50 backdrop-blur-sm rounded-3xl ${cardShadow}`}
					>
						<CardHeader className="p-8 border-b border-border/40">
							<CardTitle className="text-sm font-black uppercase tracking-[0.15em] flex items-center gap-2 text-primary/80">
								<ShieldCheck className="w-4 h-4" />
								Regulatory Compliance
							</CardTitle>
						</CardHeader>
						<CardContent className="p-8 space-y-8">
							<div className="space-y-6">
								{[
									"Insurance License 2026",
									"Financial Stability Rating",
									"Privacy Portfolio Audit",
									"Operational Excellence Cert",
								].map((doc, i) => (
									<div key={i} className="flex items-start gap-4 group">
										<div className="mt-1 p-1 bg-emerald-500/10 rounded-full group-hover:scale-110 transition-transform">
											<CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
										</div>
										<div>
											<p className="text-[11px] font-black text-foreground">
												{doc}
											</p>
											<p className="text-[9px] font-bold text-muted-foreground uppercase mt-0.5 opacity-60">
												Verified on {insurance.verifiedDate}
											</p>
										</div>
									</div>
								))}
							</div>

							<button className="w-full py-4 text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary/5 border border-primary/20 rounded-xl transition-all shadow-sm hover:shadow-md">
								Request Full Governance Report
							</button>
						</CardContent>
					</Card>

					<Card className="border-none bg-gradient-to-br from-slate-950 to-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl">
						<div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full -mr-16 -mt-16 blur-3xl opacity-50" />
						<div className="relative z-10 space-y-6">
							<div className="flex items-center gap-3">
								<div className="p-2.5 bg-white/5 rounded-2xl border border-white/10 text-primary">
									<Activity className="w-5 h-5" />
								</div>
								<h3 className="text-base font-black tracking-tight">
									Carrier Performance
								</h3>
							</div>
							<p className="text-xs font-bold text-slate-300 leading-relaxed">
								{insurance.name} maintains a **top-tier** ranking for claim
								processing efficiency and member resolution speed.
							</p>
							<div className="grid grid-cols-2 gap-4 mt-2">
								<div className="p-4 bg-white/5 rounded-2xl border border-white/10 shadow-inner">
									<p className="text-[8px] font-black uppercase text-slate-500 mb-1 tracking-wider">
										Claim Accuracy
									</p>
									<p className="text-sm font-black">98.9%</p>
								</div>
								<div className="p-4 bg-white/5 rounded-2xl border border-white/10 shadow-inner">
									<p className="text-[8px] font-black uppercase text-slate-500 mb-1 tracking-wider">
										Payout Speed
									</p>
									<p className="text-sm font-black">4.8 Days</p>
								</div>
							</div>
						</div>
					</Card>
				</div>
			</div>
		</div>
	);
}
