import { useState } from "react";
type SearchFiltersProps = {
  searchQuery: string;
  selectedType: string | null;
  selectedRarity: Number | 0;
  showEx: boolean;
  setSearchQuery: (value: string) => void;
  setSelectedType: (value: string | null) => void;
  setSelectedRarity: (value: Number | 0) => void;
  setShowEx: (value: boolean) => void;
};

export const SearchFilters = ({
  searchQuery,
  selectedType,
  selectedRarity,
  showEx,
  setSearchQuery,
  setSelectedType,
  setSelectedRarity,
  setShowEx,
}: SearchFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="flex flex-col sticky top-16 bg-gray-900 z-10 p-4 space-y-4">
        <div className="flex mx-auto gap-4">
          <input
            type="text"
            placeholder="카드 이름으로 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full mx-auto max-w-md px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            className="px-3 py-1 rounded-lg bg-pink-600 w-20"
            onClick={() => setIsOpen(!isOpen)}
          >
            필터
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="flex flex-col fixed top-32 max-w-2xl gap-4 p-4 rounded-lg justify-center mx-auto bg-blue-950 z-30">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-white">타입:</span>
            {["전기", "물", "풀", "불", "격투", "악", "초", "강철", "노말"].map(
              (type) => (
                <button
                  key={type}
                  onClick={() =>
                    setSelectedType(selectedType === type ? null : type)
                  }
                  className={`px-3 py-1 rounded-full transition-colors ${
                    selectedType === type
                      ? "bg-blue-500"
                      : "bg-gray-700 hover:bg-gray-600"
                  } text-white`}
                >
                  {type}
                </button>
              )
            )}
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-white">희귀도:</span>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((rarity) => (
              <button
                key={rarity}
                onClick={() =>
                  setSelectedRarity(selectedRarity == rarity ? 0 : rarity)
                }
                className={`px-3 py-1 rounded-full transition-colors ${
                  selectedRarity == rarity
                    ? "bg-blue-500"
                    : "bg-gray-700 hover:bg-gray-600"
                } text-white`}
              >
                {rarity}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowEx(!showEx)}
            className={`px-3 py-1 rounded-full max-w-28 transition-colors ${
              showEx ? "bg-blue-500" : "bg-gray-700 hover:bg-gray-600"
            } text-white`}
          >
            EX 카드
          </button>
        </div>
      )}
    </>
  );
};
