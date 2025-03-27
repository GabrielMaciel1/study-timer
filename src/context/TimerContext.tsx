"use client";
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

interface StatisticsEntry {
  id: string;
  disciplina: string;
  tema: string;
  tempoEstudado: number;
  dateStart: Date;
  dateEnd: Date;
  notes?: string;
  tags?: string[];
}

interface TimerState {
  time: number;
  isRunning: boolean;
  mode: 'crescente' | 'regressiva';
  countdownInput: number;
  lastUpdate: number;
}

interface TimerContextType {
  timerState: TimerState;
  setTimerState: React.Dispatch<React.SetStateAction<TimerState>>;
  statistics: StatisticsEntry[];
  searchText: string;
  filterDate: string;
  setSearchText: (text: string) => void;
  setFilterDate: (date: string) => void;
  removeEntry: (id: string) => void;
  updateEntry: (id: string, data: Partial<StatisticsEntry>) => void;
  exportToCSV: () => void;
  exportToJSON: () => void;
  addEntry: (entry: Omit<StatisticsEntry, 'id'>) => void;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export const TimerProvider = ({ children }: { children: React.ReactNode }) => {
  const [timerState, setTimerState] = useState<TimerState>({
    time: 0,
    isRunning: false,
    mode: 'crescente',
    countdownInput: 5,
    lastUpdate: Date.now()
  });

  const [statistics, setStatistics] = useState<StatisticsEntry[]>([]);
  const [searchText, setSearchText] = useState('');
  const [filterDate, setFilterDate] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('timerContext');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.timerState) {
          const timeDiff = parsed.timerState.isRunning 
            ? Math.floor((Date.now() - parsed.timerState.lastUpdate) / 1000)
            : 0;

          setTimerState({
            time: parsed.timerState.mode === 'crescente' 
              ? (Number(parsed.timerState.time) || 0) + timeDiff
              : Math.max((Number(parsed.timerState.time) || 0) - timeDiff, 0),
            isRunning: parsed.timerState.isRunning,
            mode: parsed.timerState.mode || 'crescente',
            countdownInput: Number(parsed.timerState.countdownInput) || 5,
            lastUpdate: Date.now()
          });
        }
        setStatistics(Array.isArray(parsed.statistics) ? parsed.statistics : []);
      } catch (error) {
        console.error('Error loading saved state:', error);
      }
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timerState.isRunning) {
        setTimerState(prev => ({
          ...prev,
          time: prev.mode === 'crescente' ? prev.time + 1 : Math.max(prev.time - 1, 0),
          lastUpdate: Date.now()
        }));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timerState.isRunning, timerState.mode]);

  useEffect(() => {
    localStorage.setItem('timerContext', JSON.stringify({ timerState, statistics }));
  }, [timerState, statistics]);

  const addEntry = useCallback((entry: Omit<StatisticsEntry, 'id'>) => {
    const newEntry = { ...entry, id: uuidv4() };
    setStatistics(prev => [...prev, newEntry]);
  }, []);

  const removeEntry = useCallback((id: string) => {
    setStatistics(prev => prev.filter(entry => entry.id !== id));
  }, []);

  const updateEntry = useCallback((id: string, data: Partial<StatisticsEntry>) => {
    setStatistics(prev => prev.map(entry => entry.id === id ? { ...entry, ...data } : entry));
  }, []);

  const exportToCSV = useCallback(() => {
    const csvContent = [
      "ID;Disciplina;Tema;Tempo;Data Início;Data Fim;Notas;Tags",
      ...statistics.map(entry => [
        entry.id,
        entry.disciplina,
        entry.tema,
        entry.tempoEstudado,
        entry.dateStart.toISOString(),
        entry.dateEnd.toISOString(),
        entry.notes?.replace(/;/g, ','),
        entry.tags?.join(';')
      ].join(';'))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'estatisticas.csv';
    link.click();
  }, [statistics]);

  const exportToJSON = useCallback(() => {
    const dataStr = JSON.stringify(statistics, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'estatisticas.json';
    link.click();
  }, [statistics]);

  return (
    <TimerContext.Provider
      value={{
        timerState,
        setTimerState,
        statistics,
        searchText,
        filterDate,
        setSearchText,
        setFilterDate,
        removeEntry,
        updateEntry,
        exportToCSV,
        exportToJSON,
        addEntry
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export const useTimerContext = () => {
  const context = useContext(TimerContext);
  if (!context) throw new Error("useTimerContext must be used within a TimerProvider");
  return context;
};