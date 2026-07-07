import Input from "@/components/common/input";
import ManageHeader from "@/components/common/manage-header";
import { COLORS } from "@/constants/colors";
import { PRIORITIES } from "@/constants/priorities";
import { TOAST } from "@/constants/toast-messages";
import { editTask } from "@/redux/slices/project";
import { RootState } from "@/redux/store";
import { showError, showSuccess } from "@/utlis/toast";
import { router, Stack, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { useDispatch, useSelector } from "react-redux";

const EditTask = () => {
	const { currentProjectId, currentSectionId, selectedTaskId } =
		useLocalSearchParams();
	const { projects } = useSelector((state: RootState) => state.Project);
	const currentTask = projects
		.find((p) => p.projectId === currentProjectId)
		?.sections.find((s) => s.sectionId === currentSectionId)
		?.tasks.find((t) => t.taskId === selectedTaskId);

	const [priority, setPriority] = useState<PrioritiesType>(
		currentTask?.priority!,
	);
	const [taskTitle, setTaskTitle] = useState(currentTask?.taskTitle);
	const [taskDescription, setTaskDescription] = useState(
		currentTask?.taskDescription,
	);
	const selectedPriority = PRIORITIES.find((item) => item.id === priority.id);

	const dispatch = useDispatch();

	const handleEditTask = () => {
		if (!currentTask) {
			return;
		}
		if (!taskTitle) {
			showError(TOAST.TASK_NAME_REQUIRED);
			return;
		}

		const updatedTask = {
			taskId: selectedTaskId,
			taskTitle,
			taskDescription,
			completed: currentTask.completed,
			priority: selectedPriority,
		};

		dispatch(
			editTask({
				projectId: currentProjectId,
				sectionId: currentSectionId,
				task: updatedTask,
			}),
		);
		showSuccess(TOAST.TASK_UPDATED);
		router.back();
	};
	return (
		<>
			<View style={styles.container}>
				<Stack.Screen
					options={{
						header: () => (
							<ManageHeader title="Edit Task" action={handleEditTask} />
						),
					}}
				/>

				<Input
					title="Task Name"
					placeholder={"Enter task name"}
					text={taskTitle ?? ""}
					setText={setTaskTitle}
					returnKeyType="done"
				/>
				<Input
					title="Description"
					placeholder="Enter description"
					multiline
					text={taskDescription ?? ""}
					returnKeyType="done"
					setText={setTaskDescription}
				/>

				<Text
					style={{
						color: "white",
						fontFamily: "sans-serif-medium",
						fontSize: 20,
						paddingVertical: 10,
						paddingHorizontal: 15,
					}}
				>
					Task priority
				</Text>

				<Dropdown
					data={PRIORITIES}
					style={styles.dropdown}
					placeholderStyle={styles.placeholder}
					selectedTextStyle={{
						color: selectedPriority?.color,
						textTransform: "capitalize",
					}}
					iconStyle={{
						tintColor: selectedPriority?.color,
					}}
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

export default EditTask;

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
		borderWidth: 2,
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
});
