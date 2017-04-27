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

var TextRenderer = function (_Renderer) {
    _inherits(TextRenderer, _Renderer);

    function TextRenderer() {
        _classCallCheck(this, TextRenderer);

        return _possibleConstructorReturn(this, (TextRenderer.__proto__ || Object.getPrototypeOf(TextRenderer)).apply(this, arguments));
    }

    _createClass(TextRenderer, [{
        key: '_makeDisplayObject',
        value: function _makeDisplayObject(itemLogic) {
            var displayObject = new PIXI.Text(itemLogic.text, TextRenderer._textStyle(itemLogic));
            _renderer2.default._makeSize(displayObject, itemLogic);
            _renderer2.default._makePosition(displayObject, itemLogic);
            this._setButton(displayObject, itemLogic);
            return displayObject;
        }
    }, {
        key: '_add',
        value: function _add(logic) {
            if (_lodash2.default.isObject(logic)) {
                if (_lodash2.default.isString(logic.text)) {
                    this._stage.addChild(this._makeDisplayObject(logic));
                }
            }
        }
    }], [{
        key: '_textStyle',
        value: function _textStyle(logic) {
            if (_lodash2.default.isObject(logic)) {
                if (_lodash2.default.isObject(logic.style)) {
                    var style = logic.style;

                    return new PIXI.TextStyle({
                        fontFamily: _lodash2.default.isString(style.fontFamily) ? style.fontFamily : 'Arial',
                        //eslint-disable-next-line no-magic-numbers
                        fontSize: _lodash2.default.isNumber(style.fontSize) ? style.fontSize : 30,
                        fontStyle: _lodash2.default.isNumber(style.fontStyle) ? style.fontStyle : 'normal',
                        fontWeight: _lodash2.default.isString(style.fontWeight) ? style.fontWeight : 'normal',
                        fill: _lodash2.default.isString(style.fill) || _lodash2.default.isArray(style.fill) ? style.fill : '#000000',
                        stroke: _lodash2.default.isString(style.fontWeight) ? style.fontWeight : null,
                        strokeThickness: _lodash2.default.isNumber(style.strokeThickness) ? style.strokeThickness : null,
                        dropShadow: _lodash2.default.isBoolean(style.dropShadow) ? style.dropShadow : null,
                        dropShadowColor: _lodash2.default.isString(style.dropShadowColor) ? style.dropShadowColor : null,
                        dropShadowBlur: _lodash2.default.isNumber(style.dropShadowBlur) ? style.dropShadowBlur : null,
                        dropShadowAngle: _lodash2.default.isNumber(style.dropShadowAngle) ? style.dropShadowAngle : null,
                        dropShadowDistance: _lodash2.default.isNumber(style.dropShadowDistance) ? style.dropShadowDistanc : null,
                        wordWrap: _lodash2.default.isBoolean(style.wordWrap) ? style.wordWrap : null,
                        wordWrapWidth: _lodash2.default.isNumber(style.fontStyle) ? style.fontStyle : null
                    });
                }
            }
        }
    }]);

    return TextRenderer;
}(_renderer2.default);

exports.default = TextRenderer;