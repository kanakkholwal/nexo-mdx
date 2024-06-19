import Icon from '@/components/Icon';
import { Button } from '@/components/ui/button';
import { PluginComponent } from '../Plugin';

export default class Divider extends PluginComponent {
  static override pluginName = 'divider';
  static override align = 'left';

  override render() {
    return <Button size="sm" variant="ghost" className="nexo-mdx-divider" onClick={() => this.editor.insertMarkdown('hr')}>
      <Icon type="divider" />
    </Button>
  }
}
