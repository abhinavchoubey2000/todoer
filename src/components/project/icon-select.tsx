import { COLORS } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

const IconSelect = ({
	id,
	iconName,
	selectedIconId,
	setSelectedIconId,
}: {
	id: string;
	iconName: string;
	selectedIconId: string;
	setSelectedIconId: React.Dispatch<React.SetStateAction<string>>;
}) => {
	return (
		<TouchableOpacity
			onPress={() => {
				setSelectedIconId(id);
			}}
			style={{
				borderColor: id == selectedIconId ? COLORS.borderActive : COLORS.border,
				borderWidth: 2,
				padding: 20,
				borderRadius: "50%",
				marginHorizontal: 10,
				backgroundColor: COLORS.background,
			}}
		>
			<Ionicons name={iconName as any} color={COLORS.buttonPrimary} size={30} />
		</TouchableOpacity>
	);
};

export default IconSelect;

const styles = StyleSheet.create({});
