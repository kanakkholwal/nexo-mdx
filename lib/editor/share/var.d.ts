import * as React from 'react';
export type UploadFunc = ((file: File) => Promise<string>) | ((file: File, callback: (url: string) => void) => void);
export type EditorEvent = 'change' | 'toolbar_pin' | 'view_change' | 'keydown' | 'focus' | 'blur' | 'scroll' | 'editor_keydown';
export interface EditorConfig {
    theme?: string;
    name?: string;
    view?: 'preview' | 'edit';
    htmlClass?: string;
    textareaClassName?: string;
    imageUrl?: string;
    imageAccept?: string;
    linkUrl?: string;
    loggerMaxSize?: number;
    loggerInterval?: number;
    table?: {
        maxRow: number;
        maxCol: number;
    };
    syncScrollMode?: string[];
    allowPasteImage?: boolean;
    onImageUpload?: UploadFunc;
    onChangeTrigger?: 'both' | 'beforeRender' | 'afterRender';
    onCustomImageUpload?: (event: unknown) => Promise<{
        url: string;
        text?: string;
    }>;
    shortcuts?: boolean;
}
export interface Selection {
    start: number;
    end: number;
    text: string;
}
export declare const initialSelection: Selection;
export type KeyboardEventCallback = (e: React.KeyboardEvent<HTMLDivElement>) => void;
export interface KeyboardEventCondition {
    key?: string;
    keyCode: number;
    aliasCommand?: boolean;
    withKey?: ('ctrlKey' | 'shiftKey' | 'altKey' | 'metaKey')[];
}
export interface KeyboardEventListener extends KeyboardEventCondition {
    callback: KeyboardEventCallback;
}
