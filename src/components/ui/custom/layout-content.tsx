"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

import Header from "@/components/ui/custom/header";
import Sidebar from "@/components/ui/custom/sidebar";
import { useUserRole } from "@/providers/user-role-provider";

export function LayoutContent({ children }: { children: React.ReactNode }) {
	const { role, isInitialized } = useUserRole();
	const pathname = usePathname();
	const router = useRouter();

	const isLoginPage = pathname?.includes("/login");
	const locale = pathname?.split("/")[1] || "en";

	useEffect(() => {
		if (!isInitialized) return;

		if (!role && !isLoginPage) {
			// Redirect to login if not authenticated
			router.replace(`/${locale}/login`);
		} else if (role && isLoginPage) {
			// Redirect to dashboard if already authenticated
			router.replace(`/${locale}/dashboard`);
		}
	}, [role, isInitialized, isLoginPage, router, locale]);

	if (!isInitialized) {
		return <div className="h-screen w-full bg-[#f8fafc]" />;
	}

	if (isLoginPage) {
		return (
			<div className="h-screen w-full overflow-y-auto bg-[#f8fafc]">
				{children}
			</div>
		);
	}

	return (
		<div className="flex h-screen overflow-hidden bg-background">
			<Sidebar />
			<main className="flex-1 flex flex-col overflow-hidden bg-background">
				<Header />
				<div className="flex-1 overflow-y-auto pt-6">{children}</div>
			</main>
		</div>
	);
}
