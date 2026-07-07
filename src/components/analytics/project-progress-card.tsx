import { COLORS } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface AllProjectsProgressType extends ProjectType {
	totalTasks: number;
	completedTasks: number;
	pendingTasks: number;
	completionPercentage: number;
}

const ProjectProgressCard = ({
	project,
}: {
	project: AllProjectsProgressType;
}) => {
	return (
		<View style={styles.card}>
			<View style={styles.header}>
				<View style={styles.left}>
					<Ionicons
						name={project.icon.name}
						size={28}
						color={project.theme.color.icon}
					/>

					<Text style={styles.title}>{project.projectTitle}</Text>
				</View>

				<Text style={styles.percent}>{project.completionPercentage}%</Text>
			</View>

			<View style={styles.progressTrack}>
				<View
					style={[
						styles.progressFill,
						{
							width: `${project.completionPercentage}%`,
							backgroundColor: project.theme.color.icon,
						},
					]}
				/>
			</View>

			<View style={styles.footer}>
				<Text style={styles.info}>Completed: {project.completedTasks}</Text>

				<Text style={styles.info}>Pending: {project.pendingTasks}</Text>
			</View>
		</View>
	);
};

export default React.memo(ProjectProgressCard);

const styles = StyleSheet.create({
	card: {
		backgroundColor: COLORS.surface,
		borderRadius: 18,
		padding: 16,
		marginBottom: 10,
		borderWidth: 1,
		borderColor: COLORS.border,
	},

	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},

	left: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},

	title: {
		fontSize: 18,
		fontFamily: "sans-serif-medium",
		color: COLORS.textPrimary,
	},

	percent: {
		fontSize: 18,
		fontFamily: "sans-serif-medium",
		color: COLORS.textPrimary,
	},

	progressTrack: {
		marginTop: 15,
		height: 8,
		backgroundColor: COLORS.border,
		borderRadius: 999,
		overflow: "hidden",
	},

	progressFill: {
		height: "100%",
		borderRadius: 999,
	},

	footer: {
		marginTop: 12,
		flexDirection: "row",
		justifyContent: "space-between",
	},

	info: {
		color: COLORS.textSecondary,
		fontSize: 13,
	},
});
