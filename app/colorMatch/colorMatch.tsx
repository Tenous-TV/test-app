import { useRouter } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";
import { ColorService } from "./services/ColorService";
import ColorGrid from "./views/ColorGrid";

export default function MemoryScreen() {
  const router = useRouter();
  ColorService.instance.startNewRound();
  const fields: {color: string, onClick: () => void}[] = [];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Farben finden</Text>

      <ColorGrid fields = {fields} />

      <Button title="Beenden" color="#a00" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2e2e3a",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  grid: {
    width: 220,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 30,
  },
  card: {
    width: 40,
    height: 40,
    margin: 5,
    backgroundColor: "#444",
    borderRadius: 5,
  },
});
