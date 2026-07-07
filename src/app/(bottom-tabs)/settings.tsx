import InfoModal from "@/components/common/info-modal";
import WarningModal from "@/components/common/warning-modal";
import AboutModal from "@/components/settings/about-modal";
import SettingsGroup from "@/components/settings/settings-group";
import SettingsItem from "@/components/settings/settings-item";
import { COLORS } from "@/constants/colors";
import { TOAST } from "@/constants/toast-messages";
import { clearAnalytics } from "@/redux/slices/analytics";
import { clearData } from "@/redux/slices/project";
import { toggleDeleteTaskOnComplete } from "@/redux/slices/settings";
import { RootState } from "@/redux/store";
import { showSuccess } from "@/utlis/toast";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Switch } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const SettingsScreen = () => {
	const [aboutVisible, setAboutVisible] = useState(false);
	const { deleteTaskOnComplete } = useSelector(
		(state: RootState) => state.Settings,
	);
	const [warningModalVisible, setWarningModalVisible] = useState(false);
	const dispatch = useDispatch();
	const [infoModalData, setInfoModalData] = useState({
		message: "",
		isVisible: false,
		action: "",
	});

	const handleExportData = () => {
		setInfoModalData({
			message: "Coming Soon, Export feature will be available soon.",
			action: "Info",
			isVisible: true,
		});
		return;
	};

	const handleClearData = () => {
		dispatch(clearData());
		dispatch(clearAnalytics());
		showSuccess(TOAST.DATA_CLEARED);
	};
	const handleToggleSwitch = () => {
		dispatch(toggleDeleteTaskOnComplete());
	};

	return (
		<>
			<InfoModal
				message={infoModalData.message}
				action={infoModalData.action}
				isVisible={infoModalData.isVisible}
				setIsVisible={(visible) => {
					setInfoModalData((prev) => ({ ...prev, isVisible: visible }));
				}}
			/>
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.container}
				horizontal={false}
			>
				<SettingsGroup title="Task">
					<SettingsItem
						title="Delete task on complete"
						icon="checkmark-done-circle-sharp"
						iconColor="#F59E0B"
						rightComponent={
							<Switch
								value={deleteTaskOnComplete}
								onChange={() => {
									handleToggleSwitch();
								}}
								trackColor={{
									false: "#3A3A3A",
									true: "#F59E0B",
								}}
								thumbColor={deleteTaskOnComplete ? "#FFFFFF" : "#CFCFCF"}
								ios_backgroundColor="#3A3A3A"
							/>
						}
					/>
				</SettingsGroup>
				<SettingsGroup title="Data">
					<SettingsItem
						title="Export Data"
						icon="download-outline"
						iconColor="#4CAF50"
						onPress={handleExportData}
						rightComponent={
							<Ionicons
								name="chevron-forward"
								size={20}
								color={COLORS.textMuted}
							/>
						}
					/>

					<SettingsItem
						title="Clear All Data"
						icon="trash-outline"
						iconColor="#F44336"
						isDanger
						onPress={() => {
							setWarningModalVisible(true);
						}}
						rightComponent={
							<Ionicons
								name="chevron-forward"
								size={20}
								color={COLORS.textMuted}
							/>
						}
					/>
				</SettingsGroup>

				<SettingsGroup title="About">
					<SettingsItem
						title="About Todoer"
						icon="information-circle-outline"
						iconColor="#2196F3"
						onPress={() => setAboutVisible(true)}
						rightComponent={
							<Ionicons
								name="chevron-forward"
								size={20}
								color={COLORS.textMuted}
							/>
						}
					/>
				</SettingsGroup>
			</ScrollView>

			<AboutModal isVisible={aboutVisible} setIsVisible={setAboutVisible} />
			<WarningModal
				action="Clear Data"
				isVisible={warningModalVisible}
				setIsVisible={setWarningModalVisible}
				yesFunction={handleClearData}
				message="Do you really want to clear all your data?"
				warningMessage="All your projects, sections and tasks will be permanently removed and this action is irreversible"
			/>
		</>
	);
};

export default SettingsScreen;

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 10,
		paddingVertical: 15,
		backgroundColor: COLORS.background,
		flexGrow: 1,
	},
});
