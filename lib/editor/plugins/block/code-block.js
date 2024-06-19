import { jsx as _jsx } from "react/jsx-runtime";
import Icon from '@/components/Icon';
import { Button } from '@/components/ui/button';
import i18n from '@/i18n';
import { PluginComponent } from '../Plugin';
class BlockCodeBlock extends PluginComponent {
    render() {
        return (_jsx(Button, { size: "icon_sm", variant: "ghost", className: "button button-type-code-block", title: i18n.get('btnCode'), onClick: () => this.editor.insertMarkdown('code'), children: _jsx(Icon, { type: "code-block" }) }));
    }
}
Object.defineProperty(BlockCodeBlock, "pluginName", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 'block-code-block'
});
Object.defineProperty(BlockCodeBlock, "align", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 'left'
});
export default BlockCodeBlock;
