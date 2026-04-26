import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#000" },
          headerTintColor: "#fff",
          contentStyle: { backgroundColor: "#000" },
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="index" options={{ title: "Galeria" }} />
        <Stack.Screen
          name="viewer/[id]"
          options={{ title: "", headerTransparent: true }}
        />
      </Stack>
    </>
  );
}
