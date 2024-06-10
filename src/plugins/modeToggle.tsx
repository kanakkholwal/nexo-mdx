import { Button } from '@/components/ui/button';
import Icon from '../components/Icon';
import i18n from '../i18n';
import { PluginComponent, PluginProps } from './Plugin';

interface ModeToggleState {
  view: "preview" | "edit";
}
enum NEXT_ACTION {
  SHOW_HTML = "preview",
  SHOW_MARKDOWN = "edit",

}



class ModeToggle extends PluginComponent<ModeToggleState> {
  static pluginName = 'mode-toggle';

  static align = 'right';





  constructor(props: PluginProps) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      view: this.editor.getView()!,
    };
  }

  private handleClick() {
    const { view } = this.state;
    const next = view === 'preview' ? NEXT_ACTION.SHOW_MARKDOWN : NEXT_ACTION.SHOW_HTML;
    this.editor.setView(next === NEXT_ACTION.SHOW_HTML ? 'preview' : 'edit');
  }

  private handleChange(view: 'preview' | 'edit') {
    this.setState({ view });
  }

  componentDidMount() {
    this.editor.on('viewchange', this.handleChange);
  }

  componentWillUnmount() {
    this.editor.off('viewchange', this.handleChange);
  }

  getDisplayInfo() {
    const { view } = this.state;
    switch (view) {
      case NEXT_ACTION.SHOW_HTML:
        return {
          icon: 'visibility',
          title: 'Preview',
        };
      default:
        return {
          icon: 'keyboard',
          title: 'Editor',
        };
    }
  }

  render() {
      const display = this.getDisplayInfo();
      return (
        <Button
          size="icon_sm" variant="ghost"
          className="button button-type-mode"
          title={i18n.get(`btnMode${display.title}`)}
          onClick={this.handleClick}
        >
          <Icon type={display.icon as 'visibility' | 'keyboard'} />
        </Button>
      );
    }

}

export default ModeToggle;
