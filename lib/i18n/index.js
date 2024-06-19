import { globalEmitter } from '@/editor/share/emitter';
import enUS from './lang/en-US';
class I18n {
    constructor() {
        Object.defineProperty(this, "langs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: { enUS }
        });
        Object.defineProperty(this, "current", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'enUS'
        });
        this.setUp();
    }
    setUp() {
        if (typeof window === 'undefined') {
            return;
        }
        let locale = 'enUS';
        // Detect language
        if (navigator.language) {
            const it = navigator.language.split('-');
            locale = it?.[0] || "enUS";
            if (it.length !== 1) {
                locale += it[it.length - 1]?.toUpperCase();
            }
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        if (navigator.browserLanguage) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const it = navigator.browserLanguage.split('-');
            locale = it[0];
            if (it[1]) {
                locale += it[1].toUpperCase();
            }
        }
        if (this.current !== locale && this.isAvailable(locale)) {
            this.current = locale;
            globalEmitter.emit(globalEmitter.EVENT_LANG_CHANGE, this, locale, this.langs[locale]);
        }
    }
    isAvailable(langName) {
        return typeof this.langs[langName] !== 'undefined';
    }
    add(langName, lang) {
        this.langs[langName] = lang;
    }
    setCurrent(langName) {
        if (!this.isAvailable(langName)) {
            throw new Error(`Language ${langName} is not exists`);
        }
        if (this.current !== langName) {
            this.current = langName;
            globalEmitter.emit(globalEmitter.EVENT_LANG_CHANGE, this, langName, this.langs[langName]);
        }
    }
    get(key, placeholders) {
        let str = this.langs[this.current]?.[key] || '';
        if (placeholders) {
            Object.keys(placeholders).forEach(k => {
                if (placeholders[k]) {
                    str = str.replace(new RegExp(`\\{${k}\\}`, 'g'), placeholders[k]);
                }
            });
        }
        return str;
    }
    getCurrent() {
        return this.current;
    }
}
const i18n = new I18n();
export default i18n;
