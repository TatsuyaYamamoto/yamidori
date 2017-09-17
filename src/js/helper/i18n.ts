import * as i18next from 'i18next';
import * as i18nextLngDetector from 'i18next-browser-languagedetector';

import resources from '../resources/string';

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
 * Initialize i18next module.
 *
 * @param {i18next.InitOptions} options
 * @param {i18next.Callback} callback
 * @return {i18next.i18n}
 */
export function initI18n(options?: i18next.InitOptions, callback?: i18next.Callback): i18next.i18n {
    return i18next
        .use(i18nextLngDetector)
        .init({
            fallbackLng: DEFAULT_LANGUAGE,
            debug: false,
            resources
        });
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
    return i18next.t(key, options);
}

/**
 * Changes the language.
 *
 * @param {SupportedLanguages} lng
 * @param {i18next.Callback} callback
 * @see i18next#changeLanguage
 */
export function changeLanguage(lng: SupportedLanguages, callback?: i18next.Callback): void {
    i18next.changeLanguage(lng, callback);
}

/**
 * Return the current detected or set language.
 *
 * @see i18n#language
 * @return {SupportedLanguages}
 */
export function getCurrentLanguage(): SupportedLanguages {
    const lang = SupportedLanguages[i18next.language];
    return lang || DEFAULT_LANGUAGE;
}
