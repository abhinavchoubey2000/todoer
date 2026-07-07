import { COLORS } from "@/constants/colors";
import React, { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

const SettingsGroup = ({
	title,
	children,
}: {
	title: string;
	children: ReactNode;
}) => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>{title}</Text>

			<View style={styles.content}>{children}</View>
		</View>
	);
};

export default React.memo(SettingsGroup);

const styles = StyleSheet.create({
	container: {
		marginBottom: 24,
	},

	title: {
		fontSize: 20,
		fontFamily: "sans-serif-medium",
		color: COLORS.textPrimary,
		marginBottom: 12,
		paddingHorizontal: 4,
	},

	content: {
		gap: 10,
	},
});
