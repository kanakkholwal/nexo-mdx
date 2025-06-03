import Icon from '@nexo-mdx/components/Icon';
import { Button } from '@nexo-mdx/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nexo-mdx/components/ui/popover";
import { PluginComponent, PluginProps } from '@nexo-mdx/editor/plugins/Plugin';
import i18n from '@nexo-mdx/i18n';

export default class Embed extends PluginComponent {
    static override pluginName = 'embed';


    constructor(props: PluginProps) {
        super(props);
        this.state = {
            type: 'embed',
            src: '',
        }
    }



    override render() {
        return <Popover>
            <PopoverTrigger asChild>
                <Button
                    size="icon_sm" variant="ghost"
                    className="button button-type-embed"
                    title={i18n.get('btnEmbed')}
                >
                    <Icon type="embed" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="space-y-4">

            </PopoverContent>
        </Popover>
    }
}
