import Icon from '@/components/Icon';
import { Button } from '@/components/ui/button';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import i18n from '@/i18n';
import { PluginComponent, PluginProps } from '@editor/plugins/Plugin';

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
