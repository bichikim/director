import _ from 'lodash';
import Renderer from './renderer';
const PIXI = require('pixi.js');
export default class TextRenderer extends Renderer {

    constructor(director) {
        super(director);
        this._data = director.data;
    }

    _add(logic) {
        if (_.isObject(logic)) {
            if (_.isString(logic.text)) {
                let displayObject = this._makeDisplayObject(logic);
                displayObject = this._setStatus(logic, displayObject);
                this._stage.addChild(displayObject);
            }
        }
    }

    _makeDisplayObject(logic) {
        return new PIXI.Text(this._addDataToText(logic.text), TextRenderer._textStyle(logic));
    }

    _setWatch(displayObject, logic) {
        if (_.isBoolean(logic.watch) && logic.watch) {
            this._ticker.add(() => {
                displayObject.text = this._addDataToText(logic.text);
            });
        }
        super._setWatch(displayObject, logic);
    }

    _addDataToText(text) {
        let returnText = text;
        if (_.isObject(this._data.me)) {
            returnText = TextRenderer._addData(returnText, this._data.me.name, '-myName');
        }
        if (_.isArray(this._data.sideCount)) {
            returnText = TextRenderer._addData(returnText, this._data.sideCount, '-sideCount');
        }
        return returnText;
    }

    //eslint-disable-next-line class-methods-use-this
    _makePosition(displayObject, itemLogic) {
        if (_.isObject(itemLogic)) {
            if (_.isNumber(itemLogic.x)) {
                displayObject.x = itemLogic.x;
            }
            if (_.isNumber(itemLogic.y)) {
                displayObject.y = itemLogic.y;
            }
        }
        if (_.isObject(itemLogic.style)) {
            if (_.isString(itemLogic.style.align)) {
                if (itemLogic.style.align === 'center') {
                    //eslint-disable-next-line no-magic-numbers
                    displayObject.x = itemLogic.x - (displayObject.width / 2);
                }
            }
        }
    }

    static _addData(text, data, identifier) {
        const hasIdentifierIndex = 2,
            parts = text.split(identifier);

        if (parts.length < hasIdentifierIndex) {
            return text;
        }

        if (_.isArray(data)) {
            let index = Number(text.charAt(0));
            if (_.isNumber(index)) {
                return `${parts.shift()}${data[index]}${(parts.shift()).substring(1)}`
            }
        }
        return `${parts.shift()}${data}${parts.shift()}`
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
                    wordWrapWidth: _.isNumber(style.wordWrapWidth) ? style.wordWrapWidth : null,
                });
            }
        }
    }

}