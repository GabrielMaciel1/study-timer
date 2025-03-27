import { formatTime } from "@/utils/formatTime";

type TopDisciplinesProps = {
    disciplineTotals: [string, number][];
  };
  
  const getMedal = (index: number) => {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    return "🥉";
  };
  
  export const TopDisciplines = ({ disciplineTotals }: TopDisciplinesProps) => (
    <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Top 3 Disciplinas</h3>
      {disciplineTotals.length === 0 ? (
        <p className="text-gray-500 italic">Nenhum dado encontrado.</p>
      ) : (
        <ul className="space-y-2">
          {disciplineTotals.map(([disc, total], idx) => (
            <li key={disc} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg shadow-sm">
              <span>{getMedal(idx)} {disc}</span>
              <span className="font-bold">{formatTime(total)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );