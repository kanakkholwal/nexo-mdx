import { cn } from '@/lib/utils';
import * as React from 'react';
import Icon from '../Icon';
interface ToolBarProps {
  left?: React.ReactElement[];
  right?: React.ReactElement[];
  isPinned: boolean;
  isPreview: boolean;
}

export default function ToolBar(props: ToolBarProps) {
  return (
    <div className={cn(
      `flex flex-wrap gap-4 p-3 bg-white/30 dark:bg-white/10 rounded-xl border border-border dark:border-border/10 backdrop-blur-lg border-opacity-15`,
      props.isPinned ? 'sticky top-5 left-0 right-0' : 'relative',
      "nexo-mdx-toolbar"
    )}>
      <div className={cn("inline-flex gap-2 items-center justify-start flex-grow flex-wrap", "nexo-mdx-toolbar_left")}>
        {props.isPreview ? (<p className="text-sm text-gray-700 dark:text-gray-200 font-semibold inline-flex items-center gap-1">
          <Icon type="visibility" className="h-4 w-4 inline-block" />
          <span className="font-bold">Preview Mode</span>
          <span className="text-xs text-gray-400 dark:text-gray-500 italic"> (See how will it look after render.)</span>
        </p>) : props.left}
        <div className={cn("inline-flex gap-2 items-center justify-end ml-auto", "nexo-mdx-toolbar_right")}>
          {props.right}
        </div>
      </div>
    </div>
  );
}
