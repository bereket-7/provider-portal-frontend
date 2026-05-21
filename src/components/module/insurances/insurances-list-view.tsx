"use client";

import Link from "next/link";
import { useState } from "react";

import {
	Activity,
	ArrowUpRight,
	Building2,
	Clock,
	Download,
	Eye,
	Filter,
	LayoutGrid,
	List,
	Mail,
	MoreHorizontal,
	Plus,
	Search,
	ShieldCheck,
	Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/custom/data-table";
import { ModuleHeader } from "@/components/ui/custom/module-header";
import { usePayers } from "@/hooks/usePayers";
import { getPayerLogoUrl } from "@/lib/demo/ethiopian-data";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Insurance = {
	id: string;
	name: string;
	type: string;
	tier: string;
	network: string;
	status: string;
	category: string;
	logoUrl?: string;
	payerCode?: string;
};

// Define Column interface locally to ensure correct typing
interface Column<T> {
	header: string;
	key: string;
	align?: "left" | "center" | "right";
	className?: string;
	render?: (item: T) => React.ReactNode;
}

export function InsurancesListView() {
	const [activeTab, setActiveTab] = useState<
		"All" | "Active" | "Pending" | "Suspended"
	>("All");
	const [viewType, setViewType] = useState<"grid" | "table">("grid");
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedType, setSelectedType] = useState("All Types");

	const { data: payers, isLoading } = usePayers(searchTerm);

	const filteredInsurances: Insurance[] = (payers || []).map((p: any) => ({
		id: p.id,
		name: p.name,
		type: p.type || "Commercial",
		tier: p.tier || "National",
		network: p.network || "Provider Network",
		status: p.status === "active" ? "Active" : p.status === "inactive" ? "Inactive" : "Active",
		category: p.status === "active" ? "Active" : p.status === "inactive" ? "Suspended" : "Active",
		logoUrl: getPayerLogoUrl(p.id, p.logoUrl),
		payerCode: p.payerCode,
	}));

	const types = ["Commercial", "Social", "Private"];

	const cardShadow =
		"shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05),0_10px_30px_-10px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] transition-all duration-500";

	return (
		<div className="relative space-y-8 pb-12 max-w-[1500px] mx-auto px-4 sm:px-6">
			{/* Sleek Background Elements */}
			<div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
			<div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

			{/* Refined Header */}
			<ModuleHeader
				icon={Building2}
				title="Insurances"
				subtitle="Carrier Directory • Carrier Management"
				actions={
					<div className="flex items-center gap-4">
						{/* View Toggle */}
						<div className="flex items-center bg-muted/50 p-1 rounded-xl border border-border/40 font-inter">
							<button
								onClick={() => setViewType("grid")}
								className={`p-1.5 rounded-lg transition-all ${
									viewType === "grid"
										? "bg-background text-primary shadow-sm"
										: "text-muted-foreground hover:text-foreground"
								}`}
								title="Grid View"
							>
								<LayoutGrid className="w-4 h-4" />
							</button>
							<button
								onClick={() => setViewType("table")}
								className={`p-1.5 rounded-lg transition-all ${
									viewType === "table"
										? "bg-background text-primary shadow-sm"
										: "text-muted-foreground hover:text-foreground"
								}`}
								title="Table View"
							>
								<List className="w-4 h-4" />
							</button>
						</div>

						<div className="h-6 w-px bg-border/40 hidden md:block" />

						{/* Status Filters */}
						<div className="flex items-center gap-1">
							{["All", "Active", "Pending", "Suspended"].map((tab) => (
								<button
									key={tab}
									onClick={() => setActiveTab(tab as any)}
									className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-wider transition-all relative ${
										activeTab === tab
											? "text-primary"
											: "text-muted-foreground hover:text-foreground"
									}`}
								>
									{tab}
									{activeTab === tab && (
										<span className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary rounded-full animate-in fade-in zoom-in duration-300" />
									)}
								</button>
							))}
						</div>

						<div className="h-4 w-px bg-border/40 hidden md:block mx-1" />
						<Link
							href="/insurances/new"
							className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-xs font-black uppercase tracking-wider shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
						>
							<Plus className="w-4 h-4" />
							Add Carrier
						</Link>
					</div>
				}
			/>

			{/* Stats Grid */}
			<StatsGrid count={filteredInsurances.length} />

			{/* Filter & Search Bar */}
			<div className="flex flex-col md:flex-row items-stretch gap-0 relative z-10 bg-card border border-border/40 rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05),0_10px_30px_-10px_rgba(0,0,0,0.03)] overflow-hidden">
				{/* Search Input */}
				<div className="relative flex-1 group">
					<Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50 group-focus-within:text-primary transition-colors duration-200" />
					<input
						type="text"
						placeholder="Search insurances by name or type..."
						className="w-full h-12 pl-11 pr-4 bg-transparent text-sm font-medium text-foreground placeholder:text-muted-foreground/40 focus:outline-none transition-all"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>

				{/* Divider */}
				<div className="hidden md:block w-px bg-border/50 my-3" />

				{/* Type Filter */}
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<button className="flex items-center gap-2.5 px-5 h-12 text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-all whitespace-nowrap">
							<Filter className="w-3.5 h-3.5 text-primary/70" />
							<span>{selectedType}</span>
						</button>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						align="end"
						className="w-[200px] rounded-xl z-[100] p-1.5"
					>
						<DropdownMenuLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-2 py-1.5">
							Carrier Type
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							onClick={() => setSelectedType("All Types")}
							className="rounded-lg px-2.5 py-2 text-xs font-medium"
						>
							All Types
						</DropdownMenuItem>
						{types.map((s) => (
							<DropdownMenuItem
								key={s}
								onClick={() => setSelectedType(s)}
								className="rounded-lg px-2.5 py-2 text-xs font-medium"
							>
								{s}
							</DropdownMenuItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>

				{/* Divider */}
				<div className="hidden md:block w-px bg-border/50 my-3" />

				{/* Export Button */}
				<button className="flex items-center gap-2 px-4 h-12 text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-all">
					<Download className="w-3.5 h-3.5" />
					<span className="hidden sm:inline">Export</span>
				</button>
			</div>

			{/* Content Area */}
			{filteredInsurances.length > 0 ? (
				viewType === "grid" ? (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
						{filteredInsurances.map((insurance: any) => (
							<InsuranceCard
								key={insurance.id}
								insurance={insurance}
								cardShadow={cardShadow}
							/>
						))}
					</div>
				) : (
					<div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
						<DataTable
							title="Insurance Directory"
							subtitle={`${activeTab} carrier registry • ${filteredInsurances.length} results`}
							data={filteredInsurances}
							onExport={() => console.log("Exporting insurances...")}
							columns={getTableColumns()}
						/>
					</div>
				)
			) : (
				<div className="py-20 flex flex-col items-center justify-center bg-card/20 rounded-[3rem] border border-dashed border-border/40 animate-in fade-in duration-500">
					<div className="p-5 bg-muted/20 rounded-full mb-6 relative">
						<Search className="w-12 h-12 text-muted-foreground/30" />
						<div className="absolute inset-0 bg-primary/5 rounded-full blur-xl" />
					</div>
					<h3 className="text-xl font-black tracking-tight text-foreground/80 lowercase">
						no insurances found
					</h3>
					<p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-2">
						Try adjusting your search or filters
					</p>
					<button
						onClick={() => {
							setSearchTerm("");
							setSelectedType("All Types");
							setActiveTab("All");
						}}
						className="mt-8 px-6 py-2.5 bg-primary text-primary-foreground rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
					>
						Clear All Filters
					</button>
				</div>
			)}
		</div>
	);
}

function InsuranceCard({
	insurance,
	cardShadow,
}: {
	insurance: any;
	cardShadow: string;
}) {
	return (
		<Card
			className={`group border-border/40 bg-card rounded-2xl overflow-hidden py-0 ${cardShadow}`}
		>
			{/* Card logo header */}
			<div className="relative h-36 w-full overflow-hidden bg-white dark:bg-slate-900 border-b border-border/30">
				{insurance.logoUrl ? (
					// eslint-disable-next-line @next/next/no-img-element
					<img
						src={insurance.logoUrl}
						alt={`${insurance.name} logo`}
						className="relative z-0 w-full h-full object-contain p-5 transition-transform duration-700 group-hover:scale-105"
					/>
				) : (
					<div className="w-full h-full flex items-center justify-center">
						<Building2 className="w-14 h-14 text-muted-foreground/30" />
					</div>
				)}
				<div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/70 to-transparent pointer-events-none z-[1]" />

				{/* Status badge — top right */}
				<div className="absolute top-3 right-3 z-[2]">
					<span
						className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wider backdrop-blur-sm ${
							insurance.status === "Active" || insurance.status === "Verified"
								? "bg-emerald-500/80 text-white"
								: insurance.status === "Pending"
									? "bg-amber-500/80 text-white"
									: "bg-rose-500/80 text-white"
						}`}
					>
						{insurance.status}
					</span>
				</div>

				{/* Name overlay at bottom */}
				<div className="absolute bottom-0 left-0 right-0 px-5 pb-4 z-[2]">
					<p className="text-[9px] font-semibold text-white/50 uppercase tracking-widest mb-0.5">
						{insurance.type} Carrier
					</p>
					<h3 className="text-sm font-bold text-white truncate leading-snug">
						{insurance.name}
					</h3>
				</div>
			</div>

			{/* Card Body */}
			<CardContent className="px-5 py-4 space-y-4">
				{/* Meta row */}
				<div className="flex items-center justify-between gap-3">
					<div className="min-w-0">
						<p className="text-[9px] font-semibold text-muted-foreground/50 uppercase tracking-widest mb-0.5">
							Plan Tier
						</p>
						<p className="text-xs font-semibold text-foreground truncate">
							{insurance.tier}
						</p>
					</div>
					<div className="text-right min-w-0">
						<p className="text-[9px] font-semibold text-muted-foreground/50 uppercase tracking-widest mb-0.5">
							Network
						</p>
						<div className="flex items-center justify-end gap-1">
							<ShieldCheck className="w-3 h-3 text-primary flex-shrink-0" />
							<p className="text-xs font-semibold text-primary truncate">
								{insurance.network}
							</p>
						</div>
					</div>
				</div>

				{/* Action row */}
				<div className="flex items-center gap-2 pt-1 border-t border-border/30">
					<Link
						href={`/insurances/${insurance.id}`}
						className="flex-1 flex items-center justify-center gap-2 h-9 border border-primary text-primary rounded-xl text-[10px] font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
					>
						<Eye className="w-3.5 h-3.5" />
						View Profile
					</Link>

					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<button className="h-9 w-9 flex items-center justify-center bg-muted/40 hover:bg-muted rounded-xl transition-colors">
								<MoreHorizontal className="w-4 h-4 text-muted-foreground" />
							</button>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							align="end"
							className="w-52 rounded-xl z-[100] p-1.5"
						>
							<DropdownMenuLabel className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-2.5 py-1.5">
								Actions
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem asChild>
								<Link
									href={`/insurances/${insurance.id}`}
									className="rounded-lg flex items-center gap-2.5 cursor-pointer text-xs font-medium px-2.5 py-2"
								>
									<Eye className="w-3.5 h-3.5 text-primary" />
									View Carrier Detail
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem className="rounded-lg flex items-center gap-2.5 cursor-pointer text-xs font-medium px-2.5 py-2">
								<Mail className="w-3.5 h-3.5 text-primary" />
								Contact Carrier
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem className="rounded-lg flex items-center gap-2.5 cursor-pointer text-xs font-medium px-2.5 py-2">
								<Download className="w-3.5 h-3.5" />
								Network Agreement
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</CardContent>
		</Card>
	);
}

function StatsGrid({ count }: { count: number }) {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
			{[
				{
					title: "Total Carriers",
					value: count.toString(),
					trend: "Seeded Data",
					icon: Users,
					color: "primary",
				},
				{
					title: "Active Coverage",
					value: count.toString(),
					trend: "100% Active",
					icon: Activity,
					color: "primary",
				},
				{
					title: "Network Verified",
					value: "100%",
					trend: "Top Tier",
					icon: ShieldCheck,
					color: "primary",
				},
				{
					title: "Pending Review",
					value: "0",
					trend: "Clean",
					icon: Clock,
					color: "amber",
				},
			].map((stat, i) => (
				<Card
					key={i}
					className="group relative overflow-hidden border-border/40 bg-card rounded-3xl transition-all duration-300 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05),0_10px_30px_-10px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)]"
				>
					<div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12 blur-2xl transition-all" />
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 relative z-10 p-5">
						<CardTitle className="text-[10px] font-black uppercase tracking-[0.15em] text-muted-foreground/80">
							{stat.title}
						</CardTitle>
						<div className="p-2.5 bg-primary/10 rounded-xl">
							<stat.icon className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
						</div>
					</CardHeader>
					<CardContent className="relative z-10 px-5 pb-5">
						<div className="text-2xl font-black text-foreground tabular-nums">
							{stat.value}
						</div>
						<div className="mt-2.5 flex items-center justify-between">
							<div
								className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${
									stat.color === "amber"
										? "bg-amber-500/10 text-amber-500"
										: "bg-emerald-500/10 text-emerald-500"
								}`}
							>
								{stat.trend}
							</div>
							<ArrowUpRight className="w-4 h-4 text-muted-foreground/20 group-hover:text-primary transition-colors" />
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
}

function getTableColumns(): Column<Insurance>[] {
	return [
		{
			header: "ID",
			key: "id",
			className: "px-8 font-black text-primary text-xs py-6",
		},
		{
			header: "Insurance Name",
			key: "name",
			className: "px-8 font-bold text-sm",
			render: (p: Insurance) => (
				<div className="flex items-center gap-3">
					{p.logoUrl ? (
						// eslint-disable-next-line @next/next/no-img-element
						<img
							src={p.logoUrl}
							alt=""
							className="h-8 w-8 object-contain rounded-md bg-white border border-border/30 p-0.5"
						/>
					) : (
						<div className="h-8 w-8 rounded-md bg-muted/40 flex items-center justify-center">
							<Building2 className="w-4 h-4 text-muted-foreground" />
						</div>
					)}
					<span>{p.name}</span>
				</div>
			),
		},
		{
			header: "Carrier Type",
			key: "type",
			className: "px-8",
			render: (p: Insurance) => (
				<span className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">
					{p.type}
				</span>
			),
		},
		{
			header: "Plan Tier",
			key: "tier",
			className: "px-8 text-xs font-bold",
		},
		{
			header: "Network",
			key: "network",
			className: "px-8 text-xs text-muted-foreground",
		},
		{
			header: "Status",
			key: "status",
			className: "px-8",
			render: (p: Insurance) => (
				<Badge
					variant="outline"
					className={`text-[9px] font-black uppercase tracking-wider border-none ${
						p.status === "Active" || p.status === "Verified"
							? "bg-emerald-500/10 text-emerald-500"
							: p.status === "Pending"
								? "bg-amber-500/10 text-amber-500"
								: "bg-rose-500/10 text-rose-500"
					}`}
				>
					{p.status}
				</Badge>
			),
		},
		{
			header: "",
			key: "action",
			align: "right",
			className: "px-8",
			render: (p: Insurance) => (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<button className="p-2.5 hover:bg-primary/5 rounded-xl transition-colors group/btn">
							<MoreHorizontal className="w-4 h-4 text-muted-foreground group-hover/btn:text-primary" />
						</button>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						align="end"
						className="w-56 rounded-2xl z-[100] p-2"
					>
						<DropdownMenuLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-3 py-2">
							Management
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem asChild>
							<Link
								href={`/insurances/${p.id}`}
								className="flex rounded-xl items-center gap-3 cursor-pointer font-bold text-xs p-3 transition-colors hover:bg-primary/5"
							>
								<Eye className="w-4 h-4 text-primary" />
								View Carrier
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem className="flex rounded-xl items-center gap-3 cursor-pointer font-bold text-xs p-3 transition-colors hover:bg-primary/5">
							<Mail className="w-4 h-4 text-primary" />
							Contact
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem className="flex rounded-xl items-center gap-3 cursor-pointer font-bold text-xs p-3 transition-colors text-amber-600">
							<Clock className="w-4 h-4" />
							Update Status
						</DropdownMenuItem>
						<DropdownMenuItem className="flex rounded-xl items-center gap-3 cursor-pointer font-bold text-xs p-3 transition-colors hover:bg-primary/5">
							<Download className="w-4 h-4 text-primary" />
							Agreement
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			),
		},
	];
}
