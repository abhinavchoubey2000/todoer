interface ProjectAnalytics {
	projectId: string;
	tasksCreated: number;
	tasksCompleted: number;
	tasksDeleted: number;
}

interface AnalyticsState {
	totalProjectsCreated: number;
	totalProjectsDeleted: number;

	totalSectionsCreated: number;
	totalSectionsDeleted: number;

	totalTasksCreated: number;
	totalTasksCompleted: number;
	totalTasksDeleted: number;

	projectAnalytics: Record<string, ProjectAnalytics>;
}
