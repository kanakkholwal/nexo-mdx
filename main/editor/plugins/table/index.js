import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Icon from '@/components/Icon';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover";
import { PluginComponent } from '@/editor/plugins/Plugin';
import i18n from '@/i18n';
import TableList from './table';
class Table extends PluginComponent {
    constructor(props) {
        super(props);
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
        this.state = {
            show: false,
        };
    }
    show() {
        this.setState({
            show: true,
        });
    }
    hide() {
        this.setState({
            show: false,
        });
    }
    render() {
        const config = this.editorConfig.table || this.props.config;
        return (_jsxs(Popover, { children: [_jsx(PopoverTrigger, { asChild: true, children: _jsx(Button, { size: "icon_sm", variant: "ghost", className: "button button-type-table", title: i18n.get('btnTable'), children: _jsx(Icon, { type: "grid" }) }) }), _jsx(PopoverContent, { className: 'p-2 w-max', align: 'center', forceMount: true, children: _jsx(TableList, { visibility: this.state.show, maxRow: config.maxRow, maxCol: config.maxCol, onSetTable: (option) => this.editor.insertMarkdown('table', option) }) })] }));
    }
}
Object.defineProperty(Table, "pluginName", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 'table'
});
Object.defineProperty(Table, "align", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 'left'
});
Object.defineProperty(Table, "defaultConfig", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: {
        maxRow: 6,
        maxCol: 6,
    }
});
export default Table;
