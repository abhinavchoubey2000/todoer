import { COLORS } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
	title: string;
	icon: keyof typeof Ionicons.glyphMap;
	iconColor: string;
	onPress?: () => void;
	isDanger?: boolean;
	rightComponent: React.ReactNode;
};

const SettingsItem = ({
	title,
	icon,
	iconColor,
	onPress,
	isDanger = false,
	rightComponent,
}: Props) => {
	return (
		<TouchableOpacity
			activeOpacity={0.8}
			style={styles.container}
			onPress={onPress}
		>
			<View style={styles.leftContainer}>
				<View
					style={[styles.iconContainer, { backgroundColor: `${iconColor}20` }]}
				>
					<Ionicons name={icon} size={22} color={iconColor} />
				</View>

				<Text style={[styles.title, isDanger && { color: COLORS.danger }]}>
					{title}
				</Text>
			</View>

			{rightComponent}
		</TouchableOpacity>
	);
};

export default React.memo(SettingsItem);

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 18,
		paddingVertical: 16,
		backgroundColor: COLORS.surface,
		borderRadius: 18,
		marginVertical: 6,
		borderWidth: 1,
		borderColor: COLORS.border,
	},

	leftContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 15,
	},

	iconContainer: {
		width: 42,
		height: 42,
		borderRadius: 12,
		justifyContent: "center",
		alignItems: "center",
	},

	title: {
		fontSize: 16,
		fontFamily: "sans-serif-medium",
		color: COLORS.textPrimary,
	},
});
