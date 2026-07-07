import { COLORS } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
	onCreateProject: () => void;
};

const NoProjects = ({ onCreateProject }: Props) => {
	return (
		<View style={styles.container}>
			<View style={styles.iconContainer}>
				<Ionicons
					name="folder-open-outline"
					size={80}
					color={COLORS.buttonPrimary}
				/>
			</View>

			<Text style={styles.title}>No Projects Yet</Text>

			<Text style={styles.description}>
				Create your first project to organize your work, track your progress,
				and stay productive.
			</Text>

			<Pressable style={styles.button} onPress={onCreateProject}>
				<Ionicons name="add-circle-outline" size={20} color="white" />

				<Text style={styles.buttonText}>Create Project</Text>
			</Pressable>
		</View>
	);
};

export default React.memo(NoProjects);

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
		justifyContent: "center",
		alignItems: "center",
		borderWidth: 1,
		borderColor: COLORS.border,
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
