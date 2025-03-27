"use client";
import { FaChevronDown, FaChevronUp, FaTrash } from "react-icons/fa";
import { formatTime } from "@/utils/formatTime";

export const HistoryEntry = ({
  entry,
  expandedId,
  editingNoteId,
  noteInput,
  setExpandedId,
  setEditingNoteId,
  setNoteInput,
  updateEntry,
  removeEntry
}: {
  entry: any;
  expandedId: string | null;
  editingNoteId: string | null;
  noteInput: string;
  setExpandedId: (id: string | null) => void;
  setEditingNoteId: (id: string | null) => void;
  setNoteInput: (value: string) => void;
  updateEntry: (id: string, data: any) => void;
  removeEntry: (id: string) => void;
}) => {
  const handleToggleExpand = () => {
    setExpandedId(expandedId === entry.id ? null : entry.id);
  };

  const handleNoteEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingNoteId(entry.id);
    setNoteInput(entry.notes || '');
  };

  const handleSaveNote = () => {
    updateEntry(entry.id, { notes: noteInput });
    setEditingNoteId(null);
    setNoteInput('');
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    removeEntry(entry.id);
  };

  return (
    <li className="border-b pb-2 mb-2">
      <div 
        className="flex justify-between items-center cursor-pointer py-2" 
        onClick={handleToggleExpand}
      >
        <div className="font-semibold truncate mr-2 max-w-[70%]">
          {`${entry.disciplina} - ${entry.tema}`}
        </div>
        <div className="flex items-center shrink-0">
          <span className="text-sm text-gray-500 mr-2">
            {formatTime(entry.tempoEstudado)}
          </span>
          {expandedId === entry.id ? <FaChevronUp /> : <FaChevronDown />}
        </div>
      </div>
      
      {expandedId === entry.id && (
        <div className="pl-4 pt-2 pb-1 overflow-hidden">
          <div className="text-sm text-gray-500 mb-2 break-words">
            <div>Início: {new Date(entry.dateStart).toLocaleString()}</div>
            <div>Fim: {new Date(entry.dateEnd).toLocaleString()}</div>
          </div>
          
          {entry.notes && (
            <div className="text-sm mb-2 break-words">
              <span className="font-medium">Notas:</span> {entry.notes}
            </div>
          )}
          
          <div className="flex flex-wrap items-center gap-2 mt-2">
            {editingNoteId === entry.id ? (
              <>
                <input
                  type="text"
                  value={noteInput}
                  onChange={(e) => setNoteInput(e.target.value)}
                  className="p-1 border rounded w-full mb-1"
                  placeholder="Adicione uma nota..."
                />
                <button 
                  onClick={handleSaveNote}
                  className="text-green-500 hover:text-green-700 shrink-0"
                >
                  Salvar
                </button>
              </>
            ) : (
              <button 
                onClick={handleNoteEdit}
                className="text-blue-500 hover:text-blue-700 text-sm"
              >
                {entry.notes ? 'Editar Nota' : 'Adicionar Nota'}
              </button>
            )}
            <button 
              onClick={handleDelete}
              className="text-red-500 hover:text-red-700 cursor-pointer ml-auto shrink-0"
              title="Remover entrada"
            >
              <FaTrash />
            </button>
          </div>
        </div>
      )}
    </li>
  );
};