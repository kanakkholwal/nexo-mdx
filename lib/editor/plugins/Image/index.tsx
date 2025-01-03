import Icon from '@/components/Icon';
import { Button } from '@/components/ui/button';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { PluginComponent, PluginProps } from '@/editor/plugins/Plugin';
import { isPromise } from '@/editor/utils/tool';
import getUploadPlaceholder from '@/editor/utils/uploadPlaceholder';
import i18n from '@/i18n';
import * as React from 'react';
import InputFile from './inputFile';

export default class Image extends PluginComponent {
  static override pluginName = 'image';

private inputFile: React.RefObject<InputFile | null>;

  constructor(props: PluginProps) {
    super(props);
    this.inputFile = React.createRef();
    this.onImageChanged = this.onImageChanged.bind(this);
    this.handleCustomImageUpload = this.handleCustomImageUpload.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
  }

  private handleImageUpload() {
  const { onImageUpload } = this.editorConfig;
  if (typeof onImageUpload === 'function') {
    if (this.inputFile.current) {
      this.inputFile.current!.click(); // Add `!` here
    }
  } else {
    this.editor.insertMarkdown('image');
  }
}


  private onImageChanged(file: File) {
    const { onImageUpload } = this.editorConfig;
    if (onImageUpload) {
      const placeholder = getUploadPlaceholder(file, onImageUpload);
      this.editor.insertPlaceholder(placeholder.placeholder, placeholder.uploaded);
    }
  }

  private handleCustomImageUpload(e: React.MouseEvent<HTMLButtonElement>) {
    const { onCustomImageUpload } = this.editorConfig;
    if (onCustomImageUpload) {
      const res = onCustomImageUpload.call(this, e);
      if (isPromise(res)) {
        res.then((result) => {
          if (result && result.url) {
            this.editor.insertMarkdown('image', {
              target: result.text,
              imageUrl: result.url,
            });
          }
        });
      }
    }
  }

  override render() {
    const isCustom = !!this.editorConfig.onCustomImageUpload;
    return isCustom ? (
      <Button size="icon_sm" variant="ghost" className="button button-type-image" title={i18n.get('btnImage')} onClick={this.handleCustomImageUpload}>
        <Icon type="image" />
      </Button>
    ) : (<Popover>
      <PopoverTrigger asChild>
        <Button
          size="icon_sm" variant="ghost"
          className="button button-type-image"
          title={i18n.get('btnImage')}
        >
          <Icon type="image" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="space-y-4">
        <InputFile
          accept={this.editorConfig.imageAccept || 'image/*'}
          ref={this.inputFile}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            e.persist();
            if (e.target.files && e.target.files.length > 0) {
              this.onImageChanged(e.target.files[0]!);
            }
          }}
        />

        <Button size="sm" variant="default_light" className="mx-auto" onClick={this.handleImageUpload}>Insert</Button>
      </PopoverContent>
    </Popover>

    );
  }
}
