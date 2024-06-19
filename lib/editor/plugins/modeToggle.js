import { jsx as _jsx } from "react/jsx-runtime";
import Icon from '@/components/Icon';
import { Button } from '@/components/ui/button';
import i18n from '@/i18n';
import { PluginComponent } from './Plugin';
var NEXT_ACTION;
(function (NEXT_ACTION) {
    NEXT_ACTION["SHOW_HTML"] = "preview";
    NEXT_ACTION["SHOW_MARKDOWN"] = "edit";
})(NEXT_ACTION || (NEXT_ACTION = {}));
class ModeToggle extends PluginComponent {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            view: this.editor.getView(),
        };
    }
    handleClick() {
        const { view } = this.state;
        const next = view === 'preview' ? NEXT_ACTION.SHOW_MARKDOWN : NEXT_ACTION.SHOW_HTML;
        this.editor.setView(next === NEXT_ACTION.SHOW_HTML ? 'preview' : 'edit');
    }
    handleChange(view) {
        this.setState({ view });
    }
    componentDidMount() {
        this.editor.on('view_change', this.handleChange);
    }
    componentWillUnmount() {
        this.editor.off('view_change', this.handleChange);
    }
    getDisplayInfo() {
        const { view } = this.state;
        switch (view) {
            case NEXT_ACTION.SHOW_HTML:
                return {
                    icon: 'visibility',
                    title: 'Preview',
                };
            default:
                return {
                    icon: 'keyboard',
                    title: 'Editor',
                };
        }
    }
    render() {
        const display = this.getDisplayInfo();
        const isRenderAvailable = !!this.editor.props.renderHtml?.(this.editor.getMdValue());
        if (isRenderAvailable) {
            return (_jsx(Button, { size: "icon_sm", variant: "ghost", className: "button button-type-mode", title: i18n.get(`btnMode${display.title}`), onClick: this.handleClick, children: _jsx(Icon, { type: display.icon }) }));
        }
        return null;
    }
}
Object.defineProperty(ModeToggle, "pluginName", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 'mode-toggle'
});
Object.defineProperty(ModeToggle, "align", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 'right'
});
export default ModeToggle;
