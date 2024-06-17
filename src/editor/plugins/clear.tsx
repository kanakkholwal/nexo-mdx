import Icon from '@/components/Icon';
import { Button } from '@/components/ui/button';
import i18n from '@/i18n';
import { PluginComponent, PluginProps } from './Plugin';

export default class Clear extends PluginComponent {
  static override pluginName = 'clear';
  static override align = 'left';

  constructor(props: PluginProps) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (this.editor.getMdValue() === '') {
      return;
    }
    if (window.confirm && typeof window.confirm === 'function') {
      const result = window.confirm(i18n.get('clearTip'));
      if (result) {
        this.editor.setText('');
      }
    }
  }

  override render() {
    return (
      <Button size="icon_sm" variant="ghost" className="button button-type-clear" title={i18n.get('btnClear')} onClick={this.handleClick}>
        <Icon type="delete" />
      </Button>
    );
  }
}
