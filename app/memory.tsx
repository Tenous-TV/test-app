import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import WinScreen from "./winpopup";

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
  const [activePlayer, setActivePlayer] = useState<number>(1);
  const [points, setPoints] = useState<{ [key: number]: number}>({});
  const [remainingClicks, setRemainingClicks] = useState<number>(2);
  const [activeIndex1, setActiveIndex1] = useState<number | null>(null);
  const [activeIndex2, setActiveIndex2] = useState<number | null>(null);
  const [revealedCards] = useState<number[]>(new Array());
  const [gameFinished, setGameFinished] = useState<boolean>(false)

  const onCardPress = (key: number) => {
    if (activeIndex1 == key|| activeIndex2 == key)
      return;
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
  
  /**
   * @param key2 Wird mitgegeben, da setActiveIndex2(key) erst beim nächsten Render gesetzt wird.
   */
  const checkSameFruits = (key2: number) => {
    if (cards[activeIndex1!] == cards[key2]) {
      revealedCards?.push(activeIndex1!);
      revealedCards?.push(key2);
      addPointsToCurrentPlayer();
      setRemainingClicks(3);

      if (revealedCards.length >= 24) {
        setGameFinished(true);
      }
    }
  }

  const addPointsToCurrentPlayer = () => {
    points[activePlayer] += 10;
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

  const getWinner = () => {
    if (points[1] > points[2])
      return 1;
    else if (points[2] > points[1])
      return 2;
    else
      return -2
  }

  const getWinnerPoints = () => {
    let winner = getWinner();
    if (winner == -2)
      return 0;
    else
      return points[winner];
  }

  useEffect(() => {
    for (let i = 0; i < 24; i++) {
      addToMap(i);
    }
    setActivePlayer(1);
    setRemainingClicks(2);
    setPoints(prev => {
      const next = {...prev};
      next[1] = 0;
      next[2] = 0;
      return next;
    });
    console.log("useeffect aufgerufen");
  }, []);


  interface CardProps {
    id: number;
  }

  const Card: React.FC<CardProps> = ({id}) => {
    const cardIsRevealed = revealedCards?.find((element) => element == id) != null;

    let content;
    if (activeIndex1 === id || activeIndex2 === id || cardIsRevealed)
      content = <Image source={images.get(cards[id])} style={styles.image}/>
   
    return (
      <TouchableOpacity key={id} style={styles.card} onPress={() => {if (!cardIsRevealed) onCardPress(id);}}>
        {content}
      </TouchableOpacity>);
  }

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Memory</Text>

        <View style={styles.players}>
          <View style={styles.playerInfo}>
            <Text style={activePlayer == 1 ? styles.playerTextBold : styles.playerTextNormal}>Spieler 1</Text>
            <Text style={styles.playerTextNormal}>{points[1]}</Text>
          </View>
          <View style={styles.playerInfo}>
            <Text style={activePlayer == 2 ? styles.playerTextBold : styles.playerTextNormal}>Spieler 2</Text>
            <Text style={styles.playerTextNormal}>{points[2]}</Text>
          </View>
        </View>

        <View style={styles.grid}>
            {[...Array(24)].map((_, i) => {
              return (
                <Card id={i}/>
              );
            })}
            {gameFinished && 
              <WinScreen playerNumber={getWinner()} score={getWinnerPoints()}>
                <Button title="Neustart" color="#0f47b6ff" onPress={() => window.location.reload()}/>
              </WinScreen>
            }
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
