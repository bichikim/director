'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _elements = require('./config/elements');

var _elements2 = _interopRequireDefault(_elements);

var _displays = require('./config/displays');

var _displays2 = _interopRequireDefault(_displays);

var _renderers = require('./config/renderers');

var _renderers2 = _interopRequireDefault(_renderers);

var _urls = require('./config/urls');

var _urls2 = _interopRequireDefault(_urls);

var _resourceLoader = require('./loader/resourceLoader');

var _resourceLoader2 = _interopRequireDefault(_resourceLoader);

var _bichiAssembler = require('bichi-assembler');

var _bichiAssembler2 = _interopRequireDefault(_bichiAssembler);

var _bichiWaiter = require('bichi-waiter');

var _bichiWaiter2 = _interopRequireDefault(_bichiWaiter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PIXI = require('pixi.js');

var Director = function () {
    function Director(width, height, logic, options) {
        _classCallCheck(this, Director);

        this._elements = null;
        this._displayLogic = null;
        this._resources = null;
        this._urls = null;
        this._correntDisplayNumber = 0;
        this._renderers = {};
        this._waiter = new _bichiWaiter2.default();
        this._resourceLoader = new _resourceLoader2.default();
        this._app = new PIXI.Application(width, height);
        this._setLogic(logic);
        this._setOptions(options);
        this._waiter.bind(this);
    }

    _createClass(Director, [{
        key: 'display',
        value: function display(displayNumber) {
            this.clear();
            this._correntDisplayNumber = displayNumber;
            var myDisplayLogic = this._displayLogic[displayNumber];
            this._waiter.arguments([myDisplayLogic]);
            this._waiter.execute({});
        }
    }, {
        key: 'clear',
        value: function clear() {
            _lodash2.default.forEach(this._renderers, function (renderer) {
                renderer.clear();
            });
        }
    }, {
        key: '_setOptions',
        value: function _setOptions(options) {
            var _this = this;

            var rendererConfig = null;
            if (_lodash2.default.isObject(options)) {
                if (_lodash2.default.isObject(options.elements)) {
                    this._elements = _bichiAssembler2.default.make(_elements2.default, options.elements);
                } else {
                    this._elements = _elements2.default;
                }
                if (_lodash2.default.isObject(options.urls)) {
                    this._urls = _bichiAssembler2.default.make(_urls2.default, options.urls);
                } else {
                    this._urls = _urls2.default;
                }
                if (_lodash2.default.isObject(options.displays)) {
                    this._waiter.saveMany(_bichiAssembler2.default.make(_displays2.default, options.displays));
                } else {
                    this._waiter.saveMany(_displays2.default);
                }
                //set renderers
                if (_lodash2.default.isObject(options.renderers)) {
                    rendererConfig = _bichiAssembler2.default.make(_renderers2.default, options.renderers);
                } else {
                    rendererConfig = _renderers2.default;
                }
                _lodash2.default.forEach(rendererConfig, function (Renderer, key) {
                    _this._renderers[key] = new Renderer(_this);
                });
                //set screen
                if (_lodash2.default.isElement(options.screen)) {
                    options.screen.appendChild(this.view);
                }
            }
        }
    }, {
        key: '_setLogic',
        value: function _setLogic(logic) {
            if (_lodash2.default.isObject(logic)) {
                if (_lodash2.default.isArray(logic.displays)) {
                    this._displayLogic = logic.displays;
                } else {
                    throw new Error('Logic must have displays as array');
                }
                if (_lodash2.default.isArray(logic.resources)) {
                    this._resources = logic.resources;
                    this._resourceLoad(this._resources);
                }
            }
        }
    }, {
        key: '_resourceLoad',
        value: function _resourceLoad(resources) {
            this._resourceLoader.addMany(resources);
            this._resourceLoader.load();
        }
    }, {
        key: 'stage',
        get: function get() {
            return this._app.stage;
        }
    }, {
        key: 'resourceLoader',
        get: function get() {
            return this._resourceLoader;
        }
    }, {
        key: 'view',
        get: function get() {
            return this._app.view;
        }
    }, {
        key: 'dataURL',
        get: function get() {
            return this._app.dataURL;
        }
    }, {
        key: 'action',
        get: function get() {
            return {
                display: this.display.bind(this),
                effect: function effect(displayObject, number) {
                    window.console.log(displayObject, number);
                },
                share: function share() {
                    window.console.log('this is share!');
                },
                side: function side(_side) {
                    window.console.log('this is side  ' + _side);
                }
            };
        }
    }, {
        key: 'resourceNumberToUrl',
        get: function get() {
            var resources = this._resources;
            return function (number) {
                return resources[number];
            };
        }
    }]);

    return Director;
}();

exports.default = Director;