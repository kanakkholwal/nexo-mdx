import Icon from '@/components/Icon';
import { Button } from '@/components/ui/button';
import i18n from '@/i18n';
import { PluginComponent } from '../Plugin';

export default class BlockCodeInline extends PluginComponent {
  static override pluginName = 'block-code-inline';
  static override align = 'left';

  override render() {
    return (
      <Button
      size="icon_sm"
        variant="ghost"
        className="button button-type-code-inline"
        title={i18n.get('btnInlineCode')}
        onClick={() => this.editor.insertMarkdown('inlinecode')}
      >
        <Icon type="code" />
      </Button>
    );
  }
}
