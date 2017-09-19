import Button from "./Button";

import {loadTexture} from "../../../helper/AssetLoader";

import {Ids} from '../../../resources/image';

class GameStartButton extends Button {
    constructor() {
        super(loadTexture(Ids.BUTTON_GAME_START));
    }
}

export default GameStartButton;
