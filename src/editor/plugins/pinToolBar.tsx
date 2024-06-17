import Icon from '@/components/Icon';
import { Button } from '@/components/ui/button';
import i18n from '@/i18n';
import { PluginComponent, PluginProps } from './Plugin';

interface PinToolBarState {
  pinned: boolean;
}

export default class PinToolBar extends PluginComponent<PinToolBarState> {
  static override pluginName = 'pin-unpin';

  static override align = 'right';

  constructor(props: PluginProps) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      pinned: this.editor.isPinned(),
    };
  }

  private handleClick() {
    this.editor.pin(!this.state.pinned);
  }

  private handleChange(pinned: boolean) {
    this.setState({ pinned });
  }

  override componentDidMount() {
    this.editor.on('toolbar_pin', this.handleChange);
  }

  override componentWillUnmount() {
    this.editor.off('toolbar_pin', this.handleChange);
  }

  override render() {
    const { pinned } = this.state;
    return (
      <Button
        size="icon_sm" variant="ghost"
        className="button button-type-pinned"
        title={i18n.get(pinned ? 'btnUnPinToolbar' : 'btnPinToolbar')}
        onClick={this.handleClick}
      >
        <Icon type={!pinned ? 'pin' : 'pin-off'} />
      </Button>
    );
  }
}
