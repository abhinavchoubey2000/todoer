import { COLORS } from "@/constants/colors";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ManageHeader = ({
	title,
	action,
}: {
	title: string;
	action: () => void;
}) => {
	const insets = useSafeAreaInsets();
	const router = useRouter();
	return (
		<View
			style={{
				...styles.statusBar,
				paddingTop: insets.top,
				// paddingRight: insets.right,
			}}
		>
			<View style={styles.headerContainer}>
				<TouchableOpacity
					onPress={() => {
						router.back();
					}}
				>
					<Text style={styles.button} numberOfLines={1}>
						Cancel
					</Text>
				</TouchableOpacity>
				<Text style={styles.title} numberOfLines={1}>
					{title}
				</Text>
				<TouchableOpacity onPress={action}>
					<Text style={styles.button} numberOfLines={1}>
						Save
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default ManageHeader;

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
	},
	title: {
		textAlign: "center",
		color: COLORS.textPrimary,
		fontSize: 20,
		width: 150,
		fontFamily: "sans-serif-medium",
	},
	button: {
		color: COLORS.buttonPrimary,
		flex: 1,
		textAlign: "center",
		width: 60,
	},
});
