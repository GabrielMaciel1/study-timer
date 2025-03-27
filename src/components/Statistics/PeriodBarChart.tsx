import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type PeriodBarChartProps = {
    periodData: Array<{ name: string; tempo: number }>;
    PERIOD_COLORS: { [key: string]: string };
    formatTime: (seconds: number) => string;
  };
  
  export const PeriodBarChart = ({ periodData, PERIOD_COLORS, formatTime }: PeriodBarChartProps) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-center mb-4">Distribuição por Período do Dia</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={periodData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(value) => formatTime(value as number)} />
          <Bar dataKey="tempo">
            {periodData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={PERIOD_COLORS[entry.name as keyof typeof PERIOD_COLORS]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );