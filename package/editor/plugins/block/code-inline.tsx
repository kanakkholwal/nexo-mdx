import Icon from '@nexo-mdx/components/Icon';
import { Button } from '@nexo-mdx/components/ui/button';
import i18n from '@nexo-mdx/i18n';
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
