import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

export type ColorField = {
  color: string;
  onClick: () => void;
};

interface ColorGridProps {
  fields: ColorField[];
}

const ColorGrid: React.FC<ColorGridProps> = ({ fields }) => {
  return (
    <View style={styles.grid}>
      {fields.map((field, index) => (
        <Pressable
          key={index}
          onPress={field.onClick}
          style={[styles.item, { backgroundColor: field.color }]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  item: {
    width: "50%",     // 2 Spalten → funktioniert perfekt für 2,4,6,8 Elemente
    aspectRatio: 1,   // quadratisch
  },
});

export default ColorGrid;