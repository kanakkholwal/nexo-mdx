import Icon from '@nexo-mdx/components/Icon';
import { Button } from '@nexo-mdx/components/ui/button';
import { KeyboardEventListener } from '@nexo-mdx/editor/share/var';
import i18n from '@nexo-mdx/i18n';
import { PluginComponent, PluginProps } from '../Plugin';

export default class ListOrdered extends PluginComponent {
  static override pluginName = 'list-ordered';

  private handleKeyboard: KeyboardEventListener;

  constructor(props: PluginProps) {
    super(props);

    this.handleKeyboard = {
      key: '7',
      keyCode: 55,
      withKey: ['ctrlKey', 'shiftKey'],
      aliasCommand: true,
      callback: () => this.editor.insertMarkdown('order'),
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
        className="button button-type-ordered"
        title={i18n.get('btnOrdered')}
        onClick={() => this.editor.insertMarkdown('order')}
      >
        <Icon type="list-ordered" />
      </Button>
    );
  }
}
