import _ from 'lodash';
import Assembler from 'bichi-assembler';
import elements_config from './config/elements';
import RenderAdapter from './renderAdapter';
import ResourceLoader from './resourceLoader';


export default class Director {

    constructor(width, height, logic, options) {
        let rendererOption = {};
        this._resourceLoader = new ResourceLoader();
        if (_.isObject(options)) {
            if (_.isObject(options.elements)) {
                this._elements = Assembler.make(elements_config, options.elements);
            } else {
                this._elements = elements_config;
            }
            if (_.isObject(options.renderer)) {
                rendererOption = options.renderer;
            }
        }
        this._app = new RenderAdapter(width, height, rendererOption);
        if (_.isObject(options)) {
            if (_.isElement(options.screen)) {
                options.screen.appendChild(this.view);
            }
        }
        if(_.isObject(logic)){
            if(_.isArray(logic.resource)){
                this._load(logic.resource);
            }
        }
    }

    get stage() {
        return this._app.stage;
    }

    get view() {
        return this._app.view;
    }

    get dataURL() {
        return this._app.dataURL;
    }

    _load(resources){
        this._resourceLoader.addMany(resources);
        this._resourceLoader.load();
    }
}