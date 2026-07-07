import { COLORS } from "@/constants/colors";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";

type TasksByPriorityProps = {
	tasksByPriority: {
		low: number;
		medium: number;
		high: number;
	};
};

const TasksByPriority = ({ tasksByPriority }: TasksByPriorityProps) => {
	const data = [
		{
			value: tasksByPriority.low,
			color: COLORS.lowPriority,
		},
		{
			value: tasksByPriority.medium,
			color: COLORS.mediumPriority,
		},
		{
			value: tasksByPriority.high,
			color: COLORS.highPriority,
		},
	];

	const totalTasks =
		tasksByPriority.low + tasksByPriority.medium + tasksByPriority.high;

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Tasks by Priority</Text>

			<View style={styles.content}>
				<PieChart
					donut
					data={data}
					radius={80}
					innerRadius={55}
					innerCircleColor={COLORS.surface}
					isAnimated
					showGradient
					centerLabelComponent={() => (
						<View style={styles.centerContainer}>
							<Text style={styles.total}>{totalTasks}</Text>

							<Text style={styles.subtitle}>Tasks</Text>
						</View>
					)}
				/>

				<View style={styles.legend}>
					<LegendItem
						title="Low"
						value={tasksByPriority.low}
						color={COLORS.lowPriority}
					/>

					<LegendItem
						title="Medium"
						value={tasksByPriority.medium}
						color={COLORS.mediumPriority}
					/>

					<LegendItem
						title="High"
						value={tasksByPriority.high}
						color={COLORS.highPriority}
					/>
				</View>
			</View>
		</View>
	);
};

export default TasksByPriority;

const LegendItem = ({
	title,
	value,
	color,
}: {
	title: string;
	value: number;
	color: string;
}) => (
	<View style={styles.legendRow}>
		<View style={[styles.colorDot, { backgroundColor: color }]} />

		<Text style={styles.legendTitle}>{title}</Text>

		<Text style={styles.legendValue}>{value}</Text>
	</View>
);

const styles = StyleSheet.create({
	container: {
		backgroundColor: COLORS.surface,
		borderRadius: 20,
		borderWidth: 1,
		borderColor: COLORS.border,
		padding: 20,
		marginTop: 20,
	},

	title: {
		fontSize: 18,
		fontFamily: "sans-serif-medium",
		color: COLORS.textPrimary,
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

	total: {
		fontSize: 26,
		fontFamily: "sans-serif-medium",
		color: COLORS.textPrimary,
	},

	subtitle: {
		fontSize: 12,
		color: COLORS.textSecondary,
	},

	legend: {
		flex: 1,
		marginLeft: 25,
		gap: 18,
	},

	legendRow: {
		flexDirection: "row",
		alignItems: "center",
	},

	colorDot: {
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
		fontSize: 18,
		fontFamily: "sans-serif-medium",
		color: COLORS.textPrimary,
	},
});
