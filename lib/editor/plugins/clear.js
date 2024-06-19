import { jsx as _jsx } from "react/jsx-runtime";
import Icon from '@/components/Icon';
import { Button } from '@/components/ui/button';
import i18n from '@/i18n';
import { PluginComponent } from './Plugin';
class Clear extends PluginComponent {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        if (this.editor.getMdValue() === '') {
            return;
        }
        if (window.confirm && typeof window.confirm === 'function') {
            const result = window.confirm(i18n.get('clearTip'));
            if (result) {
                this.editor.setText('');
            }
        }
    }
    render() {
        return (_jsx(Button, { size: "icon_sm", variant: "ghost", className: "button button-type-clear", title: i18n.get('btnClear'), onClick: this.handleClick, children: _jsx(Icon, { type: "delete" }) }));
    }
}
Object.defineProperty(Clear, "pluginName", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 'clear'
});
Object.defineProperty(Clear, "align", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 'left'
});
export default Clear;
