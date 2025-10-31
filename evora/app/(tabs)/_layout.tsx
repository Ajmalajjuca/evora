import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View, Platform } from "react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#C17B3C",
        tabBarInactiveTintColor: "#8B6F47",
        tabBarStyle: {
          backgroundColor: "#2C1810",
          borderTopWidth: 0,
          height: Platform.OS === "ios" ? 88 : 70,
          paddingTop: 15,
          paddingBottom: Platform.OS === "ios" ? 28 : 12,
          position: "absolute",
          bottom: 0,
          left: 20,
          right: 20,
          borderRadius: 28,
          borderWidth: 2,
          borderColor: "#2C1810",
          elevation: 12,
          shadowColor: "#2C1810",
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.4,
          shadowRadius: 20,
        },
        tabBarLabelStyle: {
          fontSize: 1,
          color: "transparent",
        },
        tabBarIconStyle: {
          marginTop: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Events",
          tabBarIcon: ({ color, focused }) => (
            <View
              className={`w-12 h-12 rounded-full items-center justify-center ${
                focused ? "bg-[#C17B3C]" : ""
              }`}
            >
              <Ionicons
                name={focused ? "calendar" : "calendar-outline"}
                size={24}
                color={focused ? "#F5EFE6" : color}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="tickets"
        options={{
          title: "Tickets",
          tabBarIcon: ({ color, focused }) => (
            <View
              className={`w-12 h-12 rounded-full items-center justify-center ${
                focused ? "bg-[#C17B3C]" : ""
              }`}
            >
              <Ionicons
                name={focused ? "ticket" : "ticket-outline"}
                size={24}
                color={focused ? "#F5EFE6" : color}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: "Saved",
          tabBarIcon: ({ color, focused }) => (
            <View
              className={`w-12 h-12 rounded-full items-center justify-center ${
                focused ? "bg-[#C17B3C]" : ""
              }`}
            >
              <Ionicons
                name={focused ? "heart" : "heart-outline"}
                size={24}
                color={focused ? "#F5EFE6" : color}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <View
              className={`w-12 h-12 rounded-full items-center justify-center ${
                focused ? "bg-[#C17B3C]" : ""
              }`}
            >
              <Ionicons
                name={focused ? "person" : "person-outline"}
                size={24}
                color={focused ? "#F5EFE6" : color}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
