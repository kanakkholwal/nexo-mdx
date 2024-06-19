import { PluginComponent, PluginProps } from '@/editor/plugins/Plugin';
export default class Image extends PluginComponent {
    static pluginName: string;
    private inputFile;
    constructor(props: PluginProps);
    private handleImageUpload;
    private onImageChanged;
    private handleCustomImageUpload;
    render(): import("react/jsx-runtime").JSX.Element;
}
