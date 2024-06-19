import type Editor from '@/editor/editor';
import { EditorConfig } from '@/editor/share/var';
import * as React from 'react';
export interface PluginProps<ConfigType = Record<string, unknown>> {
    editor: Editor;
    editorConfig: EditorConfig;
    config: ConfigType;
}
export declare abstract class PluginComponent<S = object, P extends PluginProps = PluginProps> extends React.Component<P, S> {
    static pluginName: string;
    static align: string;
    static defaultConfig: Record<string, unknown>;
    protected get editor(): Editor;
    protected get editorConfig(): EditorConfig;
    protected getConfig<T>(key: string, defaultValue?: T): T | undefined;
}
