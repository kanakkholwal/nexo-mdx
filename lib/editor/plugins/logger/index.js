import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import Icon from '@/components/Icon';
import { Button } from '@/components/ui/button';
import i18n from '@/i18n';
import { PluginComponent } from '../Plugin';
import LoggerPlugin from './logger';
class Logger extends PluginComponent {
    constructor(props) {
        super(props);
        Object.defineProperty(this, "logger", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "timerId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "handleKeyboards", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "lastPop", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        this.handleChange = this.handleChange.bind(this);
        this.handleRedo = this.handleRedo.bind(this);
        this.handleUndo = this.handleUndo.bind(this);
        // Mac's Redo is special, it is Command+Shift+Z, and it is processed first.
        this.handleKeyboards = [
            { key: 'y', keyCode: 89, withKey: ['ctrlKey'], callback: this.handleRedo },
            { key: 'z', keyCode: 90, withKey: ['metaKey', 'shiftKey'], callback: this.handleRedo },
            { key: 'z', keyCode: 90, aliasCommand: true, withKey: ['ctrlKey'], callback: this.handleUndo },
        ];
        this.logger = new LoggerPlugin({
            maxSize: this.editorConfig.loggerMaxSize,
        });
        // Register API
        this.editor.registerPluginApi('undo', this.handleUndo);
        this.editor.registerPluginApi('redo', this.handleRedo);
    }
    handleUndo() {
        const last = this.logger.undo(this.editor.getMdValue());
        if (typeof last !== 'undefined') {
            this.pause();
            this.lastPop = last;
            this.editor.setText(last);
            this.forceUpdate();
        }
    }
    handleRedo() {
        const last = this.logger.redo();
        if (typeof last !== 'undefined') {
            this.lastPop = last;
            this.editor.setText(last);
            this.forceUpdate();
        }
    }
    handleChange(value, _, isNotInput) {
        if (this.logger.getLast() === value || (this.lastPop !== null && this.lastPop === value)) {
            return;
        }
        this.logger.cleanRedo();
        if (isNotInput) {
            // from setText API call, not a input
            this.logger.push(value);
            this.lastPop = null;
            this.forceUpdate();
            return;
        }
        if (this.timerId) {
            window.clearTimeout(this.timerId);
            this.timerId = 0;
        }
        this.timerId = window.setTimeout(() => {
            if (this.logger.getLast() !== value) {
                this.logger.push(value);
                this.lastPop = null;
                this.forceUpdate();
            }
            window.clearTimeout(this.timerId);
            this.timerId = 0;
        }, this.editorConfig.loggerInterval);
    }
    componentDidMount() {
        // 监听变化事件
        this.editor.on('change', this.handleChange);
        // 监听键盘事件
        this.handleKeyboards.forEach((it) => this.editor.onKeyboard(it));
        // 初始化时，把已有值填充进logger
        this.logger.initValue = this.editor.getMdValue();
        this.forceUpdate();
    }
    componentWillUnmount() {
        if (this.timerId) {
            window.clearTimeout(this.timerId);
        }
        this.editor.off('change', this.handleChange);
        this.editor.unregisterPluginApi('undo');
        this.editor.unregisterPluginApi('redo');
        this.handleKeyboards.forEach((it) => this.editor.offKeyboard(it));
    }
    pause() {
        if (this.timerId) {
            window.clearTimeout(this.timerId);
            this.timerId = undefined;
        }
    }
    render() {
        const hasUndo = this.logger.getUndoCount() > 1 || this.logger.initValue !== this.editor.getMdValue();
        const hasRedo = this.logger.getRedoCount() > 0;
        return (_jsxs(_Fragment, { children: [_jsx(Button, { size: "icon_sm", variant: "ghost", disabled: !hasUndo, className: `button button-type-undo ${hasUndo ? '' : 'disabled'}`, title: i18n.get('btnUndo'), onClick: this.handleUndo, children: _jsx(Icon, { type: "undo" }) }), _jsx(Button, { size: "icon_sm", variant: "ghost", disabled: !hasRedo, className: `button button-type-redo ${hasRedo ? '' : 'disabled'}`, title: i18n.get('btnRedo'), onClick: this.handleRedo, children: _jsx(Icon, { type: "redo" }) })] }));
    }
}
Object.defineProperty(Logger, "pluginName", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 'logger'
});
export default Logger;
