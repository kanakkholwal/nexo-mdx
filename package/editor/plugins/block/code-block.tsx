import Icon from '@nexo-mdx/components/Icon';
import { Button } from '@nexo-mdx/components/ui/button';
import i18n from '@nexo-mdx/i18n';
import { PluginComponent } from '../Plugin';

export default class BlockCodeBlock extends PluginComponent {
  static override pluginName = 'block-code-block';
  static override align = 'left';

  override render() {
    return (
      <Button
      size="icon_sm"
        variant="ghost"
        className="button button-type-code-block"
        title={i18n.get('btnCode')}
        onClick={() => this.editor.insertMarkdown('code')}
      >
        <Icon type="code-block" />
      </Button>
    );
  }
}
