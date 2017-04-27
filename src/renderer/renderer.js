import _ from 'lodash';
import Button from '../button';
const PIXI = require('pixi.js');
export default class Renderer {
    constructor(director) {
        this._director = director;
        this._stage = new PIXI.Container();
        this._director.stage.addChild(this._stage);
        this._logicArray = null;
        this._resourceLoader = this._director.resourceLoader;
        this._resourceNumberToUrl = this._director.resourceNumberToUrl;
        this._action = this._director.action;
    }

    _resourceAssembler(itemLogic) {
        if (_.isNumber(itemLogic.resource)) {
            itemLogic.resource = this._resourceNumberToUrl(itemLogic.resource);
        }
    }

    _makeDisplayObject(itemLogic, texture) {
        const displayObject = new PIXI.Sprite(texture);
        Renderer._makeSize(displayObject, itemLogic);
        Renderer._makePosition(displayObject, itemLogic);
        this._setButton(displayObject, itemLogic);
        return displayObject;
    }

    static _makeSize(displayObject, itemLogic) {
        if (_.isObject(itemLogic)) {
            if (_.isNumber(itemLogic.width)) {
                displayObject.width = itemLogic.width;
            }
            if (_.isNumber(itemLogic.height)) {
                displayObject.height = itemLogic.height;
            }
        }
    }

    static _makePosition(displayObject, itemLogic) {
        if (_.isObject(itemLogic)) {
            if (_.isNumber(itemLogic.x)) {
                displayObject.x = itemLogic.x;
            }
            if (_.isNumber(itemLogic.y)) {
                displayObject.y = itemLogic.y;
            }
        }
    }

    get stage() {
        return this._stage;
    }

    clear() {
        return this._stage.removeChildren();
    }

    render(logicArray) {
        if (_.isArray(logicArray)) {
            this._logicArray = logicArray;
            _.forEach(logicArray, (logic) => {
                this._add(logic);
            });
            this._resourceLoader.load();
        }
    }

    _setButton(displayObject, itemLogic) {
        displayObject.buttonMode = false;
        displayObject.interactive = true;
        if (_.isObject(itemLogic.on)) {
            Button.make(displayObject, itemLogic.on, this._action);
        }
    }

    _loaded(resource) {
        _.forEach(this._logicArray, (logic) => {
            if (logic.resource === resource.name) {
                this._stage.addChild(this._makeDisplayObject(logic, resource.texture));
            }
        });
    }

    _add(logic) {
        if (_.isObject(logic)) {
            this._resourceAssembler(logic);
            if (_.isString(logic.resource)) {
                this._resourceLoader.getResource(logic.resource, this._loaded.bind(this));
            }
        }
    }
}