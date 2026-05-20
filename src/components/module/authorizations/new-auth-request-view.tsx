"use client";

import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";
import {
	ArrowLeft,
	Calendar,
	FilePlus,
	Send,
	ShieldCheck,
	Upload,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { demoCreatePriorAuth } from "@/lib/demo/demo-api";
import { isDemoMode } from "@/lib/demo/demo-mode";
import { useDemoStore } from "@/lib/demo/demo-store-context";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
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
import { Textarea } from "@/components/ui/textarea";

// Schema based on user provided data
const priorAuthorizationSchema = z.object({
	member_id: z.string().min(1, "Member ID is required"),
	patient_dob: z.string().min(1, "Date of birth is required"),
	date_of_service: z.string().min(1, "Date of service is required"),
	requested_service: z.string().min(1, "Requested service is required"),
	reason_for_request: z.string().min(1, "Reason for request is required"),
	additional_note: z.string(),
	supporting_doc1: z.string(),
	supporting_doc2: z.string(),
	cpt_code: z.string(),
	cpt_category: z.string(),
	cpt_description: z.string(),
	diagnosis_date: z.string(),
	diagnosis_source: z.string(),
	diagnosis_category: z.string(),
	diagnosis_description: z.string(),
	diagnosis_code: z.string(),
	priority: z.string(),
});

export type PriorAuthorizationFormValues = z.infer<
	typeof priorAuthorizationSchema
>;

export function NewAuthRequestView() {
	const router = useRouter();
	const { bumpVersion } = useDemoStore();
	const form = useForm<PriorAuthorizationFormValues>({
		resolver: zodResolver(priorAuthorizationSchema),
		defaultValues: {
			member_id: "",
			patient_dob: "",
			date_of_service: "",
			requested_service: "",
			reason_for_request: "",
			additional_note: "",
			supporting_doc1: "",
			supporting_doc2: "",
			cpt_code: "",
			cpt_category: "",
			cpt_description: "",
			diagnosis_date: "",
			diagnosis_source: "",
			diagnosis_category: "",
			diagnosis_description: "",
			diagnosis_code: "",
			priority: "Routine",
		},
	});

	const handleSubmit = async (data: PriorAuthorizationFormValues) => {
		if (isDemoMode()) {
			const auth = await demoCreatePriorAuth({
				memberId: data.member_id,
				patient: "Selam Tesfaye",
				service: data.requested_service,
				reason_for_request: data.reason_for_request,
				date_of_service: data.date_of_service,
				priority: data.priority,
				clinicalJustification: data.reason_for_request,
			});
			bumpVersion();
			toast.success(`Prior auth submitted: ${auth.authorizationNumber}`);
			form.reset();
			router.push("/authorizations");
			return;
		}
		console.log("Form submitted:", data);
		toast.success("Request Submitted Successfully", {
			description: "Tilla AI engine is now processing your authorization.",
		});
		form.reset();
	};

	return (
		<div className="relative space-y-8 pb-12 max-w-[1250px] mx-auto px-4 sm:px-6 animate-in fade-in duration-700">
			{/* Aesthetic Backgrounds */}
			<div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
			<div className="absolute bottom-10 left-0 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

			{/* Navigation & Header - Sleek & Integrated */}
			<div className="flex flex-col gap-6 relative z-10">
				<div className="flex items-center justify-between">
					<Link
						href="/authorizations"
						className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-all group"
					>
						<div className="p-1.5 rounded-lg bg-muted group-hover:bg-primary/10 transition-colors">
							<ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
						</div>
						Return to Queue
					</Link>
					<div className="flex items-center gap-3">
						<button
							onClick={() => form.reset()}
							className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
						>
							Discard
						</button>
						<PremiumButton
							onClick={form.handleSubmit(handleSubmit)}
							className="px-8 h-10 shadow-xl shadow-primary/20 text-[9px] uppercase font-black tracking-widest rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
						>
							<Send className="w-3.5 h-3.5 mr-2" />
							Initiate Request
						</PremiumButton>
					</div>
				</div>

				<div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border/40 pb-4">
					<div className="flex items-center gap-4">
						<div className="p-3 bg-primary text-primary-foreground rounded-xl shadow-xl shadow-primary/10 transform -rotate-1 hover:rotate-0 transition-transform duration-500">
							<FilePlus className="w-6 h-6" />
						</div>
						<div>
							<h1 className="text-xl font-black tracking-tight text-foreground">
								New Prior Authorization
							</h1>
							<div className="flex items-center gap-2 mt-0.5">
								<p className="text-[9px] font-black text-primary uppercase tracking-[0.2em]">
									Care Protocol X12-278
								</p>
								<div className="h-0.5 w-0.5 bg-border rounded-full" />
								<p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
									AI-Assisted Adjudication
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(handleSubmit)}
					className="grid grid-cols-1 lg:grid-cols-12 gap-10 relative z-10"
				>
					{/* Main Form Content - Professional & Fluid */}
					<div className="lg:col-span-8 space-y-12">
						{/* Section: Patient Identification */}
						<section className="space-y-6">
							<div className="flex items-center gap-2 mb-2">
								<div className="h-4 w-1 bg-primary rounded-full" />
								<h2 className="text-xs font-black uppercase tracking-[0.2em] text-foreground/80">
									Patient Identification
								</h2>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
								<FormField
									control={form.control}
									name="member_id"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/70">
												Member ID / Policy Number
											</FormLabel>
											<FormControl>
												<Input
													placeholder="Enter Member ID"
													className="bg-primary/5 border-border/40 rounded-xl h-11 px-4 shadow-none font-bold text-sm transition-all focus-visible:ring-4 focus-visible:ring-primary/5 focus-visible:border-primary/40 placeholder:opacity-30"
													{...field}
												/>
											</FormControl>
											<FormMessage className="text-[10px] font-bold" />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="patient_dob"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/70">
												Date of Birth
											</FormLabel>
											<FormControl>
												<div className="relative">
													<Input
														placeholder="Date of Birth"
														className="bg-primary/5 border-border/40 rounded-xl h-11 px-4 shadow-none font-bold text-sm transition-all focus-visible:ring-4 focus-visible:ring-primary/5 focus-visible:border-primary/40 placeholder:opacity-30"
														{...field}
													/>
													<Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/40" />
												</div>
											</FormControl>
											<FormMessage className="text-[10px] font-bold" />
										</FormItem>
									)}
								/>
							</div>
						</section>

						{/* Section: Request Details */}
						<section className="space-y-6">
							<div className="flex items-center gap-2 mb-2">
								<div className="h-4 w-1 bg-primary rounded-full" />
								<h2 className="text-xs font-black uppercase tracking-[0.2em] text-foreground/80">
									Request Details
								</h2>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
								<FormField
									control={form.control}
									name="date_of_service"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/70">
												Estimated Service Date
											</FormLabel>
											<FormControl>
												<Input
													type="date"
													className="bg-primary/5 border-border/40 rounded-xl h-11 px-4 shadow-none font-bold text-sm transition-all focus-visible:ring-4 focus-visible:ring-primary/5 focus-visible:border-primary/40"
													{...field}
												/>
											</FormControl>
											<FormMessage className="text-[10px] font-bold" />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="requested_service"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/70">
												Requested Service Type
											</FormLabel>
											<FormControl>
												<Input
													placeholder="Specify Service"
													className="bg-primary/5 border-border/40 rounded-xl h-11 px-4 shadow-none font-bold text-sm transition-all focus-visible:ring-4 focus-visible:ring-primary/5 focus-visible:border-primary/40 placeholder:opacity-30"
													{...field}
												/>
											</FormControl>
											<FormMessage className="text-[10px] font-bold" />
										</FormItem>
									)}
								/>
							</div>
							<FormField
								control={form.control}
								name="reason_for_request"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/70">
											Clinical Justification
										</FormLabel>
										<FormControl>
											<Textarea
												placeholder="Describe medical necessity..."
												className="bg-primary/5 border-border/40 rounded-2xl min-h-[120px] font-medium p-4 resize-none transition-all focus-visible:ring-4 focus-visible:ring-primary/5 focus-visible:border-primary/40 placeholder:opacity-30"
												{...field}
											/>
										</FormControl>
										<FormMessage className="text-[10px] font-bold" />
									</FormItem>
								)}
							/>
						</section>

						{/* Section: Integrated Codes */}
						<section className="space-y-6">
							<div className="flex items-center gap-2 mb-2">
								<div className="h-4 w-1 bg-primary rounded-full" />
								<h2 className="text-xs font-black uppercase tracking-[0.2em] text-foreground/80">
									Diagnosis & Procedure
								</h2>
							</div>
							<div className="bg-card/30 rounded-3xl border border-border/10 p-8 space-y-8 backdrop-blur-sm shadow-sm">
								<div className="grid grid-cols-1 md:grid-cols-12 gap-8">
									<div className="md:col-span-4">
										<FormField
											control={form.control}
											name="diagnosis_code"
											render={({ field }) => (
												<FormItem>
													<FormLabel className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/70">
														ICD-10 Code
													</FormLabel>
													<FormControl>
														<Input
															placeholder="Code"
															className="bg-primary/5 border-border/40 rounded-xl h-11 px-4 shadow-none font-bold text-sm transition-all focus-visible:ring-4 focus-visible:ring-primary/5 focus-visible:border-primary/40 placeholder:opacity-30"
															{...field}
														/>
													</FormControl>
												</FormItem>
											)}
										/>
									</div>
									<div className="md:col-span-8">
										<FormField
											control={form.control}
											name="diagnosis_description"
											render={({ field }) => (
												<FormItem>
													<FormLabel className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/70">
														Diagnosis Description
													</FormLabel>
													<FormControl>
														<Input
															placeholder="Enter Description"
															className="bg-primary/5 border-border/40 rounded-xl h-11 px-4 shadow-none font-bold text-sm transition-all focus-visible:ring-4 focus-visible:ring-primary/5 focus-visible:border-primary/40 placeholder:opacity-30"
															{...field}
														/>
													</FormControl>
												</FormItem>
											)}
										/>
									</div>
								</div>
								<div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4">
									<div className="md:col-span-4">
										<FormField
											control={form.control}
											name="cpt_code"
											render={({ field }) => (
												<FormItem>
													<FormLabel className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/70">
														CPT / HCPCS Code
													</FormLabel>
													<FormControl>
														<Input
															placeholder="Code"
															className="bg-primary/5 border-border/40 rounded-xl h-11 px-4 shadow-none font-bold text-sm transition-all focus-visible:ring-4 focus-visible:ring-primary/5 focus-visible:border-primary/40 placeholder:opacity-30"
															{...field}
														/>
													</FormControl>
												</FormItem>
											)}
										/>
									</div>
									<div className="md:col-span-8">
										<FormField
											control={form.control}
											name="cpt_description"
											render={({ field }) => (
												<FormItem>
													<FormLabel className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/70">
														Procedure Description
													</FormLabel>
													<FormControl>
														<Input
															placeholder="Enter Description"
															className="bg-primary/5 border-border/40 rounded-xl h-11 px-4 shadow-none font-bold text-sm transition-all focus-visible:ring-4 focus-visible:ring-primary/5 focus-visible:border-primary/40 placeholder:opacity-30"
															{...field}
														/>
													</FormControl>
												</FormItem>
											)}
										/>
									</div>
								</div>
							</div>
						</section>
					</div>

					{/* Sidebar Options - Density Optimized */}
					<div className="lg:col-span-4 space-y-8">
						{/* Priority Board */}
						<div className="space-y-4">
							<div className="flex items-center gap-2 mb-2">
								<div className="h-4 w-1 bg-primary rounded-full" />
								<h2 className="text-xs font-black uppercase tracking-[0.2em] text-foreground/80">
									Urgency Level
								</h2>
							</div>
							<div className="grid grid-cols-1 gap-3">
								{["Routine", "Urgent", "Emergency"].map((p) => (
									<button
										key={p}
										type="button"
										onClick={() => form.setValue("priority", p)}
										className={`group relative flex flex-col items-start p-4 rounded-2xl border transition-all duration-300 ${
											form.watch("priority") === p
												? "border-primary/40 bg-primary/5 shadow-2xl shadow-primary/5 ring-1 ring-primary/20"
												: "border-border/30 bg-card/30 hover:border-primary/20 hover:bg-card/50"
										}`}
									>
										<div className="flex items-center justify-between w-full">
											<span className="text-[10px] font-black uppercase tracking-[0.15em]">
												{p}
											</span>
											<div
												className={`h-2 w-2 rounded-full ${
													p === "Emergency"
														? "bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.4)]"
														: p === "Urgent"
															? "bg-amber-500"
															: "bg-primary"
												} ${form.watch("priority") === p ? "animate-pulse scale-125" : "opacity-40"}`}
											/>
										</div>
										<p className="text-[9px] font-bold text-muted-foreground mt-1.5 opacity-60">
											{p === "Emergency"
												? "Immediate processing (< 2 hours)"
												: p === "Urgent"
													? "Priority review (24-48 hours)"
													: "Standard review cycle (3-5 days)"}
										</p>
									</button>
								))}
							</div>
						</div>

						{/* Document Dropzone */}
						<div className="space-y-4 pt-4">
							<div className="flex items-center gap-2 mb-2">
								<div className="h-4 w-1 bg-primary rounded-full" />
								<h2 className="text-xs font-black uppercase tracking-[0.2em] text-foreground/80">
									Supporting Docs
								</h2>
							</div>
							<div className="space-y-3">
								{[1, 2].map((i) => (
									<FormField
										key={i}
										control={form.control}
										name={i === 1 ? "supporting_doc1" : "supporting_doc2"}
										render={({ field: { onChange, value, ...field } }) => (
											<div className="relative group overflow-hidden rounded-2xl border border-dashed border-border/60 hover:border-primary/40 transition-all cursor-pointer">
												<input
													type="file"
													className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
													onChange={(e) => {
														const file = e.target.files?.[0];
														onChange(file ? file.name : "");
													}}
													{...field}
												/>
												<div className="p-4 flex items-center gap-4 bg-muted/20 group-hover:bg-primary/[0.02] transition-colors relative z-10">
													<div className="p-2.5 rounded-xl bg-background border border-border group-hover:border-primary/20 transition-colors shadow-sm">
														<Upload className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
													</div>
													<div className="flex-1 min-w-0">
														<p className="text-[10px] font-black uppercase tracking-widest truncate">
															{value ||
																(i === 1
																	? "Primary Artifact"
																	: "Secondary Support")}
														</p>
														<p className="text-[9px] font-bold text-muted-foreground/60 mt-0.5">
															PDF, JPG, DICOM Max 20MB
														</p>
													</div>
												</div>
											</div>
										)}
									/>
								))}
							</div>
						</div>

						{/* Summary Info Card */}
						<div className="mt-8 p-6 rounded-3xl bg-gradient-to-br from-primary/10 via-primary/[0.02] to-transparent border border-primary/10">
							<div className="flex items-center gap- 3 mb-4">
								<div className="p-2 rounded-lg bg-primary text-primary-foreground">
									<ShieldCheck className="w-4 h-4" />
								</div>
								<p className="text-[10px] font-black uppercase tracking-widest">
									System Integrity
								</p>
							</div>
							<div className="space-y-3">
								<div className="flex items-center justify-between">
									<span className="text-[9px] font-bold text-muted-foreground uppercase opacity-60">
										Reference
									</span>
									<span className="text-[10px] font-black tabular-nums">
										PA-REV-2026-X44
									</span>
								</div>
								<div className="flex items-center justify-between">
									<span className="text-[9px] font-bold text-muted-foreground uppercase opacity-60">
										AI Engine
									</span>
									<span className="text-[10px] font-black text-emerald-500 uppercase tracking-tighter">
										Sync Ready
									</span>
								</div>
							</div>
						</div>
					</div>
				</form>
			</Form>
		</div>
	);
}
