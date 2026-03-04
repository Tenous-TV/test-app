import { useNavigation, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Button, StyleSheet, TouchableOpacity, View } from "react-native";
import Animated from "react-native-reanimated";
import { ColorField } from "./types/colorField";
import { Colors } from "./types/colors";

const FlatList = Animated.FlatList;

export default function ColorMatchScreen() {
  const router = useRouter();
  
  const [colorFields, setColorFields] = useState<ColorField[]>([]);
  const [globalColor, setGlobalColor] = useState<Colors>(0);
  const [rounds, setRounds] = useState(1);
  const [isShowingCurrentColor, setIsShowingCurrentColor] = useState(false);

  const navigation = useNavigation();

  const trigger = () => {
    setIsShowingCurrentColor(true);
  };

  useEffect(() => {
    if (!isShowingCurrentColor) return;

    const timer = setTimeout(() => {
      setIsShowingCurrentColor(false);
    }, 750);

    return () => clearTimeout(timer);
  }, [isShowingCurrentColor]);

  useEffect(() => {
    startGame();
  }, []);

  function startGame() {
    setRounds(1);
    startNewRound(1);
  }

  function handleClick(color: Colors) {
    if (color === globalColor) {
      const nextRounds = rounds + 1;
      setRounds(nextRounds);
      startNewRound(nextRounds);
    }
  }

  function startNewRound(currentRounds: number) {
    const newColor = generateNewColor();
    setGlobalColor(newColor);

    const fieldCount = Math.min(currentRounds * 2, 8);

    fillGrid(fieldCount, newColor);
    trigger();
  }

  function fillGrid(fieldCount: number, newColor: Colors): void {
    //Add all available colors to an array then remove the color to find
    const colors: Colors[] = [];
    const newColorFields: ColorField[] = []
    for(let i: number = 0; i < 8; i++) {
      colors[i] = i;
    }
    colors.splice(colors.indexOf(newColor), 1);

    //Add color field for the color the player must find
    const colorFieldToFind: ColorField = new ColorField();
    colorFieldToFind.color = newColor;
    newColorFields[0] = colorFieldToFind;

    //Add random color from the remaining colors then remove it
    for(let i: number = 1; i < fieldCount; i++){
      const indexToAdd: number = Math.floor(Math.random() * (colors.length - 0.1));

      const colorFieldToAdd: ColorField = new ColorField();
      colorFieldToAdd.color = colors[indexToAdd];
      newColorFields[i] = colorFieldToAdd;

      colors.splice(indexToAdd, 1);
    }

    shuffleArray<ColorField>(newColorFields);

    setColorFields(newColorFields);
  }

  return (
    !isShowingCurrentColor ? 
    <View style={styles.container}>
      <FlatList
        data={colorFields}
        keyExtractor={(_, index) => index.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.content}
        style={{ height: "100%"}}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <TouchableOpacity
              onPress={() => handleClick(item.color)}
              style={[styles.colorBox, { backgroundColor: item ? item.displayColor() : "transparent" }]}>
                &nbsp;
              </TouchableOpacity>
          </View>
        )}
      />

      <Button title="Beenden" color="#a00" onPress={() => router.navigate("/")} />
    </View> :
    <View
      style={{
        flex: 1,
        backgroundColor: Colors[globalColor],
      }}
    />
  );
}

function generateNewColor(): Colors {
  const colorNumber = Math.floor(Math.random() * 7 + 0.9);
  return colorNumber;
}

function shuffleArray<T>(array: T[]): void {
  for(let i: number = array.length - 1; i >= 0; i--) {
    let index: number = Math.floor(Math.random() * (i + 0.99));

    let element: T = array[index];

    array[index] = array[i];
    array[i] = element;
  }
}

const styles = StyleSheet.create({
  content: {
    padding: 8,
    justifyContent: "center",
    height: "100%"
  },
  container: {
    padding: 15,
    backgroundColor: "#2e2e3a",
    height: "100%"
  },
  row: {
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
    margin: 15
  },
  itemContainer: {
    width: "48%",
    height: "100%"
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  footer: {
    padding: 15,
  },
  colorBox: {
    marginBottom: 15,
    marginTop: 15,
    width: "100%",
    height: "100%",
    borderRadius: 8,
    elevation: 3, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  }
});
