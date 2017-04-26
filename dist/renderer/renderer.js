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
    }

    _createClass(Renderer, [{
        key: '_resourceAssembler',
        value: function _resourceAssembler(itemLogic) {
            if (_lodash2.default.isNumber(itemLogic.resource)) {
                itemLogic.resource = this._resourceNumberToUrl(itemLogic.resource);
            }
        }
    }, {
        key: '_makeDisplayObject',
        value: function _makeDisplayObject(itemLogic, texture) {
            var displayObject = new PIXI.Sprite(texture);
            if (_lodash2.default.isObject(itemLogic)) {
                if (_lodash2.default.isNumber(itemLogic.x)) {
                    displayObject.x = itemLogic.x;
                }
                if (_lodash2.default.isNumber(itemLogic.y)) {
                    displayObject.y = itemLogic.y;
                }
                if (_lodash2.default.isNumber(itemLogic.width)) {
                    displayObject.width = itemLogic.width;
                }
                if (_lodash2.default.isNumber(itemLogic.height)) {
                    displayObject.height = itemLogic.height;
                }
            }
            this._setButton(displayObject, itemLogic);
            return displayObject;
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
        key: '_setButton',
        value: function _setButton(displayObject, itemLogic) {
            displayObject.buttonMode = false;
            displayObject.interactive = true;
            if (_lodash2.default.isObject(itemLogic.on)) {
                _button2.default.make(displayObject, itemLogic.on, this._action);
            }
        }
    }, {
        key: '_loaded',
        value: function _loaded(resource) {
            var _this2 = this;

            _lodash2.default.forEach(this._logicArray, function (logic) {
                if (logic.resource === resource.name) {
                    _this2._stage.addChild(_this2._makeDisplayObject(logic, resource.texture));
                }
            });
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
        key: 'stage',
        get: function get() {
            return this._stage;
        }
    }]);

    return Renderer;
}();

exports.default = Renderer;