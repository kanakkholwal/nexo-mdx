import { EventEmitter } from 'eventemitter3';
class Emitter extends EventEmitter {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "EVENT_CHANGE", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'a1'
        });
        Object.defineProperty(this, "EVENT_TOOLBAR_PIN", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'a2'
        });
        Object.defineProperty(this, "EVENT_VIEW_CHANGE", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'a3'
        });
        Object.defineProperty(this, "EVENT_KEY_DOWN", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'a4'
        });
        Object.defineProperty(this, "EVENT_EDITOR_KEY_DOWN", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'a5'
        });
        Object.defineProperty(this, "EVENT_FOCUS", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'a5'
        });
        Object.defineProperty(this, "EVENT_BLUR", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'a6'
        });
        Object.defineProperty(this, "EVENT_SCROLL", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'a7'
        });
        Object.defineProperty(this, "EVENT_LANG_CHANGE", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'b1'
        });
    }
}
const globalEmitter = new Emitter();
export { globalEmitter };
export default Emitter;
