"use client";

import {
	Activity,
	AlertCircle,
	ArrowUpRight,
	Calendar,
	CheckCircle,
	ClipboardCheck,
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
import { use999Acknowledgments } from "@/hooks/use999Acknowledgments";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

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

const getAckLabel = (code: string) => {
	const labels: Record<string, string> = {
		A: "Accepted",
		E: "Accepted w/ Errors",
		M: "Rejected (MAC Failed)",
		P: "Partially Accepted",
		R: "Rejected",
		W: "Rejected (Assurance Failed)",
		X: "Rejected (Decryption Failed)",
	};
	return labels[code] || "Unknown";
};

export function EDI999View() {
	const { data: acknowledgments, isLoading } = use999Acknowledgments();

	if (isLoading) {
		return (
			<div className="space-y-8 p-8">
				<Skeleton className="h-20 w-full rounded-2xl" />
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					<Skeleton className="h-32 rounded-3xl" />
					<Skeleton className="h-32 rounded-3xl" />
					<Skeleton className="h-32 rounded-3xl" />
				</div>
				<Skeleton className="h-[400px] w-full rounded-3xl" />
			</div>
		);
	}

	const trendMap = (acknowledgments || []).reduce((acc: any, curr: any) => {
		const date = format(new Date(curr.receivedAt), "MMM dd");
		if (!acc[date]) {
			acc[date] = { date, total: 0, errors: 0 };
		}
		acc[date].total += 1;
		acc[date].errors += curr.errorCount || 0;
		return acc;
	}, {});

	const trendData = Object.values(trendMap).sort((a: any, b: any) => 
		new Date(a.date).getTime() - new Date(b.date).getTime()
	);

	const passRate = acknowledgments?.length 
		? ((acknowledgments.filter((a: any) => a.isAccepted).length / acknowledgments.length) * 100).toFixed(1)
		: "0.0";
	
	const totalErrors = acknowledgments?.reduce((sum: number, a: any) => sum + (a.errorCount || 0), 0) || 0;

	const metrics = [
		{
			label: "Throughput",
			value: `${passRate}%`,
			desc: "Syntactical pass rate",
			icon: Activity,
			color: "text-emerald-500",
			bg: "bg-emerald-500/10",
		},
		{
			label: "Total Errors",
			value: totalErrors.toString(),
			desc: "Technical compliance issues",
			icon: AlertCircle,
			color: "text-rose-500",
			bg: "bg-rose-500/10",
		},
		{
			label: "Acknowledgments",
			value: acknowledgments?.length.toString() || "0",
			desc: "Functional groups processed",
			icon: ClipboardCheck,
			color: "text-primary",
			bg: "bg-primary/10",
		},
	];
	return (
		<div className="relative space-y-8 pb-12 max-w-[1500px] mx-auto px-4 sm:px-6">
			{/* Dynamic Background Elements */}
			<div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none -z-10 animate-pulse" />
			<div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-sky-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />

			<ModuleHeader
				icon={ClipboardCheck}
				title="EDI 999 Acknowledgments"
				subtitle="Functional & Syntax Validation • Live Stream"
				actions={
					<div className="flex items-center gap-4">
						<div className="hidden md:flex items-center gap-2">
							<div className="p-2 bg-emerald-500/10 rounded-lg">
								<Zap className="w-4 h-4 text-emerald-500" />
							</div>
							<div className="flex flex-col">
								<span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground leading-none">
									System Status
								</span>
								<span className="text-xs font-black text-emerald-600">
									All Nodes Active
								</span>
							</div>
						</div>
						<div className="h-8 w-px bg-border/40" />
						<div className="flex items-center gap-1">
							<button className="px-4 py-1.5 text-primary text-[10px] font-black uppercase tracking-wider relative">
								Live Feed
								<span className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary rounded-full" />
							</button>
							<button className="px-4 py-1.5 text-muted-foreground hover:text-foreground text-[10px] font-black uppercase tracking-wider transition-colors">
								History
							</button>
						</div>
						<div className="h-4 w-px bg-border/40 hidden md:block mx-1" />
						<PremiumButton
							variant="outline"
							className="h-11 px-6 border-border/40 bg-card/50 backdrop-blur-md text-[9px] uppercase font-black tracking-widest rounded-xl"
						>
							Export CSV
						</PremiumButton>
					</div>
				}
			/>

			{/* Top Highlights Grid */}
			<div className="grid grid-cols-1 md:grid-cols-12 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
				{/* Main Chart Card */}
				<Card className="md:col-span-8 border-border/40 bg-card shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05),0_10px_30px_-10px_rgba(0,0,0,0.03)] rounded-[2.5rem] overflow-hidden group hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] transition-all duration-700">
					<CardHeader className="p-8 border-b border-border/10">
						<div className="flex items-center justify-between">
							<div>
								<CardTitle className="text-xl font-black tracking-tight flex items-center gap-3">
									Validation Trends
									<Badge className="bg-primary/10 text-primary border-none text-[9px] font-black uppercase tracking-widest px-2 py-0.5">
										Live Data
									</Badge>
								</CardTitle>
								<p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.2em] mt-1 opacity-60">
									Syntactical Compliance • 7 Day View
								</p>
							</div>
							<div className="p-3 bg-primary/5 rounded-2xl">
								<TrendingUp className="w-5 h-5 text-primary" />
							</div>
						</div>
					</CardHeader>
					<CardContent className="p-8 pb-4">
						<ResponsiveContainer width="100%" height={240}>
							<AreaChart
								data={trendData}
								margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
							>
								<defs>
									<linearGradient
										id="totalGradient"
										x1="0"
										y1="0"
										x2="0"
										y2="1"
									>
										<stop
											offset="5%"
											stopColor="hsl(var(--primary))"
											stopOpacity={0.15}
										/>
										<stop
											offset="95%"
											stopColor="hsl(var(--primary))"
											stopOpacity={0}
										/>
									</linearGradient>
									<linearGradient
										id="errorGradient"
										x1="0"
										y1="0"
										x2="0"
										y2="1"
									>
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
								<Tooltip
									content={<CustomTooltip />}
									cursor={{
										stroke: "hsl(var(--primary))",
										strokeWidth: 1,
										strokeDasharray: "4 4",
									}}
								/>
								<Area
									type="monotone"
									name="Total Batches"
									dataKey="total"
									stroke="hsl(var(--primary))"
									strokeWidth={4}
									fill="url(#totalGradient)"
								/>
								<Area
									type="monotone"
									name="Errors Found"
									dataKey="errors"
									stroke="#f43f5e"
									strokeWidth={4}
									fill="url(#errorGradient)"
								/>
							</AreaChart>
						</ResponsiveContainer>
					</CardContent>
				</Card>

				{/* Key Metrics Stack */}
				<div className="md:col-span-4 flex flex-col gap-6">
					{metrics.map((metric, i) => (
						<Card
							key={i}
							className="flex-1 border-border/40 bg-card/80 backdrop-blur-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05),0_10px_30px_-10px_rgba(0,0,0,0.03)] rounded-[2rem] group hover:shadow-xl transition-all duration-500 overflow-hidden relative"
						>
							<div
								className={`absolute top-0 right-0 w-32 h-32 ${metric.bg} rounded-full -mr-16 -mt-16 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
							/>
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
					title="Acknowledgment Registry"
					subtitle="X12 Functional Acknowledgments (999) • Real-time processing"
					data={acknowledgments || []}
					searchPlaceholder="Search Control # or Payer..."
					onExport={() => console.log("Exporting 999...")}
					columns={[
						{
							header: "Acknowledgment",
							key: "interchangeControlNumber",
							render: (ack: any) => (
								<div className="flex items-center gap-4">
									<div className="p-2.5 bg-primary/5 rounded-lg border border-primary/10 transition-colors">
										<ClipboardCheck className="w-4 h-4 text-primary" />
									</div>
									<div>
										<p className="text-[13px] font-black text-foreground">
											ICN: {ack.interchangeControlNumber}
										</p>
										<div className="flex items-center gap-2 mt-0.5">
											<Calendar className="w-3 h-3 text-muted-foreground opacity-60" />
											<span className="text-[9px] font-bold text-muted-foreground uppercase">
												{format(new Date(ack.receivedAt), "MMM dd, yyyy • hh:mm a")}
											</span>
										</div>
									</div>
								</div>
							),
						},
						{
							header: "Entity Mapping",
							key: "senderId",
							render: (ack: any) => (
								<div className="space-y-0.5">
									<p className="text-[11px] font-black text-foreground tracking-tight uppercase">
										REC: {ack.receiverId || "PROVIDER_SYSTEM"}
									</p>
									<p className="text-[9px] font-bold text-muted-foreground opacity-60 uppercase">
										SND: {ack.senderId || "PAYER_GATEWAY"}
									</p>
								</div>
							),
						},
						{
							header: "Status",
							key: "functionalGroupAckCode",
							align: "center",
							render: (ack: any) => (
								<Badge
									className={`rounded-xl px-3 py-1 text-[9px] font-black uppercase tracking-widest border-none ${
										ack.isAccepted
											? "bg-emerald-500/10 text-emerald-600 shadow-none"
											: ack.isRejected
												? "bg-rose-500/10 text-rose-600 shadow-none"
												: "bg-amber-500/10 text-amber-600 shadow-none"
									}`}
								>
									{getAckLabel(ack.functionalGroupAckCode)}
								</Badge>
							),
						},
						{
							header: "Details",
							key: "errorCount",
							render: (ack: any) =>
								ack.hasErrors ? (
									<div className="flex items-center gap-2 text-rose-600">
										<AlertCircle className="w-4 h-4" />
										<span className="text-[10px] font-bold">
											{ack.errorCount} Errors Found
										</span>
									</div>
								) : (
									<div className="flex items-center gap-2 text-emerald-600">
										<CheckCircle className="w-4 h-4" />
										<span className="text-[10px] font-bold">Compliant</span>
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
