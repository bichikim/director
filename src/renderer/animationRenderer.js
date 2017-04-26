import Renderer from './renderer';
import _ from 'lodash';
const PIXI = require('pixi.js');
export default class AnimationRenderer extends Renderer {
    _makeDisplayObject(itemLogic, texture) {
        let displayObject = null;
        if (_.isObject(itemLogic)) {
            if (_.isNumber(itemLogic.width) && _.isNumber(itemLogic.height)) {

                displayObject = new PIXI.extras.AnimatedSprite(AnimationRenderer._makeTexture(texture, itemLogic.width, itemLogic.height));
                displayObject.gotoAndPlay(0);
            } else {
                throw new Error('Need width and height');
            }
            if (_.isNumber(itemLogic.x)) {
                displayObject.x = itemLogic.x;
            }
            if (_.isNumber(itemLogic.y)) {
                displayObject.y = itemLogic.y;
            }
            this._setButton(displayObject, itemLogic);
        }
        return displayObject;
    }

    static _makeTexture(baseTexture, width, height) {
        const baseHeight = baseTexture.height,
            baseWidth = baseTexture.width,
            textures = [];
        let currentX = 0,
            currentY = 0;
        while (currentY < baseHeight) {
            while (currentX < baseWidth) {
                let textureHeight = baseHeight - currentY,
                    textureWidth = baseWidth - currentX;

                if (textureWidth > width) {
                    textureWidth = width;
                }
                if (textureHeight > height) {
                    textureHeight = height
                }
                //console.log(textureWidth, textureHeight);
                textures.push(new PIXI.Texture(baseTexture, new PIXI.Rectangle(currentX, currentY, textureWidth, textureHeight)));
                currentX += width;
            }
            currentX = 0;
            currentY += height;
        }
        return textures;
    }

}