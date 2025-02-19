import { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { List, FAB, Modal, Portal, Text, Button } from 'react-native-paper';
import { Timer, HistoryItem } from '../../types';
import { loadTimers, saveTimers, saveHistory, loadHistory } from '../../storage';
import TimerItem from '../../components/TimerItem';
import CategoryActions from '../../components/CategoryActions';
import { router } from 'expo-router';
export default function HomeScreen() {
  const [timers, setTimers] = useState<Timer[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [completedTimer, setCompletedTimer] = useState<Timer | null>(null);
  const [intervals, setIntervals] = useState<Record<string, NodeJS.Timeout>>({});

  useEffect(() => {
    loadTimers().then(setTimers);
  }, []);

  const categories = Array.from(new Set(timers.map(t => t.category || 'Uncategorized')));

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      newSet.has(category) ? newSet.delete(category) : newSet.add(category);
      return newSet;
    });
  };

  const handleTimerUpdate = async (updatedTimer: Timer) => {
    const newTimers = timers.map(t => t.id === updatedTimer.id ? updatedTimer : t);
    setTimers(newTimers);
    await saveTimers(newTimers);
  };

  const handleComplete = async (timer: Timer) => {
    const historyItem: HistoryItem = {
      timerId: timer.id,
      name: timer.name,
      completedAt: new Date(),
    };
    const history = await loadHistory();
    await saveHistory([...history, historyItem]);
    setCompletedTimer(timer);
  };

  const handleBulkAction = (category: string, action: 'start' | 'pause' | 'reset') => {
    const categoryTimers = timers.filter(t => t.category === category);
    const updatedTimers = categoryTimers.map(timer => {
      switch(action) {
        case 'start': return { ...timer, status: 'running' };
        case 'pause': return { ...timer, status: 'paused' };
        case 'reset': return { 
          ...timer, 
          status: 'paused',
          remaining: timer.duration
        };
        default: return timer;
      }
    });
    setTimers(timers.map(t => 
      t.category === category 
        ? updatedTimers.find(ut => ut.id === t.id)! 
        : t
    ));
    saveTimers(timers);
  };

  return (
    <View style={styles.container}>
      <Portal>
        <Modal
          visible={!!completedTimer}
          onDismiss={() => setCompletedTimer(null)}>
          <View style={styles.modal}>
            <Text variant="titleLarge">Timer Completed!</Text>
            <Text variant="bodyMedium">{completedTimer?.name}</Text>
            <Button mode="contained" onPress={() => setCompletedTimer(null)}>
              OK
            </Button>
          </View>
        </Modal>
      </Portal>

      {categories.map(category => (
        <List.Accordion
          key={category}
          title={category}
          expanded={expandedCategories.has(category)}
          onPress={() => toggleCategory(category)}
          right={() => (
            <CategoryActions
              category={category}
              onAction={handleBulkAction}
            />
          )}>
          {timers
            .filter(t => t.category === category)
            .map(timer => (
              <TimerItem
                key={timer.id}
                timer={timer}
                onUpdate={handleTimerUpdate}
                onComplete={handleComplete}
                intervalRefs={intervals}
                setIntervals={setIntervals}
              />
            ))}
        </List.Accordion>
      ))}

      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => router.push('/add-timer')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  fab: { position: 'absolute', bottom: 16, right: 16 },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 8,
    gap: 16,
  },
});