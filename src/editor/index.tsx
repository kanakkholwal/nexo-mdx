import Editor from '@editor/editor';
import AutoResize from '@editor/plugins/autoResize';
import BlockCodeBlock from '@editor/plugins/block/code-block';
import BlockCodeInline from '@editor/plugins/block/code-inline';
import BlockQuote from '@editor/plugins/block/quote';
import BlockWrap from '@editor/plugins/block/wrap';
import Clear from '@editor/plugins/clear';
import Embed from '@editor/plugins/embed';
import FontBold from '@editor/plugins/font/bold';
import FontItalic from '@editor/plugins/font/italic';
import FontStrikethrough from '@editor/plugins/font/strikethrough';
import FontUnderline from '@editor/plugins/font/underline';
import Header from '@editor/plugins/header';
import Image from '@editor/plugins/Image';
import Link from '@editor/plugins/link';
import ListOrdered from '@editor/plugins/list/ordered';
import ListUnordered from '@editor/plugins/list/unordered';
import Logger from '@editor/plugins/logger';
import ModeToggle from '@editor/plugins/modeToggle';
import PinToolBar from '@editor/plugins/pinToolBar';
import type { PluginProps } from '@editor/plugins/Plugin';
import { PluginComponent } from '@editor/plugins/Plugin';
import Table from '@editor/plugins/table';


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
    Embed,
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
    export { default as getDecorated } from '@editor/utils/decorate';



export default Editor;
