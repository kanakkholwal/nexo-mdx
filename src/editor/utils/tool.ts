import { KeyboardEventCondition } from '@editor/share/var';

export function deepClone<T>(obj: T): T {
  if (!obj || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item)) as T;
  }

  const result: Partial<T> = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      result[key] = (value && typeof value === 'object')
        ? deepClone(value)
        : value;
    }
  }

  return result as T;
}

export function isEmpty(value: unknown): boolean {
  return value === undefined || value === null || value === '';
}

export function isPromise(obj: unknown): obj is Promise<unknown> {
  return obj instanceof Promise ||
    (obj !== null &&
      typeof obj === 'object' &&
      'then' in obj &&
      typeof obj.then === 'function');
}

export function repeat(str: string, num: number): string {
  return str.repeat(Math.max(0, num));
}

export function isKeyMatch(
  event: React.KeyboardEvent<HTMLDivElement>,
  cond: KeyboardEventCondition
): boolean {
  const { withKey, keyCode, key, aliasCommand } = cond;
  const e = {
    ctrlKey: event.ctrlKey,
    metaKey: event.metaKey,
    altKey: event.altKey,
    shiftKey: event.shiftKey,
    keyCode: event.keyCode,
    key: event.key,
  };

  if (aliasCommand) {
    e.ctrlKey = e.ctrlKey || e.metaKey;
  }

  if (withKey && withKey.length > 0) {
    for (const it of withKey) {
      if (!(it in e) || !e[it as keyof typeof e]) {
        return false;
      }
    }
  } else if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
    return false;
  }

  return e.key ? e.key === key : e.keyCode === keyCode;
}

interface LineAndColResult {
  line: number;
  col: number;
  beforeText: string;
  afterText: string;
  curLine: string;
  prevLine: string | null;
  nextLine: string | null;
}

export function getLineAndCol(text: string, pos: number): LineAndColResult {
  const lines = text.split('\n');
  const beforeLines = text.slice(0, pos).split('\n');
  const line = beforeLines.length;
  const col = beforeLines[beforeLines.length - 1]?.length || 0
  const curLine = lines[line - 1]!
  const prevLine:string = line > 1 ? lines[line - 2]! : "";
  const nextLine:string = line < lines.length ? lines[line]! : "";

  return {
    line,
    col,
    beforeText: text.slice(0, pos),
    afterText: text.slice(pos),
    curLine,
    prevLine,
    nextLine,
  };
}