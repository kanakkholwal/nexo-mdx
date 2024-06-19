import { PluginComponent, PluginProps } from './Plugin';
interface PinToolBarState {
    pinned: boolean;
}
export default class PinToolBar extends PluginComponent<PinToolBarState> {
    static pluginName: string;
    static align: string;
    constructor(props: PluginProps);
    private handleClick;
    private handleChange;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
