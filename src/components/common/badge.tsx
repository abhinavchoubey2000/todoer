import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Badge = ({ text, color }: { text: string; color: string }) => {
	return (
		<View
			style={{
				backgroundColor: color,
				paddingVertical: 5,
				paddingHorizontal: 5,
			}}
		>
			<Text style={{ color: "white", fontSize: 10 }}>{text}</Text>
		</View>
	);
};

export default Badge;

const styles = StyleSheet.create({});
