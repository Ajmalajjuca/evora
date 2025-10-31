import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";import { Ionicons } from "@expo/vector-icons";

export default function ProfileScreen() {
  const menuItems = [
    { icon: "person-outline", label: "Edit Profile", color: "#C17B3C" },
    { icon: "notifications-outline", label: "Notifications", color: "#8B6F47" },
    { icon: "settings-outline", label: "Settings", color: "#C17B3C" },
    { icon: "help-circle-outline", label: "Help & Support", color: "#8B6F47" },
    { icon: "log-out-outline", label: "Logout", color: "#A0522D" },
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#E8DCC8]">
      <StatusBar barStyle="dark-content" backgroundColor="#E8DCC8" />

      <View className="px-6 pt-4 pb-8">
        <Text className="text-[40px] font-extrabold text-[#2C1810] mb-6" style={{ letterSpacing: -1 }}>
          Profile
        </Text>

        {/* Profile Card */}
        <View className="bg-[#F5EFE6] rounded-[28px] p-6 items-center border-2 border-[#2C1810]"
          style={{
            shadowColor: "#2C1810",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 12,
            elevation: 6,
          }}
        >
          <View className="w-24 h-24 rounded-full border-3 border-[#2C1810] overflow-hidden mb-4">
            <Image
              source={{ uri: "https://i.pravatar.cc/150?img=5" }}
              className="w-full h-full"
            />
          </View>
          <Text className="text-2xl font-bold text-[#2C1810] mb-1">
            Ajmal ibn Abdul Jaleel
          </Text>
          <Text className="text-[#8B6F47]">
            zephyrion@ajuu.online
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        <View className="gap-3 pb-32">
          {menuItems.map((item, idx) => (
            <TouchableOpacity
              key={idx}
              className="bg-[#F5EFE6] rounded-2xl p-4 flex-row items-center border-2 border-[#D4C4B0]"
              style={{
                shadowColor: "#2C1810",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 8,
                elevation: 3,
              }}
            >
              <View className="w-12 h-12 rounded-full bg-[#E8DCC8] items-center justify-center mr-4">
                <Ionicons name={item.icon as any} size={24} color={item.color} />
              </View>
              <Text className="flex-1 text-base font-bold text-[#2C1810]">
                {item.label}
              </Text>
              <Ionicons name="chevron-forward" size={22} color="#8B6F47" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
