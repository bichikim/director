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
        this._ticker = this._director.ticker;
    }

    _resourceAssembler(itemLogic) {
        if (_.isNumber(itemLogic.resource)) {
            itemLogic.resource = this._resourceNumberToUrl(itemLogic.resource);
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

    _add(logic) {
        if (_.isObject(logic)) {
            this._resourceAssembler(logic);
            if (_.isString(logic.resource)) {
                this._resourceLoader.getResource(logic.resource, this._loaded.bind(this));
            }
        }
    }

    _loaded(resource) {
        _.forEach(this._logicArray, (logic) => {
            if (logic.resource === resource.name) {
                let displayObject = this._makeDisplayObject(logic, resource.texture);
                displayObject = this._setStatus(logic, displayObject);
                this._stage.addChild(displayObject);
            }
        });
    }

//eslint-disable-next-line class-methods-use-this
    _makeDisplayObject(logic, texture) {
        return new PIXI.Sprite(texture);
    }

    _setStatus(logic, displayObject) {
        this._setSize(displayObject, logic);
        this._makePosition(displayObject, logic);
        this._setWatch(displayObject, logic);
        this._setButton(displayObject, logic);
        return displayObject;
    }

    _setSize(displayObject, itemLogic) {
        if (_.isObject(itemLogic)) {
            if (_.isNumber(itemLogic.width)) {
                displayObject.width = itemLogic.width;
            }
            if (_.isNumber(itemLogic.height)) {
                displayObject.height = itemLogic.height;
            }
        }
    }

    _makePosition(displayObject, itemLogic) {
        if (_.isObject(itemLogic)) {
            if (_.isNumber(itemLogic.x)) {
                displayObject.x = itemLogic.x;
            }
            if (_.isNumber(itemLogic.y)) {
                displayObject.y = itemLogic.y;
            }
        }
    }

    _setButton(displayObject, itemLogic) {
        displayObject.buttonMode = false;
        displayObject.interactive = true;
        if (_.isObject(itemLogic.on)) {
            Button.make(displayObject, itemLogic.on, this._action);
        }
    }

    _setWatch(displayObject, logic) {
        if (_.isBoolean(logic.watch) && logic.watch) {
            this._ticker.add(() => {
                this._setSize(displayObject, logic);
                this._makePosition(displayObject, logic);
            });
        }
    }
}