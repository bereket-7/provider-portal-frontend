import { type SidebarNavItem } from "@/types/UI/system.types";

export const siteConfig = {
	name: "Toorax",
	description:
		"Modern Web Development Boilerplate with Next.js, TypeScript, and Tailwind CSS",
	version: "0.0.1",
	appPublisher: "KABA Software Development",
	author: {
		name: "Kalab Amssalu",
		email: "kalishdesandy@gmail.com",
		url: "https://github.com/kalabAmssalu",
	},
	url: process.env.NEXT_PUBLIC_URL || "http://localhost:3000",
	ogImage: "/og.jpg",
	links: {
		github: "https://github.com/kalabAmssalu",
		docs: "/docs",
		twitter: "@kalabAmssalu",
	},
	mainNav: [
		{
			title: "Home",
			href: "/",
		},
		{
			title: "Documentation",
			href: "/docs",
		},
		{
			title: "Components",
			href: "/components",
		},
		{
			title: "Examples",
			href: "/examples",
		},
	],
	sidebarNav: [
		{
			title: "Getting Started",
			href: "/docs/getting-started", // Add href for parent items
			items: [
				{
					title: "Introduction",
					href: "/docs/introduction",
					items: [],
				},
				{
					title: "Installation",
					href: "/docs/installation",
					items: [],
				},
			],
		},
		{
			title: "Components",
			href: "/docs/components", // Add href for parent items
			items: [
				{
					title: "UI Components",
					href: "/docs/components/ui",
					items: [],
				},
				{
					title: "Form Elements",
					href: "/docs/components/form",
					items: [],
				},
			],
		},
	] as SidebarNavItem[],
	settings: {
		themeToggle: true,
		languageSelector: true,
		authEnabled: true,
		searchEnabled: true,
	},
	features: {
		authentication: {
			enabled: true,
			providers: ["credentials", "google", "github"],
		},
		i18n: {
			defaultLocale: "en",
			locales: ["en", "am"],
		},
		themes: {
			default: "system",
			themes: ["light", "dark", "system"],
		},
		techStack: {
			framework: "Next.js",
			language: "TypeScript",
			styling: "Tailwind CSS",
			components: "Shadcn UI",
			stateManagement: "Redux Toolkit",
			api: "REST/GraphQL Ready",
			testing: "Jest & React Testing Library",
		},
	},
	api: {
		baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
		timeout: 10000,
		retryAttempts: 3,
	},
	analytics: {
		googleAnalytics: process.env.NEXT_PUBLIC_GA_ID,
		microsoftClarity: process.env.NEXT_PUBLIC_CLARITY_ID,
	},
	security: {
		csrfEnabled: true,
		rateLimit: {
			enabled: true,
			maxRequests: 100,
			windowMs: 60000,
		},
	},
	seo: {
		titleTemplate: "%s | Toorax",
		defaultTitle: "Toorax - Modern Web Development Boilerplate",
		robotsEnabled: process.env.NODE_ENV === "production",
	},
	layout: {
		maxWidth: "1440px",
		navigationHeight: "64px",
		sidebarWidth: "240px",
		footerHeight: "64px",
	},
	social: {
		github: "https://github.com/kalabAmssalu",
		twitter: "https://twitter.com/kalabAmssalu",
		linkedin: "https://linkedin.com/in/kalabAmssalu",
	},
	support: {
		email: "kalishdesandy@gmail.com",
		documentation: "/docs",
		issues: "https://github.com/kalabAmssalu/issues",
	},
};

export type SiteConfig = typeof siteConfig;
