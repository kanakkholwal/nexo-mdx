import { jsx as _jsx } from "react/jsx-runtime";
import Icon from '@/components/Icon';
import { Button } from '@/components/ui/button';
import i18n from '@/i18n';
import { PluginComponent } from '../Plugin';
class FontStrikethrough extends PluginComponent {
    constructor(props) {
        super(props);
        Object.defineProperty(this, "handleKeyboard", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.handleKeyboard = {
            key: 'd',
            keyCode: 68,
            aliasCommand: true,
            withKey: ['ctrlKey'],
            callback: () => this.editor.insertMarkdown('strikethrough'),
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
        return (_jsx(Button, { size: "icon_sm", variant: "ghost", className: "button button-type-strikethrough", title: i18n.get('btnStrikethrough'), onClick: () => this.editor.insertMarkdown('strikethrough'), children: _jsx(Icon, { type: "strikethrough" }) }));
    }
}
Object.defineProperty(FontStrikethrough, "pluginName", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 'font-strikethrough'
});
export default FontStrikethrough;
