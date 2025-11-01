// app/(tabs)/profile.tsx
import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export default function ProfileTab() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = useCallback(async () => {
    try {
      const stored = await AsyncStorage.getItem("user");
      if (!stored) {
        setIsAuthenticated(false);
        router.replace("/(auth)/login");
      } else {
        setUser(JSON.parse(stored));
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Auth check failed", error);
      setIsAuthenticated(false);
      router.replace("/(auth)/login");
    }
  }, [router]);

  const handleLogout = useCallback(() => {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await AsyncStorage.removeItem("user");
          await AsyncStorage.removeItem("token");
          setUser(null);
          setIsAuthenticated(false);
          Toast.show({
            type: "success",
            text1: "Logged out successfully 👋",
          });
          setTimeout(() => router.replace("/(auth)/login"));
        },
      },
    ]);
  }, [router]);

  const menuItems = [
    { icon: "person-outline", label: "Edit Profile", color: "#C17B3C" },
    { icon: "notifications-outline", label: "Notifications", color: "#8B6F47" },
    { icon: "settings-outline", label: "Settings", color: "#C17B3C" },
    { icon: "help-circle-outline", label: "Help & Support", color: "#8B6F47" },
    { icon: "log-out-outline", label: "Logout", color: "#A0522D", onPress: handleLogout },
  ];

  if (isAuthenticated === null) {
    return null; // Loading state
  }

  if (!user) {
    return null; // Will redirect via checkAuth
  }

  return (
    <SafeAreaView className="flex-1 bg-[#E8DCC8]">
      <StatusBar barStyle="dark-content" backgroundColor="#E8DCC8" />
      <View className="px-6 pt-4 pb-8">
        <Text className="text-[40px] font-extrabold text-[#2C1810] mb-6">
          Profile
        </Text>
        <View className="bg-[#F5EFE6] rounded-[28px] p-6 items-center border-2 border-[#2C1810]">
          <View className="w-24 h-24 rounded-full border-[3px] border-[#2C1810] overflow-hidden mb-4">
            <Image
              source={{ uri: user.avatar || "https://i.pravatar.cc/150" }}
              className="w-full h-full"
            />
          </View>
          <Text className="text-2xl font-bold text-[#2C1810] mb-1">{user.name}</Text>
          <Text className="text-[#8B6F47]">{user.email}</Text>
        </View>
      </View>
      <ScrollView className="flex-1 px-6">
        <View className="gap-3 pb-32">
          {menuItems.map((item, idx) => (
            <TouchableOpacity
              key={idx}
              onPress={item.onPress}
              className="bg-[#F5EFE6] rounded-2xl p-4 flex-row items-center border-2 border-[#D4C4B0]"
            >
              <View className="w-12 h-12 rounded-full bg-[#E8DCC8] items-center justify-center mr-4">
                <Ionicons name={item.icon as any} size={24} color={item.color} />
              </View>
              <Text className="flex-1 text-base font-bold text-[#2C1810]">{item.label}</Text>
              <Ionicons name="chevron-forward" size={22} color="#8B6F47" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <Toast />
    </SafeAreaView>
  );
}
