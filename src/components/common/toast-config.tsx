import { COLORS } from "@/constants/colors";
import { BaseToast, ErrorToast, ToastConfig } from "react-native-toast-message";

export const toastConfig: ToastConfig = {
	success: (props) => (
		<BaseToast
			{...props}
			style={{
				borderLeftColor: "#22C55E",
				backgroundColor: COLORS.surface,
				borderRadius: 14,
				marginHorizontal: 12,
				height: 72,
				borderWidth: 1,
				borderColor: "#1A2533",
			}}
			contentContainerStyle={{
				paddingHorizontal: 15,
			}}
			text1Style={{
				color: COLORS.textPrimary,
				fontSize: 16,
				fontWeight: "600",
			}}
			text2Style={{
				color: COLORS.textSecondary,
				fontSize: 13,
			}}
		/>
	),

	error: (props) => (
		<ErrorToast
			{...props}
			style={{
				borderLeftColor: "#EF4444",
				backgroundColor: COLORS.success,
				borderRadius: 14,
				marginHorizontal: 12,
				height: 72,
				borderWidth: 1,
				borderColor: "#1A2533",
			}}
			contentContainerStyle={{
				paddingHorizontal: 15,
			}}
			text1Style={{
				color: COLORS.textPrimary,
				fontSize: 16,
				fontWeight: "600",
			}}
			text2Style={{
				color: COLORS.textSecondary,
				fontSize: 13,
			}}
		/>
	),

	info: (props) => (
		<BaseToast
			{...props}
			style={{
				borderLeftColor: COLORS.textBlue,
				backgroundColor: COLORS.surface,
				borderRadius: 14,
				marginHorizontal: 12,
				height: 72,
				borderWidth: 1,
				borderColor: "#1A2533",
			}}
			contentContainerStyle={{
				paddingHorizontal: 15,
			}}
			text1Style={{
				color: COLORS.textPrimary,
				fontSize: 16,
				fontWeight: "600",
			}}
			text2Style={{
				color: COLORS.textSecondary,
				fontSize: 13,
			}}
		/>
	),
};
