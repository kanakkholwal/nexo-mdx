import Icon from '@/components/Icon';
import { Button } from '@/components/ui/button';
import i18n from '@/i18n';
import { PluginComponent } from '../Plugin';

export default class BlockWrap extends PluginComponent {
  static pluginName = 'block-wrap';

  render() {
    return (
      <Button
        size="icon_sm"
        variant="ghost"
        className="button button-type-wrap"
        title={i18n.get('btnLineBreak')}
        onClick={() => this.editor.insertMarkdown('hr')}
      >
        <Icon type="wrap" />
      </Button>
    );
  }
}
