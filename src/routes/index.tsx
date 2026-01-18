import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { ReaderDisplay } from '@/components/ReaderDisplay'
import { Controls } from '@/components/Controls'
import { InputArea } from '@/components/InputArea'
import { splitTextIntoWords } from '@/lib/reader-utils'

export const Route = createFileRoute('/')({
  component: HomeComponent,
})

function HomeComponent() {
  const [text, setText] = React.useState('')
  const [words, setWords] = React.useState<string[]>([])
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [wpm, setWpm] = React.useState(300)

  // Parse words when text changes
  React.useEffect(() => {
    const parsed = splitTextIntoWords(text)
    setWords(parsed)
    setCurrentIndex(0)
    setIsPlaying(false)
  }, [text])

  // Timer loop
  React.useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying && currentIndex < words.length) {
      const delay = 60000 / wpm;
      interval = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev >= words.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, delay);
    }
    return () => clearInterval(interval);
  }, [isPlaying, wpm, words.length, currentIndex])

  const handlePlayPause = () => {
    if (currentIndex >= words.length - 1 && words.length > 0) {
      setCurrentIndex(0); // Restart if at end
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  }

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentIndex(0);
  }

  const currentWord = words[currentIndex] || '';

  return (
    <div className="flex flex-col items-center gap-8 flex-1 justify-center max-w-4xl mx-auto w-full">
      <div className="flex-1 w-full flex items-center justify-center min-h-[300px] bg-card rounded-xl border shadow-sm p-8">
         {words.length > 0 ? (
             <ReaderDisplay word={currentWord} fontSize="6xl" />
         ) : (
             <div className="text-muted-foreground text-center">
                 Paste text below to begin reading.
             </div>
         )}
      </div>

      <Controls
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        wpm={wpm}
        onWpmChange={setWpm}
        onReset={handleReset}
        canPlay={words.length > 0}
      />

      <InputArea
        text={text}
        onChange={setText}
        disabled={isPlaying}
      />

      <div className="text-xs text-muted-foreground mt-8">
          {words.length > 0 && (
              <span>Word {currentIndex + 1} of {words.length} • {Math.round((currentIndex + 1) / words.length * 100)}%</span>
          )}
      </div>
    </div>
  )
}
