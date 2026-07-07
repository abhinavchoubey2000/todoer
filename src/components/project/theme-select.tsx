import { COLORS } from "@/constants/colors";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

const ThemeSelect = ({
	id,
	color,
	selectedThemeId,
	setSelectedThemeId,
}: {
	id: string;
	color: {
		surface: string;
		background: string;
	};
	selectedThemeId: string;
	setSelectedThemeId: React.Dispatch<React.SetStateAction<string>>;
}) => {
	return (
		<TouchableOpacity
			onPress={() => {
				setSelectedThemeId(id);
			}}
			style={{
				borderColor: id === selectedThemeId ? "white" : COLORS.border,
				borderWidth: 2,
				height: 50,
				width: 50,
				padding: 20,
				borderRadius: "50%",
				marginHorizontal: 8,
				backgroundColor: color.surface,
			}}
		></TouchableOpacity>
	);
};

export default ThemeSelect;

const styles = StyleSheet.create({});
