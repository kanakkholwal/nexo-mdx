import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Icon from '@/components/Icon';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover";
import { PluginComponent } from '@/editor/plugins/Plugin';
import i18n from '@/i18n';
class Embed extends PluginComponent {
    constructor(props) {
        super(props);
        this.state = {
            type: 'embed',
            src: '',
        };
    }
    render() {
        return _jsxs(Popover, { children: [_jsx(PopoverTrigger, { asChild: true, children: _jsx(Button, { size: "icon_sm", variant: "ghost", className: "button button-type-embed", title: i18n.get('btnEmbed'), children: _jsx(Icon, { type: "embed" }) }) }), _jsx(PopoverContent, { className: "space-y-4" })] });
    }
}
Object.defineProperty(Embed, "pluginName", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 'embed'
});
export default Embed;
