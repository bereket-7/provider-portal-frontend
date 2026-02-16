import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	currentUser: {
		token: "",
		user: {
			id: 0,
			provider: 0,
			email: "",
			phone_number: null,
			first_name: "",
			middle_name: null,
			last_name: "",
			date_of_birth: null,
			gender: null,
			date_joined: "",
			last_login: "",
			is_active: false,
			role: "",
			avatar_url: "",
		},
	},
};

const currentUserSlice = createSlice({
	name: "currentUser",
	initialState,
	reducers: {
		SetCurrentUser: (state, action) => {
			state.currentUser = action.payload;
		},
		ClearCurrentUser: (state) => {
			state.currentUser = initialState.currentUser; // Resets to initial state
		},
	},
});

export const { SetCurrentUser, ClearCurrentUser } = currentUserSlice.actions;
export default currentUserSlice.reducer;
