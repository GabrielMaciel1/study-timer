"use client";
import { useTimerContext } from "@/context/TimerContext";
import { useTimerLogic } from "@/hooks/useTimerLogic";
import { TimerControls } from "./TimerControls";
import { SaveModal } from "./SaveModal";
import { HistorySection } from "./HistorySection";
import { formatTime } from "@/utils/formatTime";

export const Timer = () => {
  const timer = useTimerLogic();
  const { statistics, removeEntry, updateEntry, exportToCSV, exportToJSON } = useTimerContext();

  const handleModeChange = (newMode: "crescente" | "regressiva") => {
    timer.setMode(newMode);
    timer.resetTimer();
  };

  const handleSetCountdown = () => timer.setTime(timer.countdownInput * 60);
  const formValues = timer.formValues
  return (
    <div className="p-6 bg-[#f8f8f8] max-md:mt-[300px] text-[#5e2694] rounded-lg shadow-lg max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2 min-h-[500px] flex flex-col">
          <h1 className="text-4xl font-bold mb-6 text-center">Cronômetro</h1>
          
          <div className="flex gap-4 mb-4 justify-center">
            <button className={`px-3 py-1 rounded ${timer.mode === "crescente" ? "bg-purple-700 text-white" : "bg-gray-300"}`} onClick={() => handleModeChange("crescente")}>
              Crescente
            </button>
            <button className={`px-3 py-1 rounded ${timer.mode === "regressiva" ? "bg-purple-700 text-white" : "bg-gray-300"}`} onClick={() => handleModeChange("regressiva")}>
              Regressiva
            </button>
          </div>

          {timer.mode === "regressiva" && (
            <div className="mb-4 flex justify-center items-center space-x-2">
              <span className="text-lg font-medium text-gray-700">Contagem Regressiva:</span>
              <input 
                type="number" 
                min={1} 
                value={timer.countdownInput}
                onChange={(e) => {
                  const value = Math.max(1, parseInt(e.target.value) || 1);
                  timer.setCountdownInput(value);
                }}
                className="w-20 p-1 border rounded"
              />
              <button onClick={handleSetCountdown} className="px-3 py-1 bg-[#44047c] hover:bg-[#5e2694] text-white rounded">
                Definir
              </button>
            </div>
          )}

          <p className="text-5xl font-mono mb-8 bg-[#44047c] text-white px-6 py-3 rounded-lg shadow-md text-center">
            {formatTime(timer.time)}
          </p>

          <div className="flex flex-col gap-3 w-full mb-6">
            <input type="text" placeholder="Disciplina" value={formValues.disciplina} onChange={(e) => timer.setDisciplina(e.target.value)} className={`p-3 w-full rounded-lg bg-[#d0b8ed] text-black focus:outline-none focus:ring-2 focus:ring-[#8a63aa]`} />
            <input type="text" placeholder="Tema" value={formValues.tema} onChange={(e) => timer.setTema(e.target.value)} className={`p-3 w-full rounded-lg bg-[#d0b8ed] text-black focus:outline-none focus:ring-2 focus:ring-[#8a63aa] `} />
          </div>

          <TimerControls
            isRunning={timer.isRunning}
            missingFields={timer.missingFields}
            showTooltip={timer.showTooltip}
            startTimer={timer.startTimer}
            pauseTimer={timer.pauseTimer}
            resetTimer={timer.resetTimer}
            setShowModal={timer.setShowModal}
          />

          <SaveModal
            showModal={timer.showModal}
            saveTimeHandler={timer.saveTimeHandler}
            setShowModal={timer.setShowModal}
            startTimer={timer.startTimer}
          />
        </div>

        <HistorySection
          statistics={statistics}
          removeEntry={removeEntry}
          updateEntry={updateEntry}
          exportToCSV={exportToCSV}
          exportToJSON={exportToJSON}
        />
      </div>
      <p className="mt-6 text-center italic text-gray-600">"Cada minuto de estudo é um passo para o sucesso!"</p>
    </div>
  );
};