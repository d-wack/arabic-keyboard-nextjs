'use client';

import { useEffect, useState } from 'react';

export interface Word {
  id: string;
  text: string;
  x: number;
  y: number;
  size: number;
  opacity: number;
  color: string;
}

export interface WordDisplayProps {
  words: string[];
}

const colors = [
  'text-blue-300',
  'text-purple-300',
  'text-green-300',
  'text-yellow-300',
  'text-pink-300',
  'text-indigo-300',
  'text-red-300',
  'text-teal-300',
];

const WordDisplay: React.FC<WordDisplayProps> = ({ words }) => {
  const [displayWords, setDisplayWords] = useState<Word[]>([]);

  useEffect(() => {
    if (words.length > 0) {
      const latestWord = words[words.length - 1];
      
      const newWord: Word = {
        id: `${Date.now()}-${Math.random()}`,
        text: latestWord,
        x: Math.random() * 80 + 10, // 10% to 90% of screen width
        y: Math.random() * 80 + 10, // 10% to 90% of screen height
        size: Math.random() * 4 + 2, // 2rem to 6rem
        opacity: 0.6 + Math.random() * 0.4, // 0.6 to 1.0 opacity
        color: colors[Math.floor(Math.random() * colors.length)],
      };

      setDisplayWords(prev => {
        const updated = [...prev, newWord];
        // Keep only the last 15 words to prevent performance issues
        return updated.length >= 15 ? updated.slice(-15) : updated;
      });
    }
  }, [words]);

  const handleWordClick = (wordId: string) => {
    setDisplayWords(prev => prev.filter(word => word.id !== wordId));
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {displayWords.map((word) => (
        <div
          key={word.id}
          className={`absolute cursor-pointer pointer-events-auto transition-all duration-500 hover:scale-110 ${word.color} font-arabic font-bold select-none`}
          style={{
            left: `${word.x}%`,
            top: `${word.y}%`,
            fontSize: `${word.size}rem`,
            opacity: word.opacity,
            direction: 'rtl',
            transform: 'translate(-50%, -50%)',
          }}
          onClick={() => handleWordClick(word.id)}
        >
          {word.text}
        </div>
      ))}
    </div>
  );
};

export default WordDisplay;