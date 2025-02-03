import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./card.module.css";
import { IoIosCloseCircle } from "react-icons/io";

type CardProps = {
  id: number;
  imageSrc: string;
  name: string;
  type: string;
  rarity: number;
  ex: boolean;
};

type Card3DStyle = React.CSSProperties & {
  '--rotate-x': string;
  '--rotate-y': string;
};

const Card = ({ card }: { card: CardProps }) => {
  const [isSelected, setIsSelected] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastTouch, setLastTouch] = useState<{ x: number; y: number } | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Disable body scroll when card is selected
  useEffect(() => {
    if (isSelected) {
      // Save current scroll position
      setScrollPosition(window.pageYOffset);
      // Lock body scroll
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollPosition}px`;
      document.body.style.width = '100%';
    } else {
      // Restore body scroll
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollPosition);
    }
  }, [isSelected, scrollPosition]);

  const handleMove = (deltaX: number, deltaY: number) => {
    setRotation((prev) => ({
      x: Math.max(-20, Math.min(20, prev.x + deltaY * 0.5)),
      y: Math.max(-20, Math.min(20, prev.y - deltaX * 0.5)),
    }));
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.movementX, e.movementY);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    setLastTouch({ x: touch.clientX, y: touch.clientY });
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    if (isDragging && e.touches.length === 1 && lastTouch) {
      const touch = e.touches[0];
      const deltaX = touch.clientX - lastTouch.x;
      const deltaY = touch.clientY - lastTouch.y;
      handleMove(deltaX, deltaY);
      setLastTouch({ x: touch.clientX, y: touch.clientY });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setRotation({ x: 0, y: 0 });
    setLastTouch(null);
  };

  return (
    <>
      <div className="cursor-pointer" onClick={() => setIsSelected(true)}>
        <div className="aspect-[2/3] relative rounded-xl transition-transform duration-300 hover:scale-105">
          <Image
            src={card.imageSrc}
            alt={`Card ${card.id}`}
            fill
            className="object-contain"
            onDragStart={(e) => e.preventDefault()}
          />
        </div>
      </div>

      {isSelected && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
          onTouchMove={(e) => e.preventDefault()} // Prevent background scroll on iOS
        >
          <IoIosCloseCircle
            size={50}
            className="cursor-pointer absolute top-2 right-2 text-white hover:text-gray-300 transition-colors"
            onClick={() => setIsSelected(false)}
            tabIndex={0} // Make close button properly focusable
          />
          <div
            className={`${styles.cardContainer} cursor-grab active:cursor-grabbing`}
            style={{
              touchAction: 'none',
              userSelect: 'none',
              WebkitUserSelect: 'none',
              WebkitTouchCallout: 'none' // Disable iOS touch callout
            }}
            onDragStart={(e) => e.preventDefault()}
            onMouseDown={() => setIsDragging(true)}
            onMouseMove={handleMouseMove}
            onMouseUp={() => {
              setIsDragging(false);
              setRotation({ x: 0, y: 0 });
            }}
            onMouseLeave={() => {
              setIsDragging(false);
              setRotation({ x: 0, y: 0 });
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className={styles.card3d}
              style={{
                transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                ['--rotate-x' as keyof Card3DStyle]: `${rotation.x}deg`,
                ['--rotate-y' as keyof Card3DStyle]: `${rotation.y}deg`,
              }}
            >
              <div className="relative w-full h-full">
                <Image
                  src={card.imageSrc}
                  alt="Selected card"
                  fill
                  className="object-contain"
                  draggable={false}
                  tabIndex={-1} // Prevent image from being focusable
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;