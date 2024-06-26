import Editor from '@/editor/editor';
import AutoResize from '@/editor/plugins/autoResize';
import BlockCodeBlock from '@/editor/plugins/block/code-block';
import ModeToggle from '@/editor/plugins/modeToggle';
import type { PluginProps } from '@/editor/plugins/Plugin';
import { PluginComponent } from '@/editor/plugins/Plugin';
import Table from '@/editor/plugins/table';
export declare const Plugins: (typeof AutoResize | typeof BlockCodeBlock | typeof ModeToggle | typeof Table)[];
export { PluginComponent };
export type { PluginProps };
export { default as getDecorated } from '@/editor/utils/decorate';
export default Editor;
