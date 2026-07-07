import { COLORS } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
	onPress: () => void;
};

const NoTasks = ({ onPress }: Props) => {
	return (
		<View style={styles.container}>
			<Ionicons name="checkbox-outline" size={38} color={COLORS.textMuted} />

			<Text style={styles.title}>No Tasks Yet</Text>

			<Text style={styles.description}>
				Add your first task to get started.
			</Text>

			<Pressable style={styles.button} onPress={onPress}>
				<Ionicons name="add" size={16} color="white" />

				<Text style={styles.buttonText}>Create Task</Text>
			</Pressable>
		</View>
	);
};

export default React.memo(NoTasks);

const styles = StyleSheet.create({
	container: {
		paddingVertical: 30,
		paddingHorizontal: 20,
		alignItems: "center",
	},

	title: {
		marginTop: 10,
		fontSize: 18,
		fontFamily: "sans-serif-medium",
		color: COLORS.textPrimary,
	},

	description: {
		marginTop: 5,
		fontSize: 14,
		textAlign: "center",
		color: COLORS.textSecondary,
		width: 300,
	},

	button: {
		marginTop: 18,
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: COLORS.buttonPrimary,
		paddingHorizontal: 18,
		paddingVertical: 10,
		borderRadius: 12,
		gap: 6,
	},

	buttonText: {
		color: "white",
		fontFamily: "sans-serif-medium",
		fontSize: 14,
	},
});
