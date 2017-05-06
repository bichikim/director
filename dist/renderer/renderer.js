'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _button = require('../button');

var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PIXI = require('pixi.js');

var Renderer = function () {
    function Renderer(director) {
        _classCallCheck(this, Renderer);

        this._director = director;
        this._stage = new PIXI.Container();
        this._director.stage.addChild(this._stage);
        this._logicArray = null;
        this._resourceLoader = this._director.resourceLoader;
        this._resourceNumberToUrl = this._director.resourceNumberToUrl;
        this._action = this._director.action;
        this._ticker = this._director.ticker;
    }

    _createClass(Renderer, [{
        key: '_resourceAssembler',
        value: function _resourceAssembler(itemLogic) {
            if (_lodash2.default.isNumber(itemLogic.resource)) {
                itemLogic.resource = this._resourceNumberToUrl(itemLogic.resource);
            }
        }
    }, {
        key: 'clear',
        value: function clear() {
            return this._stage.removeChildren();
        }
    }, {
        key: 'render',
        value: function render(logicArray) {
            var _this = this;

            if (_lodash2.default.isArray(logicArray)) {
                this._logicArray = logicArray;
                _lodash2.default.forEach(logicArray, function (logic) {
                    _this._add(logic);
                });
                this._resourceLoader.load();
            }
        }
    }, {
        key: '_add',
        value: function _add(logic) {
            if (_lodash2.default.isObject(logic)) {
                this._resourceAssembler(logic);
                if (_lodash2.default.isString(logic.resource)) {
                    this._resourceLoader.getResource(logic.resource, this._loaded.bind(this));
                }
            }
        }
    }, {
        key: '_loaded',
        value: function _loaded(resource) {
            var _this2 = this;

            _lodash2.default.forEach(this._logicArray, function (logic) {
                if (logic.resource === resource.name) {
                    var displayObject = _this2._makeDisplayObject(logic, resource.texture);
                    displayObject = _this2._setStatus(logic, displayObject);
                    _this2._stage.addChild(displayObject);
                }
            });
        }

        //eslint-disable-next-line class-methods-use-this

    }, {
        key: '_makeDisplayObject',
        value: function _makeDisplayObject(logic, texture) {
            return new PIXI.Sprite(texture);
        }
    }, {
        key: '_setStatus',
        value: function _setStatus(logic, displayObject) {
            this._setSize(displayObject, logic);
            this._makePosition(displayObject, logic);
            this._setWatch(displayObject, logic);
            this._setButton(displayObject, logic);
            return displayObject;
        }
    }, {
        key: '_setSize',
        value: function _setSize(displayObject, itemLogic) {
            if (_lodash2.default.isObject(itemLogic)) {
                if (_lodash2.default.isNumber(itemLogic.width)) {
                    displayObject.width = itemLogic.width;
                }
                if (_lodash2.default.isNumber(itemLogic.height)) {
                    displayObject.height = itemLogic.height;
                }
            }
        }
    }, {
        key: '_makePosition',
        value: function _makePosition(displayObject, itemLogic) {
            if (_lodash2.default.isObject(itemLogic)) {
                if (_lodash2.default.isNumber(itemLogic.x)) {
                    displayObject.x = itemLogic.x;
                }
                if (_lodash2.default.isNumber(itemLogic.y)) {
                    displayObject.y = itemLogic.y;
                }
            }
        }
    }, {
        key: '_setButton',
        value: function _setButton(displayObject, itemLogic) {
            displayObject.buttonMode = false;
            displayObject.interactive = true;
            if (_lodash2.default.isObject(itemLogic.on)) {
                _button2.default.make(displayObject, itemLogic.on, this._action);
            }
        }
    }, {
        key: '_setWatch',
        value: function _setWatch(displayObject, logic) {
            var _this3 = this;

            if (_lodash2.default.isBoolean(logic.watch) && logic.watch) {
                this._ticker.add(function () {
                    _this3._setSize(displayObject, logic);
                    _this3._makePosition(displayObject, logic);
                });
            }
        }
    }, {
        key: 'stage',
        get: function get() {
            return this._stage;
        }
    }]);

    return Renderer;
}();

exports.default = Renderer;