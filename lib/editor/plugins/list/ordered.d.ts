import { PluginComponent, PluginProps } from '../Plugin';
export default class ListOrdered extends PluginComponent {
    static pluginName: string;
    private handleKeyboard;
    constructor(props: PluginProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): import("react/jsx-runtime").JSX.Element;
}
