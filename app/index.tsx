import { Link } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Smart Games</Text>

      <Link href="/memory" asChild>
        <TouchableOpacity style={styles.button}>
          <Image source={require("../assets/icons/compass_icon.png")} style={styles.icon}/>
          <Text style={styles.buttonText}>Memory</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/color-match" asChild>
        <TouchableOpacity style={styles.button}>
          <Image source={require("../assets/icons/water-drop_icon.png")} style={styles.icon}/>
          <Text style={styles.buttonText}>Farben finden</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/reaction-test" asChild>
        <TouchableOpacity style={styles.button}>
          <Image source={require("../assets/icons/circle-x_icon.png")} style={styles.icon}/>
          <Text style={styles.buttonText}>Reaktionstest</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/tic-tac-toe" asChild>
        <TouchableOpacity style={styles.button}>
          <Image source={require("../assets/icons/grid_icon.png")} style={styles.icon}/>
          <Text style={styles.buttonText}>Tik Tak Toe</Text>
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
    padding: 25,
    borderRadius: 10,
    marginVertical: 10,
    borderWidth: 2,
    borderColor: "#fff",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
},
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  icon: {
    marginRight: 20
  }
});
