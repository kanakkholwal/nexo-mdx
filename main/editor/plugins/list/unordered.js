import { jsx as _jsx } from "react/jsx-runtime";
import Icon from '@/components/Icon';
import { Button } from '@/components/ui/button';
import i18n from '@/i18n';
import { PluginComponent } from '../Plugin';
class ListUnordered extends PluginComponent {
    constructor(props) {
        super(props);
        Object.defineProperty(this, "handleKeyboard", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.handleKeyboard = {
            key: '8',
            keyCode: 56,
            withKey: ['ctrlKey', 'shiftKey'],
            aliasCommand: true,
            callback: () => this.editor.insertMarkdown('unordered'),
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
        return (_jsx(Button, { size: "icon_sm", variant: "ghost", className: "button button-type-unordered", title: i18n.get('btnUnordered'), onClick: () => this.editor.insertMarkdown('unordered'), children: _jsx(Icon, { type: "list-unordered" }) }));
    }
}
Object.defineProperty(ListUnordered, "pluginName", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 'list-unordered'
});
export default ListUnordered;
