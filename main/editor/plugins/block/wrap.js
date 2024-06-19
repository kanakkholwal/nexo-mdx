import { jsx as _jsx } from "react/jsx-runtime";
import Icon from '@/components/Icon';
import { Button } from '@/components/ui/button';
import i18n from '@/i18n';
import { PluginComponent } from '../Plugin';
class BlockWrap extends PluginComponent {
    render() {
        return (_jsx(Button, { size: "icon_sm", variant: "ghost", className: "button button-type-wrap", title: i18n.get('btnLineBreak'), onClick: () => this.editor.insertMarkdown('br'), children: _jsx(Icon, { type: "wrap" }) }));
    }
}
Object.defineProperty(BlockWrap, "pluginName", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 'block-wrap'
});
Object.defineProperty(BlockWrap, "align", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 'left'
});
export default BlockWrap;
