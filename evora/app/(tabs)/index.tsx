import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { getAllEvents } from "../../lib/eventService";
import { IEvent } from "@/lib/types/event";

export default function HomeScreen() {
  const router = useRouter();
  const [events, setEvents] = useState<IEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = async (isRefresh = false) => {
    try {
      if (!isRefresh) setLoading(true);
      setError(null);
      const response = await getAllEvents();
      const data = response.data;
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
      setError("Failed to load events. Pull to retry.");
    } finally {
      setLoading(false);
      if (isRefresh) setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchEvents(true);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const formatPrice = (price: number) => {
    return price === 0 ? "FREE" : `₹${price}`;
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-[#E8DCC8]">
        <StatusBar barStyle="dark-content" backgroundColor="#E8DCC8" />
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#2C1810" />
          <Text className="mt-4 text-[#8B6F47] text-base">
            Loading events...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#E8DCC8]">
      <StatusBar barStyle="dark-content" backgroundColor="#E8DCC8" />

      {/* Header */}
      <View className="px-6 pt-4 pb-5">
        <Text
          className="text-[40px] font-extrabold text-[#2C1810] mb-1"
          style={{ letterSpacing: -1 }}
        >
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
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#2C1810"
            colors={["#2C1810"]}
          />
        }
      >
        {/* Error State */}
        {error && (
          <View className="px-6 mb-6">
            <View className="bg-red-100 border-2 border-red-400 rounded-2xl p-4">
              <View className="flex-row items-center mb-2">
                <Ionicons name="warning" size={20} color="#DC2626" />
                <Text className="ml-2 text-red-700 font-bold">Error</Text>
              </View>
              <Text className="text-red-600 text-sm">{error}</Text>
            </View>
          </View>
        )}

        {/* Empty State */}
        {!error && events.length === 0 && (
          <View className="flex-1 justify-center items-center px-6 py-20">
            <View className="bg-[#F5EFE6] rounded-full p-8 mb-6 border-2 border-[#D4C4B0]">
              <Ionicons name="calendar-outline" size={64} color="#8B6F47" />
            </View>
            <Text className="text-2xl font-bold text-[#2C1810] mb-2 text-center">
              No Events Yet
            </Text>
            <Text className="text-[#8B6F47] text-center text-base">
              Check back later for exciting events!
            </Text>
          </View>
        )}

        {/* Events List */}
        <View className="px-6 gap-6">
          {events.map((event) => (
            <TouchableOpacity
              key={event._id}
              onPress={() => router.push(`/event/${event._id}`)}
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
              {/* Image Container with Price Badge */}
              <View className="p-4">
                <View className="rounded-[24px] overflow-hidden border-2 border-[#2C1810] relative">
                  <Image
                    source={{
                      uri: event.image || "https://via.placeholder.com/400x300",
                    }}
                    className="w-full h-56"
                    resizeMode="cover"
                  />
                  {/* Price Badge */}
                  <View className="absolute top-4 right-4">
                    <View
                      className={`${
                        event.price === "0"
                          ? "bg-green-500"
                          : "bg-[#2C1810]"
                      } px-4 py-2 rounded-full border-2 border-white`}
                      style={{
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.25,
                        shadowRadius: 4,
                        elevation: 5,
                      }}
                    >
                      <Text className="text-white font-black text-sm tracking-wider">
                        {formatPrice(Number(event.price) )}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Content */}
              <View className="px-6 pb-6">
                {/* Title */}
                <Text
                  className="text-2xl font-bold text-[#2C1810] mb-3 text-center"
                  style={{ fontFamily: "serif" }}
                  numberOfLines={2}
                >
                  {event.title}
                </Text>

                {/* Details */}
                <View className="gap-2.5 bg-white/50 rounded-2xl p-4 mb-4">
                  <View className="flex-row items-center">
                    <View className="bg-[#F5EFE6] rounded-full p-2 mr-3 border border-[#D4C4B0]">
                      <Ionicons name="calendar-outline" size={16} color="#8B6F47" />
                    </View>
                    <Text className="text-sm text-[#2C1810] font-medium flex-1">
                      {new Date(event.date).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}{" "}
                      at {event.time}
                    </Text>
                  </View>
                  <View className="flex-row items-center">
                    <View className="bg-[#F5EFE6] rounded-full p-2 mr-3 border border-[#D4C4B0]">
                      <Ionicons name="location-outline" size={16} color="#8B6F47" />
                    </View>
                    <Text
                      className="text-sm text-[#2C1810] font-medium flex-1"
                      numberOfLines={1}
                    >
                      {event.location}
                    </Text>
                  </View>
                  <View className="flex-row items-center">
                    <View className="bg-[#F5EFE6] rounded-full p-2 mr-3 border border-[#D4C4B0]">
                      <Ionicons name="people-outline" size={16} color="#8B6F47" />
                    </View>
                    <Text className="text-sm text-[#2C1810] font-medium flex-1">
                      {event.attendees}+ attendees
                    </Text>
                  </View>
                </View>

                {/* Buy Ticket Button */}
                <TouchableOpacity
                  className="bg-[#2C1810] rounded-full py-3.5 flex-row items-center justify-center"
                  style={{
                    shadowColor: "#2C1810",
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 8,
                    elevation: 6,
                  }}
                  activeOpacity={0.8}
                >
                  <Ionicons name="ticket-outline" size={20} color="#F5EFE6" />
                  <Text className="text-[#F5EFE6] font-bold text-base tracking-wider ml-2">
                    {Number(event.price) === 0 ? "GET FREE TICKET" : `BUY FOR ${formatPrice(Number(event.price))}`}
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
