import React, { useEffect, useState } from "react";
import { View, Text, StatusBar, ScrollView, TouchableOpacity, RefreshControl, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "react-native";
import { getBookingById } from "@/lib/eventService";

interface Event {
  _id: string;
  title: string;
  date: string;
  time: string;
  duration: string;
  hours: string;
  minutes: string;
  location: string;
  image: string;
  attendees: number;
  description: string;
  price: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

interface Ticket {
  _id: string;
  eventId: Event;
  userId: User;
  ticketQuantity: number;
  totalAmount: number;
  status: string;
  bookingId: string;
  createdAt: string;
  updatedAt: string;
}

export default function TicketsTab() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState("all"); // all, confirmed, cancelled, expired
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      setIsAuthenticated(!!user);
      if (user) {
        const userData = JSON.parse(user);
        setUserId(userData._id);
        fetchTickets();
      }
    } catch (error) {
      router.replace("/(auth)/login");
    }
  };

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const response = await getBookingById();
      setTickets(response.data);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchTickets();
    setRefreshing(false);
  };

  const getFilteredTickets = () => {
    if (filter === "all") return tickets;
    return tickets.filter(ticket => ticket.status === filter);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  const getEventDuration = (hours: string, minutes: string) => {
    if (hours && minutes) {
      return `${hours}h ${minutes}m`;
    } else if (hours) {
      return `${hours}h`;
    } else if (minutes) {
      return `${minutes}m`;
    }
    return '';
  };

  const isEventPast = (eventDate: string, eventTime: string) => {
    const eventDateTime = new Date(`${eventDate.split('T')[0]}T${eventTime}`);
    return eventDateTime < new Date();
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-500';
      case 'cancelled':
        return 'bg-red-500';
      case 'expired':
        return 'bg-gray-400';
      default:
        return 'bg-blue-500';
    }
  };

  const getStatusText = (ticket: Ticket) => {
    if (isEventPast(ticket.eventId.date, ticket.eventId.time)) {
      return 'Expired';
    }
    return ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1);
  };

  if (isAuthenticated === null || loading) {
    return (
      <SafeAreaView className="flex-1 bg-[#E8DCC8]">
        <StatusBar barStyle="dark-content" backgroundColor="#E8DCC8" />
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#2C1810" />
          <Text className="text-[#2C1810] mt-4 text-base">Loading tickets...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const filteredTickets = getFilteredTickets();

  return (
    <SafeAreaView className="flex-1 bg-[#E8DCC8]">
      <StatusBar barStyle="dark-content" backgroundColor="#E8DCC8" />

      {/* Header */}
      <View className="px-6 pt-4 pb-5">
        <Text className="text-[40px] font-extrabold text-[#2C1810] mb-1" style={{ letterSpacing: -1 }}>
          My Tickets
        </Text>
        <Text className="text-base text-[#8B6F47]">
          {tickets?.length} {tickets?.length === 1 ? "ticket" : "tickets"} purchased
        </Text>
      </View>

      {/* Filter Tabs - Fixed */}
      <View className="px-6 mb-4">
        <View className="bg-[#D4C4A8] rounded-xl p-1 flex-row">
          <TouchableOpacity
            onPress={() => setFilter("all")}
            className={`flex-1 py-3.5 rounded-lg ${filter === "all" ? "bg-[#2C1810]" : ""}`}
          >
            <Text className={`text-center font-semibold text-base ${filter === "all" ? "text-[#E8DCC8]" : "text-[#8B6F47]"}`}>
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setFilter("confirmed")}
            className={`flex-1 py-3.5 rounded-lg ${filter === "confirmed" ? "bg-[#2C1810]" : ""}`}
          >
            <Text className={`text-center font-semibold text-base ${filter === "confirmed" ? "text-[#E8DCC8]" : "text-[#8B6F47]"}`}>
              Confirmed
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setFilter("cancelled")}
            className={`flex-1 py-3.5 rounded-lg ${filter === "cancelled" ? "bg-[#2C1810]" : ""}`}
          >
            <Text className={`text-center font-semibold text-base ${filter === "cancelled" ? "text-[#E8DCC8]" : "text-[#8B6F47]"}`}>
              Cancelled
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Tickets List */}
      <ScrollView
        className="flex-1 px-6"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#2C1810" />
        }
      >
        {filteredTickets?.length === 0 ? (
          <View className="flex-1 justify-center items-center py-20">
            <View className="w-24 h-24 bg-[#D4C4A8] rounded-full items-center justify-center mb-4">
              <Text className="text-5xl">🎫</Text>
            </View>
            <Text className="text-xl font-bold text-[#2C1810] mb-2">
              No tickets found
            </Text>
            <Text className="text-base text-[#8B6F47] text-center px-8">
              {filter === "all"
                ? "You haven't purchased any tickets yet"
                : `No ${filter} tickets available`}
            </Text>
            {filter === "all" && (
              <TouchableOpacity
                className="mt-6 bg-[#2C1810] px-8 py-4 rounded-xl"
                onPress={() => router.push("/(tabs)")}
              >
                <Text className="text-[#E8DCC8] font-semibold text-base">
                  Browse Events
                </Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <View className="pb-6">
            {filteredTickets?.map((ticket) => {
              const isPast = isEventPast(ticket.eventId.date, ticket.eventId.time);
              const statusText = getStatusText(ticket);
              const isActive = ticket.status === 'confirmed' && !isPast;

              return (
                <TouchableOpacity
                  key={ticket._id}
                  className="bg-white rounded-2xl mb-4 overflow-hidden"
                  style={{
                    shadowColor: "#2C1810",
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.1,
                    shadowRadius: 8,
                    elevation: 5
                  }}
                  onPress={() => {
                    // Navigate to ticket detail page
                    // router.push(`/tickets/${ticket._id}`);
                  }}
                >
                  {/* Event Image */}
                  {ticket.eventId.image && (
                    <View className="relative">
                      <Image
                        source={{ uri: ticket.eventId.image }}
                        className="w-full h-40"
                        resizeMode="cover"
                      />
                      {/* Status Badge */}
                      <View className="absolute top-3 right-3">
                        <View className={`px-3 py-1.5 rounded-full ${
                          isPast ? 'bg-gray-400' : getStatusColor(ticket.status)
                        }`}>
                          <Text className="text-white text-xs font-bold uppercase">
                            {statusText}
                          </Text>
                        </View>
                      </View>
                      {/* Booking ID Badge */}
                      <View className="absolute bottom-3 left-3">
                        <View className="bg-black/70 px-3 py-1.5 rounded-full">
                          <Text className="text-white text-xs font-mono">
                            {ticket.bookingId}
                          </Text>
                        </View>
                      </View>
                    </View>
                  )}

                  {/* Ticket Content */}
                  <View className="p-5">
                    {/* Event Title */}
                    <Text className="text-xl font-bold text-[#2C1810] mb-3" numberOfLines={2}>
                      {ticket.eventId.title}
                    </Text>

                    {/* Location */}
                    <View className="flex-row items-center mb-2">
                      <Text className="text-base mr-2">📍</Text>
                      <Text className="text-sm text-[#8B6F47] flex-1">
                        {ticket.eventId.location}
                      </Text>
                    </View>

                    {/* Date & Time */}
                    <View className="flex-row items-center mb-2">
                      <Text className="text-base mr-2">📅</Text>
                      <Text className="text-sm text-[#8B6F47]">
                        {formatDate(ticket.eventId.date)}
                      </Text>
                    </View>

                    <View className="flex-row items-center mb-3">
                      <Text className="text-base mr-2">🕐</Text>
                      <Text className="text-sm text-[#8B6F47]">
                        {formatTime(ticket.eventId.time)}
                        {getEventDuration(ticket.eventId.hours, ticket.eventId.minutes) &&
                          ` (${getEventDuration(ticket.eventId.hours, ticket.eventId.minutes)})`
                        }
                      </Text>
                    </View>

                    {/* Divider */}
                    <View className="border-t border-dashed border-[#D4C4A8] my-4" />

                    {/* Bottom Info */}
                    <View className="flex-row justify-between items-center">
                      <View>
                        <Text className="text-xs text-[#8B6F47] mb-1">
                          Quantity: {ticket.ticketQuantity} ticket{ticket.ticketQuantity > 1 ? 's' : ''}
                        </Text>
                        <Text className="text-lg font-bold text-[#2C1810]">
                          ₹{ticket.totalAmount}
                        </Text>
                        <Text className="text-xs text-[#8B6F47] mt-0.5">
                          ₹{ticket.eventId.price} per ticket
                        </Text>
                      </View>

                      {isActive && (
                        <TouchableOpacity
                          className="bg-[#2C1810] px-6 py-3 rounded-xl"
                          onPress={(e) => {
                            e.stopPropagation();
                            // Show QR code modal or navigate to ticket details
                            // router.push(`/tickets/${ticket._id}/qr`);
                          }}
                        >
                          <Text className="text-[#E8DCC8] font-semibold">
                            Show QR
                          </Text>
                        </TouchableOpacity>
                      )}

                      {ticket.status === 'cancelled' && (
                        <View className="bg-gray-100 px-6 py-3 rounded-xl">
                          <Text className="text-gray-500 font-semibold">
                            Cancelled
                          </Text>
                        </View>
                      )}
                    </View>

                    {/* Attendees Info */}
                    {ticket.eventId.attendees > 0 && (
                      <View className="mt-3 pt-3 border-t border-[#E8DCC8]">
                        <Text className="text-xs text-[#8B6F47]">
                          👥 {ticket.eventId.attendees} people attending
                        </Text>
                      </View>
                    )}
                  </View>

                  {/* Ticket Notch Effect */}

                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
