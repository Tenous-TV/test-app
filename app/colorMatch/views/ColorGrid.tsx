// import React from "react";
// import { Pressable, StyleSheet, View } from "react-native";
// import { ColorService } from "../services/ColorService";

// export type ColorField = {
//   color: string;
//   onClick: () => void;
// };

// interface ColorGridProps {
//   fields: ColorField[];
// }

// const ColorGrid: React.FC<ColorGridProps> = ({ fields }) => {
//   ColorService.instance.startNewRound();

//   return (
//     <View style={styles.grid}>
//       {fields.map((field, index) => (
//         <Pressable
//           key={index}
//           onPress={field.onClick}
//           style={[styles.item, { backgroundColor: field.color }]}
//         />
//       ))}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   grid: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//   },
//   item: {
//     width: "50%",
//     aspectRatio: 1,
//   },
// });

// export default ColorGrid;