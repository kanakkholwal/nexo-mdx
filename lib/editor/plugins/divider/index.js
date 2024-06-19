import { jsx as _jsx } from "react/jsx-runtime";
import Icon from '@/components/Icon';
import { Button } from '@/components/ui/button';
import { PluginComponent } from '../Plugin';
class Divider extends PluginComponent {
    render() {
        return _jsx(Button, { size: "sm", variant: "ghost", className: "nexo-mdx-divider", onClick: () => this.editor.insertMarkdown('hr'), children: _jsx(Icon, { type: "divider" }) });
    }
}
Object.defineProperty(Divider, "pluginName", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 'divider'
});
Object.defineProperty(Divider, "align", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 'left'
});
export default Divider;
