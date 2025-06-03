import Icon from '@nexo-mdx/components/Icon';
import { Button } from '@nexo-mdx/components/ui/button';
import { KeyboardEventListener } from '@nexo-mdx/editor/share/var';
import i18n from '@nexo-mdx/i18n';
import { PluginComponent, PluginProps } from '../Plugin';

export default class FontItalic extends PluginComponent {
  static override pluginName = 'font-italic';

  private handleKeyboard: KeyboardEventListener;

  constructor(props: PluginProps) {
    super(props);

    this.handleKeyboard = {
      key: 'i',
      keyCode: 73,
      aliasCommand: true,
      withKey: ['ctrlKey'],
      callback: () => this.editor.insertMarkdown('italic'),
    };
  }

  override componentDidMount() {
    if (this.editorConfig.shortcuts) {
      this.editor.onKeyboard(this.handleKeyboard);
    }
  }

  override componentWillUnmount() {
    this.editor.offKeyboard(this.handleKeyboard);
  }

  override render() {
    return (
      <Button size="icon_sm" variant="ghost" className="button button-type-italic"
        title={i18n.get('btnItalic')}  onClick={() => this.editor.insertMarkdown('italic')} >
        <Icon type="italic" />
      </Button>
    );
  }
}
