import { COLORS } from "@/constants/colors";
import { projectDeleted } from "@/redux/slices/analytics";
import { deleteProject } from "@/redux/slices/project";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { Menu, MenuItem } from "react-native-material-menu";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import SectionModel from "../section/section-create-modal";
import WarningModal from "./warning-modal";

const Header = ({
	title,
	searchBar,
	backButton,
	menuButton,
	projectId,
	color,
	searchText,
	setSearchText,
}: {
	title: string;
	searchBar?: boolean;
	backButton?: boolean;
	menuButton?: boolean;
	projectId?: string;
	searchText?: string;
	setSearchText?: (text: string) => void;
	color?: string;
}) => {
	const insets = useSafeAreaInsets();
	const router = useRouter();
	const [menuVisible, setMenuVisible] = useState(false);
	const [showSearch, setShowSearch] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);
	const [warningModalVisible, setWarningModalVisible] = useState(false);
	const hideMenu = () => setMenuVisible(false);
	const showMenu = () => setMenuVisible(true);
	const dispatch = useDispatch();

	const handleDeleteProject = () => {
		dispatch(deleteProject({ projectId }));
		dispatch(projectDeleted({ projectId: projectId?.toString() ?? "" }));
		router.replace("/");
	};

	return (
		<View style={{ ...styles.statusBar, paddingTop: insets.top }}>
			<View style={styles.headerContainer}>
				<View style={styles.backButtonTitleContainer}>
					{backButton && (
						<TouchableOpacity
							onPress={() => {
								router.back();
							}}
						>
							<Ionicons name="arrow-back" color={"white"} size={25} />
						</TouchableOpacity>
					)}

					{showSearch ? (
						<TextInput
							style={styles.searchBar}
							placeholderTextColor={"grey"}
							placeholder="Search projects"
							value={searchText}
							onChangeText={setSearchText}
						/>
					) : (
						<Text style={{ ...styles.title, color: color ? color : "white" }}>
							{title}
						</Text>
					)}
				</View>

				<View style={styles.iconContainer}>
					{searchBar &&
						(showSearch ? (
							<TouchableOpacity
								onPress={() => {
									setShowSearch(false);
									if (setSearchText) {
										setSearchText("");
									}
								}}
							>
								<Ionicons name="close" color={"white"} size={25} />
							</TouchableOpacity>
						) : (
							<TouchableOpacity
								onPress={() => {
									setShowSearch(true);
								}}
							>
								<Ionicons name="search" color={COLORS.textBlue} size={25} />
							</TouchableOpacity>
						))}

					{menuButton && (
						<Menu
							visible={menuVisible}
							style={styles.menuContainer}
							anchor={
								<TouchableOpacity onPress={showMenu}>
									<Ionicons
										name="ellipsis-vertical"
										color={color ? color : COLORS.textBlue}
										size={25}
									/>
								</TouchableOpacity>
							}
							onRequestClose={hideMenu}
						>
							<MenuItem
								onPress={() => {
									(setModalVisible(true), hideMenu());
								}}
							>
								<Text style={styles.menuText}>Add section</Text>
							</MenuItem>
							<MenuItem
								onPress={() => {
									router.push({
										pathname: "/projects/create-task",
										params: {
											currentProjectId: projectId,
										},
									});
									hideMenu();
								}}
							>
								<Text style={styles.menuText}>Add task</Text>
							</MenuItem>
							<MenuItem
								onPress={() => {
									(setWarningModalVisible(true), hideMenu());
								}}
							>
								<Text style={styles.menuText}>Delete project</Text>
							</MenuItem>
						</Menu>
					)}
				</View>
			</View>
			<SectionModel
				isVisible={modalVisible}
				setIsVisible={setModalVisible}
				projectId={projectId ?? ""}
			/>
			<WarningModal
				message="Do you really want to delete this project?"
				warningMessage="All your sections and tasks will also be deleted and this action is irreversible"
				yesFunction={handleDeleteProject}
				action="Delete"
				isVisible={warningModalVisible}
				setIsVisible={setWarningModalVisible}
			/>
		</View>
	);
};

export default Header;

const styles = StyleSheet.create({
	statusBar: {
		backgroundColor: COLORS.background,
	},
	headerContainer: {
		backgroundColor: COLORS.background,
		paddingHorizontal: 12,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 20,
		height: 100,
	},
	title: {
		fontSize: 30,
		fontFamily: "sans-serif-light",
	},
	iconContainer: {
		display: "flex",
		flexDirection: "row",
		gap: 25,
	},
	backButtonTitleContainer: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		gap: 20,
	},
	menuContainer: { backgroundColor: "black" },
	menuText: {
		color: "white",
	},
	searchBar: {
		color: "white",
		fontSize: 15,
		width: "90%",
	},
});
