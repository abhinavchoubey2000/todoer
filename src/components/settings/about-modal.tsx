import { COLORS } from "@/constants/colors";
import { UPDATE_VERSION } from "@/constants/update";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";

type Props = {
	isVisible: boolean;
	setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const AboutModal = ({ isVisible, setIsVisible }: Props) => {
	return (
		<Modal
			isVisible={isVisible}
			backdropOpacity={0.5}
			animationIn="zoomIn"
			animationOut="zoomOut"
			onBackdropPress={() => setIsVisible(false)}
			onBackButtonPress={() => setIsVisible(false)}
		>
			<View style={styles.container}>
				<View style={styles.iconContainer}>
					{/* <Ionicons
						name="checkbox-outline"
						size={55}
						color={COLORS.buttonPrimary}
					/> */}
					<Image
						source={require("@/assets/images/todoer-logo.png")}
						style={{
							width: 100,
							height: 100,
						}}
					/>
				</View>

				<Text style={styles.title}>Todoer</Text>

				<Text style={styles.tagline}>Organize • Focus • Achieve</Text>

				<Text style={styles.version}>Version {UPDATE_VERSION}</Text>

				<View style={styles.divider} />

				<Text style={styles.description}>
					Todoer is a clean and modern task management app designed to help you
					organize projects, manage tasks efficiently, and stay productive every
					day.
				</Text>

				<View style={styles.divider} />

				<View style={styles.infoRow}>
					<Ionicons
						name="person-outline"
						size={20}
						color={COLORS.buttonPrimary}
					/>
					<View style={styles.infoContent}>
						<Text style={styles.infoTitle}>Developed by</Text>
						<Text style={styles.infoValue}>Abhinav Chaturvedi</Text>
					</View>
				</View>

				<View style={styles.infoRow}>
					<Ionicons
						name="heart-outline"
						size={20}
						color={COLORS.buttonPrimary}
					/>
					<View style={styles.infoContent}>
						<Text style={styles.infoTitle}>Special Thanks</Text>
						<Text style={styles.infoValue}>Thank you for using Todoer ❤️</Text>
					</View>
				</View>

				<View style={styles.divider} />

				<Pressable style={styles.button} onPress={() => setIsVisible(false)}>
					<Text style={styles.buttonText}>Close</Text>
				</Pressable>
			</View>
		</Modal>
	);
};

export default React.memo(AboutModal);

const styles = StyleSheet.create({
	container: {
		backgroundColor: COLORS.surface,
		borderRadius: 24,
		padding: 24,
		borderWidth: 1,
		borderColor: COLORS.border,
	},

	iconContainer: {
		alignItems: "center",
		marginBottom: 15,
	},

	title: {
		fontSize: 28,
		fontFamily: "sans-serif-medium",
		color: COLORS.textPrimary,
		textAlign: "center",
	},

	tagline: {
		fontSize: 14,
		color: COLORS.textSecondary,
		textAlign: "center",
		marginTop: 6,
	},

	version: {
		fontSize: 13,
		color: COLORS.textMuted,
		textAlign: "center",
		marginTop: 10,
	},

	description: {
		fontSize: 15,
		color: COLORS.textSecondary,
		textAlign: "center",
		lineHeight: 24,
	},

	divider: {
		height: 1,
		backgroundColor: COLORS.border,
		marginVertical: 20,
	},

	infoRow: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 18,
	},

	infoContent: {
		marginLeft: 14,
	},

	infoTitle: {
		fontSize: 13,
		color: COLORS.textMuted,
	},

	infoValue: {
		fontSize: 16,
		fontFamily: "sans-serif-medium",
		color: COLORS.textPrimary,
		marginTop: 2,
	},

	button: {
		backgroundColor: COLORS.buttonPrimary,
		paddingVertical: 14,
		borderRadius: 14,
		alignItems: "center",
		marginTop: 5,
	},

	buttonText: {
		fontSize: 16,
		fontFamily: "sans-serif-medium",
		color: "#fff",
	},
});
