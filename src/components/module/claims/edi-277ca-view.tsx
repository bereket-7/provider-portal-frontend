"use client";

import {
	Activity,
	AlertCircle,
	ArrowUpRight,
	Calendar,
	ClipboardCheck,
	FileText,
	TrendingUp,
	Zap,
} from "lucide-react";
import {
	Area,
	AreaChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/custom/data-table";
import { ModuleHeader } from "@/components/ui/custom/module-header";
import { PremiumButton } from "@/components/ui/custom/premium-button";

type StatusClaim = (typeof mock277Claims)[0];

const statusTrendData = [
	{ date: "Feb 11", accepted: 85, rejected: 5, pending: 10 },
	{ date: "Feb 12", accepted: 110, rejected: 8, pending: 12 },
	{ date: "Feb 13", accepted: 95, rejected: 4, pending: 8 },
	{ date: "Feb 14", accepted: 130, rejected: 12, pending: 15 },
	{ date: "Feb 15", accepted: 115, rejected: 6, pending: 9 },
	{ date: "Feb 16", accepted: 150, rejected: 9, pending: 11 },
	{ date: "Feb 17", accepted: 142, rejected: 7, pending: 10 },
];

const mock277Claims = [
	{
		id: "277-ACK-001",
		claimRef: "CLM-2024-8892",
		patient: "John Doe",
		date: "2024-02-17",
		time: "11:45 AM",
		status: "Accepted",
		payer: "BlueCross BlueShield",
		category: "A1",
		message: "Claim received and forwarded to payer",
	},
	{
		id: "277-ACK-002",
		claimRef: "CLM-2024-8893",
		patient: "Jane Smith",
		date: "2024-02-17",
		time: "10:20 AM",
		status: "Rejected",
		payer: "Aetna",
		category: "E0",
		message: "Entity's tax ID is invalid or missing",
	},
	{
		id: "277-ACK-003",
		claimRef: "CLM-2024-8894",
		patient: "Robert Wilson",
		date: "2024-02-16",
		time: "03:15 PM",
		status: "Pending",
		payer: "UnitedHealthcare",
		category: "P2",
		message: "Awaiting clinical documentation",
	},
];

const CustomTooltip = ({ active, payload, label }: any) => {
	if (active && payload && payload.length) {
		return (
			<div className="bg-card/90 backdrop-blur-2xl border border-primary/20 p-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] ring-1 ring-foreground/5">
				<p className="text-[10px] font-black mb-2 text-primary uppercase tracking-[0.2em]">
					{label}
				</p>
				{payload.map((entry: any, index: number) => (
					<div
						key={index}
						className="flex items-center gap-3 text-xs font-bold py-1"
					>
						<div
							className="w-2.5 h-2.5 rounded-full shadow-sm"
							style={{ backgroundColor: entry.color }}
						/>
						<span className="text-muted-foreground">{entry.name}:</span>
						<span className="text-foreground ml-auto">{entry.value}</span>
					</div>
				))}
			</div>
		);
	}
	return null;
};

export function EDI277CAView() {
	return (
		<div className="relative space-y-8 pb-12 max-w-[1500px] mx-auto px-4 sm:px-6">
			{/* Background Ambience */}
			<div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse" />
			<div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sky-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />

			<ModuleHeader
				icon={ClipboardCheck}
				title="EDI 277CA Status"
				subtitle="Claims Level Acknowledgments • Payer Response Stream"
				pillColor="bg-emerald-500"
				actions={
					<div className="flex items-center gap-4">
						<div className="hidden md:flex items-center gap-2">
							<div className="p-2 bg-primary/10 rounded-lg">
								<Zap className="w-4 h-4 text-primary" />
							</div>
							<div className="flex flex-col">
								<span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground leading-none">
									Payer Gateway
								</span>
								<span className="text-xs font-black text-primary">
									Connected & Synchronized
								</span>
							</div>
						</div>
						<div className="h-8 w-px bg-border/40" />
						<PremiumButton
							variant="outline"
							className="h-11 px-6 border-border/40 bg-card/50 backdrop-blur-md"
						>
							Export Report
						</PremiumButton>
					</div>
				}
			/>

			{/* Top Analytical Section */}
			<div className="grid grid-cols-1 md:grid-cols-12 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
				{/* Status Chart Card */}
				<Card className="md:col-span-8 border-border/40 bg-card shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] rounded-[2.5rem] overflow-hidden group hover:shadow-xl transition-all duration-700">
					<CardHeader className="p-8 border-b border-border/10">
						<div className="flex items-center justify-between">
							<div>
								<CardTitle className="text-xl font-black tracking-tight flex items-center gap-3">
									Payer Acceptance Trends
									<Badge className="bg-emerald-500/10 text-emerald-600 border-none text-[9px] font-black uppercase tracking-widest px-2 py-0.5">
										Live Cycle
									</Badge>
								</CardTitle>
								<p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.2em] mt-1 opacity-60">
									Claim Acceptance Analysis • Last 7 Days
								</p>
							</div>
							<div className="p-3 bg-emerald-500/5 rounded-2xl">
								<TrendingUp className="w-5 h-5 text-emerald-500" />
							</div>
						</div>
					</CardHeader>
					<CardContent className="p-8 pb-4">
						<ResponsiveContainer width="100%" height={240}>
							<AreaChart
								data={statusTrendData}
								margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
							>
								<defs>
									<linearGradient id="accGradient" x1="0" y1="0" x2="0" y2="1">
										<stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
										<stop offset="95%" stopColor="#10b981" stopOpacity={0} />
									</linearGradient>
									<linearGradient id="rejGradient" x1="0" y1="0" x2="0" y2="1">
										<stop offset="5%" stopColor="#f43f5e" stopOpacity={0.15} />
										<stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
									</linearGradient>
								</defs>
								<CartesianGrid
									strokeDasharray="0"
									vertical={false}
									stroke="hsl(var(--border))"
									opacity={0.1}
								/>
								<XAxis
									dataKey="date"
									axisLine={false}
									tickLine={false}
									tick={{
										fontSize: 10,
										fontWeight: 900,
										fill: "hsl(var(--muted-foreground))",
									}}
									tickMargin={10}
								/>
								<YAxis
									axisLine={false}
									tickLine={false}
									tick={{
										fontSize: 10,
										fontWeight: 900,
										fill: "hsl(var(--muted-foreground))",
									}}
								/>
								<Tooltip content={<CustomTooltip />} />
								<Area
									type="monotone"
									name="Accepted"
									dataKey="accepted"
									stroke="#10b981"
									strokeWidth={4}
									fill="url(#accGradient)"
								/>
								<Area
									type="monotone"
									name="Rejected"
									dataKey="rejected"
									stroke="#f43f5e"
									strokeWidth={4}
									fill="url(#rejGradient)"
								/>
							</AreaChart>
						</ResponsiveContainer>
					</CardContent>
				</Card>

				{/* Key Lifecycle Metrics */}
				<div className="md:col-span-4 flex flex-col gap-6">
					{[
						{
							label: "Cycle Pass Rate",
							value: "94.2%",
							desc: "Post-999 acceptance rate",
							icon: Activity,
							color: "text-primary",
							bg: "bg-primary/10",
						},
						{
							label: "Payer Rejections",
							value: "12",
							desc: "Failed at payer gateway",
							icon: AlertCircle,
							color: "text-rose-500",
							bg: "bg-rose-500/10",
						},
					].map((metric, i) => (
						<Card
							key={i}
							className="flex-1 border-border/40 bg-card/80 backdrop-blur-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] rounded-[2.5rem] group hover:shadow-xl transition-all duration-500 overflow-hidden relative"
						>
							<CardContent className="p-8 h-full flex flex-col justify-between relative z-10">
								<div className="flex items-center justify-between w-full">
									<div className={`p-3 rounded-xl ${metric.bg}`}>
										<metric.icon className={`w-5 h-5 ${metric.color}`} />
									</div>
									<ArrowUpRight className="w-5 h-5 text-muted-foreground/20 group-hover:text-primary transition-colors" />
								</div>
								<div>
									<p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground opacity-60">
										{metric.label}
									</p>
									<p className="text-3xl font-black tracking-tighter text-foreground mt-1">
										{metric.value}
									</p>
									<p className="text-[10px] font-bold text-muted-foreground mt-2 flex items-center gap-1.5 leading-none">
										<span
											className={`w-1.5 h-1.5 rounded-full ${metric.bg.replace("/10", "")}`}
										/>
										{metric.desc}
									</p>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>

			<div className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
				<DataTable
					title="Acknowledgment Stream (277CA)"
					subtitle="Claims Status Ledger • Direct Payer Feedback"
					data={mock277Claims}
					searchPlaceholder="Search Claim Ref or Patient..."
					onExport={() => console.log("Exporting 277CA...")}
					columns={[
						{
							header: "Claim Identity",
							key: "claimRef",
							render: (claim: StatusClaim) => (
								<div className="flex items-center gap-4">
									<div className="p-2.5 bg-primary/5 rounded-lg border border-primary/10">
										<FileText className="w-4 h-4 text-primary" />
									</div>
									<div>
										<p className="text-[13px] font-black text-foreground">
											{claim.claimRef}
										</p>
										<div className="flex items-center gap-2 mt-0.5">
											<span className="text-[9px] font-bold text-muted-foreground uppercase">
												{claim.patient}
											</span>
										</div>
									</div>
								</div>
							),
						},
						{
							header: "Payer Context",
							key: "payer",
							render: (claim: StatusClaim) => (
								<div className="space-y-0.5">
									<p className="text-[11px] font-black text-foreground tracking-tight uppercase">
										{claim.payer}
									</p>
									<div className="flex items-center gap-2">
										<Calendar className="w-3 h-3 text-muted-foreground opacity-60" />
										<span className="text-[9px] font-bold text-muted-foreground uppercase">
											{claim.date} • {claim.time}
										</span>
									</div>
								</div>
							),
						},
						{
							header: "Status",
							key: "status",
							align: "center",
							render: (claim: StatusClaim) => (
								<Badge
									className={`rounded-xl px-3 py-1 text-[9px] font-black uppercase tracking-widest border-none ${
										claim.status === "Accepted"
											? "bg-emerald-500/10 text-emerald-600 shadow-none"
											: claim.status === "Rejected"
												? "bg-rose-500/10 text-rose-600 shadow-none"
												: "bg-amber-500/10 text-amber-600 shadow-none"
									}`}
								>
									{claim.status}
								</Badge>
							),
						},
						{
							header: "Details",
							key: "message",
							render: (claim: StatusClaim) => (
								<div className="flex flex-col gap-1">
									<div className="flex items-center gap-2">
										<Badge className="bg-primary/5 text-primary text-[8px] font-black px-1.5 py-0 border-primary/10">
											{claim.category}
										</Badge>
										<span className="text-[10px] font-bold text-foreground/80">
											{claim.message}
										</span>
									</div>
								</div>
							),
						},
						{
							header: "Action",
							key: "action",
							align: "right",
							render: () => (
								<button className="p-2 hover:bg-primary/5 rounded-lg transition-colors border border-transparent hover:border-border/40">
									<ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
								</button>
							),
						},
					]}
				/>
			</div>
		</div>
	);
}
