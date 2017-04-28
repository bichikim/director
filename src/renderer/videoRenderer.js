import _ from 'lodash';
import Renderer from './renderer';
const PIXI = require('pixi.js');
export default class VideoRenderer extends Renderer {


    _add(logic) {
        if (_.isObject(logic)) {
            this._resourceAssembler(logic);
            if (_.isString(logic.resource)) {
                let displayObject = null,
                    texture = PIXI.Texture.fromVideo(logic.resource);
                VideoRenderer._setVideo(logic, texture.baseTexture.source);
                displayObject = this._makeDisplayObject(logic, texture);
                displayObject = this._setStatus(logic, displayObject);
                this._stage.addChild(displayObject);
            }
        }
    }

    static _setVideo(logic, videoSource) {
        if (_.isObject(logic)) {
            if (_.isBoolean(logic.loop)) {
                videoSource.lopp = logic.loop;
            } else {
                videoSource.loop = true;
            }
        }
    }
}