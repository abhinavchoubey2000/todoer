import React from "react";
import { StyleSheet, View } from "react-native";
import OverViewCard from "./overview-card";

const Overview = ({
	totalProjects,
	totalSections,
	totalTasks,
	completedTasks,
}: {
	totalProjects: number;
	totalSections: number;
	totalTasks: number;
	completedTasks: number;
}) => {
	return (
		<View style={styles.container}>
			<OverViewCard
				title="Total Active Projects"
				value={totalProjects}
				color="#8B5CF6"
				icon="folder-outline"
			/>

			<OverViewCard
				title="Total Active Sections"
				value={totalSections}
				color="#3B82F6"
				icon="layers-outline"
			/>

			<OverViewCard
				title="Total Active Tasks"
				value={totalTasks}
				color="#F59E0B"
				icon="checkmark-done-circle-outline"
			/>

			<OverViewCard
				title="Total Completed Tasks"
				value={completedTasks}
				color="#22C55E"
				icon="checkmark-circle-outline"
			/>
		</View>
	);
};

export default Overview;

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
		gap: 12,
	},
});
