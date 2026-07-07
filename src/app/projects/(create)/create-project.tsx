import Input from "@/components/common/input";
import ManageHeader from "@/components/common/manage-header";
import IconSelect from "@/components/project/icon-select";
import ThemeSelect from "@/components/project/theme-select";
import { COLORS } from "@/constants/colors";
import { ICONS } from "@/constants/icons";
import { THEMES } from "@/constants/themes";
import { TOAST } from "@/constants/toast-messages";
import { projectCreated } from "@/redux/slices/analytics";
import { addProject } from "@/redux/slices/project";
import { generateUniqueId } from "@/utlis/generate-unique-id";
import { showError, showSuccess } from "@/utlis/toast";
import { router, Stack } from "expo-router";
import React, { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";

const CreateProject = () => {
	const dispatch = useDispatch();

	const [selectedIconId, setSelectedIconId] = useState<string>("1");
	const [selectedThemeId, setSelectedThemeId] = useState<string>("1");
	const [projectName, setProjectName] = useState<string>("");
	const [description, setDescription] = useState<string>("");

	const currentTheme = THEMES.find((theme) => theme.id === selectedThemeId);
	const currentIcon = ICONS.find((icon) => icon.id === selectedIconId);

	const handleSave = () => {
		if (!projectName) {
			showError(TOAST.PROJECT_NAME_REQUIRED);
			return;
		}
		const newProject = {
			projectId: generateUniqueId(),
			icon: currentIcon,
			projectTitle: projectName,
			projectDescription: description,
			sections: [],
			theme: currentTheme,
		};
		dispatch(addProject(newProject));
		dispatch(projectCreated({ projectId: newProject.projectId }));
		showSuccess(TOAST.PROJECT_CREATED);
		router.back();
	};

	return (
		<>
			<View style={styles.container}>
				<Stack.Screen
					options={{
						header: () => (
							<ManageHeader title="New Project" action={handleSave} />
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
						showsHorizontalScrollIndicator={false}
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
						showsHorizontalScrollIndicator={false}
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

export default CreateProject;

const styles = StyleSheet.create({
	container: {
		height: "100%",
		backgroundColor: COLORS.background,
		color: COLORS.textPrimary,
		paddingHorizontal: 8,
		paddingVertical: 10,
	},
});
