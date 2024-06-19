import { jsx as _jsx } from "react/jsx-runtime";
import Icon from '@/components/Icon';
import { Button } from '@/components/ui/button';
import i18n from '@/i18n';
import { PluginComponent } from '../Plugin';
class FontItalic extends PluginComponent {
    constructor(props) {
        super(props);
        Object.defineProperty(this, "handleKeyboard", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.handleKeyboard = {
            key: 'i',
            keyCode: 73,
            aliasCommand: true,
            withKey: ['ctrlKey'],
            callback: () => this.editor.insertMarkdown('italic'),
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
        return (_jsx(Button, { size: "icon_sm", variant: "ghost", className: "button button-type-italic", title: i18n.get('btnItalic'), onClick: () => this.editor.insertMarkdown('italic'), children: _jsx(Icon, { type: "italic" }) }));
    }
}
Object.defineProperty(FontItalic, "pluginName", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 'font-italic'
});
export default FontItalic;
