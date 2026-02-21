"use client";

import { useState } from "react";

import {
	Bell,
	Camera,
	Check,
	ChevronRight,
	Globe,
	Lock,
	Mail,
	Moon,
	Receipt,
	Save,
	Shield,
	Smartphone,
	User,
} from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PremiumButton } from "@/components/ui/custom/premium-button";
import { Input } from "@/components/ui/input";

export function SettingsView() {
	const [activeTab, setActiveTab] = useState("profile");

	const tabs = [
		{ id: "profile", label: "My Profile", icon: User },
		{ id: "security", label: "Security", icon: Lock },
		{ id: "notifications", label: "Notifications", icon: Bell },
		{ id: "preferences", label: "Preferences", icon: Globe },
	];

	const handleSave = () => {
		toast.success("Settings Updated", {
			description: "Your changes have been saved successfully.",
		});
	};

	return (
		<div className="relative space-y-8 pb-12 max-w-[1200px] mx-auto px-4 sm:px-6 animate-in fade-in duration-700">
			{/* Background Aesthetics */}
			<div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
			<div className="absolute bottom-10 left-0 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

			{/* Header */}
			<div className="relative z-10">
				<div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/40 pb-6">
					<div>
						<h1 className="text-3xl font-black tracking-tight text-foreground">
							Account Settings
						</h1>
						<p className="text-muted-foreground text-sm font-medium mt-1">
							Manage your workspace preferences and security configurations.
						</p>
					</div>
					<PremiumButton
						onClick={handleSave}
						className="px-8 h-11 shadow-xl shadow-primary/20 text-[10px] uppercase font-black tracking-widest rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
					>
						<Save className="w-4 h-4 mr-2" />
						Save Changes
					</PremiumButton>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
				{/* Navigation Sidebar */}
				<div className="lg:col-span-3 space-y-2">
					{tabs.map((tab) => (
						<button
							key={tab.id}
							onClick={() => setActiveTab(tab.id)}
							className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300 group ${
								activeTab === tab.id
									? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 translate-x-1"
									: "bg-card/50 hover:bg-card border border-border/40 hover:border-primary/20"
							}`}
						>
							<div className="flex items-center gap-3">
								<tab.icon
									className={`w-4 h-4 ${activeTab === tab.id ? "" : "text-muted-foreground group-hover:text-primary transition-colors"}`}
								/>
								<span className="text-xs font-black uppercase tracking-wider">
									{tab.label}
								</span>
							</div>
							<ChevronRight
								className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition-all ${activeTab === tab.id ? "opacity-100" : ""}`}
							/>
						</button>
					))}
				</div>

				{/* Content Area */}
				<div className="lg:col-span-9">
					{activeTab === "profile" && (
						<div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
							<Card className="border border-border/40 bg-card/50 backdrop-blur-sm rounded-[2rem] overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05),0_10px_30px_-10px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] transition-all">
								<CardHeader className="p-8 border-b border-border/40 bg-primary/[0.01]">
									<CardTitle className="text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2">
										<User className="w-4 h-4 text-primary" />
										Personal Profile
									</CardTitle>
								</CardHeader>
								<CardContent className="p-8 space-y-8">
									<div className="flex flex-col md:flex-row items-center gap-8">
										<div className="relative group">
											<div className="w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center border-2 border-dashed border-primary/30 group-hover:border-primary transition-all overflow-hidden">
												<User className="w-10 h-10 text-primary opacity-50" />
											</div>
											<button className="absolute -bottom-2 -right-2 p-2 bg-primary text-primary-foreground rounded-xl shadow-lg hover:scale-110 transition-transform">
												<Camera className="w-4 h-4" />
											</button>
										</div>
										<div className="flex-1 space-y-1 text-center md:text-left">
											<h3 className="text-lg font-black text-foreground">
												Abraham Bekele, MD
											</h3>
											<p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
												Chief Compliance Officer
											</p>
											<div className="flex items-center justify-center md:justify-start gap-2 mt-2">
												<Badge className="bg-primary/10 text-primary border-none text-[9px] font-black uppercase px-2 py-0.5 rounded-lg whitespace-nowrap">
													Admin Access
												</Badge>
												<Badge className="bg-emerald-500/10 text-emerald-600 border-none text-[9px] font-black uppercase px-2 py-0.5 rounded-lg whitespace-nowrap">
													Verified Associate
												</Badge>
											</div>
										</div>
									</div>

									<div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
										<div className="space-y-2">
											<label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
												Full Name
											</label>
											<Input
												defaultValue="Abraham Bekele"
												className="bg-primary/5 border-border/40 rounded-xl h-11 px-4 font-bold text-sm shadow-none"
											/>
										</div>
										<div className="space-y-2">
											<label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
												Email Address
											</label>
											<Input
												defaultValue="a.bekele@tillahealth.com"
												className="bg-primary/5 border-border/40 rounded-xl h-11 px-4 font-bold text-sm shadow-none"
											/>
										</div>
										<div className="space-y-2">
											<label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
												Phone Number
											</label>
											<Input
												defaultValue="+251 911 223344"
												className="bg-primary/5 border-border/40 rounded-xl h-11 px-4 font-bold text-sm shadow-none"
											/>
										</div>
										<div className="space-y-2">
											<label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
												Organization
											</label>
											<Input
												defaultValue="Tilla Health Insurance"
												disabled
												className="bg-muted/50 border-border/40 rounded-xl h-11 px-4 font-bold text-sm shadow-none cursor-not-allowed"
											/>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
					)}

					{activeTab === "security" && (
						<div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
							<Card className="border border-border/40 bg-card/50 backdrop-blur-sm rounded-[2rem] overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05),0_10px_30px_-10px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] transition-all">
								<CardHeader className="p-8 border-b border-border/40 bg-primary/[0.01]">
									<CardTitle className="text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2">
										<Shield className="w-4 h-4 text-primary" />
										Security Protocols
									</CardTitle>
								</CardHeader>
								<CardContent className="p-8 space-y-8">
									<div className="space-y-6">
										<div className="flex items-center justify-between p-6 bg-primary/5 border border-primary/10 rounded-3xl">
											<div className="flex items-center gap-4">
												<div className="p-3 rounded-2xl bg-primary text-primary-foreground">
													<Smartphone className="w-5 h-5" />
												</div>
												<div>
													<p className="text-sm font-black text-foreground uppercase tracking-tight">
														Two-Factor Authentication
													</p>
													<p className="text-[10px] font-bold text-muted-foreground">
														Add an extra layer of security to your account.
													</p>
												</div>
											</div>
											<Badge className="bg-emerald-500/10 text-emerald-600 border-none text-[9px] font-black uppercase px-3 py-1 rounded-lg">
												Enabled
											</Badge>
										</div>

										<div className="space-y-4 pt-4">
											<div className="flex items-center gap-2 mb-2">
												<div className="h-4 w-1 bg-primary rounded-full" />
												<h4 className="text-[10px] font-black uppercase tracking-[0.15em] text-foreground/70">
													Change Password
												</h4>
											</div>
											<div className="grid grid-cols-1 gap-4">
												<Input
													type="password"
													placeholder="Current Password"
													className="bg-primary/5 border-border/40 rounded-xl h-11 px-4 font-bold text-sm shadow-none"
												/>
												<Input
													type="password"
													placeholder="New Password"
													className="bg-primary/5 border-border/40 rounded-xl h-11 px-4 font-bold text-sm shadow-none"
												/>
											</div>
											<PremiumButton
												variant="outline"
												className="w-full md:w-auto px-8 h-10 text-[9px] uppercase font-black tracking-widest rounded-xl"
											>
												Update Password
											</PremiumButton>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
					)}

					{activeTab === "notifications" && (
						<div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
							<Card className="border border-border/40 bg-card/50 backdrop-blur-sm rounded-[2rem] overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05),0_10px_30px_-10px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] transition-all">
								<CardHeader className="p-8 border-b border-border/40 bg-primary/[0.01]">
									<CardTitle className="text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2">
										<Bell className="w-4 h-4 text-primary" />
										Notification Preferences
									</CardTitle>
								</CardHeader>
								<CardContent className="p-8 space-y-6">
									{[
										{
											label: "Claims Processing Status",
											desc: "Receive alerts when a claim status changes.",
											icon: Receipt,
										},
										{
											label: "New Message Alerts",
											desc: "Notifications for new messages from providers.",
											icon: Mail,
										},
										{
											label: "Security & Login Alerts",
											desc: "Alerts for new logins or security adjustments.",
											icon: Shield,
										},
									].map((item, i) => (
										<div
											key={i}
											className="flex items-center justify-between py-4 group"
										>
											<div className="flex items-center gap-4">
												<div className="p-3 rounded-2xl bg-muted group-hover:bg-primary/10 text-muted-foreground group-hover:text-primary transition-all">
													<item.icon className="w-5 h-5" />
												</div>
												<div>
													<p className="text-sm font-black text-foreground uppercase tracking-tight">
														{item.label}
													</p>
													<p className="text-[10px] font-bold text-muted-foreground">
														{item.desc}
													</p>
												</div>
											</div>
											<button className="w-12 h-6 rounded-full bg-primary relative p-1 transition-all">
												<div className="absolute right-1 top-1 w-4 h-4 rounded-full bg-primary-foreground shadow-sm" />
											</button>
										</div>
									))}
								</CardContent>
							</Card>
						</div>
					)}

					{activeTab === "preferences" && (
						<div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
							<Card className="border border-border/40 bg-card/50 backdrop-blur-sm rounded-[2rem] overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05),0_10px_30px_-10px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] transition-all">
								<CardHeader className="p-8 border-b border-border/40 bg-primary/[0.01]">
									<CardTitle className="text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2">
										<Globe className="w-4 h-4 text-primary" />
										General Preferences
									</CardTitle>
								</CardHeader>
								<CardContent className="p-8 space-y-8">
									<div className="grid grid-cols-1 md:grid-cols-2 gap-10">
										<div className="space-y-4">
											<div className="flex items-center gap-2 mb-2">
												<div className="h-4 w-1 bg-primary rounded-full" />
												<h4 className="text-[10px] font-black uppercase tracking-[0.15em] text-foreground/70">
													Visual Mode
												</h4>
											</div>
											<div className="flex items-center gap-4">
												<button className="flex-1 p-4 rounded-2xl border-2 border-primary bg-primary/5 text-primary flex flex-col items-center gap-2">
													<Globe className="w-6 h-6" />
													<span className="text-[9px] font-black uppercase tracking-widest">
														Light Mode
													</span>
												</button>
												<button className="flex-1 p-4 rounded-2xl border border-border/40 hover:border-primary/20 bg-card text-muted-foreground flex flex-col items-center gap-2">
													<Moon className="w-6 h-6" />
													<span className="text-[9px] font-black uppercase tracking-widest">
														Dark Mode
													</span>
												</button>
											</div>
										</div>

										<div className="space-y-4">
											<div className="flex items-center gap-2 mb-2">
												<div className="h-4 w-1 bg-primary rounded-full" />
												<h4 className="text-[10px] font-black uppercase tracking-[0.15em] text-foreground/70">
													Interface Language
												</h4>
											</div>
											<div className="p-4 rounded-2xl border border-border/40 bg-card flex items-center justify-between">
												<div className="flex items-center gap-3">
													<span className="text-xl">🇺🇸</span>
													<span className="text-xs font-black uppercase tracking-wider">
														English (US)
													</span>
												</div>
												<Check className="w-4 h-4 text-primary" />
											</div>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
