import { RootState } from "@/redux/store";
import {
	getAllProjectsProgress,
	getCompletedTasks,
	getCompletionPercentage,
	getMostActiveProject,
	getPendingTasks,
	getTasksByPriority,
	getTotalProjects,
	getTotalSections,
	getTotalTasks,
} from "@/utlis/analytics";
import { useMemo } from "react";
import { useSelector } from "react-redux";

const useAnalytics = () => {
	const { projects } = useSelector((state: RootState) => state.Project);
	const { totalTasksCompleted, totalTasksCreated, projectAnalytics } =
		useSelector((state: RootState) => state.Analytics);

	return useMemo(
		() => ({
			totalProjects: getTotalProjects(projects),
			totalSections: getTotalSections(projects),
			totalTasks: getTotalTasks(projects),
			completedTasks: getCompletedTasks(totalTasksCompleted),
			pendingTasks: getPendingTasks(projects),
			tasksByPriority: getTasksByPriority(projects),
			completionPercentage: getCompletionPercentage(
				totalTasksCreated,
				totalTasksCompleted,
			),
			mostActiveProject: getMostActiveProject(projects, projectAnalytics),
			allProjectsProgress: getAllProjectsProgress(projects, projectAnalytics),
		}),
		[projects, totalTasksCompleted, totalTasksCreated, projectAnalytics],
	);
};

export default useAnalytics;
