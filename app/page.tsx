'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Card from '@/components/Card';
import Navbar from '@/components/Navbar';
import { SearchFilters } from '@/components/SearchFilter';
import ScrollTop from '@/components/ScrollTop';
import Image from 'next/image';
import logo from '@/public/icons/pokeball.png';

type Card = {
  id: number;
  imageSrc: string;
  name: string;
  type: '전기' | '물' | '풀' | '초' | '악' | '강철' | '노말' | '불' | '격투';
  rarity: number;
  ex: boolean;
};

export default function Home() {
  const [cards, setCards] = useState<Card[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedRarities, setSelectedRarities] = useState<number[]>([]);
  const [showEx, setShowEx] = useState(false);
  const [loading, setLoading] = useState(true);

  // filter
  const filteredCards = cards.filter((card) => {
    const nameMatch = card.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const typeMatch =
      selectedTypes.length > 0 // Check if any types are selected
        ? selectedTypes.some((type) => card.type === type) // Use some to check if card.type matches ANY selected type
        : true; // If no types are selected, all cards match

    const rarityMatch =
      selectedRarities.length > 0 // Check if any rarities are selected
        ? selectedRarities.includes(card.rarity) // Use includes to check if card.rarity is in the selectedRarities array
        : true; // If no rarities are selected, all cards match

    const exMatch = showEx ? card.ex : true;

    return nameMatch && typeMatch && rarityMatch && exMatch; // Simplified return
  });

  // supabase card data
  useEffect(() => {
    const fetchCards = async () => {
      setLoading(true);
      try {
        // 아르세우스 카드팩
        const arceusResult = await supabase
          .from('arceus_expansion_cards')
          .select('*')
          .order('id', { ascending: true });
        console.log(arceusResult.data);
        // if (arceusResult.error) throw arceusResult.error;

        // 디아루가 펄기아 카드팩
        const dialgaPalkiaResult = await supabase
          .from('dialga_palkia_expansion_cards')
          .select('*')
          .order('id', { ascending: true });
        // if (dialgaPalkiaResult.error) throw dialgaPalkiaResult.error;

        // 두 데이터 배열을 합쳐서 상태에 설정
        setCards([
          ...(arceusResult.data || []),
          ...(dialgaPalkiaResult.data || []),
        ]);
      } catch (error) {
        console.error('Error fetching cards:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCards();
  }, []);

  return (
    <main className="min-h-screen bg-gray-900">
      <Navbar />

      <ScrollTop />

      <SearchFilters
        searchQuery={searchQuery}
        selectedTypes={selectedTypes}
        selectedRarities={selectedRarities}
        showEx={showEx}
        setSearchQuery={setSearchQuery}
        setSelectedTypes={setSelectedTypes}
        setSelectedRarities={setSelectedRarities}
        setShowEx={setShowEx}
      />

      <div className="flex justify-center p-4 mt-4">
        <h1 className="text-5xl font-bold text-white">포켓몬 카드 도감</h1>
      </div>

      <div className="flex gap-2 items-center text-2xl max-w-6xl mx-auto px-4 md:px-8 text-white">
        <Image
          src={logo}
          alt="pokedex icon"
          width={30}
          height={30}
          className="rounded-full ml-2"
        />
        {`(${filteredCards.length})`}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto px-4 md:px-8">
        {loading ? ( // Conditionally render a loading message
          <p className="text-white">Loading...</p>
        ) : (
          filteredCards.map((card, i) => <Card key={i} card={card} />)
        )}
      </div>
    </main>
  );
}
