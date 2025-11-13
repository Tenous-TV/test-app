import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function MemoryScreen() {
  const router = useRouter();

  const images = new Map([
    ['apple', require("../assets/memory/apple.png")],
    ['banana', require("../assets/memory/banana.png")],
    ['cherrie', require("../assets/memory/cherrie.png")],
    ['dragonfruit', require("../assets/memory/dragonfruit.png")],
    ['grape', require("../assets/memory/grape.png")],
    ['kiwi', require("../assets/memory/kiwi.png")],
    ['lemon', require("../assets/memory/lemon.png")],
    ['orange', require("../assets/memory/orange.png")],
    ['pear', require("../assets/memory/pear.png")],
    ['pomegranate', require("../assets/memory/pomegranate.png")],
    ['strawberry', require("../assets/memory/strawberry.png")],
    ['watermelon', require("../assets/memory/watermelon.png")]
  ])

  var fruits = new Map([ 
    ['apple', 2,],
    ['banana', 2,],
    ['cherrie', 2,],
    ['dragonfruit', 2,],
    ['grape', 2,],
    ['kiwi', 2,],
    ['lemon', 2,],
    ['orange', 2,],
    ['pear', 2,],
    ['pomegranate', 2,],
    ['strawberry', 2,],
    ['watermelon', 2,]
  ]);

  const [cards] = useState<{ [key: number]: string }>({});
  const [activePlayer, setActivePlayer] = useState<number | null>(null);
  const [remainingClicks, setRemainingClicks] = useState<number>(2);
  const [activeIndex1, setActiveIndex1] = useState<number | null>(null);
  const [activeIndex2, setActiveIndex2] = useState<number | null>(null);

  const onCardPress = (key: number) => {
    console.log("Du hast Karte " + cards[key] + " gedrückt!" + remainingClicks);
    switch(remainingClicks) {
      case 3: break;
      case 2: setActiveIndex1(key); break;
      case 1: setActiveIndex2(key); checkSameFruits(key); break;
      default: 
        setActiveIndex1(null);
        setActiveIndex2(null);
        changePlayer();
    }
    setRemainingClicks(remainingClicks => remainingClicks - 1);
  };
  
  const checkSameFruits = (key2: number) => {
    if (cards[activeIndex1!] == cards[key2]) {
      console.log("Gleiche Früchte!!");
    }
  }

  const changePlayer = () => {
    setActivePlayer(activePlayer == 1 ? 2 : 1);
    setRemainingClicks(3);
  }

  const addToMap = (key: number) => {
    var index = Math.floor(0 + Math.random() * (fruits.size - 0));
    var fruit = Array.from(fruits.keys())[index];
    const cardsLeft = fruits.get(fruit)! - 1;
    if (cardsLeft > 0) {
      fruits.set(fruit, cardsLeft);
    }
    else {
      fruits.delete(fruit);
    }
    cards[key] = fruit;
  }

  useEffect(() => {
    for (let i = 0; i < 24; i++) {
      addToMap(i);
    }
    setActivePlayer(1);
    setRemainingClicks(2);
    console.log("useeffect aufgerufen")
  }, []);

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Memory</Text>

        <View style={styles.players}>
            <Text style={activePlayer == 1 ? styles.playerTextBold : styles.playerTextNormal}>Spieler 1</Text>
            <Text style={activePlayer == 2 ? styles.playerTextBold : styles.playerTextNormal}>Spieler 2</Text>
        </View>

        <View style={styles.grid}>
            {[...Array(24)].map((_, i) => {
              return (
                <TouchableOpacity key={i} style={styles.card} onPress={() => {onCardPress(i)}}>
                  {(activeIndex1 === i || activeIndex2 === i) && (
                    <Image source={images.get(cards[i])} style={styles.image} />
                  )}
                  
                </TouchableOpacity>
              );
            })}
        </View>

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
  playerTextNormal: {
    color: "#fff",
    fontSize: 14
  },
  playerTextBold: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16
  },
  image: {
    width: 55,
    height: 55,
  }
});
