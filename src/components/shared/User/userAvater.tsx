"use client";

import { LogOut, User } from "lucide-react";

// import { useLogout } from "@/_service/query/auth-query/authQuery";
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
import { useAppSelector } from "@/hooks/storehooks";
import { getInitials } from "@/lib/utils/nameUtils";

interface UserAvatarProps {
	className?: string;
}

const UserAvatar = ({ className }: UserAvatarProps) => {
	const { user, token } = useAppSelector(
		(state) => state.currentUser.currentUser
	);
	const fullName = user ? `${user.first_name} ${user.last_name}`.trim() : "";
	// const { mutate: signOut } = useLogout();

	if (!token) return null;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className="relative h-10 w-10 rounded-full border border-gray-200 hover:bg-gray-100/50 transition-colors"
				>
					{user?.first_name && user?.last_name ? (
						<Avatar className="h-9 w-9">
							<AvatarImage src={user?.avatar_url} alt={fullName} />
							<AvatarFallback className="bg-primary/10 ">
								{getInitials(fullName)}
							</AvatarFallback>
						</Avatar>
					) : (
						<User className="h-5 w-5 text-gray-600" />
					)}
					<span className="sr-only">Open user menu</span>
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent align="end" className="w-56">
				<DropdownMenuLabel className="font-normal">
					<div className="flex flex-col space-y-1">
						<p className="text-sm font-medium leading-none">{fullName}</p>
						<p className="text-xs leading-none text-gray-500">{user?.email}</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					className="cursor-pointer text-red-600 flex items-center gap-2"
					onClick={() => {}}
				>
					<LogOut className="h-4 w-4" />
					Log out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default UserAvatar;
