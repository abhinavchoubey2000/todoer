import { COLORS } from "@/constants/colors";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";

const WarningModal = ({
	message,
	warningMessage,
	yesFunction,
	isVisible,
	setIsVisible,
	theme,
	action,
}: {
	message: string;
	yesFunction: () => void;
	isVisible: boolean;
	setIsVisible: (visible: boolean) => void;
	theme?: { surface: string; background: string; icon: string };
	action: string;
	warningMessage?: string;
}) => {
	return (
		<Modal
			isVisible={isVisible}
			onBackdropPress={() => setIsVisible(false)}
			onBackButtonPress={() => setIsVisible(false)}
			animationIn={"zoomIn"}
			animationOut={"zoomOut"}
			style={{
				justifyContent: "center",
				alignItems: "center",
				margin: 0,
				paddingHorizontal: 10,
			}}
		>
			<View
				style={{
					...styles.container,
					backgroundColor: theme ? theme.background : COLORS.modal,
				}}
			>
				<Text style={{ color: "white", fontFamily: "sans-serif-thin" }}>
					{action}
				</Text>
				<View>
					<Text style={{ ...styles.message, color: "white" }}>{message}</Text>
					{warningMessage && (
						<Text style={{ ...styles.warningMessage, color: COLORS.danger }}>
							({warningMessage})
						</Text>
					)}
				</View>

				<View style={styles.buttonContainer}>
					<TouchableOpacity
						onPress={() => {
							(yesFunction(), setIsVisible(false));
						}}
					>
						<Text
							style={{
								...styles.button,
								color: theme ? theme.icon : COLORS.buttonPrimary,
							}}
						>
							Yes
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => {
							setIsVisible(false);
						}}
					>
						<Text
							style={{
								...styles.button,
								color: theme ? theme.icon : COLORS.buttonPrimary,
							}}
						>
							No
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
};

export default WarningModal;

const styles = StyleSheet.create({
	container: {
		// backgroundColor: COLORS.surface,
		paddingVertical: 15,
		paddingHorizontal: 20,
		width: "100%",
		borderRadius: 15,
		display: "flex",
		gap: 20,
	},
	message: {
		// color: "white",
		fontSize: 20,
		width: 370,
		fontFamily: "sans-serif-medium",
	},
	button: {
		// color: COLORS.buttonPrimary,
		width: 50,
	},
	buttonContainer: {
		display: "flex",
		flexDirection: "row",
		gap: 20,
	},
	warningMessage: {
		fontStyle: "italic",
	},
});
