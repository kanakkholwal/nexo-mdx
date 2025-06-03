import Icon from '@nexo-mdx/components/Icon';
import { Button } from '@nexo-mdx/components/ui/button';
import i18n from '@nexo-mdx/i18n';
import { PluginComponent } from '../Plugin';

export default class BlockWrap extends PluginComponent {
  static override pluginName = 'block-wrap';
  static override align = 'left';

  override render() {
    return (
      <Button
        size="icon_sm"
        variant="ghost"
        className="button button-type-wrap"
        title={i18n.get('btnLineBreak')}
        onClick={() => this.editor.insertMarkdown('br')}
      >
        <Icon type="wrap" />
      </Button>
    );
  }
}
