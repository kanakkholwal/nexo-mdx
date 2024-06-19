import { PluginComponent, PluginProps } from './Plugin';
export default class Clear extends PluginComponent {
    static pluginName: string;
    static align: string;
    constructor(props: PluginProps);
    handleClick(): void;
    render(): import("react/jsx-runtime").JSX.Element;
}
