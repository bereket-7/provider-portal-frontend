"use client";

import Link from "next/link";
import React from "react";

import { ArrowLeft } from "lucide-react";

interface ModuleHeaderProps {
	icon: React.ElementType;
	title: string;
	subtitle: string;
	pillText?: string;
	pillColor?: string;
	actions?: React.ReactNode;
	backHref?: string;
}

export function ModuleHeader({
	icon: Icon,
	title,
	subtitle,
	pillText,
	pillColor = "bg-primary",
	actions,
	backHref,
}: ModuleHeaderProps) {
	return (
		<div className="relative overflow-hidden rounded-2xl border border-border/40 bg-card p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
			<div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
				<div className="flex items-center gap-4">
					{backHref ? (
						<Link
							href={backHref}
							className="p-2.5 bg-muted hover:bg-muted/80 rounded-xl border border-border/40 transition-colors"
						>
							<ArrowLeft className="w-5 h-5 text-muted-foreground" />
						</Link>
					) : (
						<div className="p-2.5 bg-primary rounded-xl border border-primary/20">
							<Icon className="w-5 h-5 text-primary-foreground" />
						</div>
					)}
					<div>
						<h1 className="text-xl md:text-2xl font-black tracking-tight text-foreground">
							{title}
						</h1>
						<div className="flex items-center gap-2 text-xs font-bold text-muted-foreground mt-0.5">
							<span
								className={`flex h-2 w-2 rounded-full ${pillColor} animate-pulse`}
							/>
							{pillText || subtitle}
						</div>
					</div>
				</div>

				{actions && <div className="flex items-center gap-3">{actions}</div>}
			</div>
		</div>
	);
}
