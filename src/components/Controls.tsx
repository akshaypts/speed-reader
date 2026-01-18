import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { Label } from '@/components/ui/label';

interface ControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  wpm: number;
  onWpmChange: (val: number) => void;
  onReset: () => void;
  canPlay: boolean;
}

export const Controls: React.FC<ControlsProps> = ({
  isPlaying,
  onPlayPause,
  wpm,
  onWpmChange,
  onReset,
  canPlay
}) => {
  return (
    <div className="flex flex-col gap-6 w-full max-w-md mx-auto p-4 bg-muted/20 rounded-lg border border-border">
      <div className="flex items-center justify-between gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={onPlayPause}
          disabled={!canPlay}
          className="h-12 w-12"
        >
          {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={onReset}
          disabled={!canPlay}
          title="Reset"
        >
          <RotateCcw className="h-5 w-5" />
        </Button>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
            <Label className="text-sm font-medium">Speed</Label>
            <span className="text-sm font-mono text-muted-foreground">{wpm} WPM</span>
        </div>
        <Slider
          value={[wpm]}
          onValueChange={(vals) => onWpmChange(vals[0])}
          min={1}
          max={600}
          step={5}
          className="w-full"
        />
      </div>
    </div>
  );
};
