import ToolBar from '@/components/ToolBar';
import { Textarea } from '@/components/ui/textarea';
import DividerPlugin from '@/editor/plugins/divider';
import Emitter, { globalEmitter } from '@/editor/share/emitter';
import { EditorConfig, EditorEvent, initialSelection, KeyboardEventListener, Selection } from '@/editor/share/var';
import getDecorated from '@/editor/utils/decorate';
import mergeConfig from '@/editor/utils/mergeConfig';
import { getLineAndCol, isKeyMatch } from '@/editor/utils/tool';
import getUploadPlaceholder from '@/editor/utils/uploadPlaceholder';
import i18n from '@/i18n';
import { cn } from '@/lib/utils';
import { nanoid } from 'nanoid';
import * as React from 'react';

import defaultConfig from './defaultConfig';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Plugin = { comp: any; config: any };

type TextAreaProps = Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange' | 'value'>;

interface EditorProps extends TextAreaProps {
  value?: string;
  config?: EditorConfig;
  plugins?: string[];
  // Configs
  onChange?: (
    value: string,
    event?: React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  renderHtml?: (md: string) => React.ReactNode | null;
}

interface EditorState {
  mdText: string;
  pinned: boolean;
  plugins: { [x: string]: React.ReactElement[] };
  view?: "preview" | "edit";
}

class Editor extends React.Component<EditorProps, EditorState> {
  private static plugins: Plugin[] = [];

  /**
   * Register plugin
   * @param {any} comp Plugin component
   * @param {any} config Other configs
   */

  static use(comp: Plugin["comp"], config: Plugin["config"] = {}) {
    // Check for duplicate plugins
    for (let i = 0; i < Editor.plugins.length; i++) {
      if (Editor.plugins[i]!.comp === comp) {
        Editor.plugins.splice(i, 1, { comp, config });
        return;
      }
    }
    Editor.plugins.push({ comp, config });
  }

  /**
   * Unregister plugin
   * @param {any} comp Plugin component
   */

  static unUse(comp: Plugin["comp"]) {
    for (let i = 0; i < Editor.plugins.length; i++) {
      if (Editor.plugins[i]!.comp === comp) {
        Editor.plugins.splice(i, 1);
        return;
      }
    }
  }

  /**
   * Unregister all plugins
   */
  static unUseAll() {
    Editor.plugins = [];
  }

  /**
   * Locales
   */
  static addLocale = i18n.add.bind(i18n);

  static useLocale = i18n.setCurrent.bind(i18n);

  static getLocale = i18n.getCurrent.bind(i18n);

  private config: EditorConfig;

  private emitter: Emitter;

  private nodeMdText = React.createRef<HTMLTextAreaElement>();


  private nodeMdPreviewWrapper = React.createRef<HTMLDivElement>();

  private hasContentChanged = true;

  private composing = false;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private pluginApis = new Map<string, any>();


  constructor(props: EditorProps) {
    super(props);

    this.emitter = new Emitter();
    this.config = mergeConfig(defaultConfig, this.props.config, this.props);

    this.state = {
      mdText: (this.props.value || this.props.defaultValue as string || '').replace(/↵/g, '\n'),
      view: "edit",
      pinned: false,
      plugins: this.getPlugins(),
    };


    this.nodeMdText = React.createRef();
    this.nodeMdPreviewWrapper = React.createRef();

    this.handleChange = this.handleChange.bind(this);
    this.handlePaste = this.handlePaste.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleEditorKeyDown = this.handleEditorKeyDown.bind(this);
    this.handleLocaleUpdate = this.handleLocaleUpdate.bind(this);

    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  override componentDidMount() {
    globalEmitter.on(globalEmitter.EVENT_LANG_CHANGE, this.handleLocaleUpdate);
    // init i18n
    i18n.setUp();
  }

  override componentWillUnmount() {
    globalEmitter.off(globalEmitter.EVENT_LANG_CHANGE, this.handleLocaleUpdate);
  }

  override componentDidUpdate(prevProps: EditorProps) {
    if (typeof this.props.value !== 'undefined' && this.props.value !== this.state.mdText) {
      let { value } = this.props;
      if (typeof value !== 'string') {
        value = String(value).toString();
      }
      value = value.replace(/↵/g, '\n');
      if (this.state.mdText !== value) {
        this.setState({
          mdText: value,
        });
      }
    }
    if (prevProps.plugins !== this.props.plugins) {
      this.setState({
        plugins: this.getPlugins(),
      });
    }
  }

  isComposing() {
    return this.composing;
  }

  private getPlugins() {
    let plugins: Plugin[] = [];
    if (this.props.plugins) {
      // If plugins option is configured, use only specified plugins
      const addToPlugins = (name: string) => {
        if (name === DividerPlugin.pluginName) {
          plugins.push({
            comp: DividerPlugin,
            config: {},
          });
          return;
        }
        for (const it of Editor.plugins) {
          if (it.comp.pluginName === name) {
            plugins.push(it);
            return;
          }
        }
      };
      for (const name of this.props.plugins) {
        // Special handling of fonts to ensure backward compatibility
        if (name === 'fonts') {
          addToPlugins('font-bold');
          addToPlugins('font-italic');
          addToPlugins('font-underline');
          addToPlugins('font-strikethrough');
          addToPlugins('list-unordered');
          addToPlugins('list-ordered');
          addToPlugins('block-quote');
          addToPlugins('block-wrap');
          addToPlugins('block-code-inline');
          addToPlugins('block-code-block');
        } else {
          addToPlugins(name);
        }
      }
    } else {
      // Use all registered plugins
      plugins = [...Editor.plugins];
    }
    const result: { [x: string]: React.ReactElement[] } = {};
    plugins.forEach((it) => {
      if (typeof result[it.comp.align] === 'undefined') {
        result[it.comp.align] = [];
      }
      const key = it.comp.pluginName === 'divider' ? nanoid() : it.comp.pluginName;
      result[it.comp!.align!]!.push(
        React.createElement(it.comp, {
          editor: this,
          editorConfig: this.config,
          config: {
            ...(it.comp.defaultConfig || {}),
            ...(it.config || {}),
          },
          key,
        }),
      );
    });
    return result;
  }



  private handleFocus(e: React.FocusEvent<HTMLTextAreaElement>) {
    const { onFocus } = this.props;
    if (onFocus) {
      onFocus(e);
    }
    this.emitter.emit(this.emitter.EVENT_FOCUS, e);
  }

  private handleBlur(e: React.FocusEvent<HTMLTextAreaElement>) {
    const { onBlur } = this.props;
    if (onBlur) {
      onBlur(e);
    }
    this.emitter.emit(this.emitter.EVENT_BLUR, e);
  }

  /**
   * Text area change event
   * @param {React.ChangeEvent} e
   */
  private handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    e.persist();
    const { value } = e.target;
    // trigger internal event
    this.setText(value, e);
  }

  /**
   * Listen paste event to support paste images
   */
  private handlePaste(e: React.SyntheticEvent) {
    if (!this.config.allowPasteImage || !this.config.onImageUpload) {
      return;
    }
    const event = e.nativeEvent as ClipboardEvent;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const items = (event.clipboardData || window.clipboardData).items as DataTransferItemList;

    if (items) {
      e.preventDefault();
      this.uploadWithDataTransfer(items);
    }
  }

  // Drag images to upload
  private handleDrop(e: React.SyntheticEvent) {
    if (!this.config.onImageUpload) {
      return;
    }
    const event = e.nativeEvent as DragEvent;
    if (!event.dataTransfer) {
      return;
    }
    const { items } = event.dataTransfer;
    if (items) {
      e.preventDefault();
      this.uploadWithDataTransfer(items);
    }
  }

  private handleEditorKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    const { keyCode, key, currentTarget } = e;
    if ((keyCode === 13 || key === 'Enter') && this.composing === false) {
      const value = currentTarget.value;
      const curPos = currentTarget.selectionStart;
      const lineInfo = getLineAndCol(value, curPos);

      const emptyCurrentLine = () => {
        const newValue = currentTarget.value.substr(0, curPos - lineInfo.curLine.length) + currentTarget.value.substr(curPos);
        this.setText(newValue, undefined, {
          start: curPos - lineInfo.curLine.length,
          end: curPos - lineInfo.curLine.length,
        });
        e.preventDefault();
      };

      const addSymbol = (symbol: string) => {
        this.insertText(`\n${symbol}`, false, {
          start: symbol.length + 1,
          end: symbol.length + 1,
        });
        e.preventDefault();
      };

      // Enter key, check previous line
      const isSymbol = lineInfo.curLine.match(/^(\s*?)\* /);
      if (isSymbol) {
        if (/^(\s*?)\* $/.test(lineInfo.curLine)) {
          emptyCurrentLine();
          return;
        }
        addSymbol(isSymbol[0]);
        return;
      }
      const isOrderList = lineInfo.curLine.match(/^(\s*?)(\d+)\. /);
      if (isOrderList) {
        if (/^(\s*?)(\d+)\. $/.test(lineInfo.curLine)) {
          emptyCurrentLine();
          return;
        }
        const toInsert = `${isOrderList[1]}${parseInt(isOrderList[2]!, 10) + 1}. `;
        addSymbol(toInsert);
        return;
      }
    }
    // 触发默认事件
    this.emitter.emit(this.emitter.EVENT_EDITOR_KEY_DOWN, e);
  }

  // Handle language change
  private handleLocaleUpdate() {
    this.forceUpdate();
  }

  /**
   * Get elements
   */
  getMdElement() {
    return this.nodeMdText.current;
  }

  getHtmlElement() {
    return this.nodeMdPreviewWrapper.current;
  }

  /**
   * Clear selected
   */
  clearSelection() {
    if (this.nodeMdText.current) {
      this.nodeMdText.current.setSelectionRange(0, 0, 'none');
    }
  }

  /**
   * Get selected
   * @return {Selection}
   */
  getSelection(): Selection {
    const source = this.nodeMdText.current;
    if (!source) {
      return { ...initialSelection };
    }
    const start = source.selectionStart;
    const end = source.selectionEnd;
    const value = (source.value || '').slice(start, end);
    return {
      start,
      end,
      text: value,
    };
  }

  /**
   * Set selected
   * @param {Selection} to
   */
  setSelection(to: { start: number; end: number }) {
    if (this.nodeMdText.current) {
      this.nodeMdText.current.setSelectionRange(to.start, to.end, 'forward');
      this.nodeMdText.current.focus();
    }
  }

  /**
   * Insert markdown value
   * @param type
   * @param option
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  insertMarkdown(type: string, option: any = {}) {
    const curSelection = this.getSelection();
    let decorateOption = option ? { ...option } : {};
    if (type === 'image') {
      decorateOption = {
        ...decorateOption,
        target: option.target || curSelection.text || '',
        imageUrl: option.imageUrl || this.config.imageUrl,
      };
    }
    if (type === 'link') {
      decorateOption = {
        ...decorateOption,
        target: option.target || curSelection.text || '',
        linkUrl: option.linkUrl || this.config.linkUrl,
      };

    }
    if (type === 'tab' && curSelection.start !== curSelection.end) {
      const curLineStart = this.getMdValue()
        .slice(0, curSelection.start)
        .lastIndexOf('\n') + 1;
      this.setSelection({
        start: curLineStart,
        end: curSelection.end,
      });
    }
    const decorate = getDecorated(curSelection.text, type, decorateOption);
    let { text } = decorate;
    const { selection } = decorate;
    if (decorate.newBlock) {
      const startLineInfo = getLineAndCol(this.getMdValue(), curSelection.start);
      const { col, curLine } = startLineInfo;
      if (col > 0 && curLine.length > 0) {
        text = `\n${text}`;
        if (selection) {
          selection.start++;
          selection.end++;
        }
      }
      let { afterText } = startLineInfo;
      if (curSelection.start !== curSelection.end) {
        afterText = getLineAndCol(this.getMdValue(), curSelection.end).afterText;
      }
      if (afterText.trim() !== '' && afterText.substr(0, 2) !== '\n\n') {
        if (afterText.substr(0, 1) !== '\n') {
          text += '\n';
        }
        text += '\n';
      }
    }
    this.insertText(text, true, selection);
    this.nodeMdText.current?.focus();

  }

  /**
   * Insert a placeholder, and replace it when the Promise resolved
   * @param placeholder
   * @param wait
   */
  insertPlaceholder(placeholder: string, wait: Promise<string>) {
    this.insertText(placeholder, true);
    wait.then((str) => {
      const value = this.getMdValue().replace(placeholder, str);
      this.setText(value);
    });
  }

  /**
   * Insert value
   * @param {string} text The text will be insert
   * @param {boolean} replaceSelected Replace selected value
   * @param {Selection} newSelection New selection
   */
  insertText(text: string = '', replaceSelected: boolean = false, newSelection?: { start: number; end: number }) {
    const { mdText } = this.state;
    const selection = this.getSelection();
    const beforeContent = mdText.slice(0, selection.start);
    const afterContent = mdText.slice(replaceSelected ? selection.end : selection.start, mdText.length);

    this.setText(
      beforeContent + text + afterContent,
      undefined,
      newSelection
        ? {
          start: newSelection.start + beforeContent.length,
          end: newSelection.end + beforeContent.length,
        }
        : {
          start: selection.start,
          end: selection.start,
        },
    );
  }

  /**
   * Set text, and trigger onChange event
   * @param {string} text
   * @param {any} event
   */
  setText(text: string = '', event?: React.ChangeEvent<HTMLTextAreaElement>, newSelection?: { start: number; end: number }) {
    const { onChangeTrigger = 'both' } = this.config;
    const value = text.replace(/↵/g, '\n');
    if (this.state.mdText === value) {
      return;
    }
    this.setState({ mdText: value });
    this.props.renderHtml?.(value);
    if (this.props.onChange && (onChangeTrigger === 'both' || onChangeTrigger === 'beforeRender')) {
      this.props.onChange(value, event);
    }
    this.emitter.emit(this.emitter.EVENT_CHANGE, value, event, typeof event === 'undefined');
    if (newSelection) {
      setTimeout(() => this.setSelection(newSelection));
    }
    if (!this.hasContentChanged) {
      this.hasContentChanged = true;
    }
  }

  /**
   * Get value value
   * @return {string}
   */
  getMdValue(): string {
    return this.state.mdText;
  }


  /**
   * Listen keyboard events
   */
  private keyboardListeners: KeyboardEventListener[] = [];

  /**
   * Listen keyboard events
   * @param {KeyboardEventListener} data
   */
  onKeyboard(data: KeyboardEventListener | KeyboardEventListener[]) {
    if (Array.isArray(data)) {
      data.forEach((it) => this.onKeyboard(it));
      return;
    }
    if (!this.keyboardListeners.includes(data)) {
      this.keyboardListeners.push(data);
    }
  }

  /**
   * Un-listen keyboard events
   * @param {KeyboardEventListener} data
   */
  offKeyboard(data: KeyboardEventListener | KeyboardEventListener[]) {
    if (Array.isArray(data)) {
      data.forEach((it) => this.offKeyboard(it));
      return;
    }
    const index = this.keyboardListeners.indexOf(data);
    if (index >= 0) {
      this.keyboardListeners.splice(index, 1);
    }
  }

  private handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    // Traverse the listening array to see if it is being monitored
    for (const it of this.keyboardListeners) {
      if (isKeyMatch(e, it)) {
        e.preventDefault();
        it.callback(e);
        return;
      }
    }
    // 如果没有，触发默认事件
    this.emitter.emit(this.emitter.EVENT_KEY_DOWN, e);
  }

  private getEventType(event: EditorEvent): string | undefined {
    switch (event) {
      case 'change':
        return this.emitter.EVENT_CHANGE;
      case 'toolbar_pin':
        return this.emitter.EVENT_TOOLBAR_PIN;
      case 'view_change':
        return this.emitter.EVENT_VIEW_CHANGE;
      case 'keydown':
        return this.emitter.EVENT_KEY_DOWN;
      case 'editor_keydown':
        return this.emitter.EVENT_EDITOR_KEY_DOWN;
      case 'blur':
        return this.emitter.EVENT_BLUR;
      case 'focus':
        return this.emitter.EVENT_FOCUS;
      case 'scroll':
        return this.emitter.EVENT_SCROLL;
    }
  }

  /**
   * Listen events
   * @param {EditorEvent} event Event type
   * @param {any} cb Callback
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  on(event: EditorEvent, cb: any) {
    const eventType = this.getEventType(event);
    if (eventType) {
      this.emitter.on(eventType, cb);
    }
  }

  /**
   * Un-listen events
   * @param {EditorEvent} event Event type
   * @param {any} cb Callback
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  off(event: EditorEvent, cb: any) {
    const eventType = this.getEventType(event);
    if (eventType) {
      this.emitter.off(eventType, cb);
    }
  }

  /**
   * Set view property
   * Can show or hide: editor, preview, menu
   * @param {object} to
   */
  setView(to: "preview" | "edit") {

    this.setState(
      {
        view: to,
      },
      () => {
        this.emitter.emit(this.emitter.EVENT_VIEW_CHANGE, to);
      },
    );
  }

  /**
   * Get view property
   * @return {object}
   */
  getView() {
    return this.state.view || "edit";
  }

  /**
   * Pin or pin off Toolbar
   * @param {boolean} enable
   */
  pin(enable: boolean) {
    this.setState({
      pinned: enable,
    }, () => {
      this.emitter.emit(this.emitter.EVENT_TOOLBAR_PIN, enable);
    },
    );

  }

  /**
   * Register a plugin API
   * @param {string} name API name
   * @param {any} cb callback
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  registerPluginApi(name: string, cb: any) {
    this.pluginApis.set(name, cb);
  }

  unregisterPluginApi(name: string) {
    this.pluginApis.delete(name);
  }

  /**
   * Call a plugin API
   * @param {string} name API name
   * @param {any} others arguments
   * @returns {any}
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callPluginApi<T>(name: string, ...others: any): T {
    const handler = this.pluginApis.get(name);
    if (!handler) {
      throw new Error(`API ${name} not found`);
    }
    return handler(...others);
  }

  /**
   * Is Pinned
   * @return {boolean}
   */
  isPinned(): boolean {
    return this.state.pinned;
  }

  private uploadWithDataTransfer(items: DataTransferItemList) {
    const { onImageUpload } = this.config;
    if (!onImageUpload) {
      return;
    }
    const queue: Promise<string>[] = [];
    Array.prototype.forEach.call(items, (it: DataTransferItem) => {
      if (it.kind === 'file' && it.type.includes('image')) {
        const file = it.getAsFile();
        if (file) {
          const placeholder = getUploadPlaceholder(file, onImageUpload);
          queue.push(Promise.resolve(placeholder.placeholder));
          placeholder.uploaded.then((str) => {
            const value = this.getMdValue().replace(placeholder.placeholder, str);
            const offset = str.length - placeholder.placeholder.length;

            const selection = this.getSelection();
            this.setText(value, undefined, {
              start: selection.start + offset,
              end: selection.start + offset,
            });
          });
        }
      } else if (it.kind === 'string' && it.type === 'value/plain') {
        queue.push(new Promise((resolve) => it.getAsString(resolve)));
      }
    });
    Promise.all(queue).then((res) => {
      const value = res.join('');
      const selection = this.getSelection();
      this.insertText(value, true, {
        start: selection.start === selection.end ? value.length : 0,
        end: value.length,
      });
    });
  }

  override render() {
    const { mdText, view } = this.state;
    const getPluginAt = (at: string) => this.state.plugins[at] || [];

    const {
      renderHtml,
      defaultValue,
      ...props
    } = this.props;

    return (
      <div id={`${this.props.id || "nexo-mdx"}-wrapper`} ref={this.nodeMdPreviewWrapper} aria-label='nexo-mdx-editor-container' className={cn(`nexo-mdx-editor grid w-full gap-4 p-3`, this.props.className)} style={this.props.style} onKeyDown={this.handleKeyDown} onDrop={this.handleDrop}>
        <ToolBar isPinned={this.isPinned()} isPreview={view === "preview"} left={getPluginAt('left')} right={getPluginAt('right')} />
        <div>
          {view === "edit" ? <div className="editor-container" aria-label='editor-container'>
            <Textarea
              {...props}
              name={this.props.name || "nexo-mdx-editor"}
              id={this.props.id || "nexo-mdx-editor"}
              ref={this.nodeMdText}
              autoFocus={this.props.autoFocus || false}
              placeholder={this.props.placeholder || "Write some cool markdown..."}
              readOnly={this.props.readOnly}
              value={mdText}
              className={cn(`w-full h-auto`, this.config.textareaClassName)}
              wrap="hard"
              onChange={this.handleChange}
              onKeyDown={this.handleEditorKeyDown}
              onCompositionStart={() => (this.composing = true)}
              onCompositionEnd={() => (this.composing = false)}
              onPaste={(e) => {
                this.props.onPaste?.(e);
                // this.handlePaste(e);
              }}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
            />
          </div> : renderHtml?.(mdText) ?
            <div className="p-3 rounded border preview-container" id={"nexo-mdx-preview"} aria-label='preview-container'> {renderHtml(mdText)!} </div>
            : null
          }
        </div>
      </div>
    );
  }
}

export default Editor;
