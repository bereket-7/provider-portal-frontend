"use client";

import {
	ArrowRight,
	BookOpen,
	ChevronDown,
	ExternalLink,
	FileText,
	Mail,
	MessageSquare,
	Phone,
	PlayCircle,
	Search,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { PremiumButton } from "@/components/ui/custom/premium-button";
import { Input } from "@/components/ui/input";

export function HelpSupportView() {
	const faqs = [
		{
			q: "How do I initiate a new prior authorization request?",
			a: "Navigate to the Authorizations module, click 'New Request', and fill in the patient and clinical details. Ensure all mandatory fields are completed before submission.",
		},
		{
			q: "What is the turnaround time for reimbursement claims?",
			a: "Standard cash payer claims are processed within 24-48 hours. EDI submissions typically take 5-7 business days for full settlement.",
		},
		{
			q: "Can I manage multiple organization accounts?",
			a: "Yes, use the Organization switcher in the top profile menu to navigate between different healthcare entities you represent.",
		},
		{
			q: "How do I reset my two-factor authentication?",
			a: "Security settings can be found in your Account Settings. For lost devices, please contact our support desk directly via the 'Call Us' option.",
		},
	];

	return (
		<div className="relative space-y-12 pb-20 max-w-[1200px] mx-auto px-4 sm:px-6 animate-in fade-in duration-700">
			{/* Background Aesthetics */}
			<div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
			<div className="absolute bottom-10 left-0 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

			{/* Hero Section */}
			<div className="relative z-10 text-center space-y-6 pt-8">
				<Badge className="bg-primary/10 text-primary border-none text-[10px] font-black uppercase px-4 py-1 rounded-full tracking-[0.2em] animate-bounce">
					Support Hub
				</Badge>
				<h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
					How can we help you today?
				</h1>
				<p className="text-muted-foreground text-lg max-w-2xl mx-auto font-medium">
					Access comprehensive documentation, video tutorials, and direct
					support channels for the Tena&apos;adam IMS Portal.
				</p>
				<div className="max-w-xl mx-auto relative group">
					<div className="absolute inset-0 bg-primary/10 blur-xl group-focus-within:bg-primary/20 transition-all rounded-full" />
					<div className="relative">
						<Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
						<Input
							placeholder="Search for articles, guides, or help topics..."
							className="h-14 pl-14 pr-6 bg-card/80 backdrop-blur-md border-border/40 rounded-2xl shadow-xl shadow-black/5 font-bold text-base focus-visible:ring-4 focus-visible:ring-primary/5 focus-visible:border-primary/40 transition-all"
						/>
					</div>
				</div>
			</div>

			{/* Quick Actions Grid */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
				{[
					{
						title: "Documentation",
						desc: "Comprehensive guides for all portal modules.",
						icon: FileText,
						color: "primary",
					},
					{
						title: "Video Tutorials",
						desc: "Step-by-step visual walkthroughs of key flows.",
						icon: PlayCircle,
						color: "amber",
					},
					{
						title: "Release Notes",
						desc: "Stay updated with the latest portal enhancements.",
						icon: BookOpen,
						color: "emerald",
					},
				].map((item, i) => (
					<Card
						key={i}
						className="group hover:scale-[1.02] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] transition-all duration-500 border border-border/40 bg-card/40 backdrop-blur-sm rounded-[2.5rem] p-8 cursor-pointer overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05),0_10px_30px_-10px_rgba(0,0,0,0.03)]"
					>
						<div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
						<div className="relative z-10 space-y-4">
							<div
								className={`p-4 rounded-3xl w-fit ${
									item.color === "amber"
										? "bg-amber-500/10 text-amber-600"
										: item.color === "emerald"
											? "bg-emerald-500/10 text-emerald-600"
											: "bg-primary/10 text-primary"
								}`}
							>
								<item.icon className="w-6 h-6" />
							</div>
							<div className="space-y-1">
								<h3 className="text-xl font-black text-foreground">
									{item.title}
								</h3>
								<p className="text-muted-foreground text-xs font-bold leading-relaxed">
									{item.desc}
								</p>
							</div>
							<div className="pt-2 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary group-hover:gap-3 transition-all">
								View Resources <ArrowRight className="w-3.5 h-3.5" />
							</div>
						</div>
					</Card>
				))}
			</div>

			{/* FAQ Section */}
			<div className="relative z-10 space-y-8">
				<div className="flex items-center justify-between border-b border-border/40 pb-6">
					<div>
						<h2 className="text-2xl font-black text-foreground">
							Frequently Asked Questions
						</h2>
						<p className="text-muted-foreground text-xs font-bold uppercase tracking-widest mt-1">
							Quick solutions to common queries
						</p>
					</div>
					<PremiumButton
						variant="outline"
						className="text-[9px] uppercase font-black px-6 h-10 rounded-xl"
					>
						View All FAQs
					</PremiumButton>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{faqs.map((faq, i) => (
						<div
							key={i}
							className="p-6 rounded-3xl bg-card/40 border border-border/40 hover:border-primary/30 transition-all group cursor-pointer"
						>
							<div className="flex items-start justify-between gap-4">
								<div className="space-y-2">
									<h4 className="text-sm font-black text-foreground group-hover:text-primary transition-colors">
										{faq.q}
									</h4>
									<p className="text-xs font-bold text-muted-foreground leading-relaxed italic">
										&quot;{faq.a}&quot;
									</p>
								</div>
								<ChevronDown className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary transition-colors flex-shrink-0" />
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Contact Channels */}
			<div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
				<div className="lg:col-span-8">
					<Card className="border border-border/40 bg-slate-950 text-white rounded-[3rem] overflow-hidden shadow-[0_20px_40px_-12px_rgba(0,0,0,0.15)] relative">
						<div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] -mr-64 -mt-64" />
						<div className="p-12 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12">
							<div className="space-y-6">
								<Badge className="bg-white/10 text-white border-white/20 text-[9px] font-black uppercase px-3 py-0.5 rounded-lg tracking-widest">
									Support Ticket
								</Badge>
								<h2 className="text-3xl font-black tracking-tight">
									Need technical assistance?
								</h2>
								<p className="text-slate-400 text-sm font-medium leading-relaxed">
									Our engineering team is available 24/7 to resolve complex
									integration issues or portal bugs.
								</p>
								<PremiumButton className="bg-white text-slate-950 hover:bg-slate-200 px-8 h-12 text-[10px] font-black uppercase tracking-widest rounded-2xl shadow-none">
									Create Support Ticket
								</PremiumButton>
							</div>
							<div className="bg-white/[0.03] border border-white/10 rounded-[2rem] p-8 space-y-6">
								<h4 className="text-xs font-black uppercase tracking-widest text-primary">
									Recent Tickets
								</h4>
								{[
									{
										id: "T-9382",
										status: "Resolved",
										title: "EDI 837 Mapping Error",
									},
									{
										id: "T-9401",
										status: "Pending",
										title: "API Credit Ledger Sync",
									},
								].map((ticket, i) => (
									<div
										key={i}
										className="flex items-center justify-between group cursor-pointer py-1"
									>
										<div>
											<p className="text-[10px] font-black uppercase text-slate-500">
												{ticket.id}
											</p>
											<p className="text-xs font-bold text-slate-200">
												{ticket.title}
											</p>
										</div>
										<Badge
											className={
												ticket.status === "Resolved"
													? "bg-emerald-500/20 text-emerald-400"
													: "bg-amber-500/20 text-amber-400"
											}
										>
											{ticket.status}
										</Badge>
									</div>
								))}
							</div>
						</div>
					</Card>
				</div>

				<div className="lg:col-span-4 space-y-4">
					{[
						{
							label: "Live Chat",
							icon: MessageSquare,
							value: "Instant Reply",
							sub: "Avg. wait 2 mins",
						},
						{
							label: "Email Support",
							icon: Mail,
							value: "support@tilla.com",
							sub: "Reply within 4 hours",
						},
						{
							label: "Call Hotline",
							icon: Phone,
							value: "+251 116 678 90",
							sub: "Available 8am - 6pm",
						},
					].map((channel, i) => (
						<button
							key={i}
							className="w-full p-6 rounded-[2rem] bg-card/60 border border-border/40 hover:border-primary/40 transition-all flex items-center justify-between group shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05),0_10px_30px_-10px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)]"
						>
							<div className="flex items-center gap-4 text-left">
								<div className="p-3 rounded-2xl bg-primary/5 text-primary group-hover:scale-110 transition-transform">
									<channel.icon className="w-5 h-5" />
								</div>
								<div>
									<p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
										{channel.label}
									</p>
									<p className="text-sm font-bold text-foreground">
										{channel.value}
									</p>
									<p className="text-[8px] font-black uppercase text-primary/60 mt-0.5">
										{channel.sub}
									</p>
								</div>
							</div>
							<ExternalLink className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary transition-all opacity-0 group-hover:opacity-100" />
						</button>
					))}
				</div>
			</div>
		</div>
	);
}
