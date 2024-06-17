import Icon from '@/components/Icon';
import { Button } from '@/components/ui/button';
import i18n from '@/i18n';
import { KeyboardEventListener } from '@editor/share/var';
import { PluginComponent, PluginProps } from '../Plugin';

export default class FontStrikethrough extends PluginComponent {
  static override pluginName = 'font-strikethrough';

  private handleKeyboard: KeyboardEventListener;

  constructor(props: PluginProps) {
    super(props);

    this.handleKeyboard = {
      key: 'd',
      keyCode: 68,
      aliasCommand: true,
      withKey: ['ctrlKey'],
      callback: () => this.editor.insertMarkdown('strikethrough'),
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
      <Button
        size="icon_sm" variant="ghost" className="button button-type-strikethrough"  title={i18n.get('btnStrikethrough')} onClick={() => this.editor.insertMarkdown('strikethrough')} >
        <Icon type="strikethrough" />
      </Button>
    );
  }
}
