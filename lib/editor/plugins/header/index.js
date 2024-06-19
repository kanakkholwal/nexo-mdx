import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Icon from '@/components/Icon';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import i18n from '@/i18n';
import { PluginComponent } from '../Plugin';
import HeaderList from './HeaderList';
class Header extends PluginComponent {
    render() {
        return _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { title: i18n.get('btnHeader'), className: "button button-type-header", size: "icon_sm", variant: "ghost", children: _jsx(Icon, { type: "header" }) }) }), _jsx(DropdownMenuContent, { align: "start", forceMount: true, children: _jsx(HeaderList, { onSelectHeader: (header) => this.editor.insertMarkdown(header) }) })] });
    }
}
Object.defineProperty(Header, "pluginName", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 'header'
});
export default Header;
