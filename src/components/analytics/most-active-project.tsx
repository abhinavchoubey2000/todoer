import { COLORS } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface MostActiveProjectType extends ProjectType {
	totalTasks: number;
	completedTasks: number;
	pendingTasks: number;
	completionPercentage: number;
}

type MostActiveProjectProps = {
	project: MostActiveProjectType | null;
};

const MostActiveProject = ({ project }: MostActiveProjectProps) => {
	if (!project) {
		return null;
	}

	return (
		<View style={styles.container}>
			<Text style={styles.heading}>Most Active Project</Text>

			<View style={styles.header}>
				<View style={styles.projectInfo}>
					<View
						style={[
							styles.iconContainer,
							{ backgroundColor: project.theme.color.surface },
						]}
					>
						<Ionicons
							name={project.icon.name}
							size={28}
							color={project.theme.color.icon}
						/>
					</View>

					<View>
						<Text style={styles.title}>{project.projectTitle}</Text>

						{project.projectDescription ? (
							<Text style={styles.description}>
								{project.projectDescription}
							</Text>
						) : null}
					</View>
				</View>
			</View>

			<View style={styles.statsContainer}>
				<StatItem label="Total Tasks" value={project.totalTasks} />
				<StatItem label="Completed Tasks" value={project.completedTasks} />
				<StatItem label="Pending Tasks" value={project.pendingTasks} />
			</View>

			<View style={styles.progressBackground}>
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

			<Text style={styles.progressText}>
				{project.completionPercentage}% Completed
			</Text>
		</View>
	);
};

export default React.memo(MostActiveProject);

const StatItem = ({ label, value }: { label: string; value: number }) => (
	<View style={styles.stat}>
		<Text style={styles.statValue}>{value}</Text>
		<Text style={styles.statLabel}>{label}</Text>
	</View>
);

const styles = StyleSheet.create({
	container: {
		backgroundColor: COLORS.surface,
		borderRadius: 20,
		padding: 20,
		borderWidth: 1,
		borderColor: COLORS.border,
		marginTop: 20,
	},

	heading: {
		fontSize: 18,
		fontFamily: "sans-serif-medium",
		color: COLORS.textPrimary,
		marginBottom: 20,
	},

	header: {
		marginBottom: 20,
	},

	projectInfo: {
		flexDirection: "row",
		alignItems: "center",
		gap: 15,
	},

	iconContainer: {
		width: 55,
		height: 55,
		borderRadius: 15,
		justifyContent: "center",
		alignItems: "center",
	},

	title: {
		fontSize: 18,
		fontFamily: "sans-serif-medium",
		color: COLORS.textPrimary,
	},

	description: {
		fontSize: 13,
		color: COLORS.textSecondary,
		marginTop: 4,
	},

	statsContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 20,
	},

	stat: {
		alignItems: "center",
		justifyContent: "center",
		flex: 1,
	},

	statValue: {
		fontSize: 24,
		fontFamily: "sans-serif-medium",
		color: COLORS.textPrimary,
	},

	statLabel: {
		fontSize: 12,
		color: COLORS.textSecondary,
		marginTop: 4,
		width: 100,
		textAlign:"center"
	},

	progressBackground: {
		height: 10,
		backgroundColor: COLORS.border,
		borderRadius: 999,
		overflow: "hidden",
	},

	progressFill: {
		height: "100%",
		borderRadius: 999,
	},

	progressText: {
		marginTop: 10,
		textAlign: "right",
		color: COLORS.textSecondary,
		fontSize: 13,
	},
});
