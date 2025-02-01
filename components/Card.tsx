import { useState } from "react";
import Image from "next/image";
import styles from './card.module.css';
import { IoIosCloseCircle } from "react-icons/io";

type CardProps = {
  id: number;
  imageSrc: string;
  name: string;
  type: string;
  rarity: Number;
  ex: boolean;
};

const Card = ({ card }: { card: CardProps }) => {
  const [isSelected, setIsSelected] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (movementX: number, movementY: number) => {
    setRotation(prev => ({
      x: Math.max(-20, Math.min(20, prev.x + movementY * 0.5)),
      y: Math.max(-20, Math.min(20, prev.y - movementX * 0.5))
    }));
  };

  return (
    <>
      <div
        className="cursor-pointer"
        onClick={() => setIsSelected(true)}
      >
        <div className="aspect-[2/3] relative rounded-xl transition-transform duration-300 hover:scale-105">
          <Image
            src={card.imageSrc}
            alt={`Card ${card.id}`}
            fill
            className="object-contain"
			onDragStart={(e) => {
				e.preventDefault();
			}}
          />
        </div>
      </div>

      {isSelected && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-20">
          <IoIosCloseCircle 
            size={50}
            className="cursor-pointer absolute top-2 right-2 text-white hover:text-gray-300 transition-colors"
            onClick={() => setIsSelected(false)}
          />
          <div
            className={`${styles.cardContainer} cursor-grab active:cursor-grabbing`}
			onDragStart={(e) => {
				e.preventDefault();
			}}
            onMouseDown={() => setIsDragging(true)}
            onMouseMove={(e) => isDragging && handleMove(e.movementX, e.movementY)}
            onMouseUp={() => {
				setIsDragging(false);
				setRotation({ x: 0, y: 0});
			}}
			onMouseLeave={() => {
				setIsDragging(false);
				setRotation({ x: 0, y: 0});
			}}
          >
            <div
              className={styles.card3d}
              style={{
                transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                ['--rotate-x' as any]: `${rotation.x}deg`,
                ['--rotate-y' as any]: `${rotation.y}deg`,
              }}
            >
              <div className="relative w-full h-full">
                <Image
                  src={card.imageSrc}
                  alt="Selected card"
                  fill
                  className="object-contain"
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