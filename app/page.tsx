"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Card from "@/components/Card";
import Navbar from "@/components/Navbar";
import { SearchFilters } from "@/components/SearchFilter";

type Card = {
  id: number;
  imageSrc: string;
  name: string;
  type: "전기" | "물" | "풀" | "초" | "악" | "강철" | "노말" | "불" | "격투";
  rarity: number;
  ex: boolean;
};

export default function Home() {
  const [cards, setCards] = useState<Card[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedRarity, setSelectedRarity] = useState<number | 0>(0);
  const [showEx, setShowEx] = useState(false);
  const [loading, setLoading] = useState(true);

  // filter
  const filteredCards = cards.filter((card) => {
    const nameMatch = card.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const typeMatch = selectedType ? card.type === selectedType : true;
    const rarityMatch = selectedRarity ? card.rarity === selectedRarity : true;
    const exMatch = showEx ? card.ex : true;
    if (nameMatch && typeMatch && rarityMatch && exMatch) {
      console.log(card.name);
      return card;
    }
  });

  // supabase card data
  useEffect(() => {
    const fetchCards = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("cards")
          .select("*")
          .order("id", { ascending: false });
        if (error) throw error;
        setCards(data || []);
      } catch (error) {
        console.error("Error fetching cards:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCards();
  }, []);

  useEffect(() => {
    console.log("filteredCards updated:", filteredCards);
  }, [filteredCards]); 

  return (
    <main className="min-h-screen bg-gray-900">
      <Navbar />

      <SearchFilters
        searchQuery={searchQuery}
        selectedType={selectedType}
        selectedRarity={selectedRarity}
        showEx={showEx}
        setSearchQuery={setSearchQuery}
        setSelectedType={setSelectedType}
        setSelectedRarity={setSelectedRarity}
        setShowEx={setShowEx}
      />

      <div className="flex justify-center p-4 mt-4">
        <h1 className="text-5xl font-bold">포켓몬 도감</h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto p-4 md:p-8">
        {loading ? ( // Conditionally render a loading message
          <p className="text-white">Loading...</p>
        ) : (
          filteredCards.map((card) => <Card key={card.id} card={card} />)
        )}
      </div>
    </main>
  );
}
