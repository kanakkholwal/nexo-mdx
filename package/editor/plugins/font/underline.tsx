import Icon from '@nexo-mdx/components/Icon';
import { Button } from '@nexo-mdx/components/ui/button';
import { KeyboardEventListener } from '@nexo-mdx/editor/share/var';
import i18n from '@nexo-mdx/i18n';
import { PluginComponent, PluginProps } from '../Plugin';

export default class FontUnderline extends PluginComponent {
  static override pluginName = 'font-underline';

  private handleKeyboard: KeyboardEventListener;

  constructor(props: PluginProps) {
    super(props);

    this.handleKeyboard = {
      key: 'u',
      keyCode: 85,
      withKey: ['ctrlKey'],
      callback: () => this.editor.insertMarkdown('underline'),
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

  override  render() {
    return (
      <Button
        size="icon_sm" variant="ghost"
        className="button button-type-underline"
        title={i18n.get('btnUnderline')}
        onClick={() => this.editor.insertMarkdown('underline')}
      >
        <Icon type="underline" />
      </Button>
    );
  }
}
