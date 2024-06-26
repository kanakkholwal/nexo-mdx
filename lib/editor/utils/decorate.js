import { cn } from '@/lib/utils';
import { repeat } from './tool';
// The simplest Decorator is to add prefixes and suffixes to the existing text.
const IMAGE_REGEX = /!\[(.*?)\]\((.*?)\)/g;
function addClassNames(text, classNames) {
    return text.replace(IMAGE_REGEX, (_, alt, src) => {
        const className = classNames ? `{${cn(classNames)}}` : ''; // Tailwind CSS classname
        return `![${alt}](${src})${className}`;
    });
}
const SIMPLE_DECORATOR = {
    bold: ['**', '**'],
    italic: ['*', '*'],
    underline: ['++', '++'],
    strikethrough: ['~~', '~~'],
    quote: ['\n> ', '\n'],
    inlinecode: ['`', '`'],
    code: ['\n```\n', '\n```\n'],
};
// 插入H1-H6
for (let i = 1; i <= 6; i++) {
    SIMPLE_DECORATOR[`h${i}`] = [`\n${repeat('#', i)} `, '\n'];
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function decorateTableText(option) {
    const { row = 2, col = 2 } = option;
    const rowHeader = ['|'];
    const rowData = ['|'];
    const rowDivision = ['|'];
    let colStr = '';
    for (let i = 1; i <= col; i++) {
        rowHeader.push(' Head |');
        rowDivision.push(' --- |');
        rowData.push(' Data |');
    }
    for (let j = 1; j <= row; j++) {
        colStr += '\n' + rowData.join('');
    }
    return `${rowHeader.join('')}\n${rowDivision.join('')}${colStr}`;
}
function decorateList(type, target) {
    let text = target;
    if (text.substr(0, 1) !== '\n') {
        text = '\n' + text;
    }
    if (type === 'unordered') {
        return text.length > 1 ? text.replace(/\n/g, '\n* ').trim() : '* ';
    }
    else {
        let count = 1;
        if (text.length > 1) {
            return text
                .replace(/\n/g, () => {
                return `\n${count++}. `;
            })
                .trim();
        }
        else {
            return '1. ';
        }
    }
}
function createTextDecorated(text, newBlock) {
    return {
        text,
        newBlock,
        selection: {
            start: text.length,
            end: text.length,
        },
    };
}
/**
 * Get the decorated Markdown text
 * @param target Original text
 * @param type Decoration Type
 * @param option Additional parameters
 * @returns {Decorated}
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getDecorated(target, type, option) {
    if (typeof SIMPLE_DECORATOR[type] !== 'undefined') {
        return {
            text: `${SIMPLE_DECORATOR[type]?.[0]}${target}${SIMPLE_DECORATOR[type]?.[1]}`,
            selection: {
                start: SIMPLE_DECORATOR[type]?.[0]?.length,
                end: SIMPLE_DECORATOR[type]?.[0]?.length + target.length,
            },
        };
    }
    switch (type) {
        case 'tab':
            // eslint-disable-next-line no-case-declarations
            const inputValue = option.tabMapValue === 1 ? '\t' : ' '.repeat(option.tabMapValue);
            // eslint-disable-next-line no-case-declarations
            const newSelectedText = inputValue + target.replace(/\n/g, `\n${inputValue}`);
            // eslint-disable-next-line no-case-declarations
            const lineBreakCount = target.includes('\n') ? target.match(/\n/g).length : 0;
            return {
                text: newSelectedText,
                selection: {
                    start: option.tabMapValue,
                    end: option.tabMapValue * (lineBreakCount + 1) + target.length,
                },
            };
        case 'unordered':
            return createTextDecorated(decorateList('unordered', target), true);
        case 'order':
            return createTextDecorated(decorateList('order', target), true);
        case 'hr':
            return createTextDecorated('---', true);
        case 'table':
            return {
                text: decorateTableText(option),
                newBlock: true,
            };
        case 'image':
            // eslint-disable-next-line no-case-declarations
            let imageText = `![${target || option.target}](${option.imageUrl || ''})\n`;
            if (option.classNames) {
                imageText = addClassNames(imageText, option.classNames);
            }
            return {
                text: imageText,
                selection: {
                    start: 2,
                    end: (target || option.target).length + 2,
                },
            };
        case 'link':
            return {
                text: `[${target || option.target}](${option.linkUrl || ''})`,
                selection: {
                    start: 1,
                    end: target.length + 1,
                },
            };
    }
    return {
        text: target,
        selection: {
            start: 0,
            end: target.length,
        },
    };
}
export default getDecorated;
