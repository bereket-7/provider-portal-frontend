"use client";

import { useState } from "react";

import {
	Calendar,
	CheckCircle,
	ChevronRight,
	Clipboard,
	FilePlus,
	Info,
	Save,
	Send,
	User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ModuleHeader } from "@/components/ui/custom/module-header";
import { PremiumButton } from "@/components/ui/custom/premium-button";

export function NewClaimView() {
	const [step, setStep] = useState(1);

	const steps = [
		{ id: 1, title: "Patient Info", icon: User },
		{ id: 2, title: "Claim Details", icon: Clipboard },
		{ id: 3, title: "Clinical Info", icon: Info },
		{ id: 4, title: "Review", icon: CheckCircle },
	];

	return (
		<div className="relative space-y-6 pb-12 max-w-[1200px] mx-auto px-4 sm:px-6">
			{/* Sleek Background Elements */}
			<div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
			<div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sky-500/5 rounded-full blur-[100px] pointer-events-none" />

			{/* Refined White Header */}
			<ModuleHeader
				icon={FilePlus}
				title="Submit New Claim"
				subtitle="Portal ID: PRV-2026-001 • Tena'adam Team"
				pillColor="bg-emerald-500"
				actions={
					<div className="flex items-center gap-3">
						<Button
							variant="outline"
							className="rounded-xl px-6 border-border/40 text-xs font-black uppercase tracking-wider hover:bg-primary/5 transition-all"
						>
							<Save className="w-4 h-4 mr-2" />
							Save Draft
						</Button>
						<Button className="rounded-xl px-6 bg-primary text-primary-foreground text-xs font-black uppercase tracking-wider shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
							<Send className="w-4 h-4 mr-2" />
							Submit Claim
						</Button>
					</div>
				}
			/>

			{/* Step Progress */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
				{steps.map((s) => (
					<div
						key={s.id}
						className={`relative group flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 ${
							step === s.id
								? "bg-card border-primary/20 shadow-lg shadow-primary/5"
								: step > s.id
									? "bg-emerald-500/10 border-emerald-500/20 opacity-80"
									: "bg-card/50 border-border/40 opacity-60"
						}`}
						onClick={() => setStep(s.id)}
						role="button"
						tabIndex={0}
					>
						<div
							className={`p-4 rounded-2xl transition-all duration-500 ${
								step === s.id
									? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
									: step > s.id
										? "bg-emerald-500 text-white"
										: "bg-muted text-muted-foreground"
							}`}
						>
							<s.icon className="w-4 h-4" />
						</div>
						<div className="flex flex-col">
							<span
								className={`text-[9px] font-black uppercase tracking-widest ${
									step === s.id ? "text-primary" : "text-muted-foreground"
								}`}
							>
								Step 0{s.id}
							</span>
							<span className="text-sm font-bold text-foreground">
								{s.title}
							</span>
						</div>
						{step > s.id && (
							<CheckCircle className="absolute top-4 right-4 w-4 h-4 text-emerald-500" />
						)}
					</div>
				))}
			</div>

			{/* Main Form Content */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
				<Card className="lg:col-span-2 border-border/40 bg-card rounded-2xl overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
					<CardHeader className="border-b border-border/40 bg-primary/[0.01] p-6">
						<CardTitle className="text-lg font-black tracking-tight">
							{steps.find((s) => s.id === step)?.title}
						</CardTitle>
						<p className="text-xs text-muted-foreground font-medium">
							Please provide accurate information for faster processing.
						</p>
					</CardHeader>
					<CardContent className="p-8 space-y-6">
						{step === 1 && (
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div className="space-y-2">
									<label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
										Patient Full Name
									</label>
									<input
										type="text"
										placeholder="e.g. John Doe"
										className="w-full px-4 py-3 bg-primary/5 border border-border/40 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all"
									/>
								</div>
								<div className="space-y-2">
									<label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
										Member ID
									</label>
									<input
										type="text"
										placeholder="e.gV-12345678"
										className="w-full px-4 py-3 bg-primary/5 border border-border/40 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all"
									/>
								</div>
								<div className="space-y-2">
									<label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
										Date of Birth
									</label>
									<div className="relative">
										<Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
										<input
											type="date"
											className="w-full pl-11 pr-4 py-3 bg-primary/5 border border-border/40 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all"
										/>
									</div>
								</div>
								<div className="space-y-2">
									<label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
										Policy Number
									</label>
									<input
										type="text"
										placeholder="e.g. POL-998877"
										className="w-full px-4 py-3 bg-primary/5 border border-border/40 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all"
									/>
								</div>
							</div>
						)}

						{step > 1 && (
							<div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
								<div className="p-4 bg-primary/5 rounded-full">
									<FilePlus className="w-12 h-12 text-primary opacity-20" />
								</div>
								<div className="max-w-xs">
									<h3 className="text-lg font-bold">Standard Form Interface</h3>
									<p className="text-sm text-muted-foreground">
										This section will contain the standardized form fields for{" "}
										{steps.find((s) => s.id === step)?.title.toLowerCase()}.
									</p>
								</div>
							</div>
						)}

						<div className="pt-6 border-t border-border/40 flex justify-between">
							<PremiumButton
								variant="ghost"
								disabled={step === 1}
								onClick={() => setStep(step - 1)}
								className="px-6"
							>
								<ChevronRight className="w-4 h-4 mr-2 rotate-180" />
								Back
							</PremiumButton>
							<PremiumButton
								onClick={() => setStep(step < 4 ? step + 1 : step)}
								icon={ChevronRight}
								iconPosition="right"
								className="w-48"
							>
								{step === 4 ? "Submit" : "Continue"}
							</PremiumButton>
						</div>
					</CardContent>
				</Card>

				{/* Sidebar/Summary Info */}
				<div className="space-y-6">
					<Card className="border-border/40 bg-card rounded-2xl p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
						<CardTitle className="text-sm font-black uppercase tracking-widest mb-6 border-b border-border/40 pb-4">
							Claim Summary
						</CardTitle>
						<div className="space-y-4">
							{[
								{ label: "Patient", value: "Not selected" },
								{ label: "Facility", value: "Tena-Adam Medical Center" },
								{ label: "Type", value: "Direct Claim" },
								{ label: "Currency", value: "ETB / USD" },
							].map((item, i) => (
								<div
									key={i}
									className="flex justify-between items-center group"
								>
									<span className="text-[10px] font-black text-muted-foreground uppercase tracking-wider">
										{item.label}
									</span>
									<span className="text-xs font-bold text-foreground">
										{item.value}
									</span>
								</div>
							))}
						</div>
					</Card>

					<Card className="border-none bg-gradient-to-br from-slate-950 to-slate-900 rounded-2xl p-6 relative overflow-hidden">
						<div className="relative z-10 space-y-4 text-slate-50">
							<div className="p-2.5 bg-white/5 rounded-xl w-fit">
								<Info className="w-5 h-5" />
							</div>
							<h3 className="text-lg font-black leading-tight">
								Processing <br /> Guidelines
							</h3>
							<p className="text-[10px] font-bold opacity-60 leading-relaxed">
								Ensure all clinical documentation is attached to avoid delays in
								payout processing. Standard review time is 24-48 hours.
							</p>
							<button className="text-[10px] font-black uppercase tracking-widest text-primary hover:text-primary/80 transition-colors">
								Learn more
							</button>
						</div>
						<div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
					</Card>
				</div>
			</div>
		</div>
	);
}
