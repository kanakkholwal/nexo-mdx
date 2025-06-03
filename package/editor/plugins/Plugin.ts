import type Editor from '@nexo-mdx/editor/editor';
import { EditorConfig } from '@nexo-mdx/editor/share/var';
import * as React from 'react';

export interface PluginProps<ConfigType = Record<string, unknown>> {
  editor: Editor;
  editorConfig: EditorConfig;
  config: ConfigType;
}

export abstract class PluginComponent<S = object, P extends PluginProps = PluginProps> extends React.Component<P, S> {
  static pluginName: string = '';

  static align: string = 'left';

  static defaultConfig: Record<string, unknown> = {};

  protected get editor(): Editor {
    return this.props.editor;
  }

  protected get editorConfig(): EditorConfig {
    return this.props.editorConfig;
  }

  protected getConfig<T>(key: string, defaultValue?: T): T | undefined {
    const value = this.props.config[key as keyof P['config']];
    return (value !== undefined && value !== null) ? value as T : defaultValue;
  }
}
