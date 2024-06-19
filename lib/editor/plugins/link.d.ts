import { PluginComponent, PluginProps } from '@/editor/plugins/Plugin';
interface State {
    linkUrl: string;
    target: string;
}
export default class Link extends PluginComponent<State> {
    static pluginName: string;
    static align: string;
    private handleKeyboard;
    constructor(props: PluginProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
