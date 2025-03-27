"use client";
import { useTimerContext } from "@/context/TimerContext";
import { useStatisticsLogic } from "@/hooks/useStatisticsLogic";
import { formatTime } from "@/utils/formatTime";
import { StatisticsHeader } from "./StatisticsHeader";
import { SearchFilters } from "./SearchFilters";
import { TopDisciplines } from "./TopDisciplines";
import { DisciplinePieChart } from "./DisciplinePieChart";
import { PeriodBarChart } from "./PeriodBarChart";

export const Statistics = () => {
  const { setSearchText, setFilterDate } = useTimerContext();
  const { disciplineTotals, pieData, periodData, COLORS, PERIOD_COLORS } = useStatisticsLogic();

  return (
    <div className="p-6 bg-gray-100 max-md:mt-[500px] rounded-lg shadow-lg w-full max-w-6xl mx-auto">
      <StatisticsHeader />
      
      <SearchFilters 
        setSearchText={setSearchText}
        setFilterDate={setFilterDate}
      />

      <TopDisciplines disciplineTotals={disciplineTotals} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <DisciplinePieChart 
          pieData={pieData} 
          COLORS={COLORS} 
          formatTime={formatTime}
        />
        
        <PeriodBarChart 
          periodData={periodData} 
          PERIOD_COLORS={PERIOD_COLORS} 
          formatTime={formatTime}
        />
      </div>
    </div>
  );
};