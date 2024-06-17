import Icon from '@/components/Icon';
import { Button } from '@/components/ui/button';
import i18n from '@/i18n';
import { KeyboardEventListener } from '@editor/share/var';
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
