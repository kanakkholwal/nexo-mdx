import { jsx as _jsx } from "react/jsx-runtime";
import { PluginComponent } from './Plugin';
class AutoResize extends PluginComponent {
    constructor(props) {
        super(props);
        Object.defineProperty(this, "timer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        Object.defineProperty(this, "useTimer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.useTimer = this.getConfig('useTimer') || typeof requestAnimationFrame === 'undefined';
        this.handleChange = this.handleChange.bind(this);
        this.doResize = this.doResize.bind(this);
    }
    doResize() {
        const resizeElement = (e) => {
            e.style.height = 'auto';
            const height = Math.min(Math.max(this.getConfig('min'), e.scrollHeight), this.getConfig('max'));
            e.style.height = `${height}px`;
            return height;
        };
        this.timer = null;
        // 如果渲染了编辑器，就以编辑器为准
        const view = this.editor.getView();
        const el = this.editor.getMdElement();
        const previewer = this.editor.getHtmlElement();
        if (el && view === 'edit') {
            const height = resizeElement(el);
            if (previewer) {
                previewer.style.height = `${height}px`;
            }
            return;
        }
        // 否则，以预览区域为准
        if (previewer && view === 'preview') {
            resizeElement(previewer);
        }
    }
    handleChange() {
        if (this.timer !== null) {
            return;
        }
        if (this.useTimer) {
            this.timer = window.setTimeout(this.doResize);
            return;
        }
        this.timer = requestAnimationFrame(this.doResize);
    }
    componentDidMount() {
        this.editor.on('change', this.handleChange);
        this.editor.on('view_change', this.handleChange);
        this.handleChange();
    }
    componentWillUnmount() {
        this.editor.off('change', this.handleChange);
        this.editor.off('view_change', this.handleChange);
        if (this.timer !== null && this.useTimer) {
            window.clearTimeout(this.timer);
            this.timer = null;
        }
    }
    render() {
        return _jsx("span", {});
    }
}
Object.defineProperty(AutoResize, "pluginName", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 'auto-resize'
});
Object.defineProperty(AutoResize, "align", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 'left'
});
Object.defineProperty(AutoResize, "defaultConfig", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: {
        min: 200,
        max: Infinity,
        useTimer: false,
    }
});
export default AutoResize;
