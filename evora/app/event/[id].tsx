import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  Animated,
} from "react-native";
import { useRef } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

// Mock event data
const eventsData = {
  "1": {
    id: "1",
    title: "Tech Summit 2025",
    date: "Nov 15, 2025",
    time: "10:00 AM",
    duration: "2h 30m",
    location: "Convention Center",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
    attendees: 250,
    category: "Technology",
    rating: 4.8,
    description: "The Tech Summit 2025 is a premier technology conference bringing together innovators, entrepreneurs, and thought leaders from around the globe. Join us for an inspiring day filled with keynote speeches, panel discussions, and networking opportunities. Discover the latest trends in AI, blockchain, and emerging technologies that are shaping our future.",
  },
  "2": {
    id: "2",
    title: "Music Festival",
    date: "Dec 1, 2025",
    time: "6:00 PM",
    duration: "5h",
    location: "Central Park",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800",
    attendees: 1500,
    category: "Music",
    rating: 4.9,
    description: "Experience an unforgettable evening of live music featuring top artists from around the world. This year's festival showcases diverse genres from rock to electronic, jazz to indie. Enjoy multiple stages, food trucks, and an incredible atmosphere under the stars.",
  },
  "3": {
    id: "3",
    title: "Art Exhibition",
    date: "Nov 20, 2025",
    time: "2:00 PM",
    duration: "3h",
    location: "Modern Art Gallery",
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800",
    attendees: 180,
    category: "Art",
    rating: 4.7,
    description: "Explore contemporary masterpieces from renowned artists in an immersive gallery experience. This exhibition features paintings, sculptures, and multimedia installations that challenge perspectives and inspire creativity.",
  },
  "4": {
    id: "4",
    title: "Food Carnival",
    date: "Nov 25, 2025",
    time: "12:00 PM",
    duration: "6h",
    location: "Downtown Square",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800",
    attendees: 500,
    category: "Food",
    rating: 4.6,
    description: "A culinary adventure featuring gourmet food trucks and local delicacies. Taste dishes from around the world prepared by talented chefs and discover new flavors.",
  },
};

export default function EventDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const scrollY = useRef(new Animated.Value(0)).current;

  const event = eventsData[id as keyof typeof eventsData] || eventsData["1"];

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  return (
    <View className="flex-1 bg-[#E8DCC8]">
      <StatusBar barStyle="dark-content" backgroundColor="#E8DCC8" />

      {/* Animated Header */}
      <Animated.View
        className="absolute top-0 left-0 right-0 h-24 bg-[#2C1810] z-20 justify-center px-6"
        style={{
          opacity: headerOpacity,
          paddingTop: 50,
        }}
      >
        <Text className="text-lg font-bold text-[#F5EFE6]" numberOfLines={1}>
          {event.title}
        </Text>
      </Animated.View>

      {/* Back Button */}
      <TouchableOpacity
        onPress={() => router.back()}
        className="absolute top-12 left-6 w-11 h-11 rounded-full bg-[#2C1810] items-center justify-center z-30 border-2 border-[#2C1810]"
        style={{
          shadowColor: "#2C1810",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 8,
        }}
      >
        <Ionicons name="arrow-back" size={24} color="#F5EFE6" />
      </TouchableOpacity>

      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140 }}
      >
        {/* Hero Image with Decorative Top */}
        <View className="bg-[#C17B3C] pt-16 pb-0">
          <View className="px-6 pb-6">
            <View className="rounded-[28px] overflow-hidden border-[3px] border-[#2C1810]">
              <Image
                source={{ uri: event.image }}
                className="w-full h-80"
                resizeMode="cover"
              />
            </View>
          </View>
        </View>

        {/* Main Content Card */}
        <View className="bg-[#F5EFE6] mx-5 -mt-4 rounded-[32px] border-[3px] border-[#2C1810] overflow-hidden"
          style={{
            shadowColor: "#2C1810",
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.2,
            shadowRadius: 16,
            elevation: 12,
          }}
        >
          <View className="px-6 pt-8 pb-6">
            {/* Title */}
            <Text className="text-3xl font-bold text-[#2C1810] text-center mb-4" style={{ fontFamily: 'serif' }}>
              {event.title}
            </Text>

            {/* Meta Info */}
            <View className="flex-row items-center justify-center mb-3 gap-2">
              <Text className="text-sm text-[#8B6F47] font-medium">{event.date.split(',')[1]}</Text>
              <View className="w-1.5 h-1.5 rounded-full bg-[#8B6F47]" />
              <Text className="text-sm text-[#8B6F47] font-medium">{event.category}</Text>
              <View className="w-1.5 h-1.5 rounded-full bg-[#8B6F47]" />
              <Text className="text-sm text-[#8B6F47] font-medium">{event.duration}</Text>
            </View>

            {/* Rating Stars */}
            <View className="flex-row items-center justify-center mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <Ionicons
                  key={star}
                  name={star <= Math.round(event.rating) ? "star" : "star-outline"}
                  size={20}
                  color="#C17B3C"
                  style={{ marginHorizontal: 2 }}
                />
              ))}
            </View>

            {/* Description */}
            <Text className="text-sm text-[#8B6F47] text-center leading-6 mb-8">
              {event.description}
            </Text>

            {/* Info Sections */}
            <View className="gap-4">
              {/* Date & Time */}
              <View className="bg-[#E8DCC8] rounded-2xl p-4 border-2 border-[#D4C4B0]">
                <View className="flex-row items-center">
                  <View className="w-12 h-12 rounded-full bg-[#C17B3C] items-center justify-center mr-4">
                    <Ionicons name="calendar" size={24} color="#F5EFE6" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-xs text-[#8B6F47] mb-1 font-medium">DATE & TIME</Text>
                    <Text className="text-base font-bold text-[#2C1810]">
                      {event.date}
                    </Text>
                    <Text className="text-sm text-[#8B6F47]">{event.time}</Text>
                  </View>
                </View>
              </View>

              {/* Location */}
              <View className="bg-[#E8DCC8] rounded-2xl p-4 border-2 border-[#D4C4B0]">
                <View className="flex-row items-center">
                  <View className="w-12 h-12 rounded-full bg-[#C17B3C] items-center justify-center mr-4">
                    <Ionicons name="location" size={24} color="#F5EFE6" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-xs text-[#8B6F47] mb-1 font-medium">LOCATION</Text>
                    <Text className="text-base font-bold text-[#2C1810]">
                      {event.location}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Attendees */}
              <View className="bg-[#E8DCC8] rounded-2xl p-4 border-2 border-[#D4C4B0]">
                <View className="flex-row items-center">
                  <View className="w-12 h-12 rounded-full bg-[#C17B3C] items-center justify-center mr-4">
                    <Ionicons name="people" size={24} color="#F5EFE6" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-xs text-[#8B6F47] mb-1 font-medium">ATTENDEES</Text>
                    <Text className="text-base font-bold text-[#2C1810]">
                      {event.attendees}+ people registered
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View className="h-8" />
      </Animated.ScrollView>

      {/* Buy Ticket Button - Fixed at bottom */}
      <View
        className="absolute bottom-0 left-0 right-0 px-6 py-5 bg-[#E8DCC8]"
        style={{
          shadowColor: "#2C1810",
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.1,
          shadowRadius: 12,
          elevation: 10,
        }}
      >
        <TouchableOpacity
          className="bg-[#2C1810] rounded-full py-4 border-2 border-[#2C1810]"
          style={{
            shadowColor: "#2C1810",
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.3,
            shadowRadius: 12,
            elevation: 8,
          }}
        >
          <Text className="text-[#F5EFE6] text-center font-bold text-lg tracking-widest">
            BUY TICKET
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
