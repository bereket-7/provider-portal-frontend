"use client";

import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/storehooks";
import { updateSettings } from "@/lib/store/redux/settingsSlice";

export function FontSwitcher() {
	const dispatch = useAppDispatch();
	const currentFont = useAppSelector((state) => state.settings.fontFamily);

	const toggleFont = () => {
		dispatch(
			updateSettings({
				fontFamily: currentFont === "geist" ? "poppins" : "geist",
			})
		);
	};

	return (
		<Button onClick={toggleFont}>
			Switch to {currentFont === "geist" ? "Poppins" : "Geist"}
		</Button>
	);
}
