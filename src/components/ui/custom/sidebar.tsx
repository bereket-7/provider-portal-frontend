"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type React from "react";
import { useState } from "react";

import {
	Activity,
	AlertCircle,
	ArrowUpCircle,
	BarChart3,
	Building2,
	CheckCircle2,
	ChevronRight,
	ClipboardCheck,
	Clock,
	DollarSign,
	FileCode,
	FilePlus,
	FileText,
	FileX,
	HelpCircle,
	Lock,
	LogOut,
	Menu,
	Network,
	Receipt,
	RefreshCw,
	Search,
	Settings,
	Stethoscope,
	UserCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useUserRole } from "@/providers/user-role-provider";

export default function Sidebar() {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	// Optional: Add collapsed state for desktop if desired later
	// const [isCollapsed, setIsCollapsed] = useState(false);
	const { isClaimManagement, role, logout } = useUserRole();
	const pathname = usePathname();

	function handleNavigation() {
		setIsMobileMenuOpen(false);
	}

	function NavItem({
		href,
		icon: Icon,
		children,
		badge,
	}: {
		href: string;
		icon: any;
		children: React.ReactNode;
		badge?: string | number;
	}) {
		// Normalize pathname by removing locale prefix (e.g., /en/dashboard -> /dashboard)
		const normalizedPathname =
			pathname?.replace(/^\/[a-z]{2}(\/|$)/, "/") || "/";
		const isActive =
			normalizedPathname === href ||
			(href !== "/" &&
				href !== "/claims" &&
				normalizedPathname.startsWith(`${href}/`));

		return (
			<Link
				href={href}
				onClick={handleNavigation}
				className={`group relative flex items-center justify-between px-4 py-3 text-sm font-medium transition-all duration-300 ease-in-out ${
					isActive
						? "rounded-r-xl bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-lg shadow-primary/30 scale-[1.02]"
						: "rounded-xl text-muted-foreground hover:bg-primary/10 hover:text-primary hover:pl-5"
				}`}
			>
				{/* Active Indicator Bar */}
				{isActive && (
					<div className="absolute -left-2 top-1/2 h-11 w-1 -translate-y-1/2  bg-primary shadow-lg shadow-primary/50" />
				)}

				<div className="flex items-center gap-3 flex-1">
					<Icon
						className={`h-5 w-5 flex-shrink-0 transition-transform duration-300 ${
							isActive ? "scale-110 drop-shadow-sm" : "group-hover:scale-110"
						}`}
					/>
					<span className="truncate">{children}</span>
				</div>

				<div className="flex items-center gap-2">
					{badge && (
						<span
							className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold transition-colors ${
								isActive
									? "bg-primary-foreground/20 text-primary-foreground"
									: "bg-primary/10 text-primary"
							}`}
						>
							{badge}
						</span>
					)}
					{isActive && (
						<ChevronRight className="h-4 w-4 opacity-70 animate-pulse" />
					)}
				</div>
			</Link>
		);
	}

	function NavSection({
		title,
		children,
	}: {
		title: string;
		children: React.ReactNode;
	}) {
		return (
			<div className="mb-6">
				<div className="mb-3 px-4 text-[10px] font-black uppercase tracking-widest text-primary">
					{title}
				</div>
				<div className="space-y-1">{children}</div>
			</div>
		);
	}

	return (
		<>
			{/* Mobile Menu Trigger */}
			<Button
				variant="ghost"
				size="icon"
				className="fixed left-4 top-3 z-[70] lg:hidden"
				onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
			>
				<Menu className="h-6 w-6" />
				<span className="sr-only">Toggle Menu</span>
			</Button>

			{/* Backdrop for Mobile */}
			{isMobileMenuOpen && (
				<div
					className="fixed inset-0 z-[65] bg-background/80 backdrop-blur-sm transition-all duration-300 lg:hidden"
					onClick={() => setIsMobileMenuOpen(false)}
				/>
			)}

			<nav
				className={`fixed inset-y-0 left-0 z-[70] flex w-72 flex-col border-r border-border/50 bg-card/50 shadow-2xl backdrop-blur-xl transition-transform duration-300 ease-spring lg:static lg:w-72 lg:translate-x-0 lg:shadow-none ${
					isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
				}`}
			>
				{/* Header / Logo Area */}
				<div className="flex h-20 items-center border-b border-border/50 px-6">
					<Link
						href="/"
						className="group flex items-center gap-3"
						onClick={handleNavigation}
					>
						<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/20 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
							<Stethoscope className="h-6 w-6" />
						</div>
						<div className="flex flex-col">
							<span className="text-lg font-bold tracking-tight text-foreground">
								Tena&apos;adam
							</span>
							<span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
								IMS Portal
							</span>
						</div>
					</Link>
				</div>

				{/* Scrollable Content */}
				<div className="flex-1 overflow-y-auto px-4 py-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
					{/* Dashboard Section */}
					<NavSection title="Overview">
						<NavItem href="/dashboard" icon={BarChart3}>
							Dashboard
						</NavItem>
					</NavSection>

					{/* Role Specific Sections */}
					{!role ? (
						<div className="px-4 py-12 text-center space-y-4 animate-in fade-in duration-1000">
							<div className="relative mx-auto w-12 h-12 flex items-center justify-center">
								<div className="absolute inset-0 bg-primary/10 rounded-full animate-ping opacity-20" />
								<Lock className="w-6 h-6 text-primary/40" />
							</div>
							<p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 leading-relaxed px-4">
								Secure Access Required
							</p>
						</div>
					) : isClaimManagement ? (
						<>
							<NavSection title="Collections">
								<NavItem href="/claims" icon={FileText}>
									All Claims
								</NavItem>
								<NavItem href="/new-claim" icon={FilePlus}>
									New Claim
								</NavItem>
								<NavItem href="/resubmitted-claims" icon={RefreshCw}>
									Resubmitted Claims
								</NavItem>
							</NavSection>

							<NavSection title="Outbound (Provider → Payer)">
								<NavItem href="/edi-837" icon={FileCode}>
									EDI 837 Claim Submit
								</NavItem>
								<NavItem href="/edi-270" icon={UserCheck}>
									EDI 270 Eligibility Inquiry
								</NavItem>
								<NavItem href="/edi-276" icon={Search}>
									EDI 276 Claim Status Inquiry
								</NavItem>
							</NavSection>

							<NavSection title="Inbound (Payer → Provider)">
								<NavItem href="/edi-835" icon={Receipt}>
									EDI 835 Remittance
								</NavItem>
								<NavItem href="/edi-271" icon={ClipboardCheck}>
									EDI 271 Eligibility Response
								</NavItem>
								<NavItem href="/edi-277" icon={Activity}>
									EDI 277 Status Response
								</NavItem>
								<NavItem href="/277ca" icon={ArrowUpCircle}>
									EDI 277CA Acknowledgment
								</NavItem>
								<NavItem href="/edi-999" icon={CheckCircle2}>
									EDI 999 Functional Ack
								</NavItem>
							</NavSection>

							<NavSection title="Operations">
								<NavItem href="/authorizations" icon={CheckCircle2}>
									Authorizations
								</NavItem>
								<NavItem href="/eligibility" icon={UserCheck}>
									Eligibility
								</NavItem>
								<NavItem href="/disputes" icon={AlertCircle} badge="2">
									Disputes
								</NavItem>
								<NavItem href="/insurances" icon={Building2}>
									Insurances
								</NavItem>
								<NavItem href="/organizations" icon={Network}>
									Organizations
								</NavItem>
							</NavSection>

							<NavSection title="Reimbursement">
								<NavItem href="/dcmes" icon={Receipt}>
									Cash Payer Claims
								</NavItem>
							</NavSection>
						</>
					) : (
						<>
							<NavSection title="Finance Operations">
								<NavItem href="/claims" icon={FileText}>
									Claims to Pay
								</NavItem>
								<NavItem href="/claims/rejected" icon={FileX}>
									Rejected Claims
								</NavItem>
								<NavItem href="/disputes" icon={AlertCircle}>
									Disputes
								</NavItem>
								<NavItem href="/payouts" icon={DollarSign}>
									Payouts
								</NavItem>
								<NavItem href="/claims/pending" icon={Clock}>
									Pending Claims
								</NavItem>
							</NavSection>
						</>
					)}
				</div>

				{/* Footer Section */}
				<div className="border-t border-border/50 bg-card/50 p-4 backdrop-blur-xl">
					<div className="space-y-1">
						<NavItem href="/settings" icon={Settings}>
							Settings
						</NavItem>
						<NavItem href="/help" icon={HelpCircle}>
							Help & Support
						</NavItem>
						{role && (
							<button
								onClick={() => logout()}
								className="group relative flex items-center justify-between w-full px-4 py-3 text-sm font-medium transition-all duration-300 rounded-xl text-rose-600 hover:bg-rose-500/10"
							>
								<div className="flex items-center gap-3">
									<LogOut className="h-5 w-5 flex-shrink-0 transition-transform group-hover:scale-110" />
									<span>Sign Out</span>
								</div>
							</button>
						)}
					</div>
				</div>
			</nav>
		</>
	);
}
