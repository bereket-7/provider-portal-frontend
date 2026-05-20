"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import {
	ArrowLeft,
	Banknote,
	Calendar,
	DollarSign,
	Plus,
	Receipt,
	ShieldCheck,
	User,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { PremiumButton } from "@/components/ui/custom/premium-button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

const cashClaimSchema = z.object({
	patientName: z.string().min(2, "Patient name is required"),
	serviceType: z.string().min(2, "Service type is required"),
	serviceDate: z.string().min(1, "Service date is required"),
	amount: z.string().min(1, "Amount is required"),
	payeeStatus: z.string().min(1, "Payee status is required"),
	paymentMethod: z.string().min(1, "Payment method is required"),
	notes: z.string().optional(),
});

type CashClaimFormValues = z.infer<typeof cashClaimSchema>;

export function NewCashClaimView() {
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const form = useForm<CashClaimFormValues>({
		resolver: zodResolver(cashClaimSchema),
		defaultValues: {
			patientName: "",
			serviceType: "",
			serviceDate: new Date().toISOString().split("T")[0],
			amount: "",
			payeeStatus: "Self-Pay",
			paymentMethod: "Cash",
			notes: "",
		},
	});

	const onSubmit = async (data: CashClaimFormValues) => {
		setIsSubmitting(true);
		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 1500));
		console.log("New Cash Claim Data:", data);
		setIsSubmitting(false);
		toast.success("Manual Claim Recorded", {
			description: `Claim for ${data.patientName} has been added to the ledger.`,
		});
		router.push("/dcmes");
	};

	return (
		<div className="relative space-y-8 pb-12 max-w-[1250px] mx-auto px-4 sm:px-6 animate-in fade-in duration-700">
			{/* Aesthetic Backgrounds */}
			<div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
			<div className="absolute bottom-10 left-0 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

			{/* Navigation & Header */}
			<div className="flex flex-col gap-6 relative z-10">
				<div className="flex items-center justify-between">
					<Link
						href="/dcmes"
						className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-all group"
					>
						<div className="p-1.5 rounded-lg bg-muted group-hover:bg-primary/10 transition-colors">
							<ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
						</div>
						Return to Ledger
					</Link>
					<div className="flex items-center gap-3">
						<button
							onClick={() => router.push("/dcmes")}
							className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
						>
							Discard
						</button>
						<PremiumButton
							onClick={form.handleSubmit(onSubmit)}
							className="px-8 h-10 shadow-xl shadow-primary/20 text-[9px] uppercase font-black tracking-widest rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
							disabled={isSubmitting}
						>
							{isSubmitting ? (
								"Processing..."
							) : (
								<>
									<Plus className="w-3.5 h-3.5 mr-2" />
									Record Entry
								</>
							)}
						</PremiumButton>
					</div>
				</div>

				<div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border/40 pb-4">
					<div className="flex items-center gap-4">
						<div className="p-3 bg-primary text-primary-foreground rounded-xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] transform -rotate-1 hover:rotate-0 transition-transform duration-500">
							<Receipt className="w-6 h-6" />
						</div>
						<div>
							<h1 className="text-xl font-black tracking-tight text-foreground">
								Manual Claim Entry
							</h1>
							<div className="flex items-center gap-2 mt-0.5">
								<p className="text-[9px] font-black text-primary uppercase tracking-[0.2em]">
									DCMES REGISTRY
								</p>
								<div className="h-0.5 w-0.5 bg-border rounded-full" />
								<p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
									Cash Payer Management
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="grid grid-cols-1 lg:grid-cols-12 gap-10 relative z-10"
				>
					{/* Main Form Content */}
					<div className="lg:col-span-8 space-y-12">
						{/* Section: Patient Information */}
						<section className="space-y-6">
							<div className="flex items-center gap-2 mb-2">
								<div className="h-4 w-1 bg-primary rounded-full" />
								<h2 className="text-xs font-black uppercase tracking-[0.2em] text-foreground/80">
									Patient Information
								</h2>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
								<FormField
									control={form.control}
									name="patientName"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/70">
												Full Legal Name
											</FormLabel>
											<FormControl>
												<div className="relative">
													<Input
														placeholder="e.g. Selam Tesfaye"
														className="bg-primary/5 border-border/40 rounded-xl h-11 px-4 pl-10 shadow-none font-bold text-sm transition-all focus-visible:ring-4 focus-visible:ring-primary/5 focus-visible:border-primary/40 placeholder:opacity-30"
														{...field}
													/>
													<User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
												</div>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="serviceDate"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/70">
												Date of Service
											</FormLabel>
											<FormControl>
												<div className="relative">
													<Input
														type="date"
														className="bg-primary/5 border-border/40 rounded-xl h-11 px-4 pl-10 shadow-none font-bold text-sm transition-all focus-visible:ring-4 focus-visible:ring-primary/5 focus-visible:border-primary/40"
														{...field}
													/>
													<Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
												</div>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</section>

						{/* Section: Service Details */}
						<section className="space-y-6">
							<div className="flex items-center gap-2 mb-2">
								<div className="h-4 w-1 bg-primary rounded-full" />
								<h2 className="text-xs font-black uppercase tracking-[0.2em] text-foreground/80">
									Clinical Service Details
								</h2>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
								<FormField
									control={form.control}
									name="serviceType"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/70">
												Service Performed
											</FormLabel>
											<FormControl>
												<Input
													placeholder="e.g. Annual Physical Exam"
													className="bg-primary/5 border-border/40 rounded-xl h-11 px-4 shadow-none font-bold text-sm transition-all focus-visible:ring-4 focus-visible:ring-primary/5 focus-visible:border-primary/40 placeholder:opacity-30"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="amount"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/70">
												Total Charge Amount
											</FormLabel>
											<FormControl>
												<div className="relative">
													<Input
														placeholder="120.00"
														className="bg-primary/5 border-border/40 rounded-xl h-11 px-4 pl-10 shadow-none font-bold text-sm transition-all focus-visible:ring-4 focus-visible:ring-primary/5 focus-visible:border-primary/40 placeholder:opacity-30"
														{...field}
													/>
													<DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
												</div>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</section>

						{/* Section: Payment Info */}
						<section className="space-y-6">
							<div className="flex items-center gap-2 mb-2">
								<div className="h-4 w-1 bg-primary rounded-full" />
								<h2 className="text-xs font-black uppercase tracking-[0.2em] text-foreground/80">
									Payment & Settlement
								</h2>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
								<FormField
									control={form.control}
									name="payeeStatus"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/70">
												Payer Type
											</FormLabel>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger className="bg-primary/5 border-border/40 rounded-xl h-11 px-4 shadow-none font-bold text-sm transition-all focus-visible:ring-4 focus-visible:ring-primary/5 focus-visible:border-primary/40">
														<SelectValue placeholder="Select type" />
													</SelectTrigger>
												</FormControl>
												<SelectContent className="rounded-xl">
													<SelectItem value="Self-Pay">Self-Pay</SelectItem>
													<SelectItem value="Direct Billing">
														Direct Billing
													</SelectItem>
													<SelectItem value="Corporate Pay">
														Corporate Pay
													</SelectItem>
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="paymentMethod"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/70">
												Payment Method
											</FormLabel>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger className="bg-primary/5 border-border/40 rounded-xl h-11 px-4 shadow-none font-bold text-sm transition-all focus-visible:ring-4 focus-visible:ring-primary/5 focus-visible:border-primary/40">
														<SelectValue placeholder="Select method" />
													</SelectTrigger>
												</FormControl>
												<SelectContent className="rounded-xl">
													<SelectItem value="Cash">Cash</SelectItem>
													<SelectItem value="Card">
														Credit/Debit Card
													</SelectItem>
													<SelectItem value="Transfer">
														Bank Transfer
													</SelectItem>
													<SelectItem value="MobilePay">
														Mobile Payment
													</SelectItem>
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</section>
					</div>

					{/* Sidebar Info */}
					<div className="lg:col-span-4 space-y-8">
						<div className="p-8 rounded-[2.5rem] bg-slate-900 text-white relative overflow-hidden shadow-[0_20px_40px_-12px_rgba(0,0,0,0.15)] transition-all">
							<div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full -mr-16 -mt-16 blur-3xl opacity-50" />
							<div className="relative z-10 space-y-6">
								<div className="flex items-center gap-3">
									<div className="p-2 bg-white/5 rounded-xl border border-white/10">
										<ShieldCheck className="w-5 h-5 text-primary" />
									</div>
									<h3 className="text-base font-black tracking-tight">
										Entry Validation
									</h3>
								</div>
								<p className="text-xs font-bold text-slate-400 leading-relaxed">
									Manual entries are audited against daily clinic reports.
									Ensure the service date and amount match the clinical record
									to prevent reimbursement delays.
								</p>
								<div className="pt-4 border-t border-white/10 flex items-center justify-between">
									<p className="text-[8px] font-black uppercase tracking-widest text-slate-500">
										Audit Level
									</p>
									<p className="text-[10px] font-black text-primary uppercase">
										Standard
									</p>
								</div>
							</div>
						</div>

						<div className="p-6 rounded-3xl bg-primary/5 border border-primary/10 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05),0_10px_30px_-10px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] transition-all">
							<div className="flex items-center gap-3 mb-4">
								<div className="p-2 rounded-lg bg-primary text-primary-foreground">
									<Banknote className="w-4 h-4" />
								</div>
								<p className="text-[10px] font-black uppercase tracking-widest text-foreground">
									Financial Summary
								</p>
							</div>
							<div className="space-y-4">
								<div className="flex justify-between items-center">
									<p className="text-[10px] font-bold text-muted-foreground uppercase">
										Daily Total
									</p>
									<p className="text-xs font-black">$4,280.00</p>
								</div>
								<div className="flex justify-between items-center">
									<p className="text-[10px] font-bold text-muted-foreground uppercase">
										Pending Entries
									</p>
									<p className="text-xs font-black text-amber-500">12</p>
								</div>
							</div>
						</div>
					</div>
				</form>
			</Form>
		</div>
	);
}
