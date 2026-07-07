import { COLORS } from "@/constants/colors";
import React from "react";
import {
	StyleSheet,
	Text,
	TextInput,
	TextInputProps,
	View,
} from "react-native";

const Input = ({
	title = "Title",
	placeholder = "Placeholder text",
	multiline = false,
	text = "",
	setText = () => {},
	returnKeyType,
	returnKeyFunction,
}: {
	title: string;
	placeholder: string;
	multiline?: boolean;
	text: string;
	setText: (text: string) => void;
	returnKeyType?: TextInputProps["returnKeyType"];
	returnKeyFunction?: () => void;
}) => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>{title}</Text>
			<TextInput
				style={styles.input}
				placeholderTextColor={COLORS.inputPlaceholder}
				placeholder={placeholder}
				multiline={multiline}
				value={text}
				onChangeText={setText}
				returnKeyType={returnKeyType}
				onSubmitEditing={returnKeyFunction}
			/>
		</View>
	);
};

export default Input;

const styles = StyleSheet.create({
	container: {
		backgroundColor: COLORS.surface,
		borderColor: COLORS.inputBorder,
		borderWidth: 1,
		paddingVertical: 18,
		paddingHorizontal: 15,
		borderRadius: 18,
		marginVertical: 5,
	},
	title: {
		color: "white",
		fontFamily: "sans-serif-medium",
		fontSize: 20,
		opacity: 0.8,
	},
	input: {
		color: "white",
		fontFamily: "sans-serif-thin",
		fontSize: 16,
	},
});
