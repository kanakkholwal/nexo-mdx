import Icon from '@/components/Icon';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import i18n from '@/i18n';
import { PluginComponent, PluginProps } from '@editor/plugins/Plugin';
import TableList from './table';

interface State {
  show: boolean;
}

interface Props extends PluginProps {
  config: {
    maxRow?: number;
    maxCol?: number;
  };
}

export default class Table extends PluginComponent<State, Props> {
  static pluginName = 'table';
  static align = 'left';

  static defaultConfig = {
    maxRow: 6,
    maxCol: 6,
  };

  constructor(props: PluginProps) {
    super(props);

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);

    this.state = {
      show: false,
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

  render() {
    const config = this.editorConfig.table || this.props.config;

    return (<Popover>
      <PopoverTrigger asChild>
        <Button
          size="icon_sm" variant="ghost"
          className="button button-type-table"
          title={i18n.get('btnTable')}
        >
          <Icon type="grid" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='p-2 w-max' align='center' forceMount>
        <TableList
          visibility={this.state.show}
          maxRow={config.maxRow}
          maxCol={config.maxCol}
          onSetTable={(option) => this.editor.insertMarkdown('table', option)}
        />
      </PopoverContent>
    </Popover>);
  }
}
