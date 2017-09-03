/**
 * aspect ratio of the application container.
 *
 * @type {number}
 */
export const ASPECT_RATIO = 16 / 9;

/**
 * Basic width of the application view.
 * This app's assets is draw as premise of this.
 *
 * @type {number}
 */
export const BASIC_IMAGE_WIDTH = 800;

/**
 * Basic height of the application view.
 * This app's assets is draw as premise of this.
 * An alias to {@code BASIC_IMAGE_WIDTH / ASPECT_RATIO}.
 *
 * @type {number}
 */
export const BASIC_IMAGE_HEIGHT = BASIC_IMAGE_WIDTH / ASPECT_RATIO;

/**
 * Skip game count state on game view if true.
 *
 * @type {boolean}
 */
export const SKIP_COUNT_DOWN_FOR_GAME_START = false;

/**
 * Skip brant logo animation on load view if true.
 *
 * @type {boolean}
 */
export const SKIP_BRAND_LOGO_ANIMATION = false;

/**
 * External URLs.
 */
export const URL = {
    YAMIDORI: "http://games.sokontokoro-factory.net/yamidori/",
    TWITTER_HOME_T28: "https://twitter.com/t28_tatsuya",
    TWITTER_HOME_SANZASHI: "https://twitter.com/xxsanzashixx",
    TWITTER_TWEET_PAGE: "https://twitter.com/intent/tweet"
};
