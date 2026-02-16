import Link from "next/link";
import { Suspense } from "react";

import { ArrowRight, Github, Linkedin, Twitter } from "lucide-react";
import { useTranslations } from "next-intl";

import LocaleSwitcher from "@/components/shared/DropDown/LocaleSwitcher";
import { ModeToggle } from "@/components/shared/DropDown/modeToggle";
import { ErrorBoundaryWrapper } from "@/components/shared/Error/error-boundary";
import Loader from "@/components/shared/loader/Loader";
import Logo from "@/components/shared/logo/Logo";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/constants/siteconfig";

type Features = {
	authentication: {
		enabled: boolean;
		providers: string[];
	};
	i18n: {
		defaultLocale: string;
		locales: string[];
	};
	themes: {
		default: string;
		themes: string[];
	};
};

export default function Home() {
	const t = useTranslations("HomePage");

	const renderFeatureContent = (key: keyof Features, value: unknown) => {
		if (typeof value === "object" && value !== null) {
			let auth: Features["authentication"];
			let i18n: Features["i18n"];
			let themes: Features["themes"];

			switch (key) {
				case "authentication":
					auth = value as Features["authentication"];
					return auth.enabled
						? `Supports ${auth.providers.join(", ")}`
						: "Disabled";
				case "i18n":
					i18n = value as Features["i18n"];
					return `Supports ${i18n.locales.join(", ")}`;
				case "themes":
					themes = value as Features["themes"];
					return `Supports ${themes.themes.join(", ")}`;
			}
		}
		return "Enabled";
	};

	return (
		<ErrorBoundaryWrapper>
			<Suspense fallback={<Loader />}>
				<div className="min-h-screen bg-gradient-to-b from-muted/50 to-background">
					<div className="flex items-center">
						<ModeToggle />
						<LocaleSwitcher />
					</div>
					<div className="container mx-auto px-4 py-16">
						{/* Hero Section */}
						<div className="mb-16 text-center">
							<div className="mx-auto mb-8 flex justify-center">
								<Logo />
							</div>
							<h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
								{t("title")}
							</h1>
							<p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
								{siteConfig.description}
							</p>
							<div className="flex justify-center gap-4">
								<Button asChild>
									<Link href={siteConfig.links.docs}>
										Get Started <ArrowRight className="ml-2 h-4 w-4" />
									</Link>
								</Button>
								<Button variant="outline" asChild>
									<Link href={siteConfig.links.github}>
										<Github className="mr-2 h-4 w-4" /> GitHub
									</Link>
								</Button>
							</div>
						</div>

						{/* Features Grid */}
						<div className="mb-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
							{(
								Object.entries(siteConfig.features) as [
									keyof Features,
									unknown,
								][]
							).map(([key, value]) => (
								<div key={key} className="rounded-lg border bg-card p-6">
									<h3 className="mb-2 text-xl font-semibold capitalize">
										{key.replace(/([A-Z])/g, " $1").trim()}
									</h3>
									<p className="text-sm text-muted-foreground">
										{renderFeatureContent(key, value)}
									</p>
								</div>
							))}
						</div>

						{/* Remove Tech Stack section since it's not in siteConfig */}

						{/* Social Links */}
						<div className="flex justify-center space-x-6">
							<Link
								href={siteConfig.social.github}
								className="text-muted-foreground hover:text-foreground"
							>
								<Github className="h-6 w-6" />
							</Link>
							<Link
								href={siteConfig.social.twitter}
								className="text-muted-foreground hover:text-foreground"
							>
								<Twitter className="h-6 w-6" />
							</Link>
							<Link
								href={siteConfig.social.linkedin}
								className="text-muted-foreground hover:text-foreground"
							>
								<Linkedin className="h-6 w-6" />
							</Link>
						</div>
					</div>
				</div>
			</Suspense>
		</ErrorBoundaryWrapper>
	);
}
