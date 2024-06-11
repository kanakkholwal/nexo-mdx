import Icon from '@/components/Icon';
import { Button } from '@/components/ui/button';
import i18n from '@/i18n';
import { KeyboardEventListener } from '@/share/var';
import { PluginComponent, PluginProps } from '../Plugin';

export default class FontItalic extends PluginComponent {
  static pluginName = 'font-italic';

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

  componentDidMount() {
    if (this.editorConfig.shortcuts) {
      this.editor.onKeyboard(this.handleKeyboard);
    }
  }

  componentWillUnmount() {
    this.editor.offKeyboard(this.handleKeyboard);
  }

  render() {
    return (
      <Button size="icon_sm" variant="ghost" className="button button-type-italic"
        title={i18n.get('btnItalic')}  onClick={() => this.editor.insertMarkdown('italic')} >
        <Icon type="italic" />
      </Button>
    );
  }
}
