"use client";

import { useState } from "react";

import { ArrowRight, ClipboardList, Search } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ModuleHeader } from "@/components/ui/custom/module-header";
import { PremiumButton } from "@/components/ui/custom/premium-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function EDI276View() {
	const [isSubmitting, setIsSubmitting] = useState(false);

	return (
		<div className="relative space-y-8 pb-12 max-w-[1200px] mx-auto px-4 sm:px-6">
			<div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10" />

			<ModuleHeader
				icon={Search}
				title="EDI 276 Claim Status Inquiry"
				subtitle="Request real-time processing status for submitted healthcare claims"
				actions={
					<div className="flex items-center gap-3">
						<div className="flex items-center gap-1">
							<button className="px-4 py-1.5 text-primary text-[10px] font-black uppercase tracking-wider relative">
								Single Inquiry
								<span className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary rounded-full" />
							</button>
							<button className="px-4 py-1.5 text-muted-foreground hover:text-foreground text-[10px] font-black uppercase tracking-wider transition-colors">
								Batch Registry
							</button>
						</div>
					</div>
				}
			/>

			<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
				<Card className="lg:col-span-8 border-border/40 bg-card/50 backdrop-blur-sm rounded-[2.5rem] overflow-hidden shadow-2xl">
					<CardHeader className="p-8 border-b border-border/40 bg-primary/[0.01]">
						<CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2 text-primary/80">
							<ClipboardList className="w-4 h-4" />
							Inquiry Parameters
						</CardTitle>
					</CardHeader>
					<CardContent className="p-8">
						<form className="space-y-8">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
								<div className="space-y-2">
									<Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/70 ml-1">
										Claim Number (ID)
									</Label>
									<Input
										placeholder="e.g. CLM-123456"
										className="h-12 bg-primary/5 border-border/40 rounded-xl"
									/>
								</div>
								<div className="space-y-2">
									<Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/70 ml-1">
										Payer ID
									</Label>
									<Input
										placeholder="e.g. BCBS-991"
										className="h-12 bg-primary/5 border-border/40 rounded-xl"
									/>
								</div>
								<div className="space-y-2">
									<Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/70 ml-1">
										Member ID
									</Label>
									<Input
										placeholder="MEM-000-111"
										className="h-12 bg-primary/5 border-border/40 rounded-xl"
									/>
								</div>
								<div className="space-y-2">
									<Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/70 ml-1">
										Date of Service
									</Label>
									<Input
										type="date"
										className="h-12 bg-primary/5 border-border/40 rounded-xl"
									/>
								</div>
							</div>

							<div className="flex justify-end pt-4">
								<PremiumButton
									type="button"
									className="px-12 h-12 rounded-xl text-[10px] font-black uppercase tracking-widest"
									onClick={() => setIsSubmitting(true)}
									disabled={isSubmitting}
								>
									{isSubmitting ? "Processing..." : "Submit Status Inquiry"}
									<ArrowRight className="w-4 h-4 ml-2" />
								</PremiumButton>
							</div>
						</form>
					</CardContent>
				</Card>

				<div className="lg:col-span-4 space-y-6">
					<Card className="border-border/40 bg-primary/10 rounded-[2.5rem] overflow-hidden">
						<CardHeader className="p-6">
							<CardTitle className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
								Quick Tips
							</CardTitle>
						</CardHeader>
						<CardContent className="p-6 pt-0 space-y-4">
							{[
								{
									label: "Real-time",
									text: "276 transactions receive responses within seconds from most major payers.",
								},
								{
									label: "Accuracy",
									text: "Ensure the Claim ID match exactly as submitted in the 837 transaction.",
								},
							].map((tip, i) => (
								<div key={i} className="space-y-1">
									<p className="text-[10px] font-black text-primary uppercase">
										{tip.label}
									</p>
									<p className="text-[11px] font-bold text-muted-foreground leading-relaxed">
										{tip.text}
									</p>
								</div>
							))}
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
