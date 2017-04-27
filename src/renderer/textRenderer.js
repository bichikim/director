import _ from 'lodash';
import Renderer from './renderer';
const PIXI = require('pixi.js');
export default class TextRenderer extends Renderer {


    _makeDisplayObject(itemLogic) {
        const displayObject = new PIXI.Text(itemLogic.text, TextRenderer._textStyle(itemLogic));
        Renderer._makeSize(displayObject, itemLogic);
        Renderer._makePosition(displayObject, itemLogic);
        this._setButton(displayObject, itemLogic);
        return displayObject;
    }


    static _textStyle(logic) {
        if (_.isObject(logic)) {
            if (_.isObject(logic.style)) {
                const {style} = logic;
                return new PIXI.TextStyle({
                    fontFamily: _.isString(style.fontFamily) ? style.fontFamily : 'Arial',
                    //eslint-disable-next-line no-magic-numbers
                    fontSize: _.isNumber(style.fontSize) ? style.fontSize : 30,
                    fontStyle: _.isNumber(style.fontStyle) ? style.fontStyle : 'normal',
                    fontWeight: _.isString(style.fontWeight) ? style.fontWeight : 'normal',
                    fill: _.isString(style.fill) || _.isArray(style.fill) ? style.fill : '#000000',
                    stroke: _.isString(style.fontWeight) ? style.fontWeight : null,
                    strokeThickness: _.isNumber(style.strokeThickness) ? style.strokeThickness : null,
                    dropShadow: _.isBoolean(style.dropShadow) ? style.dropShadow : null,
                    dropShadowColor: _.isString(style.dropShadowColor) ? style.dropShadowColor : null,
                    dropShadowBlur: _.isNumber(style.dropShadowBlur) ? style.dropShadowBlur : null,
                    dropShadowAngle: _.isNumber(style.dropShadowAngle) ? style.dropShadowAngle : null,
                    dropShadowDistance: _.isNumber(style.dropShadowDistance) ? style.dropShadowDistanc : null,
                    wordWrap: _.isBoolean(style.wordWrap) ? style.wordWrap : null,
                    wordWrapWidth: _.isNumber(style.fontStyle) ? style.fontStyle : null,
                });
            }
        }
    }

    _add(logic) {
        if (_.isObject(logic)) {
            if (_.isString(logic.text)) {
                this._stage.addChild(this._makeDisplayObject(logic));
            }
        }
    }
}