"use client";

import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";
import {
	AlertCircle,
	ArrowLeft,
	Building2,
	Calendar,
	FileText,
	Scale,
	ShieldCheck,
	Upload,
	User,
} from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";

const disputeSchema = z.z.object({
	// Member Information
	member_name: z.string().min(2, "Member name is required"),
	member_id: z.string().min(2, "Member ID is required"),
	member_dob: z.string().min(2, "Date of birth is required"),
	member_phone: z.string().min(2, "Phone number is required"),
	member_email: z.string().email("Invalid email address"),

	// Representative Information
	rep_name: z.string().optional(),
	rep_relationship: z.string().optional(),
	rep_phone: z.string().optional(),
	rep_email: z
		.string()
		.email("Invalid email address")
		.optional()
		.or(z.literal("")),

	// Dispute Details
	dispute_type: z.string().min(1, "Please select a dispute type"),
	claim_number: z.string().optional(),
	date_of_service: z.string().min(2, "Date of service is required"),
	provider_name: z.string().min(2, "Provider name is required"),
	dispute_description: z
		.string()
		.min(10, "Please provide more detail (min 10 chars)"),

	// Resolution Sought
	resolution_sought: z
		.string()
		.min(5, "Please describe the desired resolution"),

	// Authorization
	signature: z.string().min(2, "Signature is required"),
	signature_date: z.string().min(2, "Date is required"),
});

type DisputeFormValues = z.infer<typeof disputeSchema>;

export function NewDisputeView() {
	const form = useForm<DisputeFormValues>({
		resolver: zodResolver(disputeSchema),
		defaultValues: {
			member_name: "",
			member_id: "",
			member_dob: "",
			member_phone: "",
			member_email: "",
			rep_name: "",
			rep_relationship: "",
			rep_phone: "",
			rep_email: "",
			dispute_type: "",
			claim_number: "",
			date_of_service: "",
			provider_name: "",
			dispute_description: "",
			resolution_sought: "",
			signature: "",
			signature_date: new Date().toISOString().split("T")[0],
		},
	});

	function onSubmit(data: DisputeFormValues) {
		console.log("Form submitted:", data);
	}

	const inputClasses =
		"bg-primary/5 border-border/40 rounded-xl h-11 px-4 shadow-none font-bold text-sm transition-all focus-visible:ring-4 focus-visible:ring-primary/5 focus-visible:border-primary/40 placeholder:opacity-30";
	const sectionTitleClasses =
		"text-[10px] font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2 mb-6";
	const labelClasses =
		"text-[10px] font-black uppercase tracking-widest text-muted-foreground/80 ml-1";

	return (
		<div className="relative space-y-10 pb-20 max-w-[1200px] mx-auto px-4 sm:px-6 animate-in fade-in duration-700">
			{/* Aesthetic Backgrounds */}
			<div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
			<div className="absolute top-[20%] left-0 w-[400px] h-[400px] bg-red-500/5 rounded-full blur-[100px] pointer-events-none" />

			{/* Navigation & Header */}
			<div className="flex flex-col gap-6 relative z-10">
				<Link
					href="/disputes"
					className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors group w-fit"
				>
					<div className="p-1.5 rounded-lg bg-muted group-hover:bg-primary/10 transition-colors">
						<ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
					</div>
					Back to Disputes
				</Link>

				<div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-border/40 pb-6">
					<div className="flex items-center gap-4">
						<div className="p-3 bg-red-500 text-white rounded-xl shadow-xl shadow-red-500/10 transform rotate-2 hover:rotate-0 transition-transform duration-500">
							<AlertCircle className="w-6 h-6" />
						</div>
						<div>
							<h1 className="text-2xl font-black tracking-tight text-foreground">
								Submit Dispute Form
							</h1>
							<p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">
								Claims • Coverage • Service Quality
							</p>
						</div>
					</div>
					<div className="flex items-center gap-3">
						<div className="text-right hidden sm:block mr-2">
							<p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
								Security Level
							</p>
							<p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">
								Verified Agent
							</p>
						</div>
						<div className="p-2.5 bg-white/50 backdrop-blur-sm rounded-xl border border-border/40">
							<ShieldCheck className="w-5 h-5 text-emerald-500" />
						</div>
					</div>
				</div>
			</div>

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-16 relative z-10"
				>
					{/* Section 1: Member Information */}
					<section>
						<h2 className={sectionTitleClasses}>
							<User className="w-3.5 h-3.5" />
							1. Member Information
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
							<FormField
								control={form.control}
								name="member_name"
								render={({ field }) => (
									<FormItem>
										<FormLabel className={labelClasses}>Full Name</FormLabel>
										<FormControl>
											<Input
												placeholder="Enter member's full name"
												className={inputClasses}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="member_id"
								render={({ field }) => (
									<FormItem>
										<FormLabel className={labelClasses}>Member ID</FormLabel>
										<FormControl>
											<Input
												placeholder="TEN-XXX-XXX"
												className={inputClasses}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="member_dob"
								render={({ field }) => (
									<FormItem>
										<FormLabel className={labelClasses}>
											Date of Birth
										</FormLabel>
										<FormControl>
											<div className="relative">
												<Input
													type="date"
													className={inputClasses}
													{...field}
												/>
												<Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="member_phone"
								render={({ field }) => (
									<FormItem>
										<FormLabel className={labelClasses}>Phone Number</FormLabel>
										<FormControl>
											<Input
												placeholder="+251-XX-XXX-XXXX"
												className={inputClasses}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="member_email"
								render={({ field }) => (
									<FormItem className="md:col-span-1 lg:col-span-2">
										<FormLabel className={labelClasses}>
											Email Address
										</FormLabel>
										<FormControl>
											<Input
												placeholder="member@example.com"
												className={inputClasses}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</section>

					{/* Section 2: Representative Information */}
					<section>
						<h2 className={sectionTitleClasses}>
							<User className="w-3.5 h-3.5 opacity-50" />
							2. Representative Information (Optional)
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
							<FormField
								control={form.control}
								name="rep_name"
								render={({ field }) => (
									<FormItem>
										<FormLabel className={labelClasses}>Rep Name</FormLabel>
										<FormControl>
											<Input
												placeholder="Full name"
												className={inputClasses}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="rep_relationship"
								render={({ field }) => (
									<FormItem>
										<FormLabel className={labelClasses}>Relationship</FormLabel>
										<FormControl>
											<Input
												placeholder="Spouse, Lawyer, etc."
												className={inputClasses}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="rep_phone"
								render={({ field }) => (
									<FormItem>
										<FormLabel className={labelClasses}>Rep Phone</FormLabel>
										<FormControl>
											<Input
												placeholder="Phone number"
												className={inputClasses}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="rep_email"
								render={({ field }) => (
									<FormItem>
										<FormLabel className={labelClasses}>Rep Email</FormLabel>
										<FormControl>
											<Input
												placeholder="Email address"
												className={inputClasses}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</section>

					{/* Section 3: Dispute Details */}
					<section>
						<h2 className={sectionTitleClasses}>
							<AlertCircle className="w-3.5 h-3.5" />
							3. Dispute Details
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							<FormField
								control={form.control}
								name="dispute_type"
								render={({ field }) => (
									<FormItem>
										<FormLabel className={labelClasses}>
											Type of Dispute
										</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger className={inputClasses}>
													<SelectValue placeholder="Select type" />
												</SelectTrigger>
											</FormControl>
											<SelectContent className="rounded-xl border-border/40">
												<SelectItem value="Claim Denial" className="font-bold">
													Claim Denial
												</SelectItem>
												<SelectItem
													value="Coverage Issue"
													className="font-bold"
												>
													Coverage Issue
												</SelectItem>
												<SelectItem value="Billing Error" className="font-bold">
													Billing Error
												</SelectItem>
												<SelectItem
													value="Service Complaint"
													className="font-bold"
												>
													Service Complaint
												</SelectItem>
												<SelectItem value="Other" className="font-bold">
													Other
												</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="claim_number"
								render={({ field }) => (
									<FormItem>
										<FormLabel className={labelClasses}>
											Claim Number (if applicable)
										</FormLabel>
										<FormControl>
											<Input
												placeholder="CLM-XXXXXXX"
												className={inputClasses}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="date_of_service"
								render={({ field }) => (
									<FormItem>
										<FormLabel className={labelClasses}>
											Date of Service
										</FormLabel>
										<FormControl>
											<div className="relative">
												<Input
													type="date"
													className={inputClasses}
													{...field}
												/>
												<Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="provider_name"
								render={({ field }) => (
									<FormItem>
										<FormLabel className={labelClasses}>
											Provider Name
										</FormLabel>
										<FormControl>
											<div className="relative">
												<Input
													placeholder="Search provider"
													className={inputClasses}
													{...field}
												/>
												<Building2 className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="dispute_description"
								render={({ field }) => (
									<FormItem className="md:col-span-2">
										<FormLabel className={labelClasses}>
											Detailed Description
										</FormLabel>
										<FormControl>
											<Textarea
												placeholder="Describe the nature of your dispute in detail..."
												className="bg-primary/5 border-border/40 rounded-2xl min-h-[150px] p-4 shadow-none font-bold text-sm transition-all focus-visible:ring-4 focus-visible:ring-primary/5 focus-visible:border-primary/40 placeholder:opacity-30"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</section>

					{/* Section 4: Supporting Documents */}
					<section>
						<h2 className={sectionTitleClasses}>
							<Upload className="w-3.5 h-3.5" />
							4. Supporting Documents
						</h2>
						<div className="p-10 border-2 border-dashed border-border/40 rounded-[2rem] bg-primary/[0.02] flex flex-col items-center justify-center text-center group hover:bg-primary/[0.04] hover:border-primary/20 transition-all duration-300 cursor-pointer">
							<div className="p-4 bg-background rounded-2xl border border-border/40 shadow-sm group-hover:scale-110 transition-transform duration-300 mb-4">
								<FileText className="w-8 h-8 text-primary" />
							</div>
							<p className="text-sm font-black text-foreground mb-1">
								Click or drag files to upload
							</p>
							<p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest max-w-sm">
								Upload EOBs, provider bills, or any correspondence related to
								this dispute (PDF, JPG, PNG)
							</p>
						</div>
					</section>

					{/* Section 5: Resolution Sought */}
					<section>
						<h2 className={sectionTitleClasses}>
							<Scale className="w-3.5 h-3.5" />
							5. Resolution Sought
						</h2>
						<FormField
							control={form.control}
							name="resolution_sought"
							render={({ field }) => (
								<FormItem>
									<FormLabel className={labelClasses}>
										Desired Outcome
									</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Please explain the outcome you are seeking..."
											className="bg-primary/5 border-border/40 rounded-2xl min-h-[100px] p-4 shadow-none font-bold text-sm transition-all focus-visible:ring-4 focus-visible:ring-primary/5 focus-visible:border-primary/40 placeholder:opacity-30"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</section>

					{/* Section 6: Authorization and Signature */}
					<section>
						<h2 className={sectionTitleClasses}>
							<ShieldCheck className="w-3.5 h-3.5" />
							6. Authorization and Signature
						</h2>
						<div className="p-8 border border-primary/10 rounded-3xl bg-primary/[0.02] mb-8">
							<p className="text-xs font-bold text-muted-foreground leading-relaxed">
								By signing below, I confirm that the information provided is
								accurate and complete to the best of my knowledge. I authorize
								Tilla Health Insurance to investigate the dispute and contact me
								for additional information if necessary.
							</p>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							<FormField
								control={form.control}
								name="signature"
								render={({ field }) => (
									<FormItem>
										<FormLabel className={labelClasses}>Signature</FormLabel>
										<FormControl>
											<div className="relative">
												<Input
													placeholder="Type full legal name"
													className={`${inputClasses} font-serif italic text-lg`}
													{...field}
												/>
												<div className="absolute bottom-1 right-4 text-[8px] font-black uppercase text-muted-foreground opacity-30">
													Digital Signature
												</div>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="signature_date"
								render={({ field }) => (
									<FormItem>
										<FormLabel className={labelClasses}>Date</FormLabel>
										<FormControl>
											<div className="relative">
												<Input
													type="date"
													className={inputClasses}
													{...field}
												/>
												<Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</section>

					{/* Submit Button Area */}
					<div className="pt-10 flex items-center justify-end gap-4 border-t border-border/40">
						<Button
							variant="outline"
							className="px-8 rounded-xl border-border/40 font-black uppercase text-[10px] tracking-widest h-12"
							type="button"
						>
							Save as Draft
						</Button>
						<Button className="px-10 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-black uppercase text-[10px] tracking-widest h-12 shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]">
							Submit Dispute Form
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}
