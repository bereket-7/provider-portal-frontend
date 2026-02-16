"use client";

import { AlertCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { type FallbackProps } from "react-error-boundary";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
	const t = useTranslations("Error");

	return (
		<div className="flex min-h-[400px] items-center justify-center p-4">
			<Card className="w-full max-w-md">
				<CardHeader>
					<div className="flex items-center gap-2">
						<AlertCircle className="h-6 w-6 text-destructive" />
						<CardTitle>{t("somethingWentWrong")}</CardTitle>
					</div>
					<CardDescription>{t("errorDescription")}</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="rounded-md bg-muted/50 p-4">
						<code className="text-sm text-muted-foreground">
							{error.message || t("unknownError")}
						</code>
					</div>
				</CardContent>
				<CardFooter>
					<Button onClick={resetErrorBoundary} className="w-full">
						{t("tryAgain")}
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
