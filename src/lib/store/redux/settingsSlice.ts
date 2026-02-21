import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export type FontSize = "small" | "medium" | "large";
export type ThemeMode = "light" | "dark" | "system";

interface SettingsState {
	fontSize: FontSize;
	theme: ThemeMode;
	fontFamily: "geist" | "poppins";
}

const getInitialState = (): SettingsState => {
	if (typeof window !== "undefined") {
		const savedSettings = localStorage.getItem("userSettings");
		if (savedSettings) {
			try {
				const parsed = JSON.parse(savedSettings);
				return {
					fontSize: parsed.fontSize || "medium",
					theme: parsed.theme || "system",
					fontFamily: parsed.fontFamily || "geist",
				};
			} catch (e) {
				// eslint-disable-next-line no-console
				console.error("Failed to parse settings from localStorage", e);
			}
		}
	}

	return {
		fontSize: "medium",
		theme: "system",
		fontFamily: "geist",
	};
};

const settingsSlice = createSlice({
	name: "settings",
	initialState: getInitialState(),
	reducers: {
		updateSettings: (state, action: PayloadAction<Partial<SettingsState>>) => {
			const newState = { ...state, ...action.payload };
			if (typeof window !== "undefined") {
				localStorage.setItem("userSettings", JSON.stringify(newState));
			}
			return newState;
		},
	},
});

export const { updateSettings } = settingsSlice.actions;
export default settingsSlice.reducer;
