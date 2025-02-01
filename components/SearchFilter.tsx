type SearchFiltersProps = {
  searchQuery: string;
  selectedType: string | null;
  selectedRarity: string | null;
  showEx: boolean;
  rarities: string[];
  setSearchQuery: (value: string) => void;
  setSelectedType: (value: string | null) => void;
  setSelectedRarity: (value: string | null) => void;
  setShowEx: (value: boolean) => void;
};

export const SearchFilters = ({
  searchQuery,
  selectedType,
  selectedRarity,
  showEx,
  rarities,
  setSearchQuery,
  setSelectedType,
  setSelectedRarity,
  setShowEx
}: SearchFiltersProps) => {
  return (
    <div className="sticky top-0 bg-gray-900 z-10 p-4 space-y-4">
      <input
        type="text"
        placeholder="카드 이름으로 검색..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full max-w-md px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="flex flex-wrap gap-4 justify-center">
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-white">타입:</span>
          {['전기', '물', '풀', '초', '악', '강철', '노말', '불', '격투'].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(selectedType === type ? null : type)}
              className={`px-3 py-1 rounded-full transition-colors ${
                selectedType === type ? 'bg-blue-500' : 'bg-gray-700 hover:bg-gray-600'
              } text-white`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-white">희귀도:</span>
          {rarities.map((rarity) => (
            <button
              key={rarity}
              onClick={() => setSelectedRarity(selectedRarity === rarity ? null : rarity)}
              className={`px-3 py-1 rounded-full transition-colors ${
                selectedRarity === rarity ? 'bg-blue-500' : 'bg-gray-700 hover:bg-gray-600'
              } text-white`}
            >
              {rarity}
            </button>
          ))}
        </div>

        <button
          onClick={() => setShowEx(!showEx)}
          className={`px-3 py-1 rounded-full transition-colors ${
            showEx ? 'bg-blue-500' : 'bg-gray-700 hover:bg-gray-600'
          } text-white`}
        >
          EX 카드
        </button>
      </div>
    </div>
  );
};