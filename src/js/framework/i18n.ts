import * as i18next from 'i18next';
import * as Detector from 'i18next-browser-languagedetector';

/**
 * Supported languages.
 */
export interface SupportedLanguages {
    [language: string]: string;
}

/**
 * Languages that this i18n module supports.
 *
 * @type {SupportedLanguages}
 * @private
 */
let supportedLanguages: SupportedLanguages = null;

/**
 * Default language.
 * This is fallback when user required unsupported language.
 *
 * @type {string}
 * @private
 */
let defaultLanguage: string = null;

/**
 * Single instance to be set with {@link initI18n}.
 *
 * @type {i18next.i18n}
 * @private
 */
let i18n: i18next.i18n = null;

/**
 * Initialize i18next module.
 *
 * @param {i18next.Resource} resources
 * @param {SupportedLanguages} supportedLangs
 * @param {string} defaultLang
 * @param {i18next.InitOptions} options
 * @param {i18next.Callback} callback
 */
export function initI18n(resources: i18next.Resource,
                         supportedLangs: SupportedLanguages,
                         defaultLang: string,
                         options?: i18next.InitOptions,
                         callback?: i18next.Callback): void {

    supportedLanguages = supportedLangs;
    defaultLanguage = defaultLang;

    const opts = Object.assign({}, {
        fallbackLng: defaultLanguage,
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
 * @param {string} language
 * @param {i18next.Callback} callback
 * @see i18next#changeLanguage
 */
export function changeLanguage(language: string, callback?: i18next.Callback): void {
    if (isDefinedLanguage(language)) {
        i18n.changeLanguage(language, callback);
    } else {
        i18n.changeLanguage(defaultLanguage, callback);
    }
}

/**
 * Return the current detected or set language.
 *
 * @see i18n#language
 * @return {string}
 */
export function getCurrentLanguage(): string {
    return isDefinedLanguage(i18n.language) ?
        i18n.language :
        defaultLanguage;
}

/**
 * Return true if targetLanguage is prop that {@link supportedLanguages} has.
 *
 * @param {string} targetLanguage
 * @returns {boolean}
 * @private
 */
function isDefinedLanguage(targetLanguage: string): boolean {
    for (const key in supportedLanguages) {
        if (supportedLanguages[key] === targetLanguage) {
            return true;
        }
    }

    return false;
}