import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, View } from "react-native";
import tailwind from "tailwind-rn";

export default function App() {
  return (
    <View style={tailwind("flex-1 items-center justify-center bg-red-400")}>
      <Text>inkme app</Text>
      <StatusBar style="auto" />
    </View>
  );
}
