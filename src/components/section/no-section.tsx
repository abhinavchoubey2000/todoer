import { COLORS } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import SectionModel from "./section-create-modal";

type Props = {
	sectionModal: boolean;
	setSectionModal: (item: boolean) => void;
	projectId: string | string[];
};

const NoSections = ({ sectionModal, setSectionModal, projectId }: Props) => {
	return (
		<View style={styles.container}>
			<View style={styles.iconContainer}>
				<Ionicons
					name="albums-outline"
					size={80}
					color={COLORS.buttonPrimary}
				/>
			</View>

			<Text style={styles.title}>No Sections Yet</Text>

			<Text style={styles.description}>
				This project doesn't have any sections yet. Create your first section to
				organize your tasks into meaningful categories.
			</Text>

			<Pressable
				style={styles.button}
				onPress={() => {
					setSectionModal(true);
				}}
			>
				<Ionicons name="add-circle-outline" size={20} color="white" />

				<Text style={styles.buttonText}>Create Section</Text>
			</Pressable>
			<SectionModel
				isVisible={sectionModal}
				setIsVisible={setSectionModal}
				projectId={projectId ?? ""}
			/>
		</View>
	);
};

export default React.memo(NoSections);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 30,
	},

	iconContainer: {
		width: 120,
		height: 120,
		borderRadius: 60,
		backgroundColor: COLORS.surface,
		borderWidth: 1,
		borderColor: COLORS.border,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 25,
	},

	title: {
		fontSize: 28,
		fontFamily: "sans-serif-medium",
		color: COLORS.textPrimary,
		marginBottom: 10,
	},

	description: {
		fontSize: 16,
		lineHeight: 24,
		textAlign: "center",
		color: COLORS.textSecondary,
		marginBottom: 35,
	},

	button: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		backgroundColor: COLORS.buttonPrimary,
		paddingHorizontal: 22,
		paddingVertical: 14,
		borderRadius: 14,
		elevation: 4,
	},

	buttonText: {
		fontSize: 16,
		fontFamily: "sans-serif-medium",
		color: "white",
	},
});
