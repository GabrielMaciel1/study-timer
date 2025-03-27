"use client";
import { FaPlay, FaPause, FaRedo, FaSave } from "react-icons/fa";

export const TimerControls = ({ 
  isRunning,
  missingFields,
  showTooltip,
  startTimer,
  pauseTimer,
  resetTimer,
  setShowModal
}: {
  isRunning: boolean;
  missingFields: string;
  showTooltip: boolean;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  setShowModal: (value: boolean) => void;
}) => (
  <div className="flex flex-wrap justify-center gap-4 mb-6">
    <div className="relative flex items-center">
      {!isRunning ? (
        <button onClick={startTimer} className="px-6 py-2 bg-[#8a63aa] hover:bg-[#44047c] text-white font-semibold rounded-lg transition-all shadow-md flex items-center gap-2">
          <FaPlay /> Iniciar
        </button>
      ) : (
        <button onClick={pauseTimer} className="px-6 py-2 bg-[#bda7d3] hover:bg-[#8a63aa] text-black font-semibold rounded-lg transition-all shadow-md flex items-center gap-2">
          <FaPause /> Pausar
        </button>
      )}
      {showTooltip && (
        <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 z-10 whitespace-nowrap">
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-l-transparent border-r-transparent border-t-4 border-t-gray-800" />
          {missingFields}
        </div>
      )}
    </div>
    <button onClick={resetTimer} className="px-6 py-2 bg-[#44047c] hover:bg-[#5e2694] text-white font-semibold rounded-lg transition-all shadow-md flex items-center gap-2">
      <FaRedo /> Resetar
    </button>
    <button onClick={() => { pauseTimer(); setShowModal(true); }} className="px-6 py-2 bg-[#d0b8ed] hover:bg-[#8a63aa] text-black font-semibold rounded-lg transition-all shadow-md flex items-center gap-2">
      <FaSave /> Salvar Tempo
    </button>
  </div>
);