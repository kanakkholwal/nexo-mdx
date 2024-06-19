import { jsx as _jsx } from "react/jsx-runtime";
import Icon from '@/components/Icon';
import { Button } from '@/components/ui/button';
import i18n from '@/i18n';
import { PluginComponent } from '../Plugin';
class BlockQuote extends PluginComponent {
    render() {
        return (_jsx(Button, { size: "icon_sm", variant: "ghost", className: "button button-type-quote", title: i18n.get('btnQuote'), onClick: () => this.editor.insertMarkdown('quote'), children: _jsx(Icon, { type: "quote" }) }));
    }
}
Object.defineProperty(BlockQuote, "pluginName", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 'block-quote'
});
Object.defineProperty(BlockQuote, "align", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 'left'
});
export default BlockQuote;
