import _ from 'lodash';
import Renderer from './renderer';
const PIXI = require('pixi.js');
export default class RectangleRenderer extends Renderer {

    _makeDisplayObject(itemLogic) {
        this._resourceAssembler(itemLogic);
        const displayObject = new PIXI.Graphics();

        displayObject.lineStyle(0, 0x000000, 0);
        if (_.isObject(itemLogic)) {
            let alpha = 0,
                fill = '0x000000';
            if (_.isString(itemLogic.fill)) {
                fill = String(itemLogic.fill);
            }
            if (_.isString(itemLogic.alpha)) {
                alpha = Number(itemLogic.alpha);
            }
            displayObject.beginFill(fill, alpha);
            if (_.isNumber(itemLogic.width) && _.isNumber(itemLogic.height)) {
                displayObject.drawRect(0, 0, itemLogic.width, itemLogic.height);
            }
            if (_.isNumber(itemLogic.x)) {
                displayObject.x = itemLogic.x;
            }
            if (_.isNumber(itemLogic.y)) {
                displayObject.y = itemLogic.y;
            }

        }
        this._setButton(displayObject, itemLogic);
        return displayObject;
    }

    _add(logic) {
        if (_.isObject(logic)) {
            this._stage.addChild(this._makeDisplayObject(logic));
        }
    }
}