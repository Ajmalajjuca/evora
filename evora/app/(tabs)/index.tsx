import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const categories = ["All", "Technology", "Music", "Art", "Sports", "Food"];

const events = [
  {
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
    description: "The premier technology conference bringing together innovators and thought leaders.",
  },
  {
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
    description: "An unforgettable evening of live music featuring top artists from around the world.",
  },
  {
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
    description: "Explore contemporary masterpieces from renowned artists in an immersive gallery experience.",
  },
  {
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
    description: "A culinary adventure featuring gourmet food trucks and local delicacies.",
  },
];

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState(0);
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#E8DCC8]">
      <StatusBar barStyle="dark-content" backgroundColor="#E8DCC8" />

      {/* Header */}
      <View className="px-6 pt-4 pb-5">
        <Text className="text-[40px] font-extrabold text-[#2C1810] mb-1" style={{ letterSpacing: -1 }}>
          Discover
        </Text>
        <Text className="text-base text-[#8B6F47]">
          Find amazing events near you
        </Text>
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >


        {/* Events List */}
        <View className="px-6 gap-6">
          {events.map((event) => (
            <TouchableOpacity
              key={event.id}
              onPress={() => router.push(`/event/${event.id}`)}
              activeOpacity={0.95}
              className="bg-[#F5EFE6] rounded-[32px] overflow-hidden border-2 border-[#2C1810]"
              style={{
                shadowColor: "#2C1810",
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.15,
                shadowRadius: 12,
                elevation: 8,
              }}
            >
              {/* Image Container with Border */}
              <View className="p-4">
                <View className="rounded-[24px] overflow-hidden border-2 border-[#2C1810]">
                  <Image
                    source={{ uri: event.image }}
                    className="w-full h-56"
                    resizeMode="cover"
                  />
                </View>
              </View>

              {/* Content */}
              <View className="px-6 pb-6">
                {/* Title */}
                <Text className="text-2xl font-bold text-[#2C1810] mb-3 text-center" style={{ fontFamily: 'serif' }}>
                  {event.title}
                </Text>

                {/* Meta Info */}
                <View className="flex-row items-center justify-center mb-3 gap-2">
                  <Text className="text-sm text-[#8B6F47] font-medium">{event.date.split(',')[1]}</Text>
                  <View className="w-1 h-1 rounded-full bg-[#8B6F47]" />
                  <Text className="text-sm text-[#8B6F47] font-medium">{event.category}</Text>
                  <View className="w-1 h-1 rounded-full bg-[#8B6F47]" />
                  <Text className="text-sm text-[#8B6F47] font-medium">{event.duration}</Text>
                </View>

                {/* Rating Stars */}
                <View className="flex-row items-center justify-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Ionicons
                      key={star}
                      name={star <= Math.round(event.rating) ? "star" : "star-outline"}
                      size={18}
                      color="#C17B3C"
                      style={{ marginHorizontal: 2 }}
                    />
                  ))}
                </View>

                {/* Description */}
                <Text className="text-sm text-[#8B6F47] text-center leading-5 mb-5">
                  {event.description}
                </Text>

                {/* Details */}
                <View className="gap-2.5">
                  <View className="flex-row items-center justify-center">
                    <Ionicons name="calendar-outline" size={16} color="#8B6F47" />
                    <Text className="ml-2 text-sm text-[#2C1810] font-medium">
                      {event.date} at {event.time}
                    </Text>
                  </View>
                  <View className="flex-row items-center justify-center">
                    <Ionicons name="location-outline" size={16} color="#8B6F47" />
                    <Text className="ml-2 text-sm text-[#2C1810] font-medium">
                      {event.location}
                    </Text>
                  </View>
                  <View className="flex-row items-center justify-center">
                    <Ionicons name="people-outline" size={16} color="#8B6F47" />
                    <Text className="ml-2 text-sm text-[#2C1810] font-medium">
                      {event.attendees}+ attendees
                    </Text>
                  </View>
                </View>

                {/* Buy Ticket Button */}
                <TouchableOpacity
                  className="bg-[#2C1810] rounded-full py-3.5 mt-5"
                  style={{
                    shadowColor: "#2C1810",
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 8,
                    elevation: 6,
                  }}
                >
                  <Text className="text-[#F5EFE6] text-center font-bold text-base tracking-wider">
                    BUY TICKET
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
