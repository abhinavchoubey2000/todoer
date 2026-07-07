import { COLORS } from "@/constants/colors";
import { TOAST } from "@/constants/toast-messages";
import { projectDeleted } from "@/redux/slices/analytics";
import { deleteProject } from "@/redux/slices/project";
import { showSuccess } from "@/utlis/toast";
import { Ionicons } from "@expo/vector-icons";
import { Href, useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Menu, MenuItem } from "react-native-material-menu";
import { useDispatch } from "react-redux";
import WarningModal from "../common/warning-modal";

const ProjectCard = ({
	route,
	title,
	icon,
	numberOfSections,
	description,
	theme,
	projectId,
}: {
	route: Href;
	title: string;
	icon: IconType;
	numberOfSections: number;
	theme: ThemeType;
	description: string;
	projectId: string;
}) => {
	const router = useRouter();
	const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);
	const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
	const dispatch = useDispatch();

	const handleDeleteProject = () => {
		dispatch(deleteProject({ projectId }));
		dispatch(projectDeleted({ projectId: projectId }));
		showSuccess(TOAST.PROJECT_DELETED);
	};
	const sectionText =
		numberOfSections > 1 ? `${numberOfSections} Sections` : "1 Section";
	const anchor = (
		<TouchableOpacity
			style={styles.mainContainer}
			onPress={() => {
				router.push(route);
			}}
			onLongPress={() => setIsMenuVisible(true)}
		>
			<View style={styles.container}>
				<View style={styles.subContainer}>
					<Ionicons name={icon.name} color={theme.color.icon} size={30} />
					<View style={styles.titleTaskContainer}>
						<Text style={styles.projectTitle}>{title}</Text>
					</View>
				</View>

				<Ionicons
					name="chevron-forward-circle"
					color={COLORS.textMuted}
					size={30}
				/>
			</View>
			{description && (
				<Text style={styles.projectDescription}>{description}</Text>
			)}

			{numberOfSections !== 0 && (
				<Text style={[styles.numberOfSections, { color: theme.color.icon }]}>
					{sectionText}
				</Text>
			)}
		</TouchableOpacity>
	);
	return (
		<>
			<Menu
				anchor={anchor}
				visible={isMenuVisible}
				onRequestClose={() => setIsMenuVisible(false)}
				style={styles.menuContainer}
			>
				<MenuItem
					onPress={() => {
						setIsMenuVisible(false);
						router.push({
							pathname: "/projects/edit-project",
							params: {
								projectId,
							},
						});
					}}
				>
					<Text style={styles.menuText}>Edit Project</Text>
				</MenuItem>
				<MenuItem
					onPress={() => {
						setIsMenuVisible(false);
						setIsModalVisible(true);
					}}
				>
					<Text style={styles.menuText}>Delete Project</Text>
				</MenuItem>
			</Menu>
			<WarningModal
				message="Do you really want to delete this project?"
				warningMessage="Including this project all the sections containing the tasks will be also deleted and this actions is irreversible"
				yesFunction={handleDeleteProject}
				action="Delete"
				isVisible={isModalVisible}
				setIsVisible={setIsModalVisible}
			/>
		</>
	);
};

export default React.memo(ProjectCard);

const styles = StyleSheet.create({
	mainContainer: {
		backgroundColor: COLORS.card,
		borderColor: COLORS.border,
		borderWidth: 1,
		paddingHorizontal: 20,
		paddingVertical: 20,
		borderRadius: 18,
		marginVertical: 5,
		elevation: 5,
	},
	container: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	titleTaskContainer: {
		gap: 5,
		width: "70%",
	},
	subContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 20,
	},
	projectTitle: {
		color: COLORS.textPrimary,
		fontSize: 20,
		fontFamily: "sans-serif-medium",
	},
	projectDescription: {
		color: COLORS.textSecondary,
		fontSize: 12,
		fontFamily: "sans-serif",
		paddingVertical: 10,
	},
	numberOfSections: {
		color: COLORS.textSecondary,
		fontSize: 12,
		fontFamily: "sans-serif",
	},
	menuContainer: { backgroundColor: "black" },
	menuText: {
		color: "white",
	},
});
