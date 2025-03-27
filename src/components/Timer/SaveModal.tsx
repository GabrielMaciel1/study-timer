"use client";

export const SaveModal = ({
  showModal,
  saveTimeHandler,
  setShowModal,
  startTimer
}: {
  showModal: boolean;
  saveTimeHandler: () => void;
  setShowModal: (value: boolean) => void;
  startTimer: () => void;
}) => (
  showModal && (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl max-w-sm mx-auto">
        <h2 className="text-xl font-bold mb-4 text-center text-gray-800">Confirmar Salvar</h2>
        <p className="text-gray-600 mb-4 text-center">Deseja salvar o tempo estudado?</p>
        <div className="flex justify-center gap-4">
          <button onClick={saveTimeHandler} className="px-4 py-2 bg-[#8a63aa] hover:bg-[#44047c] text-white rounded-lg shadow-md">
            Confirmar
          </button>
          <button onClick={() => { setShowModal(false); startTimer(); }} className="px-4 py-2 bg-[#bda7d3] hover:bg-[#d0b8ed] text-black rounded-lg shadow-md">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
);