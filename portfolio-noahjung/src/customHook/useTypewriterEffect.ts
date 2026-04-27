import { useState, useEffect } from 'react';

export default function useTypewriterEffect(text: string, speed: number = 0.00001) {
  const [displayedText, setDisplayedText] = useState<string>('');

  useEffect(() => {
    if (!text) {
      setDisplayedText('');
      return;
    }

    setDisplayedText('');
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        currentIndex++;
        setDisplayedText(text.substring(0, currentIndex));
      } else {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return displayedText;
}
