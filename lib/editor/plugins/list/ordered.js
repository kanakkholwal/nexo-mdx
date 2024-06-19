import { jsx as _jsx } from "react/jsx-runtime";
import Icon from '@/components/Icon';
import { Button } from '@/components/ui/button';
import i18n from '@/i18n';
import { PluginComponent } from '../Plugin';
class ListOrdered extends PluginComponent {
    constructor(props) {
        super(props);
        Object.defineProperty(this, "handleKeyboard", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.handleKeyboard = {
            key: '7',
            keyCode: 55,
            withKey: ['ctrlKey', 'shiftKey'],
            aliasCommand: true,
            callback: () => this.editor.insertMarkdown('order'),
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
        return (_jsx(Button, { size: "icon_sm", variant: "ghost", className: "button button-type-ordered", title: i18n.get('btnOrdered'), onClick: () => this.editor.insertMarkdown('order'), children: _jsx(Icon, { type: "list-ordered" }) }));
    }
}
Object.defineProperty(ListOrdered, "pluginName", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 'list-ordered'
});
export default ListOrdered;
