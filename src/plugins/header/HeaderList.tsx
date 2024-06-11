import {
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import { Heading1, Heading2, Heading3, Heading4, Heading5, Heading6 } from "lucide-react";
import * as React from 'react';


const HEADINGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
const HEADING_ICONS = [Heading1, Heading2, Heading3, Heading4, Heading5, Heading6];

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
      {HEADINGS.map((header, index) => {
        return <DropdownMenuItem key={index} onClick={this.handleHeader.bind(this, header)} className="font-medium font-gray-500">
          {React.createElement(HEADING_ICONS[index], { className: 'h-4' })} Heading {index + 1}
        </DropdownMenuItem>
      })}
    </>);
  }
}
export default HeaderList;
