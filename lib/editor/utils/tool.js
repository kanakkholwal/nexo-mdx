export function deepClone(obj) {
    if (!obj || typeof obj !== 'object') {
        return obj;
    }
    if (Array.isArray(obj)) {
        return obj.map(item => deepClone(item));
    }
    const result = {};
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const value = obj[key];
            result[key] = (value && typeof value === 'object')
                ? deepClone(value)
                : value;
        }
    }
    return result;
}
export function isEmpty(value) {
    return value === undefined || value === null || value === '';
}
export function isPromise(obj) {
    return obj instanceof Promise ||
        (obj !== null &&
            typeof obj === 'object' &&
            'then' in obj &&
            typeof obj.then === 'function');
}
export function repeat(str, num) {
    return str.repeat(Math.max(0, num));
}
export function isKeyMatch(event, cond) {
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
            if (!(it in e) || !e[it]) {
                return false;
            }
        }
    }
    else if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return false;
    }
    return e.key ? e.key === key : e.keyCode === keyCode;
}
export function getLineAndCol(text, pos) {
    const lines = text.split('\n');
    const beforeLines = text.slice(0, pos).split('\n');
    const line = beforeLines.length;
    const col = beforeLines[beforeLines.length - 1]?.length || 0;
    const curLine = lines[line - 1];
    const prevLine = line > 1 ? lines[line - 2] : "";
    const nextLine = line < lines.length ? lines[line] : "";
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
