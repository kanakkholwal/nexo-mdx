import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from '@/lib/utils';
import * as React from 'react';
class TableList extends React.Component {
    constructor(props) {
        super(props);
        Object.defineProperty(this, "config", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                padding: 3,
                width: 20,
                height: 20,
            }
        });
        const { maxRow = 5, maxCol = 6 } = props;
        this.state = {
            maxRow,
            maxCol,
            list: this.formatTableModel(maxRow, maxCol),
        };
    }
    formatTableModel(maxRow = 0, maxCol = 0) {
        const result = new Array(maxRow).fill(undefined);
        return result.map(() => new Array(maxCol).fill(0));
    }
    calcWrapStyle() {
        const { maxRow, maxCol } = this.state;
        const { width, height, padding } = this.config;
        const wrapWidth = (width + padding) * maxCol - (2 * padding);
        const wrapHeight = (height + padding) * maxRow - padding;
        return {
            width: `${wrapWidth}px`,
            height: `${wrapHeight}px`,
        };
    }
    calcItemStyle(row = 0, col = 0) {
        const { width, height, padding } = this.config;
        const top = (height + padding) * row;
        const left = (width + padding) * col;
        return {
            top: `${top}px`,
            left: `${left}px`,
        };
    }
    getList(i, j) {
        const { list } = this.state;
        return list.map((v, row) => v.map((_, col) => (row <= i && col <= j ? 1 : 0)));
    }
    handleHover(i, j) {
        this.setState({
            list: this.getList(i, j),
        });
    }
    handleSetTable(i, j) {
        const { onSetTable } = this.props;
        if (typeof onSetTable === 'function') {
            onSetTable({
                row: i + 1,
                col: j + 1,
            });
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props.visibility === false && prevProps.visibility !== this.props.visibility) {
            this.setState({
                list: this.getList(-1, -1),
            });
        }
    }
    render() {
        return (_jsx("ul", { className: "flex gap-1 flex-wrap w-full mx-auto justify-center", style: this.calcWrapStyle(), children: this.state.list.map((row, i) => row.map((col, j) => (_jsx("li", { className: cn(`bg-gray-200 rounded h-4 w-4`, col === 1 ? 'bg-primary/25' : ''), style: this.calcItemStyle(i, j), onMouseOver: this.handleHover.bind(this, i, j), onClick: this.handleSetTable.bind(this, i, j) }, `${i}-${j}`)))) }));
    }
}
export default TableList;
