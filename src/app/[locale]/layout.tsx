import { Geist, Poppins } from "next/font/google";
import { notFound } from "next/navigation";

import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { Toaster } from "sonner";

import { routing } from "@/i18n/routing";
import StoreProvider from "@/providers/Store-provider";
import { AnalyticsProvider } from "@/providers/analytics-provider";
import { EnvCheckerProvider } from "@/providers/env-checker-provider";
import { NetworkProvider } from "@/providers/network-provider";
import QueryProviders from "@/providers/query-provider";
import { SettingsProvider } from "@/providers/settings-provider";

const geistSans = Geist({
	variable: "--font-geist",
	subsets: ["latin"],
});

const poppins = Poppins({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	variable: "--font-poppins",
});

export default async function LocaleLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	if (!hasLocale(routing.locales, locale)) {
		notFound();
	}
	const messages = await getMessages();

	return (
		<html lang={locale} suppressHydrationWarning>
			<head>
				<link
					rel="icon"
					href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>⚙️</text></svg>"
				/>
			</head>
			<body
				className={`${geistSans.variable} ${poppins.variable} font-sans antialiased`}
				suppressHydrationWarning
			>
				<EnvCheckerProvider>
					<NetworkProvider>
						<QueryProviders>
							<StoreProvider>
								<SettingsProvider>
									<AnalyticsProvider>
										<NextIntlClientProvider messages={messages}>
											{children}
											<Toaster position="bottom-right" />
										</NextIntlClientProvider>
									</AnalyticsProvider>
								</SettingsProvider>
							</StoreProvider>
						</QueryProviders>
					</NetworkProvider>
				</EnvCheckerProvider>
			</body>
		</html>
	);
}
