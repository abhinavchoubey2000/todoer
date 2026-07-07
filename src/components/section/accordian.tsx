import { COLORS } from "@/constants/colors";
import { TOAST } from "@/constants/toast-messages";
import {
	sectionDeleted,
	taskCompleted,
	taskDeleted,
	taskUnCompleted,
} from "@/redux/slices/analytics";
import {
	deleteSection,
	deleteTask,
	toggleSection,
	toggleTaskCompletion,
} from "@/redux/slices/project";
import { showSuccess } from "@/utlis/toast";
import { Ionicons } from "@expo/vector-icons";
import { router, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	Vibration,
	View,
} from "react-native";
import { Menu, MenuItem } from "react-native-material-menu";
import { useDispatch } from "react-redux";
import WarningModal from "../common/warning-modal";
import NoTask from "../task/no-task";
import EditSectionModel from "./section-edit-modal";

const Accordian = ({
	theme,
	section,
	lists,
	currentSectionId,
	currentProjectId,
	deleteTaskOnComplete,
	isOpened,
}: {
	theme: { surface: string; background: string; icon: string };
	section: string;
	currentSectionId: string;
	currentProjectId: string;
	lists: TaskType[];
	deleteTaskOnComplete: boolean;
	isOpened: boolean;
}) => {
	const [isEditSectionVisible, setIsEditSectionVisible] = useState(false);
	const [sectionMenuVisible, setSectionMenuVisible] = useState(false);

	const [isSectionModalVisible, setIsSectionModalVisible] = useState(false);
	const dispatch = useDispatch();

	const handleDeleteSection = () => {
		dispatch(
			deleteSection({
				projectId: currentProjectId,
				sectionId: currentSectionId,
			}),
		);
		dispatch(sectionDeleted());
		showSuccess(TOAST.SECTION_DELETED);
	};

	const isSectionIncomplete = lists.find((item) => item.completed === false);

	const sectionAnchor = (
		<View style={{ ...styles.container, backgroundColor: theme.surface }}>
			<TouchableOpacity
				style={styles.titleContainer}
				onLongPress={() => {
					setSectionMenuVisible(true);
					Vibration.vibrate(50);
				}}
				onPress={() => {
					dispatch(
						toggleSection({
							projectId: currentProjectId,
							sectionId: currentSectionId,
						}),
					);
				}}
			>
				<View
					style={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
					}}
				>
					{lists.length === 0 ? null : (
						<Ionicons
							color={COLORS.textPrimary}
							name={isSectionIncomplete ? "time" : "checkmark"}
							size={20}
						/>
					)}

					<Text style={styles.title}>{section}</Text>
				</View>
				<Ionicons
					color={COLORS.textPrimary}
					name={isOpened ? "chevron-up" : "chevron-down"}
				/>
			</TouchableOpacity>

			<View
				style={{
					...styles.body,
					backgroundColor: theme.background,
					display: isOpened ? "flex" : "none",
				}}
			>
				{lists.length === 0 ? (
					<NoTask
						onPress={() => {
							router.push({
								pathname: "/projects/create-task",
								params: {
									currentProjectId,
									currentSectionId,
								},
							});
						}}
					/>
				) : (
					lists.map((item, index) => (
						<TaskItem
							key={item.taskId}
							currentProjectId={currentProjectId}
							currentSectionId={currentSectionId}
							currentTask={item}
							theme={theme}
							taskIndex={index}
							taskLength={lists.length}
							deleteTaskOnComplete={deleteTaskOnComplete}
						/>
					))
				)}
			</View>
		</View>
	);
	return (
		<>
			<Menu
				anchor={sectionAnchor}
				visible={sectionMenuVisible}
				onRequestClose={() => setSectionMenuVisible(false)}
				style={styles.menuContainer}
			>
				<MenuItem
					onPress={() => {
						router.push({
							pathname: "/projects/create-task",
							params: {
								currentProjectId,
								currentSectionId,
							},
						});
						setSectionMenuVisible(false);
					}}
				>
					<Text style={styles.menuText}>Add task</Text>
				</MenuItem>
				<MenuItem
					onPress={() => {
						setIsEditSectionVisible(true);
						setSectionMenuVisible(false);
					}}
				>
					<Text style={styles.menuText}>Edit section</Text>
				</MenuItem>

				<MenuItem
					onPress={() => {
						setIsSectionModalVisible(true);
						setSectionMenuVisible(false);
					}}
				>
					<Text style={styles.menuText}>Delete section</Text>
				</MenuItem>
			</Menu>
			<WarningModal
				message="Do you really want to delete this section?"
				warningMessage="All your tasks will be also deleted along with this section and this action is irreversible"
				yesFunction={handleDeleteSection}
				theme={theme}
				action="Delete"
				isVisible={isSectionModalVisible}
				setIsVisible={setIsSectionModalVisible}
			/>
			<EditSectionModel
				isVisible={isEditSectionVisible}
				setIsVisible={setIsEditSectionVisible}
				projectId={currentProjectId}
				sectionId={currentSectionId}
			/>
		</>
	);
};

export default Accordian;

// Task Related Functionalities
const TaskItem = React.memo(
	({
		currentProjectId,
		currentSectionId,
		currentTask,
		theme,
		taskIndex,
		taskLength,
		deleteTaskOnComplete,
	}: {
		currentProjectId: string;
		currentSectionId: string;
		currentTask: TaskType;
		taskIndex: number;
		taskLength: number;
		theme: { surface: string; background: string; icon: string };
		deleteTaskOnComplete: boolean;
	}) => {
		const [isTaskMenuVisible, setIsTaskMenuVisible] = useState(false);
		const [isTaskModalVisible, setIsTaskModalVisible] = useState(false);
		const router = useRouter();
		const dispatch = useDispatch();

		const handleTaskCompletion = useCallback(
			(id: string) => {
				if (deleteTaskOnComplete && !currentTask.completed) {
					dispatch(taskCompleted({ projectId: currentProjectId }));

					dispatch(
						deleteTask({
							projectId: currentProjectId,
							sectionId: currentSectionId,
							taskId: currentTask.taskId,
						}),
					);

					return;
				}

				dispatch(
					toggleTaskCompletion({
						projectId: currentProjectId,
						sectionId: currentSectionId,
						taskId: id,
					}),
				);
				if (!currentTask.completed) {
					dispatch(taskCompleted({ projectId: currentProjectId }));
				} else {
					dispatch(taskUnCompleted({ projectId: currentProjectId }));
				}
			},
			[
				currentProjectId,
				currentSectionId,
				dispatch,
				currentTask,
				deleteTaskOnComplete,
			],
		);

		const handleDeleteTask = () => {
			dispatch(
				deleteTask({
					projectId: currentProjectId,
					sectionId: currentSectionId,
					taskId: currentTask.taskId,
				}),
			);
			dispatch(taskDeleted({ projectId: currentProjectId }));
			setIsTaskMenuVisible(false);
			showSuccess(TOAST.TASK_DELETED);
		};

		const anchor = (
			<TouchableOpacity
				onLongPress={() => {
					setIsTaskMenuVisible(true);
				}}
				onPress={() => {
					handleTaskCompletion(currentTask.taskId);
				}}
				style={{
					...styles.item,
					borderBottomWidth: taskIndex === taskLength - 1 ? 0 : 1,
					borderBottomColor: theme.surface,
				}}
			>
				<RadioButton
					completed={currentTask.completed}
					outerCircle={theme.surface}
				/>
				<View style={{ display: "flex", flexDirection: "column", gap: 5 }}>
					<Text
						style={{
							...styles.itemText,
							textDecorationLine: currentTask.completed
								? "line-through"
								: "none",
						}}
					>
						{currentTask.taskTitle}
					</Text>

					{currentTask.taskDescription && (
						<Text
							style={{
								...styles.itemDescription,
								textDecorationLine: currentTask.completed
									? "line-through"
									: "none",
							}}
						>
							{currentTask.taskDescription}
						</Text>
					)}
				</View>
			</TouchableOpacity>
		);

		return (
			<>
				<View key={currentTask.taskId}>
					<Menu
						style={styles.menuContainer}
						anchor={anchor}
						visible={isTaskMenuVisible}
						onRequestClose={() => setIsTaskMenuVisible(false)}
					>
						<MenuItem
							onPress={() => {
								router.push({
									pathname: "/projects/edit-task",
									params: {
										currentProjectId,
										currentSectionId,
										selectedTaskId: currentTask.taskId,
									},
								});
								setIsTaskMenuVisible(false);
							}}
						>
							<Text style={styles.menuText}>Edit task</Text>
						</MenuItem>
						<MenuItem
							onPress={() => {
								setIsTaskModalVisible(true);
							}}
						>
							<Text style={styles.menuText}>Delete task</Text>
						</MenuItem>
					</Menu>
				</View>
				<WarningModal
					message="Do you really want to delete this task?"
					warningMessage="This task will be deleted permanently and this action is irreversible"
					yesFunction={handleDeleteTask}
					theme={theme}
					action="Delete"
					isVisible={isTaskModalVisible}
					setIsVisible={setIsTaskModalVisible}
				/>
			</>
		);
	},
);

const RadioButton = ({
	completed,
	outerCircle,
}: {
	completed: boolean;
	outerCircle: string;
}) => {
	return (
		<View style={{ ...styles.radioOuter, borderColor: outerCircle }}>
			<View
				style={{
					...styles.radionInner,
					backgroundColor: outerCircle,
					display: completed ? "flex" : "none",
				}}
			></View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: COLORS.surface,
		borderColor: COLORS.inputBorder,
		borderWidth: 2,
		borderRadius: 18,
		marginVertical: 5,
		elevation: 10,
	},
	titleContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingLeft: 10,
		paddingRight: 40,
	},
	title: {
		color: COLORS.textPrimary,
		paddingHorizontal: 15,
		paddingVertical: 18,
		width: "100%",
		fontSize: 18,
		fontFamily: "sans-serif",
	},
	itemText: {
		color: COLORS.textSecondary,
		paddingHorizontal: 15,
		fontFamily: "sans-serif-medium",
	},
	itemDescription: {
		color: COLORS.textSecondary,
		paddingHorizontal: 15,
		opacity: 0.7,
		fontFamily: "sans-serif",
	},
	body: {
		borderRadius: 18,
		borderTopStartRadius: 0,
		borderTopEndRadius: 0,
		backgroundColor: COLORS.background,
	},
	item: {
		borderBottomColor: COLORS.border,
		paddingVertical: 18,
		paddingHorizontal: 15,
		display: "flex",
		flexDirection: "row",
		alignContent: "center",
	},

	// Styling for Radio Button
	radioOuter: {
		width: 25,
		height: 25,
		borderColor: COLORS.border,
		borderWidth: 2,
		borderRadius: 999,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	radionInner: {
		width: 12,
		height: 12,
		backgroundColor: COLORS.buttonPrimary,
		borderRadius: 999,
	},
	menuContainer: { backgroundColor: "black" },
	menuText: {
		color: "white",
	},
});
