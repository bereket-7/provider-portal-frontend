"use client";

import { useState } from "react";

import {
	CheckCircle,
	ChevronRight,
	Clipboard,
	FileCode,
	Info,
	Save,
	UploadCloud,
	User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ModuleHeader } from "@/components/ui/custom/module-header";
import { PremiumButton } from "@/components/ui/custom/premium-button";

export function EDI837View() {
	const [step, setStep] = useState(1);

	const steps = [
		{ id: 1, title: "Sender Info", icon: User },
		{ id: 2, title: "Subscriber Data", icon: Clipboard },
		{ id: 3, title: "Claim Details", icon: FileCode },
		{ id: 4, title: "Clinical Data", icon: Info },
		{ id: 5, title: "Review & File", icon: CheckCircle },
	];

	return (
		<div className="relative space-y-6 pb-12 max-w-[1400px] mx-auto px-4 sm:px-6">
			{/* Sleek Background Elements */}
			<div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
			<div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sky-500/5 rounded-full blur-[100px] pointer-events-none" />

			{/* Refined Header */}
			<ModuleHeader
				icon={FileCode}
				title="EDI 837 Claim Submission"
				subtitle="Electronic Data Interchange • Professional & Institutional"
				pillColor="bg-sky-500"
				actions={
					<div className="flex items-center gap-3">
						<Button
							variant="outline"
							className="rounded-xl px-6 border-border/40 text-xs font-black uppercase tracking-wider hover:bg-primary/5 transition-all"
						>
							<Save className="w-4 h-4 mr-2" />
							Save Draft
						</Button>
					</div>
				}
			/>

			{/* Step Progress - Modern & Creative */}
			<div className="grid grid-cols-1 md:grid-cols-5 gap-4">
				{steps.map((s) => (
					<div
						key={s.id}
						className={`relative group flex flex-col items-center gap-2 p-6 rounded-[2rem] border transition-all duration-500 ${
							step === s.id
								? "bg-card border-primary/20 shadow-[0_20px_40px_-4px_rgba(0,0,0,0.08)] scale-105 z-10"
								: step > s.id
									? "bg-emerald-500/10 border-emerald-500/20 opacity-80"
									: "bg-card/40 border-transparent opacity-60 hover:opacity-100"
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
							<s.icon className="w-5 h-5" />
						</div>
						<div className="text-center mt-2">
							<span
								className={`text-[9px] font-black uppercase tracking-widest block mb-1 ${
									step === s.id ? "text-primary" : "text-muted-foreground"
								}`}
							>
								Step 0{s.id}
							</span>
							<span
								className={`text-xs font-black transition-colors ${
									step === s.id ? "text-foreground" : "text-muted-foreground"
								}`}
							>
								{s.title}
							</span>
						</div>
						{step > s.id && (
							<div className="absolute top-4 right-4 bg-emerald-500 rounded-full p-1 ring-4 ring-card shadow-sm">
								<CheckCircle className="w-3 h-3 text-white" />
							</div>
						)}
					</div>
				))}
			</div>

			{/* Main Interface */}
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
				<Card className="lg:col-span-8 border-none bg-card/80 backdrop-blur-xl rounded-[2.5rem] overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] ring-1 ring-foreground/5">
					<CardHeader className="border-b border-border/40 bg-primary/[0.01] p-10">
						<div className="flex justify-between items-start">
							<div>
								<CardTitle className="text-2xl font-black tracking-tight">
									{steps.find((s) => s.id === step)?.title}
								</CardTitle>
								<p className="text-sm text-muted-foreground font-bold mt-1 tracking-tight">
									Electronic Data Interchange Standard Implementation
								</p>
							</div>
							<div className="px-5 py-2.5 bg-sky-500/10 rounded-2xl border border-sky-500/20">
								<span className="text-[10px] font-black text-sky-600 uppercase tracking-widest">
									EDI 837 v5010
								</span>
							</div>
						</div>
					</CardHeader>
					<CardContent className="p-10 space-y-10">
						{step === 1 && (
							<div className="space-y-8">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
									<div className="space-y-3 group">
										<label className="text-[10px] font-black uppercase tracking-[0.15em] text-muted-foreground group-focus-within:text-primary transition-colors">
											Submitter Identifier
										</label>
										<input
											type="text"
											placeholder="e.g. TENA-SUB-001"
											className="w-full px-6 py-4 bg-primary/[0.03] border-2 border-border/30 rounded-[1.25rem] text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/40 transition-all font-mono"
										/>
									</div>
									<div className="space-y-3 group">
										<label className="text-[10px] font-black uppercase tracking-[0.15em] text-muted-foreground group-focus-within:text-primary transition-colors">
											Receiver Name (Payer)
										</label>
										<input
											type="text"
											placeholder="e.g. Major Insurance Co."
											className="w-full px-6 py-4 bg-primary/[0.03] border-2 border-border/30 rounded-[1.25rem] text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/40 transition-all"
										/>
									</div>
								</div>

								<div className="p-8 border-2 border-dashed border-border/60 rounded-[2rem] bg-muted/30 flex flex-col items-center justify-center text-center space-y-4 hover:bg-primary/[0.02] hover:border-primary/30 transition-all cursor-pointer group">
									<div className="p-4 bg-card rounded-2xl shadow-sm group-hover:scale-110 transition-transform duration-500">
										<UploadCloud className="w-8 h-8 text-primary" />
									</div>
									<div className="max-w-xs">
										<h4 className="text-sm font-black tracking-tight">
											Quick Import EDI 837 File
										</h4>
										<p className="text-[11px] text-muted-foreground font-bold leading-relaxed mt-1 uppercase tracking-wider opacity-60">
											Drag and drop your .edi or .837 files here to
											auto-populate the form.
										</p>
									</div>
								</div>
							</div>
						)}

						{step > 1 && (
							<div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
								<div className="relative">
									<div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150 animate-pulse" />
									<div className="relative p-8 bg-card/80 rounded-[2.5rem] border border-primary/10 shadow-xl">
										<FileCode className="w-16 h-16 text-primary" />
									</div>
								</div>
								<div className="max-w-md">
									<h3 className="text-xl font-black tracking-tighter">
										Advanced Transaction Mapping
									</h3>
									<p className="text-sm text-muted-foreground font-bold leading-relaxed mt-2 opacity-70">
										The EDI processor is mapping segment{" "}
										<span className="text-primary px-2 py-0.5 bg-primary/5 rounded font-mono">
											Loop 2000A
										</span>{" "}
										for {steps.find((s) => s.id === step)?.title}.
									</p>
								</div>
							</div>
						)}

						<div className="pt-10 border-t border-border/40 flex justify-between">
							<PremiumButton
								variant="ghost"
								disabled={step === 1}
								onClick={() => setStep(step - 1)}
								className="px-8 flex items-center"
							>
								<ChevronRight className="w-4 h-4 mr-3 rotate-180" />
								Back
							</PremiumButton>
							<PremiumButton
								onClick={() => setStep(step < 5 ? step + 1 : step)}
								icon={ChevronRight}
								iconPosition="right"
								className="w-48"
							>
								{step === 5 ? "Submit" : "Continue"}
							</PremiumButton>
						</div>
					</CardContent>
				</Card>

				{/* Floating Summary Card */}
				<div className="lg:col-span-4 space-y-6">
					<div className="sticky top-6 space-y-6">
						<Card className="border-border/40 bg-card rounded-[2.5rem] p-10 relative overflow-hidden shadow-[0_20px_40px_-4px_rgba(0,0,0,0.04)]">
							<div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full -mr-20 -mt-20 blur-[80px]" />

							<div className="relative z-10 space-y-8">
								<div className="flex justify-between items-center">
									<div className="p-3.5 bg-primary/10 rounded-2xl border border-primary/20">
										<Info className="w-6 h-6 text-primary" />
									</div>
									<div className="text-right">
										<span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60">
											Batch Priority
										</span>
										<p className="text-xs font-black text-emerald-600 uppercase tracking-widest mt-0.5">
											High Efficiency
										</p>
									</div>
								</div>

								<div className="space-y-2">
									<h3 className="text-2xl font-black tracking-tight leading-none text-foreground">
										Interchange Summary
									</h3>
									<p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.15em]">
										ANSI X12 Standard Processing
									</p>
								</div>

								<div className="space-y-5 pt-4">
									{[
										{
											label: "ISA Segment",
											value: "Verified",
											color: "text-emerald-600 bg-emerald-50",
										},
										{
											label: "GS Transaction",
											value: "Pending Loop",
											color: "text-amber-600 bg-amber-50",
										},
										{
											label: "ST Claim Count",
											value: "0 Validated",
											color: "text-muted-foreground bg-muted",
										},
									].map((item, i) => (
										<div
											key={i}
											className="flex justify-between items-center border-b border-border/40 pb-4 last:border-0 last:pb-0"
										>
											<span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
												{item.label}
											</span>
											<span
												className={`text-[9px] px-2 py-1 rounded-lg font-black uppercase tracking-widest ${item.color.replace("bg-emerald-50", "bg-emerald-500/10").replace("bg-amber-50", "bg-amber-500/10")}`}
											>
												{item.value}
											</span>
										</div>
									))}
								</div>

								<PremiumButton
									onClick={() => {}}
									icon={CheckCircle}
									className="w-full"
								>
									Validate
								</PremiumButton>
							</div>
						</Card>

						<div className="p-8 bg-card/60 backdrop-blur-md rounded-[2.5rem] border border-border/40 shadow-lg relative overflow-hidden group hover:bg-card transition-all duration-500">
							<div className="flex gap-4 items-center mb-4">
								<div className="bg-primary/10 p-2 rounded-xl group-hover:scale-110 transition-transform duration-500">
									<Sparkles className="w-4 h-4 text-primary" />
								</div>
								<h4 className="text-xs font-black uppercase tracking-widest text-foreground">
									A.I. Validation Tip
								</h4>
							</div>
							<p className="text-[11px] text-muted-foreground font-bold leading-relaxed tracking-tight group-hover:text-foreground transition-colors transition-duration-500">
								Using EDI 837 v5010 ensures faster reimbursement rates. Ensure
								Loop 2300 includes valid ICD-10 codes for clinical accuracy.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

function Sparkles(props: any) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M12 3v1" />
			<path d="M12 20v1" />
			<path d="M3 12h1" />
			<path d="M20 12h1" />
			<path d="m18.364 5.636-.707.707" />
			<path d="m6.343 17.657-.707.707" />
			<path d="m5.636 5.636.707.707" />
			<path d="m17.657 17.657.707.707" />
		</svg>
	);
}
