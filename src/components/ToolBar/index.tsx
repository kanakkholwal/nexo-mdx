import * as React from 'react';

interface ToolBarProps {
  left?: React.ReactElement[];
  right?: React.ReactElement[];
  isPinned: boolean;
  isPreview: boolean;
}

export default function ToolBar(props: ToolBarProps) {
  return (
    <div className={`flex flex-wrap gap-4 border rounded-xl p-3 bg-white/20 backdrop-blur-xl ${props.isPinned ? 'sticky top-5 left-0 right-0' : 'relative'}`}>
      <div className="inline-flex gap-2 items-center justify-start flex-grow  flex-wrap ">
        {props.isPreview ? (<p className="text-sm text-gray-700 font-semibold">
          <span className="font-bold">Preview Mode</span>
          <span className="text-xs text-gray-400 italic"> (Changes will not be saved.)</span>
        </p>): <div className="flex gap-2 items-center justify-center">{props.left}</div>}
      </div>
      <div className="inline-flex gap-2 items-center justify-end ml-auto">
        <div className="flex gap-2 items-center justify-center">{props.right}</div>
      </div>
    </div>
  );
}
