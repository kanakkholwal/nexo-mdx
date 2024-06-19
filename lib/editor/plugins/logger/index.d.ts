import { PluginComponent, PluginProps } from '../Plugin';
export default class Logger extends PluginComponent {
    static pluginName: string;
    private logger;
    private timerId?;
    private handleKeyboards;
    private lastPop;
    constructor(props: PluginProps);
    private handleUndo;
    private handleRedo;
    handleChange(value: string, _: object, isNotInput: boolean): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    pause(): void;
    render(): import("react/jsx-runtime").JSX.Element;
}
