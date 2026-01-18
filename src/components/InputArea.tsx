import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface InputAreaProps {
  text: string;
  onChange: (val: string) => void;
  disabled?: boolean;
}

export const InputArea: React.FC<InputAreaProps> = ({ text, onChange, disabled }) => {
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  return (
    <Card className="w-full max-w-2xl mx-auto mt-8 transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between py-4 cursor-pointer" onClick={() => setIsCollapsed(!isCollapsed)}>
        <CardTitle className="text-sm font-medium">Content Input</CardTitle>
        <button type="button" className="text-xs text-muted-foreground hover:text-foreground">
            {isCollapsed ? 'Show' : 'Hide'}
        </button>
      </CardHeader>
      {!isCollapsed && (
        <CardContent>
            <Textarea
            value={text}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Paste your text here to start reading..."
            className="min-h-[200px] font-sans text-base leading-relaxed resize-y"
            disabled={disabled}
            />
        </CardContent>
      )}
    </Card>
  );
};
