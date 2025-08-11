'use client';

import { useState } from 'react';
import Card from '@/components/Card';
import Navbar from '@/components/Navbar';
import { SearchFilters } from '@/components/SearchFilter';
import ScrollTop from '@/components/ScrollTop';
import Image from 'next/image';
import logo from '@/public/icons/pokeball.png';
import { CardType } from '@/app/page';

// props 타입 정의
interface HomePageProps {
  initialCards: CardType[];
  loadingError: string | null;
}

export default function HomePage({
  initialCards,
  loadingError,
}: HomePageProps) {
  // initialCards를 useState의 초기값으로 사용하여 클라이언트 상태로 관리합니다.
  const [cards] = useState<CardType[]>(initialCards);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedRarities, setSelectedRarities] = useState<number[]>([]);
  const [showEx, setShowEx] = useState(false);

  // 필터링 로직 (클라이언트 측에서 실행)
  const filteredCards = cards.filter((card) => {
    const nameMatch = card.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const typeMatch =
      selectedTypes.length > 0
        ? selectedTypes.some((type) => card.type === type)
        : true;

    const rarityMatch =
      selectedRarities.length > 0
        ? selectedRarities.includes(card.rarity)
        : true;

    const exMatch = showEx ? card.ex : true;

    return nameMatch && typeMatch && rarityMatch && exMatch;
  });

  // 뷰포트 크기별 첫 번째 행 카드 수 계산
  const getPriorityCount = () => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width >= 1024) return 8; // lg: 8개
      if (width >= 768) return 6; // md: 6개
      return 4; // mobile: 4개
    }
    return 8; // SSR 기본값
  };

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
        {loadingError ? ( // 서버에서 전달받은 오류가 있다면 표시
          <p className="text-red-500">오류: {loadingError}</p>
        ) : (
          filteredCards.map((card, i) => (
            <Card key={i} card={card} isPriority={i < getPriorityCount()} />
          ))
        )}
      </div>
    </main>
  );
}
