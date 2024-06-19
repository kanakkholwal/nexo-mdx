import { PluginProps } from '@/editor/plugins/Plugin';
import * as React from 'react';
interface InputFileProps {
    accept: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
declare class InputFile extends React.Component<InputFileProps, PluginProps> {
    private timerId?;
    private locked;
    private input;
    constructor(props: InputFileProps & PluginProps);
    click(): void;
    componentWillUnmount(): void;
    render(): import("react/jsx-runtime").JSX.Element;
}
export default InputFile;
