
import { cn } from "@nexo-mdx/lib/utils";
import {
  ALargeSmall,
  Bold, Code,
  CodeXml,
  Columns2,
  Expand,
  Eye,
  Frame,
  Grid3X3,
  Heading,
  Image as ImageIcon,
  Italic, Keyboard, Link, List,
  ListOrdered,
  Pin,
  PinOff,
  Quote,
  Redo2,
  SeparatorHorizontal,
  Shrink,
  SquareCode,
  Strikethrough, Table,
  Underline,
  Undo2,
  WrapText,
  X
} from "lucide-react";

//  Text formatting icons 
const ICON_NAMES = [
    "bold",
    "italic",
    "underline",
    "strikethrough",
    "code",
    "quote",
    "link",
    "image",
    "list-ordered",
    "list-unordered",
    "table",
    "delete",
    "fullscreen",
    "fullscreen-exit",
    "code-block",
    "code-inline",
    "header",
    "list",
    "grid",
    "font-size",
    "view-split",
    "visibility",
    "keyboard",
    "undo",
    "redo",
    "wrap",
    "divider",
    "pin",
    "pin-off",
    "embed",
] as const;
const Icons :Record<typeof ICON_NAMES[number], React.FC<React.SVGProps<SVGSVGElement>>> = {
    bold: Bold,
    italic: Italic,
    underline: Underline,
    strikethrough: Strikethrough,
    code: Code,
    quote: Quote,
    link: Link,
    image: ImageIcon,
    "list-ordered": ListOrdered,
    "list-unordered": List,
    table: Table,
    delete: X,
    fullscreen: Expand,
    "fullscreen-exit":Shrink,
    "code-block": CodeXml,
    "code-inline": SquareCode,
    header: Heading,
    list: List,
    grid: Grid3X3,
    "font-size": ALargeSmall,
    "view-split":Columns2,
    visibility:Eye,
    keyboard:Keyboard,
    undo: Undo2 ,
    redo: Redo2,
    wrap:WrapText,
    divider:SeparatorHorizontal,
    pin:Pin,
    "pin-off":PinOff,
    embed: Frame
};

const ICONS = Object.keys(Icons) as (keyof typeof Icons)[];

export type IconType = typeof ICONS[number];
export type IconProps = React.SVGProps<SVGSVGElement> & {
    type: IconType;
};

export default function Icon(props: IconProps) {
    const IconComponent = Icons[props.type];
    return <IconComponent className={cn("size-4",props.className)} {...props}/>;
}