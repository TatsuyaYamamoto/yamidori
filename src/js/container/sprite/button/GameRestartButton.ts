import Button from "./Button";

import {loadTexture} from "../../../helper/AssetLoader";

import {Ids} from '../../../resources/image';


class GameRestartButton extends Button {
    constructor() {
        super(loadTexture(Ids.BUTTON_GAME_RESTART));
    }
}

export default GameRestartButton;
