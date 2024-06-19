import { jsx as _jsx } from "react/jsx-runtime";
import Icon from '@/components/Icon';
import { Button } from '@/components/ui/button';
import i18n from '@/i18n';
import { PluginComponent } from './Plugin';
class PinToolBar extends PluginComponent {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            pinned: this.editor.isPinned(),
        };
    }
    handleClick() {
        this.editor.pin(!this.state.pinned);
    }
    handleChange(pinned) {
        this.setState({ pinned });
    }
    componentDidMount() {
        this.editor.on('toolbar_pin', this.handleChange);
    }
    componentWillUnmount() {
        this.editor.off('toolbar_pin', this.handleChange);
    }
    render() {
        const { pinned } = this.state;
        return (_jsx(Button, { size: "icon_sm", variant: "ghost", className: "button button-type-pinned", title: i18n.get(pinned ? 'btnUnPinToolbar' : 'btnPinToolbar'), onClick: this.handleClick, children: _jsx(Icon, { type: !pinned ? 'pin' : 'pin-off' }) }));
    }
}
Object.defineProperty(PinToolBar, "pluginName", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 'pin-unpin'
});
Object.defineProperty(PinToolBar, "align", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 'right'
});
export default PinToolBar;
