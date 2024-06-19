import { PluginComponent, PluginProps } from './Plugin';
interface ModeToggleState {
    view: "preview" | "edit";
}
declare class ModeToggle extends PluginComponent<ModeToggleState> {
    static pluginName: string;
    static align: string;
    constructor(props: PluginProps);
    private handleClick;
    private handleChange;
    componentDidMount(): void;
    componentWillUnmount(): void;
    getDisplayInfo(): {
        icon: string;
        title: string;
    };
    render(): import("react/jsx-runtime").JSX.Element | null;
}
export default ModeToggle;
