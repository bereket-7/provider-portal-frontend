"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

import {
	Activity,
	ArrowRight,
	KeyRound,
	Mail,
	ShieldCheck,
	Stethoscope,
	Wallet,
} from "lucide-react";
import { toast } from "sonner";

import { Card } from "@/components/ui/card";
import { PremiumButton } from "@/components/ui/custom/premium-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserRole, useUserRole } from "@/providers/user-role-provider";

export default function LoginView() {
	const router = useRouter();
	const { login } = useUserRole();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [selectedRole, setSelectedRole] = useState<UserRole>("claim-officer");
	const [isLoading, setIsLoading] = useState(false);

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!email || !password) {
			toast.error("Credentials required");
			return;
		}

		setIsLoading(true);
		// Fake verification latency
		await new Promise((resolve) => setTimeout(resolve, 1000));

		if (email.includes("@") && password.length >= 4) {
			login(selectedRole);
			router.push("/dashboard");
			toast.success(
				`Access established: ${selectedRole.replace("-", " ")} portal`
			);
		} else {
			setIsLoading(false);
			toast.error("Invalid credentials.");
		}
	};

	return (
		<div className="h-screen w-full flex flex-col items-center justify-center bg-[#f8fafc] font-sans overflow-hidden">
			<div className="w-full max-w-md px-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
				{/* Scaled down branding */}
				<div className="mb-6 flex flex-col items-center">
					<div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20 mb-3">
						<Stethoscope className="h-6 w-6 text-white" />
					</div>
					<h1 className="text-xl font-black tracking-tighter text-foreground">
						TENA&apos;ADAM{" "}
						<span className="text-primary tracking-normal font-bold">IMS</span>
					</h1>
					<p className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground mt-0.5">
						Enterprise Portal Access
					</p>
				</div>

				<Card className="p-6 rounded-[1.5rem] border-border/40 shadow-xl shadow-black/[0.02] bg-white relative overflow-hidden">
					<div className="mb-5">
						<h2 className="text-lg font-black tracking-tight mb-0.5">
							Sign In
						</h2>
						<p className="text-[11px] font-medium text-muted-foreground/60">
							Secure access to provider infrastructure.
						</p>
					</div>

					<form onSubmit={handleLogin} className="space-y-4">
						<div className="space-y-1.5">
							<Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">
								Work Email
							</Label>
							<div className="relative group">
								<Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/40 group-focus-within:text-primary transition-colors" />
								<Input
									type="email"
									placeholder="officer@tilla.health"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="pl-10 h-10 rounded-lg border-border/40 bg-slate-50/30 focus:bg-white transition-all text-sm font-bold shadow-none"
								/>
							</div>
						</div>

						<div className="space-y-1.5">
							<Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">
								Access Password
							</Label>
							<div className="relative group">
								<KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/40 group-focus-within:text-primary transition-colors" />
								<Input
									type="password"
									placeholder="••••••••"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className="pl-10 h-10 rounded-lg border-border/40 bg-slate-50/30 focus:bg-white transition-all text-sm font-bold shadow-none"
								/>
							</div>
						</div>

						{/* Role Selection Chips */}
						<div className="space-y-2">
							<Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">
								Identify Active Role
							</Label>
							<div className="flex gap-2">
								<button
									type="button"
									onClick={() => setSelectedRole("claim-officer")}
									className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg border-2 transition-all duration-300 text-[9px] font-black uppercase tracking-widest ${
										selectedRole === "claim-officer"
											? "border-primary bg-primary/5 text-primary"
											: "border-border/40 bg-transparent text-muted-foreground/60 hover:border-primary/20"
									}`}
								>
									<ShieldCheck className="w-3.5 h-3.5" />
									Claim Officer
								</button>
								<button
									type="button"
									onClick={() => setSelectedRole("financial-officer")}
									className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg border-2 transition-all duration-300 text-[9px] font-black uppercase tracking-widest ${
										selectedRole === "financial-officer"
											? "border-emerald-500 bg-emerald-500/5 text-emerald-600"
											: "border-border/40 bg-transparent text-muted-foreground/60 hover:border-emerald-500/20"
									}`}
								>
									<Wallet className="w-3.5 h-3.5" />
									Financial
								</button>
							</div>
						</div>

						<PremiumButton
							type="submit"
							disabled={isLoading}
							className="w-full h-11 rounded-lg bg-primary text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-primary/10 mt-1 hover:translate-y-[-1px] active:translate-y-[0px] transition-transform"
						>
							{isLoading ? (
								<span className="flex items-center gap-2">
									<Activity className="w-3.5 h-3.5 animate-spin" />
									Establishing...
								</span>
							) : (
								<span className="flex items-center gap-2">
									Enter Portal
									<ArrowRight className="w-3.5 h-3.5" />
								</span>
							)}
						</PremiumButton>
					</form>

					<button className="w-full mt-6 text-[8px] font-bold uppercase tracking-[0.1em] text-muted-foreground/40 hover:text-primary transition-colors text-center">
						Security & Support Recovery
					</button>
				</Card>

				{/* Professional Trust Footer */}
				<div className="mt-6 flex justify-center items-center gap-4 opacity-40">
					<div className="flex items-center gap-1.5 contrast-0">
						<ShieldCheck className="w-3 h-3" />
						<span className="text-[7px] font-black uppercase tracking-widest">
							Protected Environment
						</span>
					</div>
					<div className="w-0.5 h-0.5 bg-muted-foreground rounded-full" />
					<div className="flex items-center gap-1.5 contrast-0">
						<Activity className="w-3 h-3" />
						<span className="text-[7px] font-black uppercase tracking-widest">
							Operations Online
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
