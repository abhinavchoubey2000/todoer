import { COLORS } from "@/constants/colors";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";

type CompletionProgressProps = {
	completedTasks: number;
	pendingTasks: number;
	completionPercentage: number;
};

const CompletionProgress = ({
	completedTasks,
	pendingTasks,
	completionPercentage,
}: CompletionProgressProps) => {
	const data = [
		{
			value: completedTasks,
			color: COLORS.success,
		},
		{
			value: pendingTasks,
			color: COLORS.warning,
		},
	];

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Completion Progress</Text>

			<View style={styles.content}>
				<PieChart
					donut
					radius={75}
					innerRadius={52}
					data={data}
					showText
					textColor={COLORS.textPrimary}
					innerCircleColor={"#1C1C1E"}
					textSize={24}
					centerLabelComponent={() => (
						<View style={styles.centerContainer}>
							<Text style={styles.percentage}>{completionPercentage}%</Text>

							<Text style={styles.completed}>Completed</Text>
						</View>
					)}
				/>

				<View style={styles.legend}>
					<Legend
						color={COLORS.success}
						title="Completed"
						value={completedTasks}
					/>

					<Legend color={COLORS.warning} title="Pending" value={pendingTasks} />
				</View>
			</View>
		</View>
	);
};

export default CompletionProgress;

const Legend = ({
	color,
	title,
	value,
}: {
	color: string;
	title: string;
	value: number;
}) => (
	<View style={styles.legendRow}>
		<View style={[styles.colorIndicator, { backgroundColor: color }]} />

		<Text style={styles.legendTitle}>{title}</Text>

		<Text style={styles.legendValue}>{value}</Text>
	</View>
);

const styles = StyleSheet.create({
	container: {
		backgroundColor: COLORS.surface,
		padding: 20,
		borderRadius: 20,
		borderWidth: 1,
		borderColor: COLORS.border,
		marginTop: 20,
	},

	title: {
		color: COLORS.textPrimary,
		fontSize: 18,
		fontFamily: "sans-serif-medium",
		marginBottom: 20,
	},

	content: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},

	centerContainer: {
		alignItems: "center",
		
	},

	percentage: {
		fontSize: 24,
		fontFamily: "sans-serif-medium",
		color: COLORS.textPrimary,
	},

	completed: {
		fontSize: 12,
		color: COLORS.textSecondary,
		marginTop: 2,
	},

	legend: {
		flex: 1,
		marginLeft: 20,
		gap: 20,
	},

	legendRow: {
		flexDirection: "row",
		alignItems: "center",
	},

	colorIndicator: {
		width: 12,
		height: 12,
		borderRadius: 6,
		marginRight: 10,
	},

	legendTitle: {
		flex: 1,
		color: COLORS.textSecondary,
		fontSize: 15,
	},

	legendValue: {
		color: COLORS.textPrimary,
		fontSize: 18,
		fontFamily: "sans-serif-medium",
	},
});
