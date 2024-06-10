import Icon from '@/components/Icon';
import { Button } from '@/components/ui/button';
import i18n from '@/i18n';
import { PluginComponent } from '../Plugin';

export default class BlockCodeBlock extends PluginComponent {
  static pluginName = 'block-code-block';

  render() {
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
