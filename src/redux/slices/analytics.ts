import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: AnalyticsState = {
	totalProjectsCreated: 0,
	totalProjectsDeleted: 0,

	totalSectionsCreated: 0,
	totalSectionsDeleted: 0,

	totalTasksCreated: 0,
	totalTasksCompleted: 0,
	totalTasksDeleted: 0,

	projectAnalytics: {},
};

export const analyticsSlice = createSlice({
	name: "analytics",
	initialState,
	reducers: {
		projectCreated(state, action: PayloadAction<{ projectId: string }>) {
			state.totalProjectsCreated++;

			state.projectAnalytics[action.payload.projectId] = {
				projectId: action.payload.projectId,
				tasksCreated: 0,
				tasksCompleted: 0,
				tasksDeleted: 0,
			};
		},

		projectDeleted(state, action: PayloadAction<{ projectId: string }>) {
			state.totalProjectsDeleted++;
			delete state.projectAnalytics[action.payload.projectId];
		},

		sectionCreated(state) {
			state.totalSectionsCreated++;
		},

		sectionDeleted(state) {
			state.totalSectionsDeleted++;
		},

		taskCreated(state, action: PayloadAction<{ projectId: string }>) {
			state.totalTasksCreated++;

			if (state.projectAnalytics[action.payload.projectId]) {
				state.projectAnalytics[action.payload.projectId].tasksCreated++;
			}
		},

		taskCompleted(state, action: PayloadAction<{ projectId: string }>) {
			state.totalTasksCompleted++;
			if (state.projectAnalytics[action.payload.projectId]) {
				state.projectAnalytics[action.payload.projectId].tasksCompleted++;
			}
		},
		taskUnCompleted(state, action: PayloadAction<{ projectId: string }>) {
			state.totalTasksCompleted--;
			if (state.projectAnalytics[action.payload.projectId]) {
				state.projectAnalytics[action.payload.projectId].tasksCompleted--;
			}
		},

		taskDeleted(state, action: PayloadAction<{ projectId: string }>) {
			state.totalTasksDeleted++;

			if (state.projectAnalytics[action.payload.projectId]) {
				state.projectAnalytics[action.payload.projectId].tasksDeleted++;
			}
		},

		clearAnalytics() {
			return initialState;
		},
		backupCompletedTasks(state, action: PayloadAction<number>) {
			state.totalTasksCompleted = action.payload;
		},
	},
});

export const {
	projectCreated, //Done
	projectDeleted, //Done

	sectionCreated, //Done
	sectionDeleted, //Done

	taskCreated, //Done
	taskCompleted, //Done
	taskUnCompleted, // Done
	taskDeleted, //Done
	backupCompletedTasks,

	clearAnalytics,
} = analyticsSlice.actions;
