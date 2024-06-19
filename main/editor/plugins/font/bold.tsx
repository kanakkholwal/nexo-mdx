import Icon from '@/components/Icon';
import { Button } from '@/components/ui/button';
import { KeyboardEventListener } from '@/editor/share/var';
import i18n from '@/i18n';
import { PluginComponent, PluginProps } from '../Plugin';

export default class FontBold extends PluginComponent {
  static override pluginName = 'font-bold';

  private handleKeyboard: KeyboardEventListener;

  constructor(props: PluginProps) {
    super(props);

    this.handleKeyboard = {
      key: 'b',
      keyCode: 66,
      aliasCommand: true,
      withKey: ['ctrlKey'],
      callback: () => this.editor.insertMarkdown('bold'),
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
      <Button size="icon_sm" variant="ghost"  className="button button-type-bold"
        title={i18n.get('btnBold')} onClick={() => this.editor.insertMarkdown('bold')}>
        <Icon type="bold" />
      </Button>
    );
  }
}
