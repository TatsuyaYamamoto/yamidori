import {Container, Texture, TextStyleOptions, Text} from 'pixi.js';

const style: TextStyleOptions = {};

class BrandLogoText extends Text {
    constructor(text: string) {
        super(text, style);
        this.anchor.set(0.5, 1);
    }
}

export default BrandLogoText;
