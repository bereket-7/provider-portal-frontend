"use client";

import {
	AlertCircle,
	ArrowUpRight,
	Calendar,
	CheckCircle2,
	DollarSign,
	FileText,
	LayoutDashboard,
	Users,
} from "lucide-react";
import {
	Area,
	AreaChart,
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ModuleHeader } from "@/components/ui/custom/module-header";

const claimsData = [
	{ month: "Jan", submitted: 45, approved: 42, pending: 3, rejected: 2 },
	{ month: "Feb", submitted: 52, approved: 48, pending: 2, rejected: 2 },
	{ month: "Mar", submitted: 48, approved: 44, pending: 3, rejected: 1 },
	{ month: "Apr", submitted: 61, approved: 58, pending: 2, rejected: 1 },
	{ month: "May", submitted: 55, approved: 52, pending: 2, rejected: 1 },
	{ month: "Jun", submitted: 67, approved: 64, pending: 2, rejected: 1 },
];

const payoutData = [
	{ name: "Processed", value: 78, fill: "hsl(var(--primary))" },
	{ name: "Pending", value: 15, fill: "hsl(var(--chart-2))" },
	{ name: "Rejected", value: 7, fill: "hsl(var(--chart-3))" },
];

const authorizationData = [
	{ month: "Jan", requested: 28, approved: 25 },
	{ month: "Feb", requested: 35, approved: 32 },
	{ month: "Mar", requested: 30, approved: 28 },
	{ month: "Apr", requested: 40, approved: 37 },
	{ month: "May", requested: 38, approved: 36 },
	{ month: "Jun", requested: 45, approved: 42 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
	if (active && payload && payload.length) {
		return (
			<div className="bg-card/90 backdrop-blur-2xl border border-primary/20 p-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] ring-1 ring-white/10">
				<p className="text-[10px] font-black mb-2 text-primary uppercase tracking-[0.2em]">
					{label}
				</p>
				{payload.map((entry: any, index: number) => (
					<div
						key={index}
						className="flex items-center gap-3 text-sm font-bold py-1"
					>
						<div
							className="w-2.5 h-2.5 rounded-full shadow-sm"
							style={{ backgroundColor: entry.color || entry.fill }}
						/>
						<span className="text-foreground/90">{entry.name}:</span>
						<span className="text-foreground ml-auto">{entry.value}</span>
					</div>
				))}
			</div>
		);
	}
	return null;
};

export default function DashboardPage() {
	return (
		<div className="relative space-y-6 pb-12 max-w-[1500px] mx-auto px-4 sm:px-6">
			{/* Sleek Background Elements */}
			<div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
			<div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sky-500/5 rounded-full blur-[100px] pointer-events-none" />

			{/* Refined White Header */}
			<ModuleHeader
				icon={LayoutDashboard}
				title="Dashboard"
				subtitle="Systems active • Tena'adam Team"
				pillColor="bg-emerald-500"
				actions={
					<div className="flex items-center gap-4">
						<div className="flex items-center gap-2 group cursor-default">
							<div className="p-2 bg-primary/5 rounded-lg group-hover:bg-primary/10 transition-colors">
								<Calendar className="w-4 h-4 text-primary" />
							</div>
							<span className="text-sm font-bold tabular-nums text-foreground">
								Feb 16, 2026
							</span>
						</div>

						<div className="h-4 w-px bg-border/40 hidden md:block" />

						<div className="flex items-center gap-1">
							<button className="px-4 py-1.5 text-primary text-[10px] font-black uppercase tracking-wider relative">
								Overview
								<span className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary rounded-full" />
							</button>
							<button className="px-4 py-1.5 text-muted-foreground hover:text-foreground text-[10px] font-black uppercase tracking-wider transition-colors">
								Activity
							</button>
						</div>
					</div>
				}
			/>

			{/* Stats Grid */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
				{[
					{
						title: "Total Claims",
						value: "1,248",
						trend: "+12%",
						icon: FileText,
						color: "primary",
					},
					{
						title: "Revenue",
						value: "$2.4M",
						trend: "+8%",
						icon: DollarSign,
						color: "primary",
					},
					{
						title: "Auth. Requests",
						value: "892",
						trend: "23 Pending",
						icon: CheckCircle2,
						color: "amber",
					},
					{
						title: "Active Members",
						value: "3,421",
						trend: "+3%",
						icon: Users,
						color: "primary",
					},
				].map((stat, i) => (
					<Card
						key={i}
						className="group relative overflow-hidden border-border/40 bg-white rounded-2xl transition-all duration-300 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05),0_10px_30px_-10px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)]"
					>
						<div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12 blur-2xl group-hover:bg-primary/10 transition-all" />
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 relative z-10">
							<CardTitle className="text-[10px] font-black uppercase tracking-[0.15em] text-muted-foreground/80">
								{stat.title}
							</CardTitle>
							<div className="p-2 bg-primary/10 rounded-lg">
								<stat.icon className="w-3.5 h-3.5 text-primary group-hover:scale-110 transition-transform" />
							</div>
						</CardHeader>
						<CardContent className="relative z-10">
							<div className="text-2xl font-black text-foreground tabular-nums">
								{stat.value}
							</div>
							<div className="mt-2 flex items-center justify-between">
								<div
									className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${stat.trend.includes("Pending") ? "bg-amber-500/10 text-amber-500" : "bg-emerald-500/10 text-emerald-500"}`}
								>
									{stat.trend}
								</div>
								<ArrowUpRight className="w-4 h-4 text-muted-foreground/20 group-hover:text-primary transition-colors" />
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			{/* Main Content Area */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
				{/* Analytics Card */}
				<Card className="lg:col-span-2 border-border/40 bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05),0_10px_30px_-10px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] transition-all">
					<CardHeader className="p-6">
						<div className="flex items-center justify-between">
							<div>
								<CardTitle className="text-xl font-black tracking-tight">
									System Performance
								</CardTitle>
								<p className="text-xs text-muted-foreground font-medium mt-1">
									Real-time clinical throughput
								</p>
							</div>
							<div className="flex items-center gap-2">
								<button className="px-4 py-1.5 text-primary text-[10px] font-black uppercase tracking-wider relative">
									Weekly
									<span className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary rounded-full" />
								</button>
								<button className="px-4 py-1.5 text-muted-foreground hover:text-foreground text-[10px] font-black uppercase tracking-wider transition-colors">
									Monthly
								</button>
							</div>
						</div>
					</CardHeader>
					<CardContent className="px-6 pb-6 pt-0">
						<ResponsiveContainer width="100%" height={300}>
							<AreaChart
								data={claimsData}
								margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
							>
								<defs>
									<linearGradient
										id="primaryGradient"
										x1="0"
										y1="0"
										x2="0"
										y2="1"
									>
										<stop
											offset="5%"
											stopColor="hsl(var(--primary))"
											stopOpacity={0.2}
										/>
										<stop
											offset="95%"
											stopColor="hsl(var(--primary))"
											stopOpacity={0}
										/>
									</linearGradient>
								</defs>
								<CartesianGrid
									strokeDasharray="0"
									vertical={false}
									stroke="hsl(var(--border))"
									opacity={0.1}
								/>
								<XAxis
									dataKey="month"
									axisLine={false}
									tickLine={false}
									tick={{
										fill: "hsl(var(--muted-foreground))",
										fontSize: 10,
										fontWeight: 800,
									}}
								/>
								<YAxis
									axisLine={false}
									tickLine={false}
									tick={{
										fill: "hsl(var(--muted-foreground))",
										fontSize: 10,
										fontWeight: 800,
									}}
								/>
								<Tooltip content={<CustomTooltip />} />
								<Area
									type="monotone"
									dataKey="approved"
									stroke="hsl(var(--primary))"
									strokeWidth={3}
									fillOpacity={1}
									fill="url(#primaryGradient)"
								/>
							</AreaChart>
						</ResponsiveContainer>
					</CardContent>
				</Card>

				{/* Distribution Card */}
				<Card className="border-border/40 bg-white rounded-2xl p-6 flex flex-col gap-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05),0_10px_30px_-10px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] transition-all">
					<div>
						<CardTitle className="text-xl font-black tracking-tight">
							Payout Integrity
						</CardTitle>
						<p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mt-1">
							Processing Distribution
						</p>
					</div>

					<div className="flex-1 flex flex-col justify-center">
						<div className="relative w-full aspect-square max-w-[170px] mx-auto">
							<ResponsiveContainer width="100%" height="100%">
								<BarChart
									data={payoutData}
									margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
								>
									<XAxis dataKey="name" hide />
									<Tooltip
										content={<CustomTooltip />}
										cursor={{ fill: "rgba(0,0,0,0.03)" }}
									/>
									<Bar dataKey="value" radius={[6, 6, 6, 6]} barSize={34}>
										{payoutData.map((entry, index) => (
											<Cell key={`cell-${index}`} fill={entry.fill} />
										))}
									</Bar>
								</BarChart>
							</ResponsiveContainer>
							<div className="absolute inset-0 bg-primary/5 blur-3xl -z-10 rounded-full" />
						</div>

						<div className="w-full space-y-3 mt-6">
							{payoutData.map((item, i) => (
								<div key={i} className="flex items-center group cursor-default">
									<div
										className="w-1.5 h-1.5 rounded-full mr-2.5 shrink-0"
										style={{ backgroundColor: item.fill }}
									/>
									<span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest truncate mr-1">
										{item.name}
									</span>
									<span className="ml-auto text-xs font-black tabular-nums group-hover:text-primary transition-colors">
										{item.value}%
									</span>
									<div className="ml-3 w-16 h-1 bg-primary/10 rounded-full overflow-hidden shrink-0">
										<div
											className="h-full transition-all duration-1000"
											style={{
												width: `${item.value}%`,
												backgroundColor: item.fill,
											}}
										/>
									</div>
								</div>
							))}
						</div>
					</div>
				</Card>
			</div>

			{/* Bottom Grid */}
			<div className="grid grid-cols-1 lg:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
				<Card className="lg:col-span-3 border-border/40 bg-white rounded-2xl p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05),0_10px_30px_-10px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] transition-all">
					<CardHeader className="p-0 mb-6 flex flex-row items-center justify-between">
						<div>
							<CardTitle className="text-xl font-black tracking-tight">
								Authorization Lifecycle
							</CardTitle>
							<p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mt-1">
								Monthly Processing Trends
							</p>
						</div>
					</CardHeader>
					<CardContent className="p-0">
						<ResponsiveContainer width="100%" height={260}>
							<BarChart data={authorizationData}>
								<CartesianGrid
									strokeDasharray="0"
									vertical={false}
									stroke="hsl(var(--border))"
									opacity={0.1}
								/>
								<XAxis
									dataKey="month"
									axisLine={false}
									tickLine={false}
									tick={{
										fill: "hsl(var(--muted-foreground))",
										fontSize: 10,
										fontWeight: 800,
									}}
								/>
								<YAxis
									axisLine={false}
									tickLine={false}
									tick={{
										fill: "hsl(var(--muted-foreground))",
										fontSize: 10,
										fontWeight: 800,
									}}
								/>
								<Tooltip
									content={<CustomTooltip />}
									cursor={{ fill: "rgba(0,0,0,0.03)" }}
								/>
								<Bar
									dataKey="requested"
									fill="hsl(var(--primary))"
									radius={[6, 6, 6, 6]}
									barSize={20}
								/>
								<Bar
									dataKey="approved"
									fill="hsl(var(--emerald-500))"
									radius={[6, 6, 6, 6]}
									barSize={20}
								/>
							</BarChart>
						</ResponsiveContainer>
					</CardContent>
				</Card>

				<Card className="border-none bg-gradient-to-br from-primary via-primary/90 to-sky-600 rounded-2xl shadow-[0_20px_40px_-12px_rgba(0,0,0,0.15)] relative overflow-hidden group">
					<div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent)]" />
					<div className="p-6 relative z-10 flex flex-col h-full text-primary-foreground min-h-[250px]">
						<div className="p-2.5 bg-white/20 rounded-xl w-fit mb-4">
							<AlertCircle className="w-5 h-5" />
						</div>
						<h3 className="text-xl font-black leading-tight mb-2">
							Need Expert <br /> Support?
						</h3>
						<p className="text-[11px] font-bold opacity-80 mb-6 leading-relaxed">
							Our clinical & administrative experts are standing by 24/7.
						</p>
						<div className="mt-auto">
							<button className="w-full py-3.5 bg-white text-primary rounded-xl font-black text-xs uppercase tracking-widest shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all">
								Get Support
							</button>
						</div>
					</div>
					{/* Decorative Orbs */}
					<div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700" />
				</Card>
			</div>
		</div>
	);
}
