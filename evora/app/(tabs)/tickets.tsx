import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";import { Ionicons } from "@expo/vector-icons";

export default function TicketsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#E8DCC8]">
      <StatusBar barStyle="dark-content" backgroundColor="#E8DCC8" />

      <View className="px-6 pt-4 pb-5">
        <Text className="text-[40px] font-extrabold text-[#2C1810] mb-1" style={{ letterSpacing: -1 }}>
          My Tickets
        </Text>
        <Text className="text-base text-[#8B6F47]">
          View your event tickets
        </Text>
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        <View className="flex-1 items-center justify-center py-20">
          <View className="w-28 h-28 rounded-full bg-[#F5EFE6] border-2 border-[#D4C4B0] items-center justify-center mb-6">
            <Ionicons name="ticket-outline" size={56} color="#C17B3C" />
          </View>
          <Text className="text-2xl font-bold text-[#2C1810] mb-3 text-center">
            No Tickets Yet
          </Text>
          <Text className="text-[#8B6F47] text-center text-base leading-6 px-8">
            Your purchased tickets will appear here. Start exploring events to book your first ticket!
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
