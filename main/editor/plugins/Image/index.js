import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Icon from '@/components/Icon';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover";
import { PluginComponent } from '@/editor/plugins/Plugin';
import { isPromise } from '@/editor/utils/tool';
import getUploadPlaceholder from '@/editor/utils/uploadPlaceholder';
import i18n from '@/i18n';
import * as React from 'react';
import InputFile from './inputFile';
class Image extends PluginComponent {
    constructor(props) {
        super(props);
        Object.defineProperty(this, "inputFile", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.inputFile = React.createRef();
        this.onImageChanged = this.onImageChanged.bind(this);
        this.handleCustomImageUpload = this.handleCustomImageUpload.bind(this);
        this.handleImageUpload = this.handleImageUpload.bind(this);
    }
    handleImageUpload() {
        const { onImageUpload } = this.editorConfig;
        if (typeof onImageUpload === 'function') {
            if (this.inputFile.current) {
                this.inputFile.current.click();
            }
        }
        else {
            this.editor.insertMarkdown('image');
        }
    }
    onImageChanged(file) {
        const { onImageUpload } = this.editorConfig;
        if (onImageUpload) {
            const placeholder = getUploadPlaceholder(file, onImageUpload);
            this.editor.insertPlaceholder(placeholder.placeholder, placeholder.uploaded);
        }
    }
    handleCustomImageUpload(e) {
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
    render() {
        const isCustom = !!this.editorConfig.onCustomImageUpload;
        return isCustom ? (_jsx(Button, { size: "icon_sm", variant: "ghost", className: "button button-type-image", title: i18n.get('btnImage'), onClick: this.handleCustomImageUpload, children: _jsx(Icon, { type: "image" }) })) : (_jsxs(Popover, { children: [_jsx(PopoverTrigger, { asChild: true, children: _jsx(Button, { size: "icon_sm", variant: "ghost", className: "button button-type-image", title: i18n.get('btnImage'), children: _jsx(Icon, { type: "image" }) }) }), _jsxs(PopoverContent, { className: "space-y-4", children: [_jsx(InputFile, { accept: this.editorConfig.imageAccept || 'image/*', ref: this.inputFile, onChange: (e) => {
                                e.persist();
                                if (e.target.files && e.target.files.length > 0) {
                                    this.onImageChanged(e.target.files[0]);
                                }
                            } }), _jsx(Button, { size: "sm", variant: "default_light", className: "mx-auto", onClick: this.handleImageUpload, children: "Insert" })] })] }));
    }
}
Object.defineProperty(Image, "pluginName", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 'image'
});
export default Image;
