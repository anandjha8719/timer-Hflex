import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, TextInput, Switch, HelperText } from "react-native-paper";
import { Timer } from "../types";
import { saveTimers, loadTimers } from "../storage";

export const AddTimerScreen = () => {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [category, setCategory] = useState("");
  const [halfwayAlert, setHalfwayAlert] = useState(false);

  const handleSave = async () => {
    const newTimer: Timer = {
      id: Date.now().toString(),
      name,
      duration: Number(duration),
      remaining: Number(duration),
      category,
      status: "paused",
      createdAt: new Date(),
      halfwayAlert,
    };

    const existingTimers = await loadTimers();
    await saveTimers([...existingTimers, newTimer]);
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
      <View style={styles.switchContainer}>
        <Switch value={halfwayAlert} onValueChange={setHalfwayAlert} />
        <HelperText type="info">Enable 50% completion alert</HelperText>
      </View>
      <Button mode="contained" onPress={handleSave}>
        Save Timer
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1 },
  input: { marginBottom: 16 },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
});
