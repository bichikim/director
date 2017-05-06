'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _renderer = require('./renderer');

var _renderer2 = _interopRequireDefault(_renderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PIXI = require('pixi.js');

var RectangleRenderer = function (_Renderer) {
    _inherits(RectangleRenderer, _Renderer);

    function RectangleRenderer() {
        _classCallCheck(this, RectangleRenderer);

        return _possibleConstructorReturn(this, (RectangleRenderer.__proto__ || Object.getPrototypeOf(RectangleRenderer)).apply(this, arguments));
    }

    _createClass(RectangleRenderer, [{
        key: '_makeDisplayObject',
        value: function _makeDisplayObject(itemLogic) {
            this._resourceAssembler(itemLogic);
            var displayObject = new PIXI.Graphics();

            displayObject.lineStyle(0, 0x000000, 0);
            if (_lodash2.default.isObject(itemLogic)) {
                var alpha = 0,
                    fill = '0x000000';
                if (_lodash2.default.isString(itemLogic.fill)) {
                    fill = String(itemLogic.fill);
                }
                if (_lodash2.default.isString(itemLogic.alpha)) {
                    alpha = Number(itemLogic.alpha);
                }
                displayObject.beginFill(fill, alpha);
                if (_lodash2.default.isNumber(itemLogic.width) && _lodash2.default.isNumber(itemLogic.height)) {
                    displayObject.drawRect(0, 0, itemLogic.width, itemLogic.height);
                }
            }
            this._makePosition(displayObject, itemLogic);
            this._setButton(displayObject, itemLogic);
            return displayObject;
        }
    }, {
        key: '_add',
        value: function _add(logic) {
            if (_lodash2.default.isObject(logic)) {
                this._stage.addChild(this._makeDisplayObject(logic));
            }
        }
    }]);

    return RectangleRenderer;
}(_renderer2.default);

exports.default = RectangleRenderer;