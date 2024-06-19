import { jsxs as _jsxs, Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Heading1, Heading2, Heading3, Heading4, Heading5, Heading6 } from "lucide-react";
import * as React from 'react';
const HEADINGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
const HEADING_ICONS = [Heading1, Heading2, Heading3, Heading4, Heading5, Heading6];
class HeaderList extends React.Component {
    handleHeader(header) {
        const { onSelectHeader } = this.props;
        if (typeof onSelectHeader === 'function') {
            onSelectHeader(header);
        }
    }
    render() {
        return (_jsx(_Fragment, { children: HEADINGS.map((header, index) => {
                return _jsxs(DropdownMenuItem, { onClick: this.handleHeader.bind(this, header), className: "font-medium font-gray-500", children: [React.createElement(HEADING_ICONS[index], { className: 'h-4' }), " Heading ", index + 1] }, index);
            }) }));
    }
}
export default HeaderList;
