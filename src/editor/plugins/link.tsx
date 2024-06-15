import Icon from '@/components/Icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import i18n from '@/i18n';
import { PluginComponent, PluginProps } from '@editor/plugins/Plugin';
import { KeyboardEventListener } from '@editor/share/var';

interface State {
  linkUrl: string;
  target: string;
}
export default class Link extends PluginComponent<State> {
  static pluginName = 'link';
  static align = 'left';

  private handleKeyboard: KeyboardEventListener;

  constructor(props: PluginProps) {
    super(props);

    this.state = {
      linkUrl: '',
      target: '',
    };
    this.handleKeyboard = {
      key: 'k',
      keyCode: 75,
      aliasCommand: true,
      withKey: ['ctrlKey'],
      callback: () => this.editor.insertMarkdown('link',{
        ...this.state,
      }),
    };
  }

  componentDidMount() {
    if (this.editorConfig.shortcuts) {
      this.editor.onKeyboard(this.handleKeyboard);
    }
  }

  componentWillUnmount() {
    this.editor.offKeyboard(this.handleKeyboard);
  }

  render() {
    return (<Popover onOpenChange={(open) => {
      if (!open) {
        this.setState({
          linkUrl: '',
          target: '',
        });
      }
    }}>
      <PopoverTrigger asChild>
        <Button
          size="icon_sm" variant="ghost"
          className="button button-type-link"
          title={i18n.get('btnLink')}

        >
          <Icon type="link" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="space-y-4">
        <Input type="text" placeholder="Name" value={this.state.target} onChange={(e) => this.setState({ target: e.target.value })} />
        <Input type="url" placeholder="URL" value={this.state.linkUrl} onChange={(e) => this.setState({ linkUrl: e.target.value })} />
        <Button size="sm" variant="default_light" className="mx-auto" onClick={() => this.editor.insertMarkdown('link', {
          ...this.state,
        })}>Insert</Button>
      </PopoverContent>
    </Popover>
    );
  }
}
