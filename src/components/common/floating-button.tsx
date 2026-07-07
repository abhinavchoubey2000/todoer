import { COLORS } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, Href } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

const FloatingButton = ({
	onPress,
	bottom = 25,
	right = 25,
	currentProjectId,
	color,
}: {
	onPress: () => void;
	bottom?: number;
	right?: number;
	currentProjectId?: string;
	color?: string;
}) => {
	const router = useRouter();
	return (
		<TouchableOpacity
			style={{
				...styles.floatingButton,
				bottom,
				right,
				backgroundColor: color ? color : COLORS.floatingButton,
			}}
			onPress={onPress}
		>
			<Ionicons color={"white"} size={30} name="add" />
		</TouchableOpacity>
	);
};

export default FloatingButton;

const styles = StyleSheet.create({
	floatingButton: {
		height: 70,
		width: 70,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: "50%",
		position: "absolute",
	},
});
