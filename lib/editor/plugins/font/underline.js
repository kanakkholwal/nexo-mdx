import { jsx as _jsx } from "react/jsx-runtime";
import Icon from '@/components/Icon';
import { Button } from '@/components/ui/button';
import i18n from '@/i18n';
import { PluginComponent } from '../Plugin';
class FontUnderline extends PluginComponent {
    constructor(props) {
        super(props);
        Object.defineProperty(this, "handleKeyboard", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.handleKeyboard = {
            key: 'u',
            keyCode: 85,
            withKey: ['ctrlKey'],
            callback: () => this.editor.insertMarkdown('underline'),
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
        return (_jsx(Button, { size: "icon_sm", variant: "ghost", className: "button button-type-underline", title: i18n.get('btnUnderline'), onClick: () => this.editor.insertMarkdown('underline'), children: _jsx(Icon, { type: "underline" }) }));
    }
}
Object.defineProperty(FontUnderline, "pluginName", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 'font-underline'
});
export default FontUnderline;
