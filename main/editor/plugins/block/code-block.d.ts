import { PluginComponent } from '../Plugin';
export default class BlockCodeBlock extends PluginComponent {
    static pluginName: string;
    static align: string;
    render(): import("react/jsx-runtime").JSX.Element;
}
