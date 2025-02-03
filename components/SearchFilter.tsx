import { useState } from "react";
import Image from "next/image";

type SearchFiltersProps = {
  searchQuery: string;
  selectedTypes: string[];
  selectedRarities: number[];
  showEx: boolean;
  setSearchQuery: (value: string) => void;
  setSelectedTypes: (value: string[]) => void;
  setSelectedRarities: (value: number[]) => void;
  setShowEx: (value: boolean) => void;
};

export const SearchFilters = ({
  searchQuery,
  selectedTypes,
  selectedRarities,
  showEx,
  setSearchQuery,
  setSelectedTypes,
  setSelectedRarities,
  setShowEx,
}: SearchFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const imageUrl = "https://numi8462.github.io/pokemon-tcg";

  const handleTypeClick = (type: string) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type)); // creates a new array excluding the selected type
    } else {
      setSelectedTypes([...selectedTypes, type]); // creates an array including the selected type
    }
  };

  const handleRarityClick = (rarity: number) => {
    if (selectedRarities.includes(rarity)) {
      setSelectedRarities(selectedRarities.filter((r) => r !== rarity));
    } else {
      setSelectedRarities([...selectedRarities, rarity]);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center sticky top-0 bg-gray-900 z-10 p-4 space-y-4">
        <div className="flex w-full max-w-[42rem] gap-4">
          <input
            type="text"
            placeholder="카드 이름으로 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            className="px-3 py-1 rounded-lg bg-pink-600 w-20 text-white text-xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            필터
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="flex justify-center">
          <div className={`flex flex-col fixed gap-4 p-4 rounded-lg justify-center bg-gray-800 border border-gray-700 z-30 lg:w-[42rem]`}>
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-white basis-14">타입:</span>
              <div className="flex flex-wrap gap-2 items-center">
                {[
                  "풀",
                  "불",
                  "물",
                  "전기",
                  "초",
                  "격투",
                  "악",
                  "강철",
                  "드래곤",
                  "노말",
                ].map((type) => (
                  <button
                    key={type}
                    onClick={() => handleTypeClick(type)}
                    className={`px-2 py-2 rounded-full transition-colors ${
                      selectedTypes.includes(type)
                        ? "bg-blue-500"
                        : "bg-gray-700 hover:bg-gray-600"
                    } text-white`}
                  >
                    <Image src={`${imageUrl}/icons/types/${type}.png`} alt="type icon" width={30} height={30}/>
                  </button>
                ))}
              </div>
              
            </div>

            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-white basis-14">희귀도:</span>
              <div className="flex flex-wrap gap-2 items-center">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((rarity) => (
                  <button
                    key={rarity}
                    onClick={() => handleRarityClick(rarity)}
                    className={`px-3 py-1 rounded-full transition-colors ${
                      selectedRarities.includes(rarity)
                        ? "bg-blue-500"
                        : "bg-gray-700 hover:bg-gray-600"
                    } text-white`}
                  >
                    <div className="h-[20px] w-auto">
                      <Image src={`${imageUrl}/icons/rarity/${rarity}.png`} alt="rarity icon" width={100} height={100} className="object-contain h-full w-auto"/>
                    </div>
                    
                  </button>
                ))}
              </div>

            </div>
            
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-white basis-14">종류: </span>
              <button
                onClick={() => setShowEx(!showEx)}
                className={`px-3 py-1 rounded-full max-w-28 transition-colors ${
                  showEx ? "bg-blue-500" : "bg-gray-700 hover:bg-gray-600"
                } text-white`}
              >
                EX 카드
              </button>
            </div>
            
          </div>
        </div>
      )}
    </>
  );
};
