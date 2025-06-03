import Icon from '@nexo-mdx/components/Icon';
import { Button } from '@nexo-mdx/components/ui/button';
import { KeyboardEventListener } from '@nexo-mdx/editor/share/var';
import i18n from '@nexo-mdx/i18n';
import { PluginComponent, PluginProps } from '../Plugin';

export default class ListUnordered extends PluginComponent {
  static override pluginName = 'list-unordered';

  private handleKeyboard: KeyboardEventListener;

  constructor(props: PluginProps) {
    super(props);

    this.handleKeyboard = {
      key: '8',
      keyCode: 56,
      withKey: ['ctrlKey', 'shiftKey'],
      aliasCommand: true,
      callback: () => this.editor.insertMarkdown('unordered'),
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
        size="icon_sm" variant="ghost"
        className="button button-type-unordered"
        title={i18n.get('btnUnordered')}
        onClick={() => this.editor.insertMarkdown('unordered')}
      >
        <Icon type="list-unordered" />
      </Button>
    );
  }
}
