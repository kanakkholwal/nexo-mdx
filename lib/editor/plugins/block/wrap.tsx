import Icon from '@/components/Icon';
import { Button } from '@/components/ui/button';
import i18n from '@/i18n';
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
