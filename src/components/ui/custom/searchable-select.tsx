"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

interface SearchableSelectProps {
	options: { value: string; label: string }[];
	onSelect: (value: string) => void;
	onSearchChange?: (search: string) => void;
	placeholder?: string;
	emptyText?: string;
	className?: string;
	value?: string;
}

export function SearchableSelect({
	options,
	onSelect,
	onSearchChange,
	placeholder = "Search...",
	emptyText = "No results found.",
	className,
	value,
}: SearchableSelectProps) {
	const [open, setOpen] = React.useState(false);

	const selectedLabel = React.useMemo(() => {
		return options.find((opt) => opt.value === value)?.label || placeholder;
	}, [options, value, placeholder]);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className={cn(
						"w-full justify-between bg-primary/5 border-border/40 hover:bg-primary/10 rounded-xl px-4 py-3 h-auto text-sm font-bold transition-all",
						className
					)}
				>
					{selectedLabel}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-full p-0 border-border/40 rounded-xl overflow-hidden shadow-2xl">
				<Command shouldFilter={!onSearchChange}>
					<CommandInput 
						placeholder={placeholder} 
						onValueChange={onSearchChange}
						className="h-11 border-none focus:ring-0"
					/>
					<CommandList className="max-h-[250px]">
						<CommandEmpty className="py-6 text-center text-xs font-bold text-muted-foreground">
							{emptyText}
						</CommandEmpty>
						<CommandGroup>
							{options.map((option) => (
								<CommandItem
									key={option.value}
									value={option.value}
									onSelect={(currentValue) => {
										onSelect(currentValue);
										setOpen(false);
									}}
									className="px-4 py-3 text-xs font-bold flex items-center justify-between cursor-pointer hover:bg-primary/5 transition-colors"
								>
									{option.label}
									<Check
										className={cn(
											"ml-2 h-4 w-4 text-primary",
											value === option.value ? "opacity-100" : "opacity-0"
										)}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
