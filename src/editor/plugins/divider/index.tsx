import Icon from '@/components/Icon';
import { Button } from '@/components/ui/button';
import { PluginComponent } from '../Plugin';

export default class Divider extends PluginComponent {
  static pluginName = 'divider';
  static align = 'left';

  render() {
    return <Button size="sm" variant="ghost" className="nexo-mdx-divider">
      <Icon type="divider" />
    </Button>
  }
}
