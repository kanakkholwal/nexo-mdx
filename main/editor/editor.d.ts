import { EditorConfig, EditorEvent, KeyboardEventListener, Selection } from '@/editor/share/var';
import * as React from 'react';
type Plugin = {
    comp: any;
    config: any;
};
type TextAreaProps = Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange' | 'value'>;
interface EditorProps extends TextAreaProps {
    value?: string;
    config?: EditorConfig;
    plugins?: string[];
    onChange?: (value: string, event?: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
    renderHtml?: (md: string) => React.ReactNode | null;
}
interface EditorState {
    mdText: string;
    pinned: boolean;
    plugins: {
        [x: string]: React.ReactElement[];
    };
    view?: "preview" | "edit";
}
declare class Editor extends React.Component<EditorProps, EditorState> {
    private static plugins;
    /**
     * Register plugin
     * @param {any} comp Plugin component
     * @param {any} config Other configs
     */
    static use(comp: Plugin["comp"], config?: Plugin["config"]): void;
    /**
     * Unregister plugin
     * @param {any} comp Plugin component
     */
    static unUse(comp: Plugin["comp"]): void;
    /**
     * Unregister all plugins
     */
    static unUseAll(): void;
    /**
     * Locales
     */
    static addLocale: (langName: string, lang: {
        [x: string]: string;
    }) => void;
    static useLocale: (langName: string) => void;
    static getLocale: () => string;
    private config;
    private emitter;
    private nodeMdText;
    private nodeMdPreviewWrapper;
    private hasContentChanged;
    private composing;
    private pluginApis;
    constructor(props: EditorProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentDidUpdate(prevProps: EditorProps): void;
    isComposing(): boolean;
    private getPlugins;
    private handleFocus;
    private handleBlur;
    /**
     * Text area change event
     * @param {React.ChangeEvent} e
     */
    private handleChange;
    /**
     * Listen paste event to support paste images
     */
    private handlePaste;
    private handleDrop;
    private handleEditorKeyDown;
    private handleLocaleUpdate;
    /**
     * Get elements
     */
    getMdElement(): HTMLTextAreaElement | null;
    getHtmlElement(): HTMLDivElement | null;
    /**
     * Clear selected
     */
    clearSelection(): void;
    /**
     * Get selected
     * @return {Selection}
     */
    getSelection(): Selection;
    /**
     * Set selected
     * @param {Selection} to
     */
    setSelection(to: {
        start: number;
        end: number;
    }): void;
    /**
     * Insert markdown value
     * @param type
     * @param option
     */
    insertMarkdown(type: string, option?: any): void;
    /**
     * Insert a placeholder, and replace it when the Promise resolved
     * @param placeholder
     * @param wait
     */
    insertPlaceholder(placeholder: string, wait: Promise<string>): void;
    /**
     * Insert value
     * @param {string} text The text will be insert
     * @param {boolean} replaceSelected Replace selected value
     * @param {Selection} newSelection New selection
     */
    insertText(text?: string, replaceSelected?: boolean, newSelection?: {
        start: number;
        end: number;
    }): void;
    /**
     * Set text, and trigger onChange event
     * @param {string} text
     * @param {any} event
     */
    setText(text?: string, event?: React.ChangeEvent<HTMLTextAreaElement>, newSelection?: {
        start: number;
        end: number;
    }): void;
    /**
     * Get value value
     * @return {string}
     */
    getMdValue(): string;
    /**
     * Listen keyboard events
     */
    private keyboardListeners;
    /**
     * Listen keyboard events
     * @param {KeyboardEventListener} data
     */
    onKeyboard(data: KeyboardEventListener | KeyboardEventListener[]): void;
    /**
     * Un-listen keyboard events
     * @param {KeyboardEventListener} data
     */
    offKeyboard(data: KeyboardEventListener | KeyboardEventListener[]): void;
    private handleKeyDown;
    private getEventType;
    /**
     * Listen events
     * @param {EditorEvent} event Event type
     * @param {any} cb Callback
     */
    on(event: EditorEvent, cb: any): void;
    /**
     * Un-listen events
     * @param {EditorEvent} event Event type
     * @param {any} cb Callback
     */
    off(event: EditorEvent, cb: any): void;
    /**
     * Set view property
     * Can show or hide: editor, preview, menu
     * @param {object} to
     */
    setView(to: "preview" | "edit"): void;
    /**
     * Get view property
     * @return {object}
     */
    getView(): "preview" | "edit";
    /**
     * Pin or pin off Toolbar
     * @param {boolean} enable
     */
    pin(enable: boolean): void;
    /**
     * Register a plugin API
     * @param {string} name API name
     * @param {any} cb callback
     */
    registerPluginApi(name: string, cb: any): void;
    unregisterPluginApi(name: string): void;
    /**
     * Call a plugin API
     * @param {string} name API name
     * @param {any} others arguments
     * @returns {any}
     */
    callPluginApi<T>(name: string, ...others: any): T;
    /**
     * Is Pinned
     * @return {boolean}
     */
    isPinned(): boolean;
    private uploadWithDataTransfer;
    render(): import("react/jsx-runtime").JSX.Element;
}
export default Editor;
