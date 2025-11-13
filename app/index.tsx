import { Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Smart Games</Text>

      <Link href="/memory" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>🧠 Memory</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/color-match" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>🎨 Farben finden</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/reaction-test" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>⚡ Reaktionstest</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/tic-tac-toe" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}># Tik Tak Toe</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1e24",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 40,
  },
  button: {
    width: "70%",
    backgroundColor: "#2b2b38",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#444",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
