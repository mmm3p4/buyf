import { FaArrowUp } from 'react-icons/fa';
import { useState, useEffect } from 'react';

function ScrollButton() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      className={`scroll-button ${isVisible ? 'visible' : ''}`}
      onClick={scrollToTop}
    >
      <FaArrowUp />
    </button>
  );
}

export default ScrollButton;
