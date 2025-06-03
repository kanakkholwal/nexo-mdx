// TableList
import { Input } from '@nexo-mdx/components/ui/input';
import { PluginProps } from '@nexo-mdx/editor/plugins/Plugin';
import * as React from 'react';

interface InputFileProps {
  accept: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

class InputFile extends React.Component<InputFileProps, PluginProps> {
  private timerId?: number;

  private locked: boolean;

  private input: React.RefObject<HTMLInputElement | null>;

  constructor(props: InputFileProps & PluginProps) {
    super(props);
    this.timerId = undefined;
    this.locked = false;
    this.input = React.createRef();
  }

  click() {
  if (this.locked || !this.input.current) {
    return;
  }
  this.locked = true;
  this.input.current.value = ''; // Add `!` here
  this.input.current.click(); // Add `!` here
  if (this.timerId) {
    window.clearTimeout(this.timerId);
  }
  this.timerId = window.setTimeout(() => {
    this.locked = false;
    window.clearTimeout(this.timerId!); // Add `!` here
    this.timerId = undefined;
  }, 200);
}

  override render() {
    return (
    <Input
        type="file"
        className="h-10"
        ref={this.input}
        accept={this.props.accept}
        onChange={this.props.onChange}
      />

    );
  }
}
export default InputFile;
