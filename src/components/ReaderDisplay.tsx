import React, { useMemo } from 'react';
import { getPivotIndex } from '../lib/reader-utils';
import { cn } from '../lib/utils';

interface ReaderDisplayProps {
  word: string;
  className?: string;
  fontSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '6xl';
}

export const ReaderDisplay: React.FC<ReaderDisplayProps> = ({ word, className, fontSize = '4xl' }) => {
  const { left, pivot, right } = useMemo(() => {
    if (!word) return { left: '', pivot: '', right: '' };
    const index = getPivotIndex(word);
    return {
      left: word.slice(0, index),
      pivot: word[index],
      right: word.slice(index + 1),
    };
  }, [word]);

  // Map simple size props to tailwind classes if needed, or just pass className
  // Map simple size props to tailwind classes if needed, or just pass className
  const sizeClasses = {
      'sm': 'text-xs sm:text-sm',
      'md': 'text-sm sm:text-base',
      'lg': 'text-base sm:text-lg',
      'xl': 'text-lg sm:text-xl',
      '2xl': 'text-xl sm:text-2xl',
      '4xl': 'text-2xl sm:text-4xl',
      '6xl': 'text-3xl sm:text-6xl',
  };

  return (
    <div className={cn("flex items-center justify-center font-mono w-full min-h-[120px]", sizeClasses[fontSize], className)}>
      <div className="flex-1 text-right text-foreground/80">{left}</div>
      <div className="text-red-500 font-bold mx-0.5">{pivot}</div>
      <div className="flex-1 text-left text-foreground/80">{right}</div>
    </div>
  );
};
