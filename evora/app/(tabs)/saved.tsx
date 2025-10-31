import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";import { Ionicons } from "@expo/vector-icons";

export default function SavedScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#E8DCC8]">
      <StatusBar barStyle="dark-content" backgroundColor="#E8DCC8" />

      <View className="px-6 pt-4 pb-5">
        <Text className="text-[40px] font-extrabold text-[#2C1810] mb-1" style={{ letterSpacing: -1 }}>
          Saved Events
        </Text>
        <Text className="text-base text-[#8B6F47]">
          Your favorite events
        </Text>
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        <View className="flex-1 items-center justify-center py-20">
          <View className="w-28 h-28 rounded-full bg-[#F5EFE6] border-2 border-[#D4C4B0] items-center justify-center mb-6">
            <Ionicons name="heart-outline" size={56} color="#C17B3C" />
          </View>
          <Text className="text-2xl font-bold text-[#2C1810] mb-3 text-center">
            No Saved Events
          </Text>
          <Text className="text-[#8B6F47] text-center text-base leading-6 px-8">
            Save events you're interested in to find them here quickly and easily.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
