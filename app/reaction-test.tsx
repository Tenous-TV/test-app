import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import WinPopup from "./winpopup";

export default function ReactionTestScreen() {
  const router = useRouter();

  const ROUND_TIME = 60;
  const START_INTERVAL = 1800;
  const MIN_INTERVAL = 600;

  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [points, setPoints] = useState(0);
  const [timeLeft, setTimeLeft] = useState(ROUND_TIME);
  const [circles, setCircles] = useState<
    { id: number; x: number; y: number }[]
  >([]);
  const [spawnInterval, setSpawnInterval] = useState(START_INTERVAL);

  const spawnTimer = useRef<number | null>(null);
  const timeTimer = useRef<number | null>(null);

  const startGame = () => {
    setIsStarted(true);
    setIsFinished(false);
    setPoints(0);
    setTimeLeft(ROUND_TIME);
    setCircles([]);
    setSpawnInterval(START_INTERVAL);
  };

  const spawnCircle = () => {
    const circle = {
      id: Date.now(),
      x: Math.random() * 180,
      y: Math.random() * 280,
    };

    setCircles(prev => {
      const list = [...prev, circle];
      if (list.length > 3) list.shift();
      return list;
    });
  };

  const hitCircle = (id: number) => {
    setPoints(p => p + 1);
    setCircles(prev => prev.filter(c => c.id !== id));
    setSpawnInterval(i => Math.max(MIN_INTERVAL, i - 100));
  };

  // Kreise spawnen
  useEffect(() => {
    if (!isStarted) return;

    spawnCircle();
    spawnTimer.current = setInterval(spawnCircle, spawnInterval);

    return () => {
      if (spawnTimer.current) clearInterval(spawnTimer.current);
    };
  }, [isStarted, spawnInterval]);

  // Countdown
  useEffect(() => {
    if (!isStarted) return;

    timeTimer.current = setInterval(() => {
      setTimeLeft(t => t - 1);
    }, 1000);

    return () => {
      if (timeTimer.current) clearInterval(timeTimer.current);
    };
  }, [isStarted]);

  // Spielende
  useEffect(() => {
    if (timeLeft > 0) return;

    setIsFinished(true);
    setCircles([]);

    if (spawnTimer.current) clearInterval(spawnTimer.current);
    if (timeTimer.current) clearInterval(timeTimer.current);
  }, [timeLeft]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reaktionstest</Text>

      <Text style={styles.info}>Zeit: {timeLeft}s</Text>
      <Text style={styles.info}>Punkte: {points}</Text>

      {!isStarted && !isFinished && (
        <Button title="Starten" color="#0e5c00" onPress={startGame} />
      )}

      {isStarted && (
        <View style={styles.spawnfield}>
          {circles.map(c => (
            <TouchableOpacity
              key={c.id}
              style={[styles.circle, { left: c.x, top: c.y }]}
              onPress={() => hitCircle(c.id)}
            />
          ))}
          {isFinished && (
          <WinPopup playerNumber="-2" score={points}>
            <Button title="Neustart" color="#0f47b6ff" onPress={() => window.location.reload()}/>
          </WinPopup>
          )}
        </View>
      )}
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
    backgroundColor: "#111",
    height: 350,
    width: 250,
    marginVertical: 20,
    position: "relative",
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  info: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 5,
  },
  circle: {
    position: "absolute",
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#00ff88",
  },
});