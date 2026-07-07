import { toastConfig } from "@/components/common/toast-config";
import UpdateChecker from "@/components/common/update-checker";
import { persistor, store } from "@/redux/store";
import * as NavigationBar from "expo-navigation-bar";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
	useEffect(() => {
		const setup = async () => {
			// Hide splash screen
			await SplashScreen.hideAsync();

			// Set Android navigation bar style
			await NavigationBar.setStyle("light");
		};

		setup();
	}, []);

	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<Stack screenOptions={{ animation: "fade_from_bottom" }}>
					<Stack.Screen name="(bottom-tabs)" options={{ headerShown: false }} />
				</Stack>
				<Toast
					config={toastConfig}
					position="top"
					topOffset={60}
					visibilityTime={2500}
					autoHide
				/>
				<UpdateChecker/>
			</PersistGate>
		</Provider>
	);
}
