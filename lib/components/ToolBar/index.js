import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from '@/lib/utils';
import Icon from '../Icon';
export default function ToolBar(props) {
    return (_jsxs("div", { className: cn(`flex flex-wrap gap-4 p-3 bg-white/30 dark:bg-white/10 rounded-xl border border-border dark:border-border/10 backdrop-blur-lg border-opacity-15`, props.isPinned ? 'sticky top-5 left-0 right-0' : 'relative', "nexo-mdx-toolbar"), children: [_jsx("div", { className: cn("inline-flex gap-2 items-center justify-start flex-grow flex-wrap", "nexo-mdx-toolbar_left"), children: props.isPreview ? (_jsxs("p", { className: "text-sm text-gray-700 dark:text-gray-200 font-semibold inline-flex items-center gap-1", children: [_jsx(Icon, { type: "visibility", className: "h-4 w-4 inline-block" }), _jsx("span", { className: "font-bold", children: "Preview Mode" }), _jsx("span", { className: "text-xs text-gray-400 dark:text-gray-500 italic", children: " (See how will it look after render.)" })] })) : props.left }), _jsx("div", { className: cn("inline-flex gap-2 items-center justify-end ml-auto", "nexo-mdx-toolbar_right"), children: props.right })] }));
}
