import Button from "./Button";

import {loadTexture} from "../../../helper/AssetLoader";

import manifest from '../../../resources/image';

class GameStartButton extends Button {
    constructor() {
        super(loadTexture(manifest.buttonGameStart));
    }
}

export default GameStartButton;
