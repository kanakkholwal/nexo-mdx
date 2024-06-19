interface Decorated {
    text: string;
    newBlock?: boolean;
    selection?: {
        start: number;
        end: number;
    };
}
/**
 * Get the decorated Markdown text
 * @param target Original text
 * @param type Decoration Type
 * @param option Additional parameters
 * @returns {Decorated}
 */
declare function getDecorated(target: string, type: string, option?: any): Decorated;
export default getDecorated;
