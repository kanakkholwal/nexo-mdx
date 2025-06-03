import Editor from '@nexo-mdx/editor/editor';
import AutoResize from '@nexo-mdx/editor/plugins/autoResize';
import BlockCodeBlock from '@nexo-mdx/editor/plugins/block/code-block';
import BlockCodeInline from '@nexo-mdx/editor/plugins/block/code-inline';
import BlockQuote from '@nexo-mdx/editor/plugins/block/quote';
import BlockWrap from '@nexo-mdx/editor/plugins/block/wrap';
import Clear from '@nexo-mdx/editor/plugins/clear';
// import Embed from '@nexo-mdx/editor/plugins/embed';
import FontBold from '@nexo-mdx/editor/plugins/font/bold';
import FontItalic from '@nexo-mdx/editor/plugins/font/italic';
import FontStrikethrough from '@nexo-mdx/editor/plugins/font/strikethrough';
import FontUnderline from '@nexo-mdx/editor/plugins/font/underline';
import Header from '@nexo-mdx/editor/plugins/header';
import Image from '@nexo-mdx/editor/plugins/Image';
import Link from '@nexo-mdx/editor/plugins/link';
import ListOrdered from '@nexo-mdx/editor/plugins/list/ordered';
import ListUnordered from '@nexo-mdx/editor/plugins/list/unordered';
import Logger from '@nexo-mdx/editor/plugins/logger';
import ModeToggle from '@nexo-mdx/editor/plugins/modeToggle';
import PinToolBar from '@nexo-mdx/editor/plugins/pinToolBar';
import type { PluginProps } from '@nexo-mdx/editor/plugins/Plugin';
import { PluginComponent } from '@nexo-mdx/editor/plugins/Plugin';
import Table from '@nexo-mdx/editor/plugins/table';


// eslint-disable-next-line react-refresh/only-export-components
export const Plugins = [
    Header,
    FontBold,
    FontItalic,
    FontUnderline,
    FontStrikethrough,
    ListUnordered,
    ListOrdered,
    BlockQuote,
    BlockWrap,
    BlockCodeInline,
    BlockCodeBlock,
    Table,
    Image,
    //  Embed,
    Link,
    Clear,
    Logger,
    ModeToggle,
    PinToolBar,
    AutoResize,
];


Plugins.forEach((plugin) => Editor.use(plugin))


export { PluginComponent };
export type { PluginProps };

// eslint-disable-next-line react-refresh/only-export-components
    export { default as getDecorated } from '@nexo-mdx/editor/utils/decorate';



export default Editor;
