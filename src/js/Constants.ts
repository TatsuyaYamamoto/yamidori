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
