import { ReactElement } from "react";
import { StyleSheet, Text, View } from "react-native";

interface WinPopupProps {
    playerNumber: number;
    score: number;
    children: ReactElement
}

const WinPopup: React.FC<WinPopupProps> = ({playerNumber, score, children}) => {
  let text = playerNumber != -1
    ? score != -1 
      ? <Text style={styles.text}>Spieler {playerNumber} hat gewonnen! <br/> Score: {score}</Text>
      : <Text style={styles.text}>Spieler {playerNumber} hat gewonnen!</Text>
    : <Text style={styles.text}>Du hast gewonnen!</Text>

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        {text}
      </View>
      {children}
    </View>
  );
}

export default WinPopup;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    backgroundColor: "#046d00",
    borderRadius: "4px",
    padding: 40,
    opacity: 0.9,
    display: "flex",
    justifyContent: "center",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    height: "50%",
    shadowOpacity: 0.8,
    shadowColor: "#000",
    shadowRadius: 20
  },
  textContainer: {
    marginBottom: 20,
    display: "flex",
    justifyContent: "center"
  },
  text: {
    textAlign: "center",
    color: "#fff",
    fontSize: 18
  }
});