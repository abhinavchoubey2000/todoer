import Header from "@/components/common/header";
import { COLORS } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function Layout() {
	return (
		<Tabs
			screenOptions={{
				tabBarStyle: {
					backgroundColor: COLORS.tabBarBackground,
					paddingTop: 8,
					height: 120,
					borderTopWidth: 0,
					elevation: 1,
					shadowOpacity: 0,
				},
				tabBarActiveTintColor: COLORS.tabBarActive,
				tabBarInactiveTintColor: COLORS.tabBarInactive,
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					headerShown: false,
					title: "Projects",
					tabBarIcon: ({ color, size }) => (
						<Ionicons color={color} size={size} name="folder-open" />
					),
				}}
			/>
			<Tabs.Screen
				name="analytics"
				options={{
					header: () => <Header title="Analytics" />,
					title: "Analytics",
					tabBarIcon: ({ color, size }) => (
						<Ionicons color={color} size={size} name="bar-chart" />
					),
				}}
			/>
			<Tabs.Screen
				name="settings"
				options={{
					header: () => <Header title="Settings" searchBar />,
					title: "Settings",
					tabBarIcon: ({ color, size }) => (
						<Ionicons color={color} size={size} name="settings" />
					),
				}}
			/>
		</Tabs>
	);
}
