"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type UserRole = "claim-officer" | "financial-officer";

interface UserRoleContextType {
	role: UserRole | null;
	isInitialized: boolean;
	isClaimManagement: boolean;
	isFinance: boolean;
	login: (role: UserRole) => void;
	logout: () => void;
}

const UserRoleContext = createContext<UserRoleContextType | undefined>(
	undefined
);

export function UserRoleProvider({ children }: { children: React.ReactNode }) {
	const [role, setRole] = useState<UserRole | null>(null);
	const [isInitialized, setIsInitialized] = useState(false);

	useEffect(() => {
		const savedRole = localStorage.getItem("user-role") as UserRole | null;
		if (savedRole) {
			setRole(savedRole);
		}
		setIsInitialized(true);
	}, []);

	const login = (newRole: UserRole) => {
		setRole(newRole);
		localStorage.setItem("user-role", newRole);
	};

	const logout = () => {
		setRole(null);
		localStorage.removeItem("user-role");
	};

	const isClaimManagement = role === "claim-officer";
	const isFinance = role === "financial-officer";

	// Avoid flash of login page if role is being loaded - handled by children

	return (
		<UserRoleContext.Provider
			value={{
				role,
				isInitialized,
				isClaimManagement,
				isFinance,
				login,
				logout,
			}}
		>
			{children}
		</UserRoleContext.Provider>
	);
}

export function useUserRole() {
	const context = useContext(UserRoleContext);
	if (context === undefined) {
		throw new Error("useUserRole must be used within a UserRoleProvider");
	}
	return context;
}
