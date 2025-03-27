type SearchFiltersProps = {
    setSearchText: (text: string) => void;
    setFilterDate: (date: string) => void;
  };
  
  export const SearchFilters = ({ setSearchText, setFilterDate }: SearchFiltersProps) => (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      <input
        type="text"
        placeholder="Buscar (disciplina, tema, notas, tags)"
        onChange={(e) => setSearchText(e.target.value)}
        className="p-3 border rounded-lg w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-[#8a63aa]"
      />
      <div className="flex gap-2 w-full md:w-1/2">
        <input
          type="date"
          onChange={(e) => setFilterDate(e.target.value)}
          className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#8a63aa]"
        />
        <button
          onClick={() => setFilterDate("")}
          className="px-4 py-2 bg-[#8a63aa] text-white rounded-lg hover:bg-[#5e2694]"
        >
          Limpar
        </button>
      </div>
    </div>
  );