import Input from "@/components/common/input";
import ManageHeader from "@/components/common/manage-header";
import IconSelect from "@/components/project/icon-select";
import ThemeSelect from "@/components/project/theme-select";
import { COLORS } from "@/constants/colors";
import { ICONS } from "@/constants/icons";
import { THEMES } from "@/constants/themes";
import { TOAST } from "@/constants/toast-messages";
import { editProject } from "@/redux/slices/project";
import { RootState } from "@/redux/store";
import { showError, showSuccess } from "@/utlis/toast";
import { router, Stack, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const EditProject = () => {
	const { projects } = useSelector((state: RootState) => state.Project);
	const { projectId } = useLocalSearchParams();
	const currentProject = projects.find((p) => p.projectId === projectId);
	const dispatch = useDispatch();
	const [selectedIconId, setSelectedIconId] = useState<string>(
		currentProject?.icon.id ?? "",
	);
	const [selectedThemeId, setSelectedThemeId] = useState<string>(
		currentProject?.theme.id ?? "",
	);
	const [projectName, setProjectName] = useState<string>(
		currentProject?.projectTitle ?? "",
	);
	const [description, setDescription] = useState<string>(
		currentProject?.projectDescription ?? "",
	);

	const currentTheme = THEMES.find((theme) => theme.id === selectedThemeId) ?? {
		id: "1",
		color: COLORS.default,
	};
	const currentIcon = ICONS.find((icon) => icon.id === selectedIconId) ?? {
		id: "1",
		name: "folder",
	};

	const handleSave = () => {
		if (!projectName) {
			showError(TOAST.PROJECT_NAME_REQUIRED);
			return;
		}

		if (currentProject) {
			const project: ProjectType = {
				...currentProject,
				projectTitle: projectName,
				projectDescription: description,
				icon: currentIcon,
				theme: currentTheme,
			};

			dispatch(
				editProject({
					projectId,
					project,
				}),
			);
			showSuccess(TOAST.PROJECT_UPDATED);
			router.back();
		}
	};

	return (
		<>
			<View style={styles.container}>
				<Stack.Screen
					options={{
						header: () => (
							<ManageHeader title="Edit Project" action={handleSave} />
						),
					}}
				/>
				<Input
					title="Project Name"
					placeholder="Enter project name"
					text={projectName}
					setText={setProjectName}
					returnKeyType="done"
				/>
				<Input
					title="Description"
					placeholder="Enter description"
					multiline
					text={description}
					returnKeyType="done"
					setText={setDescription}
				/>

				<View style={{ paddingHorizontal: 15 }}>
					<Text
						style={{
							color: "white",
							fontFamily: "sans-serif-medium",
							fontSize: 20,
							paddingVertical: 10,
						}}
					>
						Icon
					</Text>

					<FlatList
						horizontal
						data={ICONS}
						keyExtractor={(items) => items.id}
						renderItem={({ item }) => (
							<IconSelect
								id={item.id}
								iconName={item.name}
								selectedIconId={selectedIconId}
								setSelectedIconId={setSelectedIconId}
							/>
						)}
					/>
				</View>
				<View style={{ paddingHorizontal: 15 }}>
					<Text
						style={{
							color: "white",
							fontFamily: "sans-serif-medium",
							fontSize: 20,
							paddingVertical: 10,
						}}
					>
						Theme
					</Text>

					<FlatList
						horizontal
						data={THEMES}
						keyExtractor={(item) => item.id}
						renderItem={({ item }) => (
							<ThemeSelect
								id={item.id}
								color={item.color}
								selectedThemeId={selectedThemeId}
								setSelectedThemeId={setSelectedThemeId}
							/>
						)}
					/>
				</View>
			</View>
		</>
	);
};

export default EditProject;

const styles = StyleSheet.create({
	container: {
		height: "100%",
		backgroundColor: COLORS.background,
		color: COLORS.textPrimary,
		paddingHorizontal: 8,
		paddingVertical: 10,
	},
});
