"use client";
import { FaFileExport } from "react-icons/fa";
import { useState } from "react";
import { HistoryEntry } from "./HistoryEntry";


export const HistorySection = ({
  statistics,
  removeEntry,
  updateEntry,
  exportToCSV,
  exportToJSON
}: {
  statistics: any[];
  removeEntry: (id: string) => void;
  updateEntry: (id: string, data: any) => void;
  exportToCSV: () => void;
  exportToJSON: () => void;
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [noteInput, setNoteInput] = useState('');

  return (
    <div className="md:w-1/2 min-h-[500px] flex flex-col">
      <div className="w-full max-w-md mx-auto">
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">Histórico</h2>
          <div className="flex gap-2">
            <button onClick={exportToCSV} className="px-3 py-1 bg-[#8a63aa] hover:bg-[#44047c] text-white rounded flex items-center gap-2 transition-colors">
              <FaFileExport /> CSV
            </button>
            <button onClick={exportToJSON} className="px-3 py-1 bg-[#d0b8ed] hover:bg-[#8a63aa] text-[#5e2694] rounded flex items-center gap-2 transition-colors">
              <FaFileExport /> JSON
            </button>
          </div>
        </div>
        {statistics.length > 0 ? (
          <div className="w-full max-w-md mx-auto">
            <ul className="flex-grow bg-white p-4 rounded-lg shadow-md overflow-y-auto h-[400px] w-full">
              {statistics.map((entry) => (
                <HistoryEntry
                  key={entry.id}
                  entry={entry}
                  expandedId={expandedId}
                  editingNoteId={editingNoteId}
                  noteInput={noteInput}
                  setExpandedId={setExpandedId}
                  setEditingNoteId={setEditingNoteId}
                  setNoteInput={setNoteInput}
                  updateEntry={updateEntry}
                  removeEntry={removeEntry}
                />
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-gray-500 italic">Nenhum tempo salvo ainda.</p>
        )}
      </div>
    </div>
  );
};