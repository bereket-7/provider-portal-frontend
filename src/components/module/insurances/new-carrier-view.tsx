"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import {
	ArrowLeft,
	Building2,
	Phone,
	Plus,
	ShieldCheck,
	Upload,
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

const carrierSchema = z.object({
	name: z.string().min(2, "Carrier name is required"),
	type: z.string().min(1, "Carrier type is required"),
	tier: z.string().min(1, "Plan tier is required"),
	network: z.string().min(1, "Network name is required"),
	email: z.string().email("Invalid support email"),
	phone: z.string().min(5, "Contact number is required"),
	website: z.string().url("Invalid website URL").optional().or(z.literal("")),
});

type CarrierFormValues = z.infer<typeof carrierSchema>;

export function NewCarrierView() {
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const form = useForm<CarrierFormValues>({
		resolver: zodResolver(carrierSchema),
		defaultValues: {
			name: "",
			network: "",
			email: "",
			phone: "",
			website: "",
			type: "Private",
			tier: "Standard Gold",
		},
	});

	const onSubmit = async (data: CarrierFormValues) => {
		setIsSubmitting(true);
		console.log("New Carrier Data:", data);
		setIsSubmitting(false);
		toast.success("Carrier Registered", {
			description: `${data.name} has been added to the provider network.`,
		});
		router.push("/insurances");
	};

	return (
		<div className="relative space-y-8 pb-12 max-w-[1250px] mx-auto px-4 sm:px-6 animate-in fade-in duration-700">
			{/* Aesthetic Backgrounds */}
			<div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
			<div className="absolute bottom-10 left-0 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

			{/* Navigation & Header - Standard Pattern */}
			<div className="flex flex-col gap-6 relative z-10">
				<div className="flex items-center justify-between">
					<Link
						href="/insurances"
						className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-all group"
					>
						<div className="p-1.5 rounded-lg bg-muted group-hover:bg-primary/10 transition-colors">
							<ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
						</div>
						Return to Directory
					</Link>
					<div className="flex items-center gap-3">
						<button
							onClick={() => router.push("/insurances")}
							className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
						>
							Discard
						</button>
						<PremiumButton
							onClick={form.handleSubmit(onSubmit)}
							className="px-8 h-10 shadow-xl shadow-primary/20 text-[9px] uppercase font-black tracking-widest rounded-xl"
						>
							<Plus className="w-3.5 h-3.5 mr-2" />
							Register Carrier
						</PremiumButton>
					</div>
				</div>

				<div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border/40 pb-4">
					<div className="flex items-center gap-4">
						<div className="p-3 bg-primary text-primary-foreground rounded-xl shadow-xl shadow-primary/10 transform -rotate-1 hover:rotate-0 transition-transform duration-500">
							<Building2 className="w-6 h-6" />
						</div>
						<div>
							<h1 className="text-xl font-black tracking-tight text-foreground">
								New Insurance Carrier
							</h1>
							<div className="flex items-center gap-2 mt-0.5">
								<p className="text-[9px] font-black text-primary uppercase tracking-[0.2em]">
									Carrier Onboarding
								</p>
								<div className="h-0.5 w-0.5 bg-border rounded-full" />
								<p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
									System Registration
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
						{/* Section: Carrier Identification */}
						<section className="space-y-6">
							<div className="flex items-center gap-2 mb-2">
								<div className="h-4 w-1 bg-primary rounded-full" />
								<h2 className="text-xs font-black uppercase tracking-[0.2em] text-foreground/80">
									Carrier Identification
								</h2>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
								<FormField
									control={form.control}
									name="name"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/70">
												Carrier Legal Name
											</FormLabel>
											<FormControl>
												<Input
													placeholder="e.g. Nyala Insurance"
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
									name="type"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/70">
												Carrier Type
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
													<SelectItem value="Private">
														Private Carrier
													</SelectItem>
													<SelectItem value="International">
														International
													</SelectItem>
													<SelectItem value="Corporate">
														Corporate Payer
													</SelectItem>
													<SelectItem value="Government">Government</SelectItem>
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</section>

						{/* Section: Plan Details */}
						<section className="space-y-6">
							<div className="flex items-center gap-2 mb-2">
								<div className="h-4 w-1 bg-primary rounded-full" />
								<h2 className="text-xs font-black uppercase tracking-[0.2em] text-foreground/80">
									Plan & Network
								</h2>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
								<FormField
									control={form.control}
									name="tier"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/70">
												Default Plan Tier
											</FormLabel>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger className="bg-primary/5 border-border/40 rounded-xl h-11 px-4 shadow-none font-bold text-sm transition-all focus-visible:ring-4 focus-visible:ring-primary/5 focus-visible:border-primary/40">
														<SelectValue placeholder="Select tier" />
													</SelectTrigger>
												</FormControl>
												<SelectContent className="rounded-xl">
													<SelectItem value="Platinum Plus">
														Platinum Plus
													</SelectItem>
													<SelectItem value="Standard Gold">
														Standard Gold
													</SelectItem>
													<SelectItem value="Silver Elite">
														Silver Elite
													</SelectItem>
													<SelectItem value="Basic Bronze">
														Basic Bronze
													</SelectItem>
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="network"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/70">
												Primary Network Name
											</FormLabel>
											<FormControl>
												<div className="relative">
													<Input
														placeholder="e.g. Nyala Provider Network"
														className="bg-primary/5 border-border/40 rounded-xl h-11 px-4 shadow-none font-bold text-sm transition-all focus-visible:ring-4 focus-visible:ring-primary/5 focus-visible:border-primary/40 placeholder:opacity-30"
														{...field}
													/>
													<ShieldCheck className="absolute right-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/40" />
												</div>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</section>

						{/* Section: Contact Info */}
						<section className="space-y-6">
							<div className="flex items-center gap-2 mb-2">
								<div className="h-4 w-1 bg-primary rounded-full" />
								<h2 className="text-xs font-black uppercase tracking-[0.2em] text-foreground/80">
									Contact & Support
								</h2>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/70">
												Support Email
											</FormLabel>
											<FormControl>
												<Input
													type="email"
													placeholder="support@carrier.com"
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
									name="phone"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/70">
												Help Desk Phone
											</FormLabel>
											<FormControl>
												<div className="relative">
													<Input
														placeholder="+251 900 000 000"
														className="bg-primary/5 border-border/40 rounded-xl h-11 px-4 shadow-none font-bold text-sm transition-all focus-visible:ring-4 focus-visible:ring-primary/5 focus-visible:border-primary/40 placeholder:opacity-30"
														{...field}
													/>
													<Phone className="absolute right-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/40" />
												</div>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</section>
					</div>

					{/* Sidebar Options */}
					<div className="lg:col-span-4 space-y-8">
						{/* Logo Upload */}
						<div className="space-y-4">
							<div className="flex items-center gap-2 mb-2">
								<div className="h-4 w-1 bg-primary rounded-full" />
								<h2 className="text-xs font-black uppercase tracking-[0.2em] text-foreground/80">
									Branding
								</h2>
							</div>
							<div className="aspect-square rounded-[2rem] bg-muted/20 border-2 border-dashed border-border flex flex-col items-center justify-center gap-3 group cursor-pointer hover:border-primary/40 transition-all">
								<div className="p-4 bg-background rounded-2xl shadow-sm border border-border group-hover:border-primary/20 text-muted-foreground group-hover:text-primary transition-all">
									<Upload className="w-5 h-5" />
								</div>
								<p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
									Upload Logo
								</p>
							</div>
						</div>

						{/* Registration Info */}
						<div className="p-6 rounded-3xl bg-gradient-to-br from-primary/10 via-primary/[0.02] to-transparent border border-primary/10">
							<div className="flex items-center gap-3 mb-4">
								<div className="p-2 rounded-lg bg-primary text-primary-foreground">
									<ShieldCheck className="w-4 h-4" />
								</div>
								<p className="text-[10px] font-black uppercase tracking-widest">
									System Integrity
								</p>
							</div>
							<p className="text-xs font-bold text-muted-foreground leading-relaxed">
								New carriers are registered with a &quot;Pending&quot; status.
								Our network team will verify the details against healthcare
								XML/EDI standards before activation.
							</p>
							<div className="mt-4 pt-4 border-t border-primary/10 uppercase tracking-[0.2em] text-[8px] font-black text-primary/60">
								Standard Compliance X12
							</div>
						</div>
					</div>
				</form>
			</Form>
		</div>
	);
}
