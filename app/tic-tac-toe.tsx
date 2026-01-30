import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import WinPopup from "./winpopup";

const TicTacToe = () => {  
  const router = useRouter();
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [gameFinished, setGameFinished] = useState<boolean>(false)
  const [winner, setWinner] = useState<string>("-1")

  const handlePress = (index: number) => {
    if (board[index] || calculateWinner(board)) return;

    const newBoard = [...board];
    newBoard[index] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext(!xIsNext);

    const winner = calculateWinner(newBoard);

    if (winner) {
      console.log(`winner: ${winner}`)
      setWinner(winner);
      setGameFinished(true);
    } else if (!newBoard.includes(null)) {
      setGameFinished(true);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  const renderSquare = (index: number) => (
    <TouchableOpacity style={styles.square} onPress={() => handlePress(index)}>
      <Text style={styles.squareText}>{board[index]}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tic Tac Toe</Text>
      <View style={styles.board}>
        {board.map((_, i) => renderSquare(i))}
        {gameFinished && 
        <WinPopup playerNumber={winner} score={-1}>
          <Button title="Neustart" color="#0f47b6ff" onPress={() => window.location.reload()}/>
        </WinPopup>
      }
      </View>
      <Text style={styles.turnText}>
        Nächster Spieler: {xIsNext ? "X" : "O"}
      </Text>
      <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
        <Text style={styles.buttonText}>Neustarten</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={() => router.navigate("/")}>
        <Text style={styles.buttonText}>Beenden</Text>
      </TouchableOpacity>
    </View>
  );
};

const calculateWinner = (squares: (string | null)[]) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#101820",
  },
  title: {
    fontSize: 32,
    color: "#ffffff",
    marginBottom: 20,
    fontWeight: "bold",
  },
  board: {
    width: 300,
    height: 300,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  square: {
    width: 100,
    height: 100,
    borderWidth: 2,
    borderColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
  squareText: {
    fontSize: 48,
    color: "#ffffff",
    fontWeight: "bold",
  },
  turnText: {
    fontSize: 18,
    color: "#fff",
    marginTop: 20,
  },
  resetButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#2b2b38",
    borderRadius: 10,
    marginVertical: 10,
    borderWidth: 2,
    borderColor: "#ffffff",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },
  
  backButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#a00",
    borderRadius: 8,
  },
  
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default TicTacToe;