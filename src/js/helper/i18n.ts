import * as i18next from 'i18next';
import * as Detector from 'i18next-browser-languagedetector';

/**
 * Supported languages.
 */
export enum SupportedLanguages {
    EN = "en",
    JA = "ja"
}

/**
 * Default language.
 * This is fallback when user required unsupported language.
 *
 * @type {SupportedLanguages}
 */
export const DEFAULT_LANGUAGE = SupportedLanguages.EN;

/**
 * Single instance to be set with {@link initI18n}.
 *
 * @type {i18next.i18n}
 */
let i18n: i18next.i18n = null;

/**
 * Initialize i18next module.
 *
 * @param {i18next.Resource} resources
 * @param {i18next.InitOptions} options
 * @param {i18next.Callback} callback
 */
export function initI18n(resources: i18next.Resource,
                         options?: i18next.InitOptions,
                         callback?: i18next.Callback): void {

    const opts = Object.assign({}, {
        fallbackLng: DEFAULT_LANGUAGE,
        debug: false,
        resources,
    }, options);

    i18n = i18next
        .use(Detector)
        .init(opts, callback);
}

/**
 * Get message resource with provide key.
 *
 * @param key
 * @param options
 * @return {string}
 * @see i18n#t
 */
export function t(key, options?): string {
    return i18n.t(key, options);
}

/**
 * Changes the language.
 *
 * @param {SupportedLanguages} lng
 * @param {i18next.Callback} callback
 * @see i18next#changeLanguage
 */
export function changeLanguage(lng: SupportedLanguages, callback?: i18next.Callback): void {
    i18n.changeLanguage(lng, callback);
}

/**
 * Return the current detected or set language.
 *
 * @see i18n#language
 * @return {SupportedLanguages}
 */
export function getCurrentLanguage(): SupportedLanguages {
    // convert string to enum.
    for (const lang in SupportedLanguages) {
        if (SupportedLanguages[lang] === i18n.language) {
            return (<any>SupportedLanguages)[lang];
        }
    }

    // not found from supported.
    return DEFAULT_LANGUAGE;
}
