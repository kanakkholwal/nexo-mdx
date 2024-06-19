import { PluginComponent, PluginProps } from './Plugin';
export default class AutoResize extends PluginComponent {
    static pluginName: string;
    static align: string;
    static defaultConfig: {
        min: number;
        max: number;
        useTimer: boolean;
    };
    private timer;
    private useTimer;
    constructor(props: PluginProps);
    doResize(): void;
    handleChange(): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): import("react/jsx-runtime").JSX.Element;
}
