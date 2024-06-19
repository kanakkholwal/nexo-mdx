import { jsx as _jsx } from "react/jsx-runtime";
import Icon from '@/components/Icon';
import { Button } from '@/components/ui/button';
import i18n from '@/i18n';
import { PluginComponent } from '../Plugin';
class FontBold extends PluginComponent {
    constructor(props) {
        super(props);
        Object.defineProperty(this, "handleKeyboard", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.handleKeyboard = {
            key: 'b',
            keyCode: 66,
            aliasCommand: true,
            withKey: ['ctrlKey'],
            callback: () => this.editor.insertMarkdown('bold'),
        };
    }
    componentDidMount() {
        if (this.editorConfig.shortcuts) {
            this.editor.onKeyboard(this.handleKeyboard);
        }
    }
    componentWillUnmount() {
        this.editor.offKeyboard(this.handleKeyboard);
    }
    render() {
        return (_jsx(Button, { size: "icon_sm", variant: "ghost", className: "button button-type-bold", title: i18n.get('btnBold'), onClick: () => this.editor.insertMarkdown('bold'), children: _jsx(Icon, { type: "bold" }) }));
    }
}
Object.defineProperty(FontBold, "pluginName", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 'font-bold'
});
export default FontBold;
