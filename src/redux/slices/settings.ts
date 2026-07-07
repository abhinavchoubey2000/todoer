import { createSlice } from "@reduxjs/toolkit";

const initialState: InitialSettingsStateInterface = {
	deleteTaskOnComplete: false,
	lastSeenUpdateVersion: "",
};

export const settingsSlice = createSlice({
	name: "settingsSlice",
	initialState,
	reducers: {
		toggleDeleteTaskOnComplete(state) {
			state.deleteTaskOnComplete = !state.deleteTaskOnComplete;
		},
		setLastSeenUpdateVersion(state, action) {
			state.lastSeenUpdateVersion = action.payload;
		},
	},
});

export const { toggleDeleteTaskOnComplete, setLastSeenUpdateVersion } =
	settingsSlice.actions;
