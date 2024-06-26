function mergeObject(obj1, obj2) {
    const result = {};
    Object.keys(obj1).forEach(k => {
        if (typeof obj2[k] === 'undefined') {
            result[k] = obj1[k];
            return;
        }
        if (typeof obj2[k] === 'object') {
            if (Array.isArray(obj2[k])) {
                result[k] = [...obj2[k]];
            }
            else {
                result[k] = mergeObject(obj1[k], obj2[k]);
            }
            return;
        }
        result[k] = obj2[k];
    });
    return result;
}
export default function (defaultConfig, ...configs) {
    let res = { ...defaultConfig };
    configs.forEach(conf => {
        // only object
        if (typeof conf !== 'object') {
            return;
        }
        res = mergeObject(res, conf);
    });
    return res;
}
