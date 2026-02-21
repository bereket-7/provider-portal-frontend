"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { Bell, ChevronRight } from "lucide-react";

import LocaleSwitcher from "@/components/shared/DropDown/LocaleSwitcher";
import { ModeToggle } from "@/components/shared/DropDown/modeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
	const pathname = usePathname();

	// Clean breadcrumbs implementation
	const generateBreadcrumbs = () => {
		// Remove query params and locale strings if needed,
		// but pathname usually comes clean from next/navigation in app dir
		const asPathWithoutQuery = pathname.split("?")[0];

		// Split pathname into segments
		const asPathNestedRoutes = asPathWithoutQuery
			.split("/")
			.filter((v) => v.length > 0 && v !== "en" && v !== "am"); // standard locales filter or use regex

		// Map to breadcrumb objects
		const breadcrumbs = asPathNestedRoutes.map((subpath, idx) => {
			const href = `/${asPathNestedRoutes.slice(0, idx + 1).join("/")}`;
			const label =
				subpath.charAt(0).toUpperCase() + subpath.slice(1).replace(/-/g, " ");
			return { href, label };
		});

		return [{ href: "/", label: "Home" }, ...breadcrumbs];
	};

	const breadcrumbs = generateBreadcrumbs();

	return (
		<header
			className="sticky top-0 z-40 flex h-14 shrink-0 
items-center gap-x-4 border-b bg-background px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8"
		>
			{/* Mobile Menu Trigger Placeholder - functionality is in Sidebar but button needs to be visible on mobile if sidebar is hidden */}
			{/* Note: The Sidebar component handles its own mobile trigger visibility. 
          We can add a separate one here if we want the header to control sidebar, 
          but usually the sidebar component exposes a trigger or we use a shared state. 
          For now, keeping it simple as per previous sidebar implementation. */}

			<div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
				<div className="flex flex-1 items-center gap-2 overflow-hidden">
					{/* Breadcrumbs */}
					<nav className="hidden md:flex items-center text-sm text-muted-foreground">
						{breadcrumbs.map((breadcrumb, index) => (
							<React.Fragment key={breadcrumb.href}>
								{index > 0 && <ChevronRight className="mx-2 h-4 w-4" />}
								<Link
									href={breadcrumb.href}
									className={`hover:text-foreground transition-colors ${
										index === breadcrumbs.length - 1
											? "text-foreground font-medium"
											: ""
									}`}
								>
									{breadcrumb.label}
								</Link>
							</React.Fragment>
						))}
					</nav>
					{/* Mobile Title (when breadcrumbs hidden) */}
					<div className="md:hidden font-semibold text-foreground">
						{breadcrumbs[breadcrumbs.length - 1]?.label || "Dashboard"}
					</div>
				</div>

				<div className="flex items-center gap-x-3 lg:gap-x-4">
					{/* Notification Bell */}
					<Button variant="ghost" size="icon" className="text-muted-foreground">
						<Bell className="h-5 w-5" />
						<span className="sr-only">View notifications</span>
					</Button>

					<div className="h-6 w-px bg-border" aria-hidden="true" />

					<ModeToggle />
					<LocaleSwitcher />

					<div className="h-6 w-px bg-border" aria-hidden="true" />

					{/* User Profile */}
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" className="relative h-8 w-8 rounded-full">
								<Avatar className="h-8 w-8">
									<AvatarImage src="/avatars/01.png" alt="@shadcn" />
									<AvatarFallback>JD</AvatarFallback>
								</Avatar>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-56" align="end" forceMount>
							<DropdownMenuLabel className="font-normal">
								<div className="flex flex-col space-y-1">
									<p className="text-sm font-medium leading-none">John Doe</p>
									<p className="text-xs leading-none text-muted-foreground">
										john.doe@example.com
									</p>
								</div>
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>Profile</DropdownMenuItem>
							<DropdownMenuItem>Billing</DropdownMenuItem>
							<DropdownMenuItem>Settings</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem className="text-destructive">
								Log out
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</header>
	);
}
