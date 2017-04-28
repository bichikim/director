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

var VideoRenderer = function (_Renderer) {
    _inherits(VideoRenderer, _Renderer);

    function VideoRenderer() {
        _classCallCheck(this, VideoRenderer);

        return _possibleConstructorReturn(this, (VideoRenderer.__proto__ || Object.getPrototypeOf(VideoRenderer)).apply(this, arguments));
    }

    _createClass(VideoRenderer, [{
        key: '_add',
        value: function _add(logic) {
            if (_lodash2.default.isObject(logic)) {
                this._resourceAssembler(logic);
                if (_lodash2.default.isString(logic.resource)) {
                    var displayObject = null,
                        texture = PIXI.Texture.fromVideo(logic.resource);
                    VideoRenderer._setVideo(logic, texture.baseTexture.source);
                    displayObject = this._makeDisplayObject(logic, texture);
                    displayObject = this._setStatus(logic, displayObject);
                    this._stage.addChild(displayObject);
                }
            }
        }
    }], [{
        key: '_setVideo',
        value: function _setVideo(logic, videoSource) {
            if (_lodash2.default.isObject(logic)) {
                if (_lodash2.default.isBoolean(logic.loop)) {
                    videoSource.lopp = logic.loop;
                } else {
                    videoSource.loop = true;
                }
            }
        }
    }]);

    return VideoRenderer;
}(_renderer2.default);

exports.default = VideoRenderer;