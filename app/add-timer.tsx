import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, TextInput, Switch } from 'react-native-paper';
import { Timer } from '../types';
import { saveTimers, loadTimers } from '../storage';
import { router } from 'expo-router';

export default function AddTimerScreen() {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [category, setCategory] = useState('');
  const [halfwayAlert, setHalfwayAlert] = useState(false);

  const handleSave = async () => {
    const newTimer: Timer = {
      id: Date.now().toString(),
      name,
      duration: Number(duration),
      remaining: Number(duration),
      category: category || 'Uncategorized',
      status: 'paused',
      createdAt: new Date(),
      halfwayAlert,
    };

    const existingTimers = await loadTimers();
    await saveTimers([...existingTimers, newTimer]);
    router.back();
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Timer Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        label="Duration (seconds)"
        value={duration}
        onChangeText={setDuration}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        label="Category"
        value={category}
        onChangeText={setCategory}
        style={styles.input}
      />
      <View style={styles.switch}>
        <Switch value={halfwayAlert} onValueChange={setHalfwayAlert} />
        <Button mode="text">Enable 50% Alert</Button>
      </View>
      <Button mode="contained" onPress={handleSave}>
        Save Timer
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: { marginBottom: 16 },
  switch: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
});