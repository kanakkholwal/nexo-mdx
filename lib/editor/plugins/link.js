import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Icon from '@/components/Icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover";
import { PluginComponent } from '@/editor/plugins/Plugin';
import i18n from '@/i18n';
class Link extends PluginComponent {
    constructor(props) {
        super(props);
        Object.defineProperty(this, "handleKeyboard", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.state = {
            linkUrl: '',
            target: '',
        };
        this.handleKeyboard = {
            key: 'k',
            keyCode: 75,
            aliasCommand: true,
            withKey: ['ctrlKey'],
            callback: () => this.editor.insertMarkdown('link', {
                ...this.state,
            }),
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
        return (_jsxs(Popover, { onOpenChange: (open) => {
                if (!open) {
                    this.setState({
                        linkUrl: '',
                        target: '',
                    });
                }
            }, children: [_jsx(PopoverTrigger, { asChild: true, children: _jsx(Button, { size: "icon_sm", variant: "ghost", className: "button button-type-link", title: i18n.get('btnLink'), children: _jsx(Icon, { type: "link" }) }) }), _jsxs(PopoverContent, { className: "space-y-4", children: [_jsx(Input, { type: "text", placeholder: "Name", value: this.state.target, onChange: (e) => this.setState({ target: e.target.value }) }), _jsx(Input, { type: "url", placeholder: "URL", value: this.state.linkUrl, onChange: (e) => this.setState({ linkUrl: e.target.value }) }), _jsx(Button, { size: "sm", variant: "default_light", className: "mx-auto", onClick: () => this.editor.insertMarkdown('link', {
                                ...this.state,
                            }), children: "Insert" })] })] }));
    }
}
Object.defineProperty(Link, "pluginName", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 'link'
});
Object.defineProperty(Link, "align", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 'left'
});
export default Link;
