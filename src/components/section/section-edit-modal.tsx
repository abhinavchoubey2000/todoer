import { COLORS } from "@/constants/colors";
import { TOAST } from "@/constants/toast-messages";
import { editSection } from "@/redux/slices/project";
import { RootState } from "@/redux/store";
import { showSuccess } from "@/utlis/toast";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { useDispatch, useSelector } from "react-redux";
import Input from "../common/input";

const EditSectionModel = ({
	isVisible,
	setIsVisible,
	projectId,
	sectionId,
}: {
	isVisible: boolean;
	setIsVisible: (visible: boolean) => void;
	projectId: string | string[];
	sectionId: string;
}) => {
	const { projects } = useSelector((state: RootState) => state.Project);
	const currentSection = projects
		.find((p) => p.projectId === projectId)
		?.sections.find((s) => s.sectionId === sectionId);
	const [sectionName, setSectionName] = useState(
		currentSection?.sectionTitle ?? "",
	);
	const dispatch = useDispatch();

	const handleEditSection = () => {
		if (!sectionName) return;

		if (currentSection) {
			const section: SectionType | undefined = {
				...currentSection,
				sectionTitle: sectionName,
			};

			dispatch(
				editSection({
					projectId,
					section,
				}),
			);
			showSuccess(TOAST.SECTION_UPDATED);
		}

		setIsVisible(false);
	};

	return (
		<Modal
			isVisible={isVisible}
			onBackdropPress={() => setIsVisible(false)}
			onBackButtonPress={() => setIsVisible(false)}
			animationIn={"zoomIn"}
			animationOut={"zoomOut"}
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
					returnKeyFunction={handleEditSection}
				/>
				{sectionName && (
					<TouchableOpacity
						onPress={handleEditSection}
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
							Save
						</Text>
					</TouchableOpacity>
				)}
			</View>
		</Modal>
	);
};

export default EditSectionModel;

const styles = StyleSheet.create({});
