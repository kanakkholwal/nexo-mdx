import { KeyboardEventCondition } from '@/editor/share/var';
export declare function deepClone<T>(obj: T): T;
export declare function isEmpty(value: unknown): boolean;
export declare function isPromise(obj: unknown): obj is Promise<unknown>;
export declare function repeat(str: string, num: number): string;
export declare function isKeyMatch(event: React.KeyboardEvent<HTMLDivElement>, cond: KeyboardEventCondition): boolean;
interface LineAndColResult {
    line: number;
    col: number;
    beforeText: string;
    afterText: string;
    curLine: string;
    prevLine: string | null;
    nextLine: string | null;
}
export declare function getLineAndCol(text: string, pos: number): LineAndColResult;
export {};
