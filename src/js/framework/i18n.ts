import * as i18next from 'i18next';
import * as Detector from 'i18next-browser-languagedetector';

import config from "./config";

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
 * @param {i18next.InitOptions} options
 * @param {i18next.Callback} callback
 */
export function initI18n(options?: i18next.InitOptions,
                         callback?: i18next.Callback): void {

    const opts = Object.assign({}, {
        fallbackLng: config.defaultLanguage,
        debug: false,
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
        i18n.changeLanguage(config.defaultLanguage, callback);
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
        config.defaultLanguage;
}

/**
 * Return true if targetLanguage is prop that {@link supportedLanguages} has.
 *
 * @param {string} targetLanguage
 * @returns {boolean}
 * @private
 */
function isDefinedLanguage(targetLanguage: string): boolean {
    return config.supportedLanguages.some((l) => l === targetLanguage);
}