import { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { List, ProgressBar, Button, IconButton } from "react-native-paper";
import { Timer } from "../types";

export default function TimerItem({
  timer,
  onUpdate,
  onComplete,
  intervalRefs,
  setIntervals,
}: {
  timer: Timer;
  onUpdate: (timer: Timer) => void;
  onComplete: (timer: Timer) => void;
  intervalRefs: Record<string, NodeJS.Timeout>;
  setIntervals: React.Dispatch<
    React.SetStateAction<Record<string, NodeJS.Timeout>>
  >;
}) {
  const [remaining, setRemaining] = useState(timer.remaining);
  const progress = 1 - remaining / timer.duration;

  useEffect(() => {
    if (timer.status === "running" && !intervalRefs[timer.id]) {
      const interval = setInterval(() => {
        setRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            const completedTimer = {
              ...timer,
              status: "completed",
              remaining: 0,
            };
            onUpdate(completedTimer);
            onComplete(completedTimer);
            return 0;
          }
          const newRemaining = prev - 1;
          onUpdate({ ...timer, remaining: newRemaining });
          return newRemaining;
        });
      }, 1000);
      setIntervals((prev) => ({ ...prev, [timer.id]: interval }));
    }

    if (timer.status !== "running" && intervalRefs[timer.id]) {
      clearInterval(intervalRefs[timer.id]);
      setIntervals((prev) => {
        const newIntervals = { ...prev };
        delete newIntervals[timer.id];
        return newIntervals;
      });
    }

    return () => {
      if (intervalRefs[timer.id]) {
        clearInterval(intervalRefs[timer.id]);
      }
    };
  }, [timer.status]);

  const handleReset = () => {
    setRemaining(timer.duration);
    onUpdate({ ...timer, remaining: timer.duration, status: "paused" });
  };

  return (
    <List.Item
      title={timer.name}
      description={`${remaining}s`}
      right={() => (
        <View style={styles.controls}>
          <ProgressBar progress={progress} style={styles.progress} />
          <View style={styles.buttons}>
            {timer.status !== "completed" ? (
              <>
                <IconButton
                  icon={timer.status === "running" ? "pause" : "play"}
                  onPress={() =>
                    onUpdate({
                      ...timer,
                      status: timer.status === "running" ? "paused" : "running",
                    })
                  }
                />
              </>
            ) : (
              <IconButton icon="play" disabled />
            )}
            <IconButton icon="refresh" onPress={handleReset} />
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  controls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',
    paddingRight: 120,
  },
  progress: { width: 100, marginRight: 8, height: 4, marginVertical: 'auto' },
  buttons: { flexDirection: "row" },
});
