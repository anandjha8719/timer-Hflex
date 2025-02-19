export type Timer = {
    id: string;
    name: string;
    duration: number;
    remaining: number;
    category: string;
    status: 'running' | 'paused' | 'completed';
    createdAt: Date;
    halfwayAlert?: boolean;
  };
  
  export type HistoryItem = {
    timerId: string;
    name: string;
    completedAt: Date;
  };