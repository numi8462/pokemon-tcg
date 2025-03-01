import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";
import Image from "next/image";
import pikaImage from "@/public/icons/pikachu.png";

const ScrollTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // 스크롤 위치를 감지하여 버튼을 보이거나 숨깁니다.
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // 페이지 맨 위로 스크롤하는 함수
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50 ">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="py-2 text-white rounded-full shadow-lg bg-blue-950 border-4"
        >
          <div className="flex flex-col justify-center items-center">
            <FaArrowUp size={30} className="text-white" />
            <Image src={pikaImage} alt="pikachu image" width={50} />
          </div>
        </button>
      )}
    </div>
  );
};

export default ScrollTop;
