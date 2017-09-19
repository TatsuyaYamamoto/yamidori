import Button from "./Button";

import {loadTexture} from "../../../helper/AssetLoader";

import manifest from '../../../resources/image';


class GameRestartButton extends Button {
    constructor() {
        super(loadTexture(manifest.buttonGameRestart));
    }
}

export default GameRestartButton;
