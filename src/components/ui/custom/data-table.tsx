"use client";

import { useState } from "react";

import { Filter, Search } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableHeader } from "@/components/ui/table";

import { PremiumButton } from "./premium-button";

interface Column<T> {
	header: string;
	key: keyof T | string;
	align?: "left" | "center" | "right";
	className?: string;
	render?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
	title: string;
	subtitle?: string;
	data: T[];
	columns: Column<T>[];
	searchPlaceholder?: string;
	filterOptions?: string[];
	onRowClick?: (item: T) => void;
	onExport?: () => void;
	pageSize?: number;
}

export function DataTable<T>({
	title,
	subtitle,
	data,
	columns,
	searchPlaceholder = "Search...",
	onRowClick,
	onExport,
	pageSize = 5,
}: DataTableProps<T>) {
	const [searchTerm, setSearchTerm] = useState("");
	const [currentPage, setCurrentPage] = useState(1);

	// Filter data based on search term
	const filteredData = data.filter((item) =>
		Object.values(item as any).some((val) =>
			String(val).toLowerCase().includes(searchTerm.toLowerCase())
		)
	);

	const totalPages = Math.ceil(filteredData.length / pageSize);
	const paginatedData = filteredData.slice(
		(currentPage - 1) * pageSize,
		currentPage * pageSize
	);

	return (
		<Card className="border border-border/40 bg-card rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05),0_10px_30px_-10px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] transition-all overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
			<CardHeader className="p-5 border-b border-border/40 bg-primary/[0.01]">
				<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
					<div>
						<CardTitle className="text-xl font-black tracking-tight">
							{title}
						</CardTitle>
						{subtitle && (
							<p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60 mt-1">
								{subtitle}
							</p>
						)}
					</div>
					<div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
						<div className="relative group w-full md:min-w-[320px]">
							<Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
							<input
								type="text"
								placeholder={searchPlaceholder}
								className="w-full pl-11 pr-4 py-2.5 bg-card border border-border/30 rounded-xl text-xs font-bold focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/40 transition-all font-inter"
								value={searchTerm}
								onChange={(e) => {
									setSearchTerm(e.target.value);
									setCurrentPage(1);
								}}
							/>
						</div>
						<div className="flex items-center gap-2 w-full md:w-auto">
							<button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-card border border-border/40 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary/5 transition-all shadow-sm">
								<Filter className="w-3.5 h-3.5 text-primary" />
								Filters
							</button>
							{onExport && (
								<button
									onClick={onExport}
									className="flex-1 md:flex-none px-4 py-2.5 bg-card border border-border/40 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary/5 transition-all shadow-sm"
								>
									Export
								</button>
							)}
						</div>
					</div>
				</div>
			</CardHeader>
			<CardContent className="p-0">
				<div className="overflow-x-auto">
					<Table className="w-full border-collapse">
						<TableHeader className="bg-primary/[0.02] border-b border-border/40">
							<tr className="hover:bg-transparent border-none">
								{columns.map((col, idx) => (
									<th
										key={idx}
										className={`px-6 py-3 text-${col.align || "left"} text-[10px] font-black uppercase tracking-widest text-muted-foreground ${col.className}`}
									>
										{col.header}
									</th>
								))}
							</tr>
						</TableHeader>
						<TableBody className="divide-y divide-border/20">
							{paginatedData.map((item, rowIdx) => (
								<tr
									key={rowIdx}
									className={`group transition-colors border-none ${
										onRowClick
											? "cursor-pointer hover:bg-primary/5 active:bg-primary/10"
											: "hover:bg-primary/[0.01]"
									}`}
									onClick={() => onRowClick?.(item)}
								>
									{columns.map((col, colIdx) => (
										<td
											key={colIdx}
											className={`px-6 py-3.5 text-${col.align || "left"} ${col.className}`}
										>
											{col.render ? col.render(item) : (item as any)[col.key]}
										</td>
									))}
								</tr>
							))}
							{paginatedData.length === 0 && (
								<tr>
									<td
										colSpan={columns.length}
										className="px-6 py-20 text-center text-sm font-bold text-muted-foreground italic uppercase tracking-widest opacity-40"
									>
										No records found matching your search
									</td>
								</tr>
							)}
						</TableBody>
					</Table>
				</div>
				<div className="p-6 border-t border-border/40 flex items-center justify-between bg-primary/[0.01]">
					<p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60">
						Showing {paginatedData.length} of {filteredData.length} records
					</p>
					<div className="flex items-center gap-2">
						<PremiumButton
							variant="ghost"
							className="h-10 px-6 text-[9px]"
							disabled={currentPage === 1}
							onClick={() => setCurrentPage(currentPage - 1)}
						>
							Previous
						</PremiumButton>
						<div className="flex items-center gap-1.5 px-2">
							{Array.from({ length: totalPages }).map((_, i) => (
								<button
									key={i}
									onClick={() => setCurrentPage(i + 1)}
									className={`w-7 h-7 rounded-lg text-[10px] font-black transition-all ${
										currentPage === i + 1
											? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
											: "text-muted-foreground hover:bg-primary/10"
									}`}
								>
									{i + 1}
								</button>
							))}
						</div>
						<div className="h-4 w-px bg-border/20 mx-2" />
						<PremiumButton
							variant="ghost"
							className="h-10 px-6 text-[9px]"
							disabled={currentPage === totalPages || totalPages === 0}
							onClick={() => setCurrentPage(currentPage + 1)}
						>
							Next Page
						</PremiumButton>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
