import { COLORS } from "@/constants/colors";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";

const InfoModal = ({
	message,
	isVisible,
	setIsVisible,
	action,
}: {
	message: string;
	isVisible: boolean;
	setIsVisible: (visible: boolean) => void;
	action: string;
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
					backgroundColor: COLORS.modal,
				}}
			>
				<Text style={{ color: "white", fontFamily: "sans-serif-thin" }}>
					{action}
				</Text>
				<View>
					<Text style={{ ...styles.message, color: "white" }}>{message}</Text>
				</View>

				<View style={styles.buttonContainer}>
					<TouchableOpacity
						onPress={() => {
							setIsVisible(false);
						}}
					>
						<Text
							style={{
								...styles.button,
								color: COLORS.buttonPrimary,
							}}
						>
							Ok
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
};

export default InfoModal;

const styles = StyleSheet.create({
	container: {
		paddingVertical: 15,
		paddingHorizontal: 20,
		width: "100%",
		borderRadius: 15,
		display: "flex",
		gap: 20,
	},
	message: {
		fontSize: 20,
		width: 370,
		fontFamily: "sans-serif-medium",
	},
	button: {
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
