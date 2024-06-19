import { jsx as _jsx } from "react/jsx-runtime";
import Icon from '@/components/Icon';
import { Button } from '@/components/ui/button';
import i18n from '@/i18n';
import { PluginComponent } from '../Plugin';
class BlockCodeInline extends PluginComponent {
    render() {
        return (_jsx(Button, { size: "icon_sm", variant: "ghost", className: "button button-type-code-inline", title: i18n.get('btnInlineCode'), onClick: () => this.editor.insertMarkdown('inlinecode'), children: _jsx(Icon, { type: "code" }) }));
    }
}
Object.defineProperty(BlockCodeInline, "pluginName", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 'block-code-inline'
});
Object.defineProperty(BlockCodeInline, "align", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 'left'
});
export default BlockCodeInline;
