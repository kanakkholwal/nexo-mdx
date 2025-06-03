import { classNames } from '@/classes';
import i18n from '@/i18n';
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
      classNames.toolbar.wrapper,
      props.isPinned ? classNames.toolbar.wrapper_pinned : classNames.toolbar.wrapper_default,
      "toolbar"
    )}>
      <div className={cn(classNames.toolbar.container_left, "toolbar_left")}>
        {props.isPreview ? (
          <div className={cn(classNames.toolbar.container_preview_div, "toolbar_preview_div")}>
            <Icon type="visibility" className={cn(classNames.toolbar.container_preview_icon, "toolbar_preview_icon")} />
            <h5 className={cn(classNames.toolbar.container_preview_title,"toolbar_preview_title")}>
              {i18n.get("toolbar_preview_title")}
            </h5>
            <p className={cn(classNames.toolbar.container_preview_description,"toolbar_preview_description")}>
              {i18n.get("toolbar_preview_description")}
            </p>
          </div>) : props.left}
      </div>
      <div className={cn("inline-flex gap-2 items-center justify-end ml-auto", "toolbar_right")}>
        {props.right}
      </div>
    </div>
  );
}