import { useRouter } from "expo-router";
import { useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ReactionTestScreen() {
  const router = useRouter();

  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [points] = useState<number>(0);

  const onStartPress = () => {
    setIsStarted(true);
  }

  const onClickablePress = (id: number) => {
    
  }

  interface ClickableProps {
    id: number;
  }

  const Clickable: React.FC<ClickableProps> = ({id}) => {
    let content;
   
    return (
      <TouchableOpacity key={id} style={styles.card} onPress={() => onClickablePress(id)}>
        {content}
      </TouchableOpacity>);
  }

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Reaktionstest</Text>

        {!isStarted &&
          <Button title="Starten" color="#0e5c00" onPress={() => onStartPress()}/>
        }

        {isStarted &&
          <View style={styles.spawnfield}> 

          </View>
        }

        <Button title="Beenden" color="#a00" onPress={() => router.navigate("/")} />
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
  spawnfield: {
    backgroundColor: "red",
    height: "60%",
    width: "50%",
    marginBottom: 10
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  grid: {
    width: 300,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 30,
  },
  card: {
    width: 60,
    height: 60,
    margin: 5,
    backgroundColor: "#444",
    borderRadius: 5,
  },
  players: {
    display: "flex",
    flexDirection: "row",
    width: 250,
    justifyContent: "space-between"
  },
  playerInfo: {

  },
  playerTextNormal: {
    color: "#fff",
    fontSize: 14
  },
  playerTextBold: {
    color: "#fff",
    fontWeight: "bold",
    textDecorationLine: "underline",
    fontSize: 16
  },
  image: {
    width: 55,
    height: 55,
  },
  imageAlpha: {
    width: 55,
    height: 55,
    opacity: 0.3
  }
});
