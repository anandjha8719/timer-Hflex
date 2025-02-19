import { useCallback, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { List } from "react-native-paper";
import { loadHistory } from "../../storage";
import { HistoryItem } from "../../types";
import { useFocusEffect } from "@react-navigation/native";

export default function HistoryScreen() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useFocusEffect(
    useCallback(() => {
      const load = async () => {
        const loadedHistory = await loadHistory();
        setHistory(loadedHistory);
      };
      load();
    }, [])
  );

  return (
    <View style={styles.container}>
      {history.map((item, index) => (
        <List.Item
          key={index}
          title={item.name}
          description={item.completedAt.toLocaleString()}
          left={() => <List.Icon icon="clock-check" />}
          pointerEvents="box-none"
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
});
