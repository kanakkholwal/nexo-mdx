import { PluginComponent, PluginProps } from '@/editor/plugins/Plugin';
interface State {
    show: boolean;
}
interface Props extends PluginProps {
    config: {
        maxRow?: number;
        maxCol?: number;
    };
}
export default class Table extends PluginComponent<State, Props> {
    static pluginName: string;
    static align: string;
    static defaultConfig: {
        maxRow: number;
        maxCol: number;
    };
    constructor(props: PluginProps);
    private show;
    private hide;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
