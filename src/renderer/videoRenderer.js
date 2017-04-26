import _ from 'lodash';
import Renderer from './renderer';
const PIXI = require('pixi.js');
export default class VideoRenderer extends Renderer {

    static _setVideo(logic, videoSource){
        if(_.isObject(logic)){
            if(_.isBoolean(logic.loop)){
                videoSource.lopp = logic.loop;
            }else{
                videoSource.loop = true;
            }
        }
    }

    _add(logic) {
        if (_.isObject(logic)) {
            this._resourceAssembler(logic);
            if (_.isString(logic.resource)) {
                let texture = PIXI.Texture.fromVideo(logic.resource);
                VideoRenderer._setVideo(logic, texture.baseTexture.source);
                this._stage.addChild(this._makeDisplayObject(logic, texture));
            }
        }
    }
}