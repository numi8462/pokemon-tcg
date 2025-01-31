'use client'
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from './card.module.css';
import { IoIosCloseCircle } from "react-icons/io";
import { supabase } from '@/lib/supabase'

type Card = {
  id: number;
  imageSrc: string;
}

export default function Home() {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0});
  const [isDragging, setIsDragging] = useState(false);
  const [cards, setCards] = useState<Card[]>([])
  const [loading, setLoading] = useState(true)

  //dummy cards for testing
  // const cards: Card[] = Array(9).fill(null).map((_, i)=> ({
  //   id: i,
  //   imageSrc: `https://picsum.photos/200/300?random=${i}`,
  // }));
  
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

  // drag handler
  const handleMove = (movementX: number, movementY: number) => {
    setRotation(prev => ({
      x: Math.max(-20, Math.min(20, prev.x + movementY * 0.5)),
      y: Math.max(-20, Math.min(20, prev.y - movementX * 0.5))
    }));
  };

  return (
    <main className="min-h-screen p-4 md:p-8 bg-gray-900">
      <div className="flex justify-center p-4">
        <h1 className="text-7xl font-bold"> 포켓몬 도감</h1>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
        {cards.map(card => (
          <div
            key={card.id}
            className="cursor-pointer"
            onClick={() => setSelectedCard(card)}
          >
            <div className="aspect-[2/3] relative rounded-xl transition-transform duration-300 hover:scale-105">
              <Image
                src={card.imageSrc}
                alt={`Card ${card.id}`}
                fill
                className="object-contain"
              />
            </div>
          </div>
        ))}
      </div>

      {/* 3D 카드 모델 */}
      {selectedCard && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center"
        >
          <IoIosCloseCircle 
            size={50}
            className="cursor-pointer absolute top-2 right-2"
            onClick={() => setSelectedCard(null)}
          />
          <div
            className={`${styles.cardContainer} cursor-grab active:cursor-grabbing`}
            onDragStart={(e) => {
              e.preventDefault();
            }}
            onMouseDown={() => setIsDragging(true)}
            onMouseMove={(e) => {
              if (!isDragging) return;
              handleMove(e.movementX, e.movementY);
            }}
            onMouseUp={() => {
              setIsDragging(false);
              setRotation({ x: 0, y: 0});
            }}
            onMouseLeave={() => {
              setIsDragging(false);
              setRotation({ x: 0, y: 0});
            }}
            onTouchStart={() => setIsDragging(true)}
            onTouchMove={(e) => {
              if (!isDragging) return;
              const touch = e.touches[0];
              const movementX = touch.clientX - (touch as any).prevClientX || 0;
              const movementY = touch.clientY - (touch as any).prevClientY || 0;
              handleMove(movementX, movementY);
            }}
            onTouchEnd={() => {
              setIsDragging(false);
              setRotation({ x: 0, y: 0});
            }}
          >
            <div
              className={styles.card3d}
              style={{
                transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                // 회전 각도를 CSS 변수로 전달
                ['--rotate-x' as any]: `${rotation.x}deg`,
                ['--rotate-y' as any]: `${rotation.y}deg`,
              }}
            >
              <div className="relative w-full h-full">
                <Image
                  src={selectedCard.imageSrc}
                  alt="Selected card"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
