import {
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import { Heading1, Heading2, Heading3, Heading4, Heading5, Heading6 } from "lucide-react";
import * as React from 'react';

interface HeaderListProps {
  onSelectHeader?: (header: string) => void;
}

class HeaderList extends React.Component<HeaderListProps> {
  handleHeader(header: string) {
    const { onSelectHeader } = this.props;
    if (typeof onSelectHeader === 'function') {
      onSelectHeader(header);
    }
  }

  render() {
    return (<>
      <DropdownMenuItem onClick={this.handleHeader.bind(this, 'h1')}><Heading1 className="h-4" /> Heading 1</DropdownMenuItem>
      <DropdownMenuItem onClick={this.handleHeader.bind(this, 'h2')}><Heading2 className="h-4" /> Heading 2</DropdownMenuItem>
      <DropdownMenuItem onClick={this.handleHeader.bind(this, 'h3')}><Heading3 className="h-4" /> Heading 3</DropdownMenuItem>
      <DropdownMenuItem onClick={this.handleHeader.bind(this, 'h4')}><Heading4 className="h-4" /> Heading 4</DropdownMenuItem>
      <DropdownMenuItem onClick={this.handleHeader.bind(this, 'h5')}><Heading5 className="h-4" /> Heading 5</DropdownMenuItem>
      <DropdownMenuItem onClick={this.handleHeader.bind(this, 'h6')}><Heading6 className="h-4" /> Heading 6</DropdownMenuItem>
    </>);
  }
}
export default HeaderList;
