import Input from "@/components/common/input";
import ManageHeader from "@/components/common/manage-header";
import { COLORS } from "@/constants/colors";
import { PRIORITIES } from "@/constants/priorities";
import { TOAST } from "@/constants/toast-messages";
import { taskCreated } from "@/redux/slices/analytics";
import { addTask } from "@/redux/slices/project";
import { RootState } from "@/redux/store";
import { generateUniqueId } from "@/utlis/generate-unique-id";
import { showError, showSuccess } from "@/utlis/toast";
import { router, Stack, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { useDispatch, useSelector } from "react-redux";

const CreateTask = () => {
	const { currentProjectId, currentSectionId } = useLocalSearchParams();
	const { projects } = useSelector((state: RootState) => state.Project);
	const [priority, setPriority] = useState<PrioritiesType>({
		id: "2",
		name: "medium",
		color: COLORS.mediumPriority,
	});
	const [id, setId] = useState<string>(currentSectionId?.toString() ?? "");
	const [taskTitle, setTaskTitle] = useState("");
	const [taskDescription, setTaskDescription] = useState("");
	const selectedPriority = PRIORITIES.find((item) => item.id === priority.id);
	const currentProject = projects.find(
		(item) => item.projectId === currentProjectId,
	);
	const currentSection = currentProject?.sections.find(
		(item) => item.sectionId === id,
	);

	const dispatch = useDispatch();

	const handleSaveTask = () => {
		if (!currentSection) {
			showError(TOAST.SECTION_NAME_REQUIRED);
			return;
		}
		if (!taskTitle) {
			showError(TOAST.TASK_NAME_REQUIRED);
			return;
		}

		const task = {
			taskId: generateUniqueId(),
			taskTitle,
			taskDescription,
			completed: false,
			priority,
		};

		dispatch(
			addTask({
				projectId: currentProjectId,
				sectionId: currentSection?.sectionId,
				task,
			}),
		);
		dispatch(taskCreated({ projectId: currentProjectId.toString() }));
		showSuccess(TOAST.TASK_CREATED);
		router.back();
	};
	return (
		<>
			<View style={styles.container}>
				<Stack.Screen
					options={{
						header: () => (
							<ManageHeader title="New Task" action={handleSaveTask} />
						),
					}}
				/>

				<Text style={styles.title}>Select Section</Text>

				<Dropdown
					data={currentProject?.sections ?? []}
					style={styles.dropdown}
					placeholderStyle={styles.placeholder}
					selectedTextStyle={{
						color: COLORS.buttonPrimary,
					}}
					iconStyle={{ tintColor: "white" }}
					renderItem={(item) => (
						<Item text={item.sectionTitle} color={"white"} />
					)}
					containerStyle={styles.dropdownContainer}
					labelField={"sectionTitle"}
					valueField={"sectionId"}
					placeholder="Select section"
					value={id}
					onChange={(item) => {
						setId(item.sectionId);
					}}
				/>

				<Input
					title="Task Name"
					placeholder={"Enter task name"}
					text={taskTitle}
					setText={setTaskTitle}
					returnKeyType="done"
				/>
				<Input
					title="Description"
					placeholder="Enter description"
					text={taskDescription}
					multiline
					setText={setTaskDescription}
					returnKeyType="done"
				/>

				<Text style={styles.title}>Task priority</Text>

				<Dropdown
					data={PRIORITIES}
					style={styles.dropdown}
					placeholderStyle={styles.placeholder}
					selectedTextStyle={{
						color: selectedPriority?.color,
						textTransform: "capitalize",
					}}
					iconStyle={{ tintColor: selectedPriority?.color }}
					renderItem={(item) => <Item text={item.name} color={item.color} />}
					containerStyle={styles.dropdownContainer}
					labelField={"name"}
					valueField={"name"}
					placeholder="Select Priority"
					value={priority}
					onChange={(item) => {
						setPriority(item);
					}}
				/>
			</View>
		</>
	);
};

export default CreateTask;

const Item = ({ text, color }: { text: string; color: string }) => {
	return (
		<View>
			<Text style={{ color, ...styles.item }}>{text}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		height: "100%",
		backgroundColor: COLORS.background,
		color: COLORS.textPrimary,
		paddingHorizontal: 8,
		paddingVertical: 10,
	},
	dropdown: {
		backgroundColor: COLORS.surface,
		borderColor: COLORS.inputBorder,
		borderWidth: 1,
		paddingVertical: 18,
		paddingHorizontal: 15,
		borderRadius: 18,
		marginVertical: 5,
	},
	placeholder: {
		color: "white",
	},
	dropdownContainer: {
		backgroundColor: COLORS.surface,
		borderWidth: 2,
		borderColor: COLORS.border,
		marginVertical: 5,
		borderRadius: 18,
		padding: 10,
	},
	item: {
		backgroundColor: COLORS.surface,
		paddingVertical: 18,
		paddingHorizontal: 15,
		textTransform: "capitalize",
	},
	title: {
		color: "white",
		fontFamily: "sans-serif-medium",
		fontSize: 20,
		paddingVertical: 10,
		paddingHorizontal: 15,
	},
});
