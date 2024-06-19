/// <reference types="react" />
declare const ICONS: ("bold" | "italic" | "underline" | "strikethrough" | "code" | "quote" | "link" | "image" | "list-ordered" | "list-unordered" | "table" | "delete" | "fullscreen" | "fullscreen-exit" | "code-block" | "code-inline" | "header" | "list" | "grid" | "font-size" | "view-split" | "visibility" | "keyboard" | "undo" | "redo" | "wrap" | "divider" | "pin" | "pin-off" | "embed")[];
export type IconType = typeof ICONS[number];
export type IconProps = React.SVGProps<SVGSVGElement> & {
    type: IconType;
};
export default function Icon(props: IconProps): import("react/jsx-runtime").JSX.Element;
export {};
