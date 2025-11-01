// app/_layout.tsx
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "../global.css";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" backgroundColor="#E8DCC8" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#E8DCC8" },
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="event/[id]"
          options={{
            headerShown: false,
            presentation: "card",
            animation: "slide_from_bottom",
          }}
        />
      </Stack>
    </>
  );
}
