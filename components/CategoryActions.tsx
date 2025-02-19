import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

export default function CategoryActions({
  category,
  onAction,
}: {
  category: string;
  onAction: (category: string, action: "start" | "pause" | "reset") => void;
}) {
  return (
    <View style={styles.container} >
      <Button
        style={styles.buttonItem}
        mode="text"
        onPress={() => onAction(category, "start")}
      >
        Start All
      </Button>
      <Button mode="text" onPress={() => onAction(category, "pause")}>
        Pause All
      </Button>
      <Button mode="text" onPress={() => onAction(category, "reset")}>
        Reset All
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center" },
  buttonItem: { zIndex: 99 },
});
