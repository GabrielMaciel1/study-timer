import { useMemo } from "react";
import { useTimerContext } from "@/context/TimerContext";

interface Statistic {
  disciplina: string;
  tema: string;
  notes?: string;
  tags?: string[];
  dateStart: Date;
  tempoEstudado: number;
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];
const PERIOD_COLORS = {
  "Manhã (6h-12h)": "#FFC107",
  "Tarde (12h-18h)": "#2196F3",
  "Noite (18h-24h)": "#673AB7",
  "Madrugada (0h-6h)": "#455A64"
};

const getPeriodFromHour = (hour: number) => {
  if (hour >= 6 && hour < 12) return "Manhã (6h-12h)";
  if (hour >= 12 && hour < 18) return "Tarde (12h-18h)";
  if (hour >= 18) return "Noite (18h-24h)";
  return "Madrugada (0h-6h)";
};

const filterByText = (stat: Statistic, searchText: string) => {
  const text = searchText.toLowerCase();
  return [
    stat.disciplina.toLowerCase(),
    stat.tema.toLowerCase(),
    stat.notes?.toLowerCase(),
    stat.tags?.join(" ")?.toLowerCase()
  ].some(field => field?.includes(text));
};

const filterByDate = (stat: Statistic, filterDate: string) => {
  return !filterDate || new Date(stat.dateStart).toISOString().slice(0, 10) === filterDate;
};

export const useStatisticsLogic = () => {
  const { statistics, searchText, filterDate } = useTimerContext();

  const filteredStats = useMemo(() => {
    return statistics.filter(stat => 
      filterByText(stat, searchText) && 
      filterByDate(stat, filterDate)
    );
  }, [statistics, searchText, filterDate]);

  const aggregatedDisciplines = useMemo(() => 
    filteredStats.reduce((acc, { disciplina, tempoEstudado }) => {
      acc[disciplina] = (acc[disciplina] || 0) + tempoEstudado;
      return acc;
    }, {} as Record<string, number>),
  [filteredStats]);

  const disciplineTotals = useMemo(() => 
    Object.entries(aggregatedDisciplines)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3),
  [aggregatedDisciplines]);

  const pieData = useMemo(() => 
    Object.entries(aggregatedDisciplines).map(([name, value]) => ({ name, value })),
  [aggregatedDisciplines]);

  const periodData = useMemo(() => {
    const periodStats = filteredStats.reduce((acc, { dateStart, tempoEstudado }) => {
      const hour = new Date(dateStart).getHours();
      const period = getPeriodFromHour(hour);
      acc[period] = (acc[period] || 0) + tempoEstudado;
      return acc;
    }, {} as Record<string, number>);
    return Object.entries(periodStats).map(([name, tempo]) => ({ name, tempo }));
  }, [filteredStats]);

  return {
    disciplineTotals,
    pieData,
    periodData,
    COLORS,
    PERIOD_COLORS
  };
};