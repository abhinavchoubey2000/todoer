import { COLORS } from "@/constants/colors";
import { TOAST } from "@/constants/toast-messages";
import { sectionCreated } from "@/redux/slices/analytics";
import { addSection } from "@/redux/slices/project";
import { generateUniqueId } from "@/utlis/generate-unique-id";
import { showSuccess } from "@/utlis/toast";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { useDispatch } from "react-redux";
import Input from "../common/input";

const SectionModel = ({
	isVisible,
	setIsVisible,
	projectId,
}: {
	isVisible: boolean;
	setIsVisible: (visible: boolean) => void;
	projectId: string | string[];
}) => {
	const [sectionName, setSectionName] = useState("");
	const dispatch = useDispatch();

	const handleCreateSection = () => {
		dispatch(
			addSection({
				projectId,
				section: {
					sectionId: generateUniqueId(),
					sectionTitle: sectionName,
					isOpened: true,
					tasks: [],
				},
			}),
		);
		dispatch(sectionCreated());
		setIsVisible(false);
		showSuccess(TOAST.SECTION_CREATED);
	};

	return (
		<Modal
			isVisible={isVisible}
			animationIn={"zoomIn"}
			animationOut={"zoomOut"}
			onBackdropPress={() => setIsVisible(false)}
			onBackButtonPress={() => setIsVisible(false)}
			style={{
				justifyContent: "center",
				margin: 0,
			}}
		>
			<View
				style={{
					paddingVertical: 20,
					paddingHorizontal: 10,
				}}
			>
				<Input
					title="Section"
					text={sectionName}
					setText={setSectionName}
					placeholder="Enter your section name"
					returnKeyType="done"
					returnKeyFunction={handleCreateSection}
				/>
				{sectionName && (
					<TouchableOpacity
						onPress={handleCreateSection}
						style={{
							display: "flex",
							width: "100%",
							justifyContent: "flex-end",
							alignItems: "center",
						}}
					>
						<Text
							style={{
								color: COLORS.buttonPrimary,
								width: "20%",
								textAlign: "center",
							}}
						>
							Create
						</Text>
					</TouchableOpacity>
				)}
			</View>
		</Modal>
	);
};

export default SectionModel;

const styles = StyleSheet.create({});
