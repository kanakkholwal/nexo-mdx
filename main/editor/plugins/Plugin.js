import * as React from 'react';
export class PluginComponent extends React.Component {
    get editor() {
        return this.props.editor;
    }
    get editorConfig() {
        return this.props.editorConfig;
    }
    getConfig(key, defaultValue) {
        const value = this.props.config[key];
        return (value !== undefined && value !== null) ? value : defaultValue;
    }
}
Object.defineProperty(PluginComponent, "pluginName", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: ''
});
Object.defineProperty(PluginComponent, "align", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 'left'
});
Object.defineProperty(PluginComponent, "defaultConfig", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: {}
});
