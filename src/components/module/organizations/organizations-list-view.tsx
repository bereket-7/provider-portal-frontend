"use client";

import { useState } from "react";

import {
	BarChart3,
	Building,
	Download,
	Eye,
	Filter,
	Globe,
	LayoutGrid,
	List,
	MapPin,
	MoreHorizontal,
	Network,
	Plus,
	Search,
	ShieldCheck,
	Users,
	Zap,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/custom/data-table";
import { ModuleHeader } from "@/components/ui/custom/module-header";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Organization = (typeof organizations)[0];

interface Column<T> {
	header: string;
	key: string;
	align?: "left" | "center" | "right";
	className?: string;
	render?: (item: T) => React.ReactNode;
}

// Mock data for organizations with images
const organizations = [
	{
		id: "ORG-001",
		name: "National Health Systems",
		type: "Health System",
		region: "East Africa",
		headcount: "1,200",
		status: "Active",
		image:
			"https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
	},
	{
		id: "ORG-002",
		name: "Blue Shield Partners",
		type: "Insurance Group",
		region: "Addis Ababa",
		headcount: "450",
		status: "Verified",
		image:
			"https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800",
	},
	{
		id: "ORG-003",
		name: "GovMed Ethiopia",
		type: "Government",
		region: "National",
		headcount: "5,000+",
		status: "Active",
		image:
			"https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&q=80&w=800",
	},
	{
		id: "ORG-004",
		name: "Unity Medical Group",
		type: "Private Network",
		region: "Oromia",
		headcount: "800",
		status: "Pending",
		image:
			"https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=800",
	},
	{
		id: "ORG-005",
		name: "Global Care Alliance",
		type: "NGO",
		region: "Multi-regional",
		headcount: "150",
		status: "Verified",
		image:
			"https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
	},
	{
		id: "ORG-006",
		name: "Legacy Health Trust",
		type: "Health System",
		region: "Amhara",
		headcount: "300",
		status: "Under Audit",
		image:
			"https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800",
	},
];

const types = Array.from(new Set(organizations.map((o) => o.type)));

const cardShadow =
	"shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05),0_10px_30px_-10px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] transition-all duration-500";

export function OrganizationsListView() {
	const [viewType, setViewType] = useState<"grid" | "table">("grid");
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedType, setSelectedType] = useState("All Types");

	const filtered = organizations.filter((o) => {
		const matchesSearch =
			o.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			o.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
			o.region.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesType = selectedType === "All Types" || o.type === selectedType;
		return matchesSearch && matchesType;
	});

	return (
		<div className="relative space-y-8 pb-12 max-w-[1500px] mx-auto px-4 sm:px-6">
			{/* Background ambience */}
			<div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
			<div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sky-500/5 rounded-full blur-[100px] pointer-events-none" />

			{/* Header */}
			<ModuleHeader
				icon={Network}
				title="Organizations"
				subtitle="System Registry • Enterprise Nodes"
				actions={
					<div className="flex items-center gap-4">
						{/* View Toggle */}
						<div className="flex items-center bg-muted/50 p-1 rounded-xl border border-border/40">
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

						<div className="h-4 w-px bg-border/40 hidden md:block" />

						<button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-xs font-black uppercase tracking-wider shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
							<Plus className="w-4 h-4" />
							New Org
						</button>
					</div>
				}
			/>

			{/* Stats Grid */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
				{[
					{
						title: "Total Organizations",
						value: "142",
						trend: "Global Reach",
						icon: Building,
						color: "primary",
					},
					{
						title: "Active Verified",
						value: "128",
						trend: "90% Network",
						icon: ShieldCheck,
						color: "emerald",
					},
					{
						title: "Compliance Score",
						value: "96.4%",
						trend: "High Standard",
						icon: Zap,
						color: "sky",
					},
					{
						title: "Enterprise Nodes",
						value: "2.4k+",
						trend: "Scaling Fast",
						icon: Globe,
						color: "primary",
					},
				].map((stat, i) => (
					<Card
						key={i}
						className="group relative overflow-hidden border-border/40 bg-card rounded-2xl transition-all duration-300 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05),0_10px_30px_-10px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)]"
					>
						<div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12 blur-2xl" />
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
										stat.color === "sky"
											? "bg-sky-500/10 text-sky-500"
											: "bg-emerald-500/10 text-emerald-500"
									}`}
								>
									{stat.trend}
								</div>
								<BarChart3 className="w-4 h-4 text-muted-foreground/20 group-hover:text-primary transition-colors" />
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			{/* Search & Filter Bar */}
			<div className="flex flex-col md:flex-row items-stretch gap-0 relative z-10 bg-card border border-border/40 rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05),0_10px_30px_-10px_rgba(0,0,0,0.03)] overflow-hidden">
				<div className="relative flex-1 group">
					<Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50 group-focus-within:text-primary transition-colors duration-200" />
					<input
						type="text"
						placeholder="Search organizations by name, type or region..."
						className="w-full h-12 pl-11 pr-4 bg-transparent text-sm font-medium text-foreground placeholder:text-muted-foreground/40 focus:outline-none transition-all"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>

				<div className="hidden md:block w-px bg-border/50 my-3" />

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
							Org Type
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							onClick={() => setSelectedType("All Types")}
							className="rounded-lg px-2.5 py-2 text-xs font-medium"
						>
							All Types
						</DropdownMenuItem>
						{types.map((t) => (
							<DropdownMenuItem
								key={t}
								onClick={() => setSelectedType(t)}
								className="rounded-lg px-2.5 py-2 text-xs font-medium"
							>
								{t}
							</DropdownMenuItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>

				<div className="hidden md:block w-px bg-border/50 my-3" />

				<button className="flex items-center gap-2 px-4 h-12 text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-all">
					<Download className="w-3.5 h-3.5" />
					<span className="hidden sm:inline">Export</span>
				</button>
			</div>

			{/* Content */}
			{filtered.length > 0 ? (
				viewType === "grid" ? (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
						{filtered.map((org) => (
							<OrgCard key={org.id} org={org} />
						))}
					</div>
				) : (
					<div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
						<DataTable
							title="Enterprise Directory"
							subtitle={`Management registry • ${filtered.length} results`}
							data={filtered}
							onExport={() => console.log("Exporting organizations...")}
							columns={getTableColumns()}
						/>
					</div>
				)
			) : (
				<div className="py-20 flex flex-col items-center justify-center bg-card/20 rounded-2xl border border-dashed border-border/40 animate-in fade-in duration-500">
					<div className="p-5 bg-muted/20 rounded-full mb-6">
						<Search className="w-10 h-10 text-muted-foreground/30" />
					</div>
					<h3 className="text-lg font-bold text-foreground/70">
						No organizations found
					</h3>
					<p className="text-xs text-muted-foreground mt-1">
						Try adjusting your search or filters
					</p>
					<button
						onClick={() => {
							setSearchTerm("");
							setSelectedType("All Types");
						}}
						className="mt-6 px-5 py-2 bg-primary text-primary-foreground rounded-xl text-xs font-semibold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors"
					>
						Clear Filters
					</button>
				</div>
			)}
		</div>
	);
}

function OrgCard({ org }: { org: any }) {
	const statusColor =
		org.status === "Active" || org.status === "Verified"
			? "bg-emerald-500/80 text-white"
			: org.status === "Pending"
				? "bg-amber-500/80 text-white"
				: "bg-rose-500/80 text-white";

	return (
		<Card
			className={`group border-border/40 bg-card rounded-2xl overflow-hidden py-0 ${cardShadow}`}
		>
			{/* Image */}
			<div className="relative h-36 w-full overflow-hidden">
				<img
					src={org.image}
					alt={org.name}
					className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

				{/* Status badge */}
				<div className="absolute top-3 right-3">
					<span
						className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wider backdrop-blur-sm ${statusColor}`}
					>
						{org.status}
					</span>
				</div>

				{/* Name overlay */}
				<div className="absolute bottom-0 left-0 right-0 px-5 pb-4">
					<p className="text-[9px] font-semibold text-white/50 uppercase tracking-widest mb-0.5">
						{org.type}
					</p>
					<h3 className="text-sm font-bold text-white truncate leading-snug">
						{org.name}
					</h3>
				</div>
			</div>

			{/* Body */}
			<CardContent className="px-5 py-4 space-y-4">
				<div className="flex items-center justify-between gap-3">
					<div className="min-w-0">
						<p className="text-[9px] font-semibold text-muted-foreground/50 uppercase tracking-widest mb-0.5">
							Region
						</p>
						<div className="flex items-center gap-1">
							<MapPin className="w-3 h-3 text-primary flex-shrink-0" />
							<p className="text-xs font-semibold text-foreground truncate">
								{org.region}
							</p>
						</div>
					</div>
					<div className="text-right min-w-0">
						<p className="text-[9px] font-semibold text-muted-foreground/50 uppercase tracking-widest mb-0.5">
							Scale
						</p>
						<div className="flex items-center justify-end gap-1">
							<Users className="w-3 h-3 text-primary flex-shrink-0" />
							<p className="text-xs font-semibold text-foreground">
								{org.headcount}
							</p>
						</div>
					</div>
				</div>

				{/* Actions */}
				<div className="flex items-center gap-2 pt-1 border-t border-border/30">
					<button className="flex-1 flex items-center justify-center gap-2 h-9 border border-primary text-primary rounded-xl text-[10px] font-semibold hover:bg-primary hover:text-primary-foreground transition-colors">
						<Eye className="w-3.5 h-3.5" />
						View Profile
					</button>

					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<button className="h-9 w-9 flex items-center justify-center bg-muted/40 hover:bg-muted rounded-xl transition-colors">
								<MoreHorizontal className="w-4 h-4 text-muted-foreground" />
							</button>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							align="end"
							className="w-48 rounded-xl z-[100] p-1.5"
						>
							<DropdownMenuLabel className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-2.5 py-1.5">
								Actions
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem className="rounded-lg flex items-center gap-2.5 cursor-pointer text-xs font-medium px-2.5 py-2">
								<Eye className="w-3.5 h-3.5 text-primary" />
								View Details
							</DropdownMenuItem>
							<DropdownMenuItem className="rounded-lg flex items-center gap-2.5 cursor-pointer text-xs font-medium px-2.5 py-2">
								<ShieldCheck className="w-3.5 h-3.5 text-primary" />
								Verify Org
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem className="rounded-lg flex items-center gap-2.5 cursor-pointer text-xs font-medium px-2.5 py-2">
								<Download className="w-3.5 h-3.5" />
								Export Data
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</CardContent>
		</Card>
	);
}

function getTableColumns(): Column<Organization>[] {
	return [
		{
			header: "ID",
			key: "id",
			className: "px-8 font-black text-primary text-xs py-5",
		},
		{
			header: "Organization Name",
			key: "name",
			className: "px-8 font-bold text-sm",
		},
		{
			header: "Type",
			key: "type",
			className: "px-8",
			render: (org: Organization) => (
				<span className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">
					{org.type}
				</span>
			),
		},
		{
			header: "Region",
			key: "region",
			className: "px-8 text-xs font-bold",
		},
		{
			header: "Scale",
			key: "headcount",
			render: (org: Organization) => (
				<div className="px-8 flex items-center gap-1.5">
					<Users className="w-3 h-3 text-muted-foreground/40" />
					<span className="text-xs font-bold text-muted-foreground">
						{org.headcount}
					</span>
				</div>
			),
		},
		{
			header: "Status",
			key: "status",
			className: "px-8",
			render: (org: Organization) => (
				<Badge
					variant="outline"
					className={`text-[9px] font-black uppercase tracking-wider border-none ${
						org.status === "Active" || org.status === "Verified"
							? "bg-emerald-500/10 text-emerald-500"
							: org.status === "Pending"
								? "bg-amber-500/10 text-amber-500"
								: "bg-rose-500/10 text-rose-500"
					}`}
				>
					{org.status}
				</Badge>
			),
		},
		{
			header: "",
			key: "action",
			align: "right",
			className: "px-8",
			render: () => (
				<button className="p-2 hover:bg-primary/5 rounded-lg transition-colors">
					<MoreHorizontal className="w-4 h-4 text-muted-foreground" />
				</button>
			),
		},
	];
}
