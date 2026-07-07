import FloatingButton from "@/components/common/floating-button";
import Header from "@/components/common/header";
import NoProject from "@/components/project/no-project";
import ProjectCard from "@/components/project/project-card";
import { COLORS } from "@/constants/colors";
import { RootState } from "@/redux/store";
import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";

const HomeScreen = () => {
	const { projects } = useSelector((state: RootState) => state.Project);
	const [searchText, setSearchText] = useState("");

	const filteredProjects = useMemo(() => {
		if (!searchText.trim()) {
			return projects;
		}

		return projects.filter((project) =>
			project.projectTitle.toLowerCase().includes(searchText.toLowerCase()),
		);
	}, [projects, searchText]);

	return (
		<>
			<Header
				title="Your projects"
				searchBar
				searchText={searchText}
				setSearchText={setSearchText}
			/>
			<View style={styles.container}>
				<FlatList
					data={filteredProjects}
					showsVerticalScrollIndicator={false}
					keyExtractor={(item) => item.projectId}
					contentContainerStyle={{
						paddingBottom: 180,
					}}
					ListEmptyComponent={
						<NoProject
							onCreateProject={() => router.push("/projects/create-project")}
						/>
					}
					renderItem={({ item }) => (
						<ProjectCard
							title={item.projectTitle}
							icon={item.icon}
							theme={item.theme}
							route={`/projects/${item.projectId}`}
							projectId={item.projectId}
							numberOfSections={item.sections.length}
							description={item.projectDescription || ""}
						/>
					)}
				/>

				<FloatingButton
					onPress={() => {
						router.push("/projects/create-project");
					}}
					bottom={15}
					color={COLORS.buttonPrimary}
				/>
			</View>
		</>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.background,
		color: COLORS.textPrimary,
		paddingHorizontal: 8,
		paddingVertical: 10,
	},
});
