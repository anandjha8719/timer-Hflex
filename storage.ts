import AsyncStorage from '@react-native-async-storage/async-storage';
import { Timer, HistoryItem } from './types';

const TIMERS_KEY = '@timers';
const HISTORY_KEY = '@history';

export const loadTimers = async (): Promise<Timer[]> => {
  const data = await AsyncStorage.getItem(TIMERS_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveTimers = async (timers: Timer[]) => {
  await AsyncStorage.setItem(TIMERS_KEY, JSON.stringify(timers));
};

export const loadHistory = async (): Promise<HistoryItem[]> => {
  const data = await AsyncStorage.getItem(HISTORY_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveHistory = async (history: HistoryItem[]) => {
  await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(history));
};