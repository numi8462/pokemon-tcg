'use client'
import { useState, useEffect } from "react";
import { supabase } from '@/lib/supabase'
import Card from '@/components/Card';
import Navbar from "@/components/Navbar";

type Card = {
  id: number;
  imageSrc: string;
  name: string;
  type: '전기' | '물' | '풀' | '초' | '악' | '강철' | '노말' | '불' | '격투';
  rarity: string;
  ex: boolean;
};

export default function Home() {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedRarity, setSelectedRarity] = useState<string | null>(null);
  const [showEx, setShowEx] = useState(false);
  
  // supabase card data
  useEffect(() => {
    const fetchCards = async () => {
      try {
        console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
        const { data, error } = await supabase
          .from('cards')
          .select('*')
          .order('id', { ascending: false })
  
        console.log('Fetched data:', data)
        if (error) throw error
        setCards(data || [])
      } catch (error) {
        console.error('Error fetching cards:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchCards()
  }, [])

  return (
    <main className="min-h-screen bg-gray-900">
      <Navbar />
      <div className="flex justify-center p-4 mt-4">
        <h1 className="text-5xl font-bold">포켓몬 도감</h1>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto p-4 md:p-8">
        {cards.map(card => (
          <Card key={card.id} card={card} />
        ))}
      </div>
    </main>
  );
}
