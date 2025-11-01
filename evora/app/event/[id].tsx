import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  Animated,
  ActivityIndicator,
  Alert,
  Share,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { bookEvent, getEventById } from "@/lib/eventService";
import { IEvent } from "@/lib/types/event";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function EventDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const scrollY = useRef(new Animated.Value(0)).current;

  const [event, setEvent] = useState<IEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [ticketCount, setTicketCount] = useState(1);
  const [userId, setUserId] = useState<string | null>(null);

  // Check authentication
  const [bookingData, setBookingData] = useState({
    eventId: id,
    userId: userId,
    ticketQuantity: ticketCount,
    totalAmount: 0
  })
  const checkAuth = async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      if(user){
        const userData = JSON.parse(user);
        setUserId(userData._id);
        setIsAuthenticated(!!user);
      }
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

  // Fetch event details
  const getEvent = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getEventById(id);
      setEvent(response.data);
    } catch (error) {
      console.error("❌ Error fetching event:", error);
      setError("Failed to load event details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
    getEvent();
  }, []);

  // Animated header opacity
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Format price
  const formatPrice = (price: string | number) => {
    const numPrice = typeof price === "string" ? parseFloat(price) : price;
    return numPrice === 0 ? "FREE" : `₹${numPrice}`;
  };

  // Ticket counter functions
  const incrementTicket = () => {
    if (ticketCount < 10) {
      setTicketCount(ticketCount + 1);
    }
  };

  const decrementTicket = () => {
    if (ticketCount > 1) {
      setTicketCount(ticketCount - 1);
    }
  };

  // Handle ticket purchase
const handleBuyTicket = async () => {
  if (!event) return;

  const totalAmount = ticketCount * Number(event.price);

  const newBookingData = {
    eventId: id,
    userId: userId,
    ticketQuantity: ticketCount,
    totalAmount: totalAmount,
  };

  setBookingData(newBookingData);

  if (isAuthenticated) {
    Alert.alert(
      "Buy Ticket",
      `Purchase ${ticketCount} ticket${ticketCount > 1 ? "s" : ""} for ${
        event.title
      }?\n\nTicket Price: ${formatPrice(Number(event.price))}\nQuantity: ${ticketCount}\nTotal: ${formatPrice(totalAmount)}`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Confirm",
          onPress: async () => {
            try {
              const res = await bookEvent(newBookingData);
              Alert.alert(
                "Success",
                `${ticketCount} ticket${ticketCount > 1 ? "s" : ""} purchased!`
              );
              setTicketCount(1); // Reset count
            } catch (error) {
              console.error(error);
              Alert.alert("Error", "Failed to book ticket. Please try again.");
            }
          },
        },
      ]
    );
  } else {
    Alert.alert(
      "Login Required",
      `Please log in to purchase ticket${ticketCount > 1 ? "s" : ""} for ${
        event.title
      }.\n\nPrice: ${formatPrice(totalAmount)} for ${ticketCount} ticket${
        ticketCount > 1 ? "s" : ""
      }`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Login",
          onPress: () => router.push("/(auth)/login"),
        },
      ]
    );
  }
};


  // Handle share
  const handleShare = async () => {
    if (!event) return;

    try {
      const message = `🎉 Check out this event!\n\n${event.title}\n\n📅 ${formatDate(
        event.date
      )}\n⏰ ${event.time}\n📍 ${event.location}\n💰 ${formatPrice(
        Number(event.price)
      )}\n\nJoin ${event.attendees}+ people attending this event!`;

      const result = await Share.share({
        message: message,
        title: event.title,
      });

      if (result.action === Share.sharedAction) {
        console.log("Event shared successfully");
      }
    } catch (error: any) {
      Alert.alert("Error", "Failed to share event");
      console.error("Share error:", error);
    }
  };

  // Loading state
  if (loading) {
    return (
      <View className="flex-1 bg-[#E8DCC8] justify-center items-center">
        <ActivityIndicator size="large" color="#2C1810" />
        <Text className="mt-4 text-[#8B6F47] text-base">
          Loading event details...
        </Text>
      </View>
    );
  }

  // Error state
  if (error || !event) {
    return (
      <View className="flex-1 bg-[#E8DCC8] justify-center items-center px-6">
        <View className="bg-[#F5EFE6] rounded-full p-8 mb-6 border-2 border-[#D4C4B0]">
          <Ionicons name="alert-circle" size={64} color="#8B6F47" />
        </View>
        <Text className="text-2xl font-bold text-[#2C1810] mb-2 text-center">
          Oops!
        </Text>
        <Text className="text-[#8B6F47] text-center text-base mb-6">
          {error || "Event not found"}
        </Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className="bg-[#2C1810] px-8 py-3 rounded-full"
        >
          <Text className="text-[#F5EFE6] font-bold">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

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
        activeOpacity={0.8}
      >
        <Ionicons name="arrow-back" size={24} color="#F5EFE6" />
      </TouchableOpacity>

      {/* Share Button */}
      <TouchableOpacity
        onPress={handleShare}
        className="absolute top-12 right-6 w-11 h-11 rounded-full bg-[#2C1810] items-center justify-center z-30 border-2 border-[#2C1810]"
        style={{
          shadowColor: "#2C1810",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 8,
        }}
        activeOpacity={0.8}
      >
        <Ionicons name="share-social" size={20} color="#F5EFE6" />
      </TouchableOpacity>

      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 180 }}
      >
        {/* Hero Image with Price Badge */}
        <View className="bg-[#C17B3C] pt-16 pb-0">
          <View className="px-6 pb-6">
            <View className="rounded-[28px] overflow-hidden border-[3px] border-[#2C1810] relative">
              <Image
                source={{
                  uri: event.image || "https://via.placeholder.com/400x300",
                }}
                className="w-full h-80"
                resizeMode="cover"
              />
              {/* Price Badge */}
              <View className="absolute top-4 right-4">
                <View
                  className={`${
                    event.price === "0" || Number(event.price) === 0
                      ? "bg-green-500"
                      : "bg-[#C17B3C]"
                  } px-6 py-3 rounded-full border-3 border-white`}
                  style={{
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 8,
                    elevation: 8,
                  }}
                >
                  <Text className="text-white font-black text-lg tracking-wider">
                    {formatPrice(Number(event.price))}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Main Content Card */}
        <View
          className="bg-[#F5EFE6] mx-5 -mt-4 rounded-[32px] border-[3px] border-[#2C1810] overflow-hidden"
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
            <Text
              className="text-3xl font-bold text-[#2C1810] text-center mb-4"
              style={{ fontFamily: "serif" }}
            >
              {event.title}
            </Text>

            {/* Quick Info */}
            <View className="flex-row items-center justify-center mb-6 gap-3">
              <View className="flex-row items-center bg-[#E8DCC8] px-3 py-1.5 rounded-full border border-[#D4C4B0]">
                <Ionicons name="time-outline" size={14} color="#8B6F47" />
                <Text className="text-xs text-[#8B6F47] font-semibold ml-1">
                  {event.hours}h {event.minutes}m
                </Text>
              </View>
              <View className="flex-row items-center bg-[#E8DCC8] px-3 py-1.5 rounded-full border border-[#D4C4B0]">
                <Ionicons name="people-outline" size={14} color="#8B6F47" />
                <Text className="text-xs text-[#8B6F47] font-semibold ml-1">
                  {event.attendees}+ going
                </Text>
              </View>
            </View>

            {/* Description */}
            <View className="bg-white/50 rounded-2xl p-4 mb-6 border border-[#D4C4B0]">
              <Text className="text-xs text-[#8B6F47] font-bold mb-2 tracking-wider">
                ABOUT
              </Text>
              <Text
                className="text-sm text-[#2C1810] leading-6"
                numberOfLines={isDescriptionExpanded ? undefined : 3}
              >
                {event.description}
              </Text>
              {event.description && event.description.length > 100 && (
                <TouchableOpacity
                  onPress={() =>
                    setIsDescriptionExpanded(!isDescriptionExpanded)
                  }
                  className="mt-2"
                  activeOpacity={0.7}
                >
                  <Text className="text-sm text-[#C17B3C] font-bold">
                    {isDescriptionExpanded ? "Read less" : "Read more"}
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Info Sections */}
            <View className="gap-4">
              {/* Date & Time */}
              <View className="bg-[#E8DCC8] rounded-2xl p-4 border-2 border-[#D4C4B0]">
                <View className="flex-row items-center">
                  <View className="w-12 h-12 rounded-full bg-[#C17B3C] items-center justify-center mr-4">
                    <Ionicons name="calendar" size={24} color="#F5EFE6" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-xs text-[#8B6F47] mb-1 font-bold tracking-wider">
                      DATE & TIME
                    </Text>
                    <Text className="text-base font-bold text-[#2C1810]">
                      {formatDate(event.date)}
                    </Text>
                    <Text className="text-sm text-[#8B6F47] mt-1">
                      {event.time} • {event.hours}h {event.minutes}m duration
                    </Text>
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
                    <Text className="text-xs text-[#8B6F47] mb-1 font-bold tracking-wider">
                      LOCATION
                    </Text>
                    <Text className="text-base font-bold text-[#2C1810]">
                      {event.location}
                    </Text>
                    <TouchableOpacity className="mt-2">
                      <Text className="text-sm text-[#C17B3C] font-semibold">
                        View on map →
                      </Text>
                    </TouchableOpacity>
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
                    <Text className="text-xs text-[#8B6F47] mb-1 font-bold tracking-wider">
                      ATTENDEES
                    </Text>
                    <Text className="text-base font-bold text-[#2C1810]">
                      {event.attendees}+ people registered
                    </Text>
                    <Text className="text-sm text-[#8B6F47] mt-1">
                      Be part of this amazing event!
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View className="h-8" />
      </Animated.ScrollView>

      {/* Bottom Ticket Selection & Buy Button */}
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
        {/* Ticket Counter */}
        <View className="flex-row items-center justify-between mb-3 bg-[#F5EFE6] rounded-full p-2 border-2 border-[#D4C4B0]">
          <View className="flex-1">
            <Text className="text-xs text-[#8B6F47] font-bold ml-4">
              SELECT TICKETS
            </Text>
          </View>
          <View className="flex-row items-center gap-3">
            <TouchableOpacity
              onPress={decrementTicket}
              disabled={ticketCount <= 1}
              className={`w-10 h-10 rounded-full items-center justify-center ${
                ticketCount <= 1 ? "bg-[#D4C4B0]" : "bg-[#2C1810]"
              }`}
              activeOpacity={0.8}
            >
              <Ionicons name="remove" size={20} color="#F5EFE6" />
            </TouchableOpacity>
            <Text className="text-xl font-black text-[#2C1810] w-8 text-center">
              {ticketCount}
            </Text>
            <TouchableOpacity
              onPress={incrementTicket}
              disabled={ticketCount >= 10}
              className={`w-10 h-10 rounded-full items-center justify-center ${
                ticketCount >= 10 ? "bg-[#D4C4B0]" : "bg-[#2C1810]"
              }`}
              activeOpacity={0.8}
            >
              <Ionicons name="add" size={20} color="#F5EFE6" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Buy Button */}
        <TouchableOpacity
          onPress={handleBuyTicket}
          activeOpacity={0.8}
          className="bg-[#2C1810] rounded-full py-4 border-2 border-[#2C1810] flex-row items-center justify-center"
          style={{
            shadowColor: "#2C1810",
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.3,
            shadowRadius: 12,
            elevation: 8,
          }}
        >
          <Ionicons name="ticket" size={24} color="#F5EFE6" />
          <Text className="text-[#F5EFE6] font-bold text-lg tracking-widest ml-2">
            {event.price === "0" || Number(event.price) === 0
              ? `GET ${ticketCount} FREE TICKET${ticketCount > 1 ? "S" : ""}`
              : `BUY FOR ${formatPrice(ticketCount * Number(event.price))}`}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
