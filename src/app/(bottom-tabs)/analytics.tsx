import CompletionProgress from "@/components/analytics/completion-progress";
import MostActiveProject from "@/components/analytics/most-active-project";
import Overview from "@/components/analytics/overview";
import ProjectProgress from "@/components/analytics/project-progress";
import TasksByPriority from "@/components/analytics/tasks-by-priority";
import { COLORS } from "@/constants/colors";
import useAnalytics from "@/hooks/useAnalytics";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";

const AnalyticsScreen = () => {
	const {
		totalProjects,
		totalSections,
		completedTasks,
		completionPercentage,
		pendingTasks,
		tasksByPriority,
		mostActiveProject,
		allProjectsProgress,
	} = useAnalytics();
	return (
		<>
			<ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
				<Overview
					totalProjects={totalProjects}
					totalSections={totalSections}
					totalTasks={pendingTasks}
					completedTasks={completedTasks}
				/>

				<CompletionProgress
					completionPercentage={completionPercentage}
					completedTasks={completedTasks}
					pendingTasks={pendingTasks}
				/>

				<TasksByPriority tasksByPriority={tasksByPriority} />

				<MostActiveProject project={mostActiveProject} />

				<ProjectProgress projects={allProjectsProgress} />
			</ScrollView>
		</>
	);
};

export default AnalyticsScreen;

const styles = StyleSheet.create({
	container: {
		backgroundColor: COLORS.background,
		color: COLORS.textPrimary,
		paddingHorizontal: 8,
		paddingVertical: 10,
		
	},
});
