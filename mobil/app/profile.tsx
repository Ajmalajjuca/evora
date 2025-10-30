import { View, Text, StyleSheet, Image } from "react-native";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://i.pravatar.cc/150?img=5" }}
        style={styles.avatar}
      />
      <Text style={styles.name}>Ajmal ibn Abdul Jaleel</Text>
      <Text style={styles.email}>zephyrion@ajuu.online</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 16 },
  name: { fontSize: 20, fontWeight: "bold" },
  email: { fontSize: 14, color: "#555" },
});
