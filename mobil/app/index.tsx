import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";

export default function HomeScreen() {
  const events = [
    { id: 1, title: "Tech Fest 2025", date: "Nov 3, 2025" },
    { id: 2, title: "AI Conference", date: "Nov 10, 2025" },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Upcoming Events</Text>
      {events.map((event) => (
        <TouchableOpacity key={event.id} style={styles.card}>
          <Text style={styles.title}>{event.title}</Text>
          <Text style={styles.date}>{event.date}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#fff" },
  heading: { fontSize: 22, fontWeight: "bold", marginBottom: 12 },
  card: {
    backgroundColor: "#f2f2f2",
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
  },
  title: { fontSize: 18, fontWeight: "bold" },
  date: { fontSize: 14, color: "#555" },
});
