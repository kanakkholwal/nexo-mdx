import Icon from '@/components/Icon';
import { Button } from '@/components/ui/button';
import i18n from '@/i18n';
import { PluginComponent } from '../Plugin';

export default class BlockQuote extends PluginComponent {
  static pluginName = 'block-quote';
  static align = 'left';

  render() {
    return (
      <Button
      size="icon_sm"
        variant="ghost"
        className="button button-type-quote"
        title={i18n.get('btnQuote')}
        onClick={() => this.editor.insertMarkdown('quote')}
      >
        <Icon type="quote" />
      </Button>
    );
  }
}
