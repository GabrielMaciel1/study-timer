import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

type DisciplinePieChartProps = {
    pieData: Array<{ name: string; value: number }>;
    COLORS: string[];
    formatTime: (seconds: number) => string;
  };
  
  export const DisciplinePieChart = ({ pieData, COLORS, formatTime }: DisciplinePieChartProps) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-center mb-4">Tempo por Disciplina</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
          >
            {pieData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => formatTime(value as number)} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );