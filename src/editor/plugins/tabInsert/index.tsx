/**
 * Since the Markdown Editor will lose input focus when user tpye a Tab key,
 * this is a built-in plugin to enable user to input Tab character.
 * see src/demo/index.tsx.
 */

import Icon from '@/components/Icon';
import { Button } from '@/components/ui/button';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import i18n from '@/i18n';
import { PluginComponent, PluginProps } from '@editor/plugins/Plugin';
import { KeyboardEventListener } from '@editor/share/var';
import TabMapList from './TabMapList';

/**
 * @field tabMapValue:  Number of spaces will be inputted. Especially, note that 1 means a '\t' instead of ' '.
 * @field show:         Whether to show TabMapList.
 */
interface TabInsertState {
  tabMapValue: number;
  show: boolean;
}

export default class TabInsert extends PluginComponent<TabInsertState> {
  static pluginName = 'tab-insert';
  static align = 'left';
  
  static defaultConfig = {
    tabMapValue: 1,
  };

  private handleKeyboard: KeyboardEventListener;

  constructor(props: PluginProps) {
    super(props);

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.handleChangeMapValue = this.handleChangeMapValue.bind(this);

    this.state = {
      tabMapValue: this.getConfig('tabMapValue') as number,
      show: false,
    };
    this.handleKeyboard = {
      key: 'Tab',
      keyCode: 9,
      aliasCommand: true,
      withKey: [],
      callback: () => this.editor.insertMarkdown('tab', { tabMapValue: this.state.tabMapValue }),
    };
  }

  private show() {
    this.setState({
      show: true,
    });
  }

  private hide() {
    this.setState({
      show: false,
    });
  }

  private handleChangeMapValue(mapValue: number) {
    this.setState({
      tabMapValue: mapValue,
    });
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
    return (
      <Button
        size="icon_sm" variant="ghost"
        className="button button-type-header"
        title={i18n.get('selectTabMap')}>

        <Popover>
          <PopoverTrigger>
            <Icon type="header" />
            </PopoverTrigger>
          <PopoverContent>
            <TabMapList value={this.state.tabMapValue} onSelectMapValue={this.handleChangeMapValue} />
          </PopoverContent>
        </Popover>
      </Button>
    );
  }
}
