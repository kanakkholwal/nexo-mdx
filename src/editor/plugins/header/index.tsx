
import Icon from '@/components/Icon';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import i18n from '@/i18n';
import { PluginComponent } from '../Plugin';
import HeaderList from './HeaderList';


export default class Header extends PluginComponent {
  static override pluginName = 'header';

  override render() {
    return <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button title={i18n.get('btnHeader')} className="button button-type-header" size="icon_sm" variant="ghost">
          <Icon type="header" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" forceMount>
        <HeaderList onSelectHeader={(header: string) => this.editor.insertMarkdown(header)} />
      </DropdownMenuContent>
    </DropdownMenu>

  }
}

