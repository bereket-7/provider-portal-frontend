export interface SidebarNavItem {
	title: string;
	href?: string; // Make href optional
	items?: SidebarNavItem[];
}
