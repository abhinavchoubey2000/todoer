interface MostActiveProjectType extends ProjectType {
	totalTasks: number;
	completedTasks: number;
	pendingTasks: number;
	completionPercentage: number;
}
interface AllProjectsProgressType extends ProjectType {
	totalTasks: number;
	completedTasks: number;
	pendingTasks: number;
	completionPercentage: number;
}

interface ProjectAnalyticsType {
	projectId: string;
	tasksCreated: number;
	tasksCompleted: number;
}

export const getTotalProjects = (projects: ProjectType[]) => {
	return projects.length;
};

export const getTotalSections = (projects: ProjectType[]) => {
	const totalSections = projects.reduce(
		(total, project) => total + project.sections.length,
		0,
	);
	return totalSections;
};

export const getTotalTasks = (projects: ProjectType[]) => {
	let totalTasks = 0;
	for (const project of projects) {
		for (const section of project.sections) {
			totalTasks += section.tasks.length;
		}
	}
	return totalTasks;
};



export const getCompletedTasks = (completedTasks: number) => {
	return completedTasks;
};

export const getPendingTasks = (projects: ProjectType[]) => {
	let totalPendingTasks = 0;
	for (const project of projects) {
		for (const section of project.sections) {
			for (const task of section.tasks) {
				if (!task.completed) {
					totalPendingTasks++;
				}
			}
		}
	}
	return totalPendingTasks;
};


export const getCompletionPercentage = (
	totalTasksCreated: number,
	totalCompletedTasks: number,
) => {
	if (totalTasksCreated === 0) {
		return 0;
	}
	return Number(((totalCompletedTasks / totalTasksCreated) * 100).toFixed(2));
};

export const getTasksByPriority = (projects: ProjectType[]) => {
	const tasksByPriority: { low: number; medium: number; high: number } = {
		low: 0,
		medium: 0,
		high: 0,
	};

	for (const project of projects) {
		for (const section of project.sections) {
			for (const task of section.tasks) {
				tasksByPriority[task.priority.name]++;
			}
		}
	}

	return tasksByPriority;
};

// export const getMostActiveProject = (projects: ProjectType[]) => {
// 	if (projects.length === 0) {
// 		return null;
// 	}

// 	let mostActiveProject: MostActiveProjectType | null = null;
// 	let maxTasks = 0;

// 	for (const project of projects) {
// 		let totalTasks = 0;
// 		let completedTasks = 0;

// 		for (const section of project.sections) {
// 			totalTasks += section.tasks.length;

// 			for (const task of section.tasks) {
// 				if (task.completed) {
// 					completedTasks++;
// 				}
// 			}
// 		}

// 		if (totalTasks > maxTasks) {
// 			maxTasks = totalTasks;

// 			mostActiveProject = {
// 				...project,
// 				totalTasks,
// 				completedTasks,
// 				pendingTasks: totalTasks - completedTasks,
// 				completionPercentage:
// 					totalTasks === 0
// 						? 0
// 						: Number(((completedTasks / totalTasks) * 100).toFixed(1)),
// 			};
// 		}
// 	}

// 	return mostActiveProject;
//};
export const getMostActiveProject = (
	projects: ProjectType[],
	projectAnalytics: Record<string, ProjectAnalyticsType>,
) => {
	let mostActiveProject: MostActiveProjectType | null = null;

	for (const project of projects) {
		const analytics = projectAnalytics[project.projectId];

		if (!analytics) continue;

		if (
			!mostActiveProject ||
			analytics.tasksCreated > mostActiveProject.totalTasks
		) {
			mostActiveProject = {
				...project,
				totalTasks: analytics.tasksCreated,
				completedTasks: analytics.tasksCompleted,
				pendingTasks: analytics.tasksCreated - analytics.tasksCompleted,
				completionPercentage:
					analytics.tasksCreated === 0
						? 0
						: Number(
								(
									(analytics.tasksCompleted / analytics.tasksCreated) *
									100
								).toFixed(1),
							),
			};
		}
	}

	return mostActiveProject;
};
// export const getAllProjectsProgress = (projects: ProjectType[]) => {
// 	const allProjectProgress: AllProjectsProgressType[] = [];

// 	for (const project of projects) {
// 		let totalTasks = 0;
// 		let completedTasks = 0;
// 		for (const section of project.sections) {
// 			totalTasks += section.tasks.length;
// 			for (const task of section.tasks) {
// 				if (task.completed) {
// 					completedTasks++;
// 				}
// 			}
// 		}

// 		allProjectProgress.push({
// 			...project,
// 			totalTasks,
// 			completedTasks,
// 			pendingTasks: totalTasks - completedTasks,
// 			completionPercentage: Number(
// 				(totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100).toFixed(1),
// 			),
// 		});
// 	}

// 	return allProjectProgress;
// };

export const getAllProjectsProgress = (
	projects: ProjectType[],
	projectAnalytics: Record<string, ProjectAnalyticsType>,
) => {
	const allProjectProgress: AllProjectsProgressType[] = [];

	for (const project of projects) {
		const analytics = projectAnalytics[project.projectId];

		const totalTasks = analytics?.tasksCreated ?? 0;
		const completedTasks = analytics?.tasksCompleted ?? 0;

		allProjectProgress.push({
			...project,
			totalTasks,
			completedTasks,
			pendingTasks: totalTasks - completedTasks,
			completionPercentage:
				totalTasks === 0
					? 0
					: Number(((completedTasks / totalTasks) * 100).toFixed(1)),
		});
	}

	return allProjectProgress;
};
