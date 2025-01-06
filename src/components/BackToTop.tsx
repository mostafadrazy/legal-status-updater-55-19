import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <Button
      className="fixed bottom-8 left-8 z-50 rounded-full p-3 bg-[#4CD6B4] hover:bg-[#3BC5A3] text-black shadow-lg transition-all duration-300 animate-fade-in"
      onClick={scrollToTop}
      size="icon"
      aria-label="العودة إلى الأعلى"
    >
      <ChevronUp className="h-5 w-5" />
    </Button>
  );
};