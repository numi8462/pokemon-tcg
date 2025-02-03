import { useState, useEffect } from 'react';
import { FaRegArrowAltCircleUp } from "react-icons/fa";

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
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50 ">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="p-1 text-white rounded-full shadow-lg bg-gray-900"
        >
          <FaRegArrowAltCircleUp size={40}/>
        </button>
      )}
    </div>
  );
};

export default ScrollTop;