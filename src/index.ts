import Editor from './editor';
import AutoResize from './plugins/autoResize';
import BlockCodeBlock from './plugins/block/code-block';
import BlockCodeInline from './plugins/block/code-inline';
import BlockQuote from './plugins/block/quote';
import BlockWrap from './plugins/block/wrap';
import Clear from './plugins/clear';
import FontBold from './plugins/font/bold';
import FontItalic from './plugins/font/italic';
import FontStrikethrough from './plugins/font/strikethrough';
import FontUnderline from './plugins/font/underline';
import Header from './plugins/header';
import Image from './plugins/Image';
import Link from './plugins/link';
import ListOrdered from './plugins/list/ordered';
import ListUnordered from './plugins/list/unordered';
import Logger from './plugins/logger';
import ModeToggle from './plugins/modeToggle';
import PinToolBar from './plugins/pinToolBar';
import { PluginComponent } from './plugins/Plugin';
import TabInsert from './plugins/tabInsert';
import Table from './plugins/table';


Editor.use(Header);
Editor.use(FontBold);
Editor.use(FontItalic);
Editor.use(FontUnderline);
Editor.use(FontStrikethrough);
Editor.use(ListUnordered);
Editor.use(ListOrdered);
Editor.use(BlockQuote);
Editor.use(BlockWrap);
Editor.use(BlockCodeInline);
Editor.use(BlockCodeBlock);
Editor.use(Table);
Editor.use(Image);
Editor.use(Link);
Editor.use(Clear);
Editor.use(Logger);
Editor.use(ModeToggle);
Editor.use(PinToolBar);


export { PluginComponent };


  export { default as getDecorated } from './utils/decorate';

export const Plugins = {
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
  Link,
  Clear,
  Logger,
  ModeToggle,
  PinToolBar,
  AutoResize,
  TabInsert,
};

export default Editor;
