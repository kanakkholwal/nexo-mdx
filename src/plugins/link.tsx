import Icon from '@/components/Icon';
import { Button } from '@/components/ui/button';
import i18n from '../i18n';
import { KeyboardEventListener } from '../share/var';
import { PluginComponent, PluginProps } from './Plugin';

export default class Link extends PluginComponent {
  static pluginName = 'link';

  private handleKeyboard: KeyboardEventListener;

  constructor(props: PluginProps) {
    super(props);

    this.handleKeyboard = {
      key: 'k',
      keyCode: 75,
      aliasCommand: true,
      withKey: ['ctrlKey'],
      callback: () => this.editor.insertMarkdown('link'),
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
      <Button
      size="icon_sm" variant="ghost"
        className="button button-type-link"
        title={i18n.get('btnLink')}
        onClick={() => this.editor.insertMarkdown('link')}
      >
        <Icon type="link" />
      </Button>
    );
  }
}
