import FloatingButton from "@/components/common/floating-button";
import Header from "@/components/common/header";
import Accordian from "@/components/section/accordian";
import NoSection from "@/components/section/no-section";
import { COLORS } from "@/constants/colors";
import { RootState } from "@/redux/store";
import { router, Stack, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";

const ProjectScreen = () => {
	const { projectId } = useLocalSearchParams();
	const { projects } = useSelector((state: RootState) => state.Project);
	const { deleteTaskOnComplete } = useSelector(
		(state: RootState) => state.Settings,
	);
	const [sectionModal, setSectionModal] = useState(false);

	const currentProject = projects.find((item) => item.projectId === projectId);
	return (
		<>
			<Stack.Screen
				options={{
					header: () => (
						<Header
							title={currentProject?.projectTitle || ""}
							backButton
							menuButton
							projectId={currentProject?.projectId!}
							color={currentProject?.theme.color.icon!}
						/>
					),
				}}
			/>
			<View style={styles.container}>
				<FlatList
					contentContainerStyle={{
						paddingBottom: 180,
					}}
					showsVerticalScrollIndicator={false}
					data={currentProject?.sections}
					keyExtractor={(item) => item.sectionId}
					ListEmptyComponent={() => (
						<NoSection
							sectionModal={sectionModal}
							setSectionModal={setSectionModal}
							projectId={projectId ?? ""}
						/>
					)}
					renderItem={({ item }) => (
						<Accordian
							section={item.sectionTitle}
							lists={item.tasks}
							theme={currentProject?.theme.color!}
							currentProjectId={currentProject?.projectId!}
							currentSectionId={item.sectionId}
							isOpened={item.isOpened}
							deleteTaskOnComplete={deleteTaskOnComplete}
						/>
					)}
				/>
			</View>
			<FloatingButton
				onPress={() => {
					router.push({
						pathname: "/projects/create-task",
						params: {
							currentProjectId: currentProject?.projectId,
						},
					});
				}}
				bottom={75}
				currentProjectId={currentProject?.projectId!}
				color={currentProject?.theme.color.icon}
			/>
		</>
	);
};

export default ProjectScreen;

const styles = StyleSheet.create({
	container: {
		height: "100%",
		backgroundColor: COLORS.background,
		color: COLORS.textPrimary,
		paddingHorizontal: 8,
		paddingVertical: 10,
	},
});
