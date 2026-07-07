import { COLORS } from "@/constants/colors";
import { UPDATE_INFO, UPDATE_VERSION } from "@/constants/update";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";

interface UpdateModalProps {
	isVisible: boolean;
	onClose: () => void;
}

const UpdateModal = ({ isVisible, onClose }: UpdateModalProps) => {
	return (
		<Modal
			isVisible={isVisible}
			onBackdropPress={onClose}
			onBackButtonPress={onClose}
			animationIn="zoomIn"
			animationOut="zoomOut"
			backdropOpacity={0.6}
			useNativeDriver
		>
			<View style={styles.container}>
				<View style={styles.header}>
					<Ionicons name="sparkles" size={32} color={COLORS.buttonPrimary} />

					<Text style={styles.title}>{UPDATE_INFO.title}</Text>

					<Text style={styles.version}>Version {UPDATE_VERSION}</Text>
				</View>

				<View style={styles.features}>
					{UPDATE_INFO.features.map((feature, index) => (
						<View key={index} style={styles.featureRow}>
							<Ionicons
								name="checkmark-circle"
								size={18}
								color={COLORS.buttonPrimary}
							/>

							<Text style={styles.featureText}>{feature}</Text>
						</View>
					))}
				</View>

				<Pressable style={styles.button} onPress={onClose}>
					<Text style={styles.buttonText}>Got it</Text>
				</Pressable>
			</View>
		</Modal>
	);
};

export default React.memo(UpdateModal);

const styles = StyleSheet.create({
	container: {
		backgroundColor: COLORS.surface,
		borderRadius: 18,
		padding: 20,
	},

	header: {
		alignItems: "center",
		marginBottom: 20,
	},

	title: {
		fontSize: 22,
		fontWeight: "700",
		color: COLORS.textPrimary,
		marginTop: 10,
	},

	version: {
		marginTop: 4,
		fontSize: 13,
		color: COLORS.textMuted,
	},

	features: {
		gap: 14,
		marginBottom: 25,
	},

	featureRow: {
		flexDirection: "row",
		alignItems: "flex-start",
	},

	featureText: {
		flex: 1,
		marginLeft: 10,
		fontSize: 15,
		lineHeight: 22,
		color: COLORS.textSecondary,
	},

	button: {
		height: 50,
		borderRadius: 12,
		backgroundColor: COLORS.buttonPrimary,
		justifyContent: "center",
		alignItems: "center",
	},

	buttonText: {
		color: "#FFF",
		fontSize: 16,
		fontWeight: "600",
	},
});
