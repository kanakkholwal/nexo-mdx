import * as React from 'react';
interface HeaderListProps {
    onSelectHeader?: (header: string) => void;
}
declare class HeaderList extends React.Component<HeaderListProps> {
    handleHeader(header: string): void;
    render(): import("react/jsx-runtime").JSX.Element;
}
export default HeaderList;
