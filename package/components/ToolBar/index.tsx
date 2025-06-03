import { cn } from '@nexo-mdx/lib/utils';
import { twClasses } from '@nexo-mdx/tailwind-classes';
import * as React from 'react';
import Icon from '../Icon';
import i18n from '@nexo-mdx/i18n';

interface ToolBarProps {
  left?: React.ReactElement[];
  right?: React.ReactElement[];
  isPinned: boolean;
  isPreview: boolean;
}

export default function ToolBar(props: ToolBarProps) {
  return (
    <div className={cn(
      twClasses.toolbar.wrapper,
      props.isPinned ? twClasses.toolbar.wrapper_pinned : twClasses.toolbar.wrapper_default,
      "nexo-mdx-toolbar"
    )}>
      <div className={cn(twClasses.toolbar.container_left, "nexo-mdx-toolbar_left")}>
        {props.isPreview ? (
          <div className={cn(twClasses.toolbar.container_preview_div, "nexo-mdx-toolbar_preview_div")}>
            <Icon type="visibility" className={cn(twClasses.toolbar.container_preview_icon, "nexo-mdx-toolbar_preview_icon")} />
            <h5 className={cn(twClasses.toolbar.container_preview_title,"nexo-mdx-toolbar_preview_title")}>
              {i18n.get("toolbar_preview_title")}
            </h5>
            <p className={cn(twClasses.toolbar.container_preview_description,"nexo-mdx-toolbar_preview_description")}> 
              {i18n.get("toolbar_preview_description")}
            </p>
          </div>) : props.left}
      </div>
      <div className={cn("inline-flex gap-2 items-center justify-end ml-auto", "nexo-mdx-toolbar_right")}>
        {props.right}
      </div>
    </div>
  );
}
