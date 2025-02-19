import { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { List } from 'react-native-paper';
import { loadHistory } from '../../storage';
import { HistoryItem } from '../../types';

export default function HistoryScreen() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    loadHistory().then(setHistory);
  }, []);

  return (
    <View style={styles.container}>
      {history.map((item, index) => (
        <List.Item
          key={index}
          title={item.name}
          description={item.completedAt.toLocaleString()}
          left={() => <List.Icon icon="clock-check" />}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
});