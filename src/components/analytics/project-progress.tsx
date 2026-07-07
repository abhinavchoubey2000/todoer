import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ProjectProgressCard from "./project-progress-card";
import { COLORS } from "@/constants/colors";

interface AllProjectsProgressType extends ProjectType {
	totalTasks: number;
	completedTasks: number;
	pendingTasks: number;
	completionPercentage: number;
}
const ProjectProgress = ({
	projects,
}: {
	projects: AllProjectsProgressType[];
}) => {
	if (projects.length === 0) {
		return null;
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Project Progress</Text>

			{projects.map((project) => (
				<ProjectProgressCard key={project.projectId} project={project} />
			))}
		</View>
	);
};

export default React.memo(ProjectProgress);

const styles = StyleSheet.create({
	container: {
		marginTop: 20,
	},
	title: {
		fontSize: 22,
		fontFamily: "sans-serif-medium",
		color: COLORS.textPrimary,
		marginBottom: 10,
	},
});
