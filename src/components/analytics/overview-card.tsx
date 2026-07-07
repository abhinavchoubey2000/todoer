import { COLORS } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const OverViewCard = ({
	title,
	value,
	color,
	icon,
}: {
	title: string;
	value: number;
	color: string;
	icon: React.ComponentProps<typeof Ionicons>["name"];
}) => {
	return (
		<View style={styles.card}>
			<View style={[styles.iconContainer, { backgroundColor: color + "20" }]}>
				<Ionicons name={icon} size={22} color={color} />
			</View>

			<Text style={styles.title}>{title}</Text>

			<Text style={styles.value}>{value}</Text>
		</View>
	);
};

export default OverViewCard;

const styles = StyleSheet.create({
	card: {
		width: "48%",
		backgroundColor: COLORS.surface,
		borderRadius: 20,
		padding: 18,
		borderWidth: 1,
		borderColor: COLORS.border,
	},

	iconContainer: {
		width: 42,
		height: 42,
		borderRadius: 12,

		justifyContent: "center",
		alignItems: "center",

		marginBottom: 15,
	},

	title: {
		color: COLORS.textSecondary,
		fontSize: 14,
		fontFamily: "sans-serif",
	},

	value: {
		color: COLORS.textPrimary,
		fontSize: 28,
		fontFamily: "sans-serif-medium",
		marginTop: 6,
	},
});
