'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _renderer = require('./renderer');

var _renderer2 = _interopRequireDefault(_renderer);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PIXI = require('pixi.js');

var AnimationRenderer = function (_Renderer) {
    _inherits(AnimationRenderer, _Renderer);

    function AnimationRenderer() {
        _classCallCheck(this, AnimationRenderer);

        return _possibleConstructorReturn(this, (AnimationRenderer.__proto__ || Object.getPrototypeOf(AnimationRenderer)).apply(this, arguments));
    }

    _createClass(AnimationRenderer, [{
        key: '_makeDisplayObject',
        value: function _makeDisplayObject(itemLogic, texture) {
            var displayObject = null;
            if (_lodash2.default.isObject(itemLogic)) {
                if (_lodash2.default.isNumber(itemLogic.partWidth) && _lodash2.default.isNumber(itemLogic.partHeight)) {
                    displayObject = new PIXI.extras.AnimatedSprite(AnimationRenderer._makeTexture(texture, itemLogic.partWidth, itemLogic.partHeight));
                    displayObject.gotoAndPlay(0);
                } else {
                    throw new Error('Need width and height');
                }
                _renderer2.default._makeSize(displayObject, itemLogic);
                _renderer2.default._makePosition(displayObject, itemLogic);
                this._setButton(displayObject, itemLogic);
            }
            return displayObject;
        }
    }], [{
        key: '_makeTexture',
        value: function _makeTexture(baseTexture, width, height) {
            var baseHeight = baseTexture.height,
                baseWidth = baseTexture.width,
                textures = [];
            var currentX = 0,
                currentY = 0;
            while (currentY < baseHeight) {
                while (currentX < baseWidth) {
                    var textureHeight = baseHeight - currentY,
                        textureWidth = baseWidth - currentX;

                    if (textureWidth > width) {
                        textureWidth = width;
                    }
                    if (textureHeight > height) {
                        textureHeight = height;
                    }
                    //console.log(textureWidth, textureHeight);
                    textures.push(new PIXI.Texture(baseTexture, new PIXI.Rectangle(currentX, currentY, textureWidth, textureHeight)));
                    currentX += width;
                }
                currentX = 0;
                currentY += height;
            }
            return textures;
        }
    }]);

    return AnimationRenderer;
}(_renderer2.default);

exports.default = AnimationRenderer;