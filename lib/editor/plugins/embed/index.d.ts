import { PluginComponent, PluginProps } from '@/editor/plugins/Plugin';
export default class Embed extends PluginComponent {
    static pluginName: string;
    constructor(props: PluginProps);
    render(): import("react/jsx-runtime").JSX.Element;
}
