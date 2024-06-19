import { jsx as _jsx } from "react/jsx-runtime";
// TableList
import { Input } from '@/components/ui/input';
import * as React from 'react';
class InputFile extends React.Component {
    constructor(props) {
        super(props);
        Object.defineProperty(this, "timerId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "locked", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "input", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.timerId = undefined;
        this.locked = false;
        this.input = React.createRef();
    }
    click() {
        if (this.locked || !this.input.current) {
            return;
        }
        this.locked = true;
        this.input.current.value = '';
        this.input.current.click();
        if (this.timerId) {
            window.clearTimeout(this.timerId);
        }
        this.timerId = window.setTimeout(() => {
            this.locked = false;
            window.clearTimeout(this.timerId);
            this.timerId = undefined;
        }, 200);
    }
    componentWillUnmount() {
        if (this.timerId) {
            window.clearTimeout(this.timerId);
        }
    }
    render() {
        return (_jsx(Input, { type: "file", className: 'h-10', ref: this.input, accept: this.props.accept, onChange: this.props.onChange }));
    }
}
export default InputFile;
