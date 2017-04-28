import _ from 'lodash';
import elements_config from './config/elements';
import displays_config from './config/displays';
import renderers_config from './config/renderers';
import urls_config from './config/urls';
import ResourceLoader from './loader/resourceLoader';
import Assembler from 'bichi-assembler';
import Waiter from 'bichi-waiter';
const PIXI = require('pixi.js');

export default class Director {

    constructor(width, height, logic, options) {
        this._elements = null;
        this._displayLogic = null;
        this._resources = null;
        this._urls = null;
        this._correntDisplayNumber = 0;
        this._renderers = {};
        this._waiter = new Waiter();
        this._resourceLoader = new ResourceLoader();
        this._app = new PIXI.Application(width, height);
        this._setLogic(logic);
        this._setOptions(options);
        this._waiter.bind(this);
    }

    get stage() {
        return this._app.stage;
    }

    get resourceLoader() {
        return this._resourceLoader;
    }

    get view() {
        return this._app.view;
    }

    get dataURL() {
        return this._app.dataURL;
    }

    get action() {
        return {
            display: this.display.bind(this),
            effect: (displayObject, number) => {
                window.console.log(displayObject, number);
            },
            share: () => {
                window.console.log('this is share!');
            },
            side: (side) => {
                window.console.log(`this is side  ${side}`);
            },
        }
    }

    get resourceNumberToUrl() {
        const resources = this._resources;
        return (number) => {
            return resources[number];
        };
    }

    display(displayNumber) {
        this.clear();
        this._correntDisplayNumber = displayNumber;
        const myDisplayLogic = this._displayLogic[displayNumber];
        this._waiter.arguments([myDisplayLogic]);
        this._waiter.execute({});
    }

    clear() {
        _.forEach(this._renderers, (renderer) => {
            renderer.clear();
        });
    }

    resize(element) {
        this.view.style.width = `${element.clientWidth}px`;
    }

    _setOptions(options) {
        let rendererConfig = null;
        if (_.isObject(options)) {
            if (_.isObject(options.elements)) {
                this._elements = Assembler.make(elements_config, options.elements);
            } else {
                this._elements = elements_config;
            }
            if (_.isObject(options.urls)) {
                this._urls = Assembler.make(urls_config, options.urls);
            } else {
                this._urls = urls_config;
            }
            if (_.isObject(options.displays)) {
                this._waiter.saveMany(Assembler.make(displays_config, options.displays));
            } else {
                this._waiter.saveMany(displays_config);
            }
            //set renderers
            if (_.isObject(options.renderers)) {
                rendererConfig = Assembler.make(renderers_config, options.renderers);
            } else {
                rendererConfig = renderers_config;
            }
            _.forEach(rendererConfig, (Renderer, key) => {
                this._renderers[key] = new Renderer(this);
            });
            //set screen
            if (_.isElement(options.screen)) {
                options.screen.appendChild(this.view);
            }
        }
    }

    _setLogic(logic) {
        if (_.isObject(logic)) {
            if (_.isArray(logic.displays)) {
                this._displayLogic = logic.displays;
            } else {
                throw new Error('Logic must have displays as array');
            }
            if (_.isArray(logic.resources)) {
                this._resources = logic.resources;
                this._resourceLoad(this._resources);
            }
        }
    }

    _resourceLoad(resources) {
        this._resourceLoader.addMany(resources);
        this._resourceLoader.load();
    }
}